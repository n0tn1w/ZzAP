import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const API_ADDRESS = "https://zapp.be.g8row.me";

export default function useAxios(auth: boolean = false) {
  const { token } = useAuth();
  const axiosInstance = axios.create({
    baseURL: API_ADDRESS,
    headers: auth ? { Authorization: "Bearer " + token } : {},
  });

  return axiosInstance;
}
