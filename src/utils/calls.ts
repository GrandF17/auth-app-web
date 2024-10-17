import axios from "axios";
import { Auth, ExtendedResponce, Login, Mail, Register, ServerResp } from "./interface";
import { CLIENT_ERROR, REQUEST_TIME_EXPIRED } from "./status";

const link = "http://localhost:4000"

const axiosPost = async (path: string, body: Object): Promise<ExtendedResponce> => {
    return await axios.post(path, body)
        .then((response) => {
            return {
                status: response.status,
                response: response.data as ServerResp
            } as ExtendedResponce;
        })
        .catch((error) => {
            console.log(`Error in ${path} call:`);
            console.log(error);

            return {
                status: CLIENT_ERROR,
                response: { success: false }
            } as ExtendedResponce;
        })
        .finally(() => {
            return {
                status: REQUEST_TIME_EXPIRED,
                response: { success: false }
            } as ExtendedResponce;
        });
}

export const getCode = async (mail: Mail): Promise<ExtendedResponce> => {
    return await axiosPost(`${link}/user/mail_verify`, { mail });
}

export const register = async (regInfo: Register) => {
    return await axiosPost(`${link}/user/register`, regInfo);
}

export const login = async (loginInfo: Login) => {
    return await axiosPost(`${link}/user/login`, loginInfo);
}

export const auth = async (authInfo: Auth) => {
    return await axiosPost(`${link}/user/auth`, authInfo);
}

export const refresh = async (refreshInfo: Auth) => {
    return await axiosPost(`${link}/user/refresh`, refreshInfo);
}