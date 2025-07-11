import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Provider, ValueProps } from "./Interfaces";
import { axiosClient, axiosData } from "../config/axiosClient";
import { UserDate } from "./Interfaces";

const StateContext: React.Context<ValueProps> = createContext({} as ValueProps);

export const ContextProvider = ({ children }: Provider) => {
  const [idUser, setIdUser] = useState<string>("");
  const [phoneUser, setPhoneUser] = useState<string>("");
  const [customer, setCustomer] = useState<string | null>("");
  const [modal, setModal] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [dataPoints, setDataPoints] = useState<Array<any>>([]);
  const [pointsCol, setPointsCol] = useState<string>("");
  const [modalForm, setModalForm] = useState<boolean>(false);
  const [givePoints, setGivePoints] = useState<boolean>(false);
  const [errorBD, setErrorBD] = useState<boolean>(false);
  const [videosurls, setVideourls] = useState<Array<any>>([]);
  const [pilas, setPilas] = useState<number>(0);
  const [baterias, setBaterias] = useState<number>(0);
  const [ropa, setRopa] = useState<number>(0.0);
  const [sensorlevel, setSensorLevel] = useState<number>(0);
  const [bonos, setBonos] = useState<Array<any>>([]);
  const [bonoselected, setBonoSelected] = useState<string>("");
  const [userPC, setUserPC] = useState<any>({});




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
    localStorage.setItem("token", getAutenticatioData("token"));
    getBonos();
    getVideosURLS();

    //console.log(getAutenticatioData("token"));
  }, []);


  const getVideosURLS = async () => {

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
      const res: any = await axiosClient.post("/container/get_video_container", datareq, config);
      //console.log("videos:", res.data);
      setVideourls(res.data);
    } catch (error: any) {
      console.log(error.response.data.msg);
    }

  }

  const getBonos = async () => {

    const datareq = {
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAutenticatioData("token")}`,
          "id-business": getAutenticatioData("id_business")
        }
      }
      const res: any = await axiosClient.post("/get-brands", datareq, config);
      setBonos(res.data);
    } catch (error: any) {
      console.log(error);
    }

  }

  const redimirBono = async () => {

    const datareq =
    {
      bonusName: "Cupón Adidas",
      identificationCustomer: "123456",
      containerName: "Contenedor puerta del norte",
      cellPhoneNumber: "23123123",
      idBrand: "68448857e814b970fd48f6f8"
    }

    datareq.containerName = getAutenticatioData("code_container");
    datareq.cellPhoneNumber = phoneUser;
    datareq.identificationCustomer = idUser;

    let brandSelected: any = bonos.find((item: any) => item._id === bonoselected);
    if (brandSelected) {
      datareq.idBrand = brandSelected._id;
      datareq.bonusName = brandSelected.brandName;
    } else {
      console.log("Bono no encontrado");
      return;
    }


    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAutenticatioData("token")}`,
          "id-business": getAutenticatioData("id_business")
        }
      }
      const res: any = await axiosClient.post("/create-bonusses", datareq, config);
      if (res.data.success === true) {
        navigate("/user/points");
      } else {
        console.log("Error al redimir bono:", res.data);
      }
    } catch (error: any) {
      console.log(error);
      navigate("/error");
    }

  }

  const getAutenticatioData = (param: string) => {

    let autenticateData: string | null = localStorage.getItem("autentication");
    if (autenticateData != null) {

      let jsondata: any = JSON.parse(autenticateData);
      console.log(jsondata);

      switch (param) {

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

  const checktimerexpirity = async () => {

    console.log('checking timmer');
    const item = JSON.parse(localStorage.getItem("expirytime")!);
    const now = new Date()
    if (now.getTime() > item.expiry) {
      localStorage.removeItem("expirytime");
      await Tare();
      navigate("/home");
    }
  }

  const settimeExpiry = () => {
    const now = new Date()
    const item = {
      expiry: now.getTime() + (5 * 60 * 1000), //5 minutos inactivadad vuelve al home
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
        {
          headers: {
            "ContentType": "application/json",
            "Authorization": `Bearer ${getAutenticatioData("token")}`,
            "id-business": getAutenticatioData("id_business")
          }
        }
      );
      setGivePoints(data.active);
      if (data.payload.allowAccrual === false) {
        setLoad(false);
        setModal(true);
        return;
      } else {
        const userInfo = {
          name: data.payload.name,
          id: data.identification_number,
          phone: data.payload.movil,
        };
        await setUserPC(userInfo);
        navigate("/user/points");
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  const getPoints = async () => {
    try {
      const res: any = await axiosData.get("/container/getdata");
      if (res.data.res) {

        console.log(res.data.res)
        //llevar a pantalla de mantenimiento

      } else {
        setDataPoints(res.data);
        res.data?.map((item: any) => {

          if (item.code_product === 'MOVIL-1') {
            let bateriasNumeric: number = parseInt(item.count_view);
            if (baterias !== bateriasNumeric) {
              console.log("insertaron baterias,Actualizando tiempo");
              settimeExpiry();
            }
            setBaterias(bateriasNumeric);
          } else if (item.code_product === 'PILAS-1') {
            let pilasNumeric: number = parseInt(item.count_view);
            if (pilas !== pilasNumeric) {
              console.log("insertaron pilas,Actualizando tiempo");
              settimeExpiry();

            }
            setPilas(pilasNumeric);

          } else if (item.code_product === 'RP-1') {
            let ropaNumeric: number = parseFloat(item.count_view);
            if ((ropaNumeric - ropa) >= 0.5) {
              console.log("insertaron ropa,Actualizando tiempo");
              settimeExpiry();

            }
            setRopa(ropaNumeric);
          }
        });
        //console.log(res.data);
      }
    } catch (error) {
      console.log("Error leyendo data: ", error);

    }
  };

  const getSensorLevel = async () => {
    try {
      const res: any = await axiosData.get("/container/getlevelsensor");
      if (res.data.res) {

        console.log(res.data.res)
        //llevar a pantalla de mantenimiento

      } else {
        let datasensor: number = parseInt(res.data);
        console.log("datasensor:", datasensor);
        setSensorLevel(datasensor);

      }
    } catch (error) {
      console.log("Error leyendo data: ", error);
    }
  };

  const checkPort = async () => {

    console.log("chequeando puerto com...")
    try {

      const res: any = await axiosData.get("/container/checkport");
      console.log(res.data);

      if (res.data.res === "True") {

        console.log("Puerto conectado!");

      } else {
        console.log("Checkport:Trama no esperada");
        //navigate("/home"); pantalla mantenimiento
      }
    } catch (error) {
      console.log("Error chequeando puerto: ", error);
      //navigate("/home"); //pestaña fuera de servicio.
    }
  };

  const Tare = async () => {
    try {

      const res: any = await axiosData.get("/container/tare");

      if (res.data) {

        console.log(res.data.res);

      } else {

        console.log("Tareo: Trama no es la esperada");

      }
    } catch (error) {
      console.log("Error tareando: ", error);
    }
  };

  const setPoints = async () => {
    setLoad(true);
    console.log("dataPoints:", dataPoints);
    let products: Array<Object> = [];

    for (let i = 0; i < dataPoints.length; i++) {

      if (i === 2) {

        if (!(parseInt(dataPoints[i].count) < 100)) {

          products.push({
            code: dataPoints[i].code_product,
            count: dataPoints[i].count
          })

        }
      } else {
        products.push({
          code: dataPoints[i].code_product,
          count: dataPoints[i].count
        })
      }
    }
    const userPointsData = {
      identification_number: userPC.id,
      movil: phoneUser,
      code_container: getAutenticatioData("code_container"),
      documentType: 2,
      generate_points: givePoints,
      name: userPC.name,
      products: products
    }

    console.log("userPointsData",userPointsData);

    
    try {
      const { data } = await axiosClient.post(
        "/puntos-colombia/process_sale",
        userPointsData,
        {
          headers: {
            "ContentType": "application/json",
            "Authorization": `Bearer ${getAutenticatioData("token")}`,
            "id-business": getAutenticatioData("id_business")
          }
        }
      );
      setPointsCol(data.mainPoints);
      if (!data.allowAccrual) {
        setGivePoints(false);
      }
    } catch (error) {
      console.log("Error obteniendo puntos colombia:", error);
      setLoad(true);
      navigate("/error");
    }
    setLoad(false);
  };

  const userNotPC = async (name: string, id: string, phone: string) => {
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
        phoneUser,
        setPhoneUser,
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
        givePoints,
        setGivePoints,
        errorBD,
        setErrorBD,
        Tare,
        checkPort,
        checktimerexpirity,
        settimeExpiry,
        videosurls,
        getVideosURLS,
        getSensorLevel,
        bonos,
        bonoselected,
        setBonoSelected,
        redimirBono,
        userPC,
        setUserPC
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
