import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const API_ADDRESS = "http://192.168.20.51:8081";

export default function useAxios(auth: boolean = false) {
  const { token } = useAuth();

  const axiosInstance = axios.create({
    baseURL: API_ADDRESS,
    headers: auth ? { Authorization: token } : {},
  });

  return axiosInstance;
}
