import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_url_puntos_colombia}`,
});

export default axiosClient;
