import axios, { AxiosInstance } from "axios";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_url_puntos_colombia}`,
});

export const axiosData: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_url_servicio_contenedor}`,
});


