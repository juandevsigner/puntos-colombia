import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Provider, ValueProps } from "./Interfaces";
import {axiosClient,axiosData} from "../config/axiosClient";
import { UserDate } from "./Interfaces";

const StateContext: React.Context<ValueProps> = createContext({} as ValueProps);

export const ContextProvider = ({ children }: Provider) => {
  const [idUser, setIdUser] = useState<string>("");
  const [customer, setCustomer] = useState<string | null>("");
  const [modal, setModal] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [dataPoints, setDataPoints] = useState<Array<any>>([]);
  const [pointsCol, setPointsCol] = useState<string>("");
  const [modalForm, setModalForm] = useState<boolean>(false);
  const [notPoints, setNotPoints] = useState<boolean>(true);
  const [errorBD, setErrorBD] = useState<boolean>(false);
  const [videosurls, setVideourls] = useState<Array<any>>([]);


  const navigate = useNavigate();

  useEffect(() => {

    const getToken = async () => {

      try {
        const res = await axiosData.get("/container/autentication");
        console.log(res.data);
        
        if (res.data === "error") {
          console.log("error obteniendo token");
          //navigate("/user/register");
          return;
        } else {
          console.log("seteando token")
          localStorage.setItem("autentication", JSON.stringify(res.data));
        }
      } catch (error) {
        console.log(error);
      }

    }
    getToken();
    localStorage.setItem("token",getAutenticatioData("token"));
    getVideosURLS();
    //console.log(getAutenticatioData("token"));
  },[]);


  const getVideosURLS = async () =>{

    const datareq = {
      code: getAutenticatioData("code_container"),
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAutenticatioData("token")}`,
          "id-business": getAutenticatioData("id_business")  
       }
      }
      const res : any = await axiosClient.post("/container/get_video_container", datareq, config);
      console.log("videos:",res.data);
      setVideourls(res.data);
    } catch (error: any) {
      console.log(error.response.data.msg);
    }

  }

  const getAutenticatioData = (param : string) => {

   let autenticateData : string | null = localStorage.getItem("autentication");
   if (autenticateData != null){

    let jsondata : any = JSON.parse(autenticateData);
    console.log(jsondata);

    switch(param){

      case "token":
        return jsondata.token;
      break;

      case "code_container":
        return jsondata.code_container;
      break;

      case "id_business":
        return jsondata.id_business;
      break;

      case "key_container":
        return jsondata.key_container;
      break;
    }
   }
  };

  const checktimerexpirity = () =>{

    console.log('checking timmer');
    const item  = JSON.parse(localStorage.getItem("expirytime")!);
	  const now = new Date()
	  if (now.getTime() > item.expiry) {
      localStorage.removeItem("expirytime")
      navigate("/home");
	  }
  }

  const settimeExpiry = () => {
    const now = new Date()
    const item = {
      expiry: now.getTime() + (5*60*1000), //5 minutos inactivadad vuelve al home
    }
    localStorage.setItem("expirytime", JSON.stringify(item))
  }

  const authBussiness = async (dataUser: UserDate) => {
    setLoad(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosClient.post("/token", dataUser, config);
      //SE COMENTA REGITRO DE TOKEN PARA AUTOLOGIN
      /* const token = data.token;
      localStorage.setItem("token", JSON.stringify(token)); */
      navigate("/home");
    } catch (error: any) {
      setMsg(error.response.data.msg);
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
    setLoad(false);
  };

  const authUser = async (userId: string) => {

    const userUid = {
      identification_number: userId,
      code_container: getAutenticatioData("code_container"),
      documentType: 2,
    };

    try {

      const { data } = await axiosClient.post("/puntos-colombia/short_balance",
        userUid,
        {headers: {
          "ContentType": "application/json",
          "Authorization": `Bearer ${getAutenticatioData("token")}`,
          "id-business": getAutenticatioData("id_business")
        }}
      );

      setNotPoints(data.active);
      if (data.payload.allowAccrual === false) {
        setLoad(false);
        setModal(true);
        return;
      } else {
        const userInfo = {
          name: data.name,
          id: data.identification_number,
          phone: data.movil,
        };
        localStorage.setItem("userName", JSON.stringify(userInfo));
        navigate("/user/register");
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  const getPoints = async () => {
    try {
      const res:any = await axiosData.get("/container/getdata");
      if (res.data.res){

        console.log(res.data.res)
        //llevar a pantalla de mantenimiento

      }else{
        setDataPoints(res.data);
        //console.log(dataPoints);
      }
    } catch (error) {
      console.log("Error leyendo data: ",error);
      setErrorBD(true);
      setTimeout(() => {
        navigate("/home");
        setErrorBD(false);
      }, 2500);
    }
  };

  const checkPort = async () => {

    console.log("chequeando puerto com...")
    try {
    
      const res:any = await axiosData.get("/container/checkport");
      console.log(res.data);

      if (res.data.res === "True"){

        console.log("Puerto conectado!");

      }else{
        console.log("Checkport:Trama no esperada");
        //navigate("/home"); pantalla mantenimiento
      }
    } catch (error) {
      console.log("Error chequeando puerto: ",error);
      //navigate("/home"); //pestaña fuera de servicio.
    }
  };

  const Tare = async () => {
    setLoad(true);
    try {
    
      const res:any = await axiosData.get("/container/tare");

      if (res.data){

        console.log(res.data.res);

      }else{

        console.log("Tareo: Trama no es la esperada");

      }
    } catch (error) {
      console.log("Error tareando: ",error);
    }
  };

  const setPoints = async () => {
    setLoad(true);
    const user: any = localStorage.getItem("userName");
    const datosUser = JSON.parse(user);
    let products : Array<Object> = [];

    for(let i=0;i<dataPoints.length;i++){

      if (i === 2 ){

        if(!(parseInt(dataPoints[i].count) < 100)){

          products.push({
            code: dataPoints[i].code_product,
            count : dataPoints[i].count
          })

        }
      }else{
        products.push({
          code: dataPoints[i].code_product,
          count : dataPoints[i].count
        })
      }
    }
    const userPointsData = {
      identification_number: datosUser.id,
      movil: datosUser.phone,
      code_container: getAutenticatioData("code_container"),
      documentType: 2,
      generate_points: notPoints,
      name: datosUser.name,
      products: products
    }

    console.log("userPointsData",userPointsData);

    try {
      const { data } = await axiosClient.post(
        "/puntos-colombia/process_sale",
        userPointsData,
        {headers: {
          "ContentType": "application/json",
          "Authorization": `Bearer ${getAutenticatioData("token")}`,
          "id-business": getAutenticatioData("id_business")
        }}
      );
      setPointsCol(data.mainPoints);
      if (!data.allowAccrual) {
        setNotPoints(false);
      }
    } catch (error) {
      console.log(error);

      setErrorBD(true);
      setTimeout(() => {
        navigate("/home");
        setErrorBD(false);
      }, 5000);
    }
    setLoad(false);
  };

  const userNotPC = async (name: string, id:string, phone: string) => {
    try {
      const userInfo = {
        name,
        phone,
        id: id,
      };
      localStorage.setItem("userName", JSON.stringify(userInfo));
      //navigate("/user/register");
      //setModalForm(false);
      setModal(false);
      setIdUser(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        idUser,
        setIdUser,
        modal,
        setModal,
        authBussiness,
        msg,
        setMsg,
        load,
        setLoad,
        authUser,
        customer,
        setCustomer,
        getPoints,
        dataPoints,
        setDataPoints,
        setPoints,
        pointsCol,
        setPointsCol,
        modalForm,
        setModalForm,
        userNotPC,
        notPoints,
        setNotPoints,
        errorBD,
        setErrorBD,
        Tare,
        checkPort,
        checktimerexpirity,
        settimeExpiry,
        videosurls,
        getVideosURLS
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
