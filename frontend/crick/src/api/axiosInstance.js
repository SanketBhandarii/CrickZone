import axios from "axios";
import { makeUseAxios } from "axios-hooks";

const API_HOST = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL : API_HOST,
    timeout: 20000,
})

const useAxios = makeUseAxios({
    axios : axiosInstance
})

export default useAxios;