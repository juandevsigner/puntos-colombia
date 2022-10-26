import axios, { AxiosInstance } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_url_puntos_colombia}`,
});

export default axiosClient;
