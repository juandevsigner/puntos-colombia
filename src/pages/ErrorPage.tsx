import React, { useEffect } from 'react'
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";


export const ErrorPage = () => {

  const navigate = useNavigate();


  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 15000);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <MdErrorOutline className="text-red-500 text-7xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Se presentó un error al obtener tu regalo
        </h2>
        <p className="text-lg text-gray-600 text-center">
          Por favor escríbenos: <span className="font-semibold text-green-600">+57 305 3140882</span> para darte una solución.
        </p>
      </div>
    </div>
  )
}

