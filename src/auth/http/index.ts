import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";


export const API_URL = "http://localhost";

const $api = axios.create({
    withCredentials: true,
    baseURL: `${API_URL}/api/`,
});

$api.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
//   config.headers.Authorization = `Bearer ${DataManager.load(
//     AuthEnum.ACCESS_TOKEN_STORAGE_KEY
//   )}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        console.log("Console.log---AXIOS HTTP Auth");
        console.log(error);
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<AuthResponse>(
                    `http://localhost`,
                    {withCredentials: true}
                );

                localStorage.setItem("token", response.data.token);
                return $api.request(originalRequest);
            } catch (e) {
                console.log("UNAUTHORIZED");
            }
        }
        throw error;
    }
);

export default $api;
