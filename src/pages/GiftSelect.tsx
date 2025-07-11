import React from 'react';
import { TiWarning } from "react-icons/ti";
import EcoShop from "../assets/ecoshopping.webp";
import { useStateContext } from "../context/ContextProvider";
import { Alert, Modal, ModalForm, Spinner } from "../ui";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handelRightClick } from '../components/AppUtility';
import PClogo from "../assets/logoPC.png";
import { red } from '@mui/material/colors';


export const GiftSelect = () => {
    const { bonos, checktimerexpirity, msg, setMsg, dataPoints, idUser, authUser,
        setLoad, setModal, bonoselected, setBonoSelected, load, redimirBono } = useStateContext();
    const [ExpirityTime, setExpirityTime] = useState(0);
    const [bonosFinal, setBonosFinal] = useState<any[]>([]);

    const navigate = useNavigate();

    document.removeEventListener('contextmenu', handelRightClick);

    const handleUserActivity = () => {

        if (ExpirityTime >= 1) {
            localStorage.removeItem("expirytime");
            const now = new Date()
            const item = {
                expiry: now.getTime() + (3 * 60 * 1000),
            }
            localStorage.setItem("expirytime", JSON.stringify(item))
        }

    };

    const handleReturnHome = () => {
        navigate("/home");
    }

    const handleClick = async (e: any) => {
        e.preventDefault();
        if (bonoselected === "") {
            setMsg("Por favor seleccione un regalo");
            setTimeout(() => {
                setMsg("");
            }, 2000);
            return;
        }
        if (bonoselected === "9999") {
            setLoad(true);
            console.log("aquiii");
            await authUser(idUser);
        } else {
            setLoad(true);
            await redimirBono();
            console.log("redimiendo bono");

        }

    };

    useEffect(() => {
        document.addEventListener("click", handleUserActivity);
        return () => {
            document.removeEventListener("click", handleUserActivity);
        }
    }, [handleUserActivity]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setExpirityTime(ExpirityTime + 1);
            checktimerexpirity();
        }, 5000);
        return () => {
            clearTimeout(timeout);
        }
    }, [ExpirityTime]);


    useEffect(() => {
        document.addEventListener('contextmenu', handelRightClick);
        setModal(false);
        setBonoSelected("");
    }, []);

    useEffect(() => {
        if (bonos.length > 0) {
            let pesoGramos = dataPoints[2].count;
            const filteredBonos = bonos.filter(bono => (pesoGramos >= bono.weightRestriction));
            setBonosFinal(filteredBonos);
        } else {
            setBonosFinal([]);
        }
    }, [bonos]);

    return (
        <div className="flex flex-col text-center items-center justify-items-center transition-all w-full">
            {msg !== "" && <Alert msg={msg} />}
            <p className="text-green-500 text-7xl">Paso 4: Selecciona tu regalo</p>
            <br />
            <form className="w-4/5">

                <div className="flex justify-center my-6">
                    <div
                        className={`rounded-2xl shadow-lg p-6 flex flex-col items-center cursor-pointer transition-all
                        ${bonoselected === "9999" ? "ring-4 ring-green-500 bg-green-50" : "bg-white"}
                            hover:ring-2 hover:ring-green-300
                            w-40 sm:w-56 md:w-64`}
                        onClick={() => setBonoSelected("9999")}
                    >
                        <img
                            src={PClogo} // Update with your logo path
                            alt="Puntos Colombia"
                            width={100}
                            height={100}
                        />
                        <span className="text-lg font-semibold text-gray-700">Puntos Colombia</span>

                    </div>
                </div>


                {bonosFinal.length > 0 ?
                    (
                        <div className="grid grid-cols-2 gap-4 justify-center">
                            {bonosFinal.map((item, index) => (
                                <div
                                    key={item._id || index}
                                    className={`rounded-2xl shadow-lg p-6 flex flex-col items-center cursor-pointer transition-all
                                    ${bonoselected === item._id ? "ring-4 ring-green-500 bg-green-50" : "bg-white"}
                                                    hover:ring-2 hover:ring-green-300
                                                    w-40 sm:w-56 md:w-64`}
                                    onClick={() => setBonoSelected(item._id)}
                                >
                                    <img
                                        src={item.bonusImage} // Update with your logo path
                                        alt="bono"
                                        className="mb-4"
                                        width={150}
                                        height={150}
                                    />
                                    <span className="text-lg font-semibold text-gray-700">Bono {item.brandName}</span>

                                </div>
                            ))}
                        </div>
                    ) : null}
                <br />
                <button
                    className="my-3 btn-primary justify-center text-3xl   items-center cursor-pointer transition-all"
                    type="submit"
                    onClick={handleClick}
                >
                    {load ? <Spinner /> : <p>Continuar </p>}
                </button>
                <button
                    className="my-3 btn-secondary justify-center text-3xl   items-center cursor-pointer transition-all"
                    onClick={handleReturnHome}
                >
                    <p>Volver al inicio</p>
                </button>
            </form>
            <img className="w-3/5" src={EcoShop} alt="ecoshopping" />

            <Modal />
            <ModalForm />
        </div>
    );
}
