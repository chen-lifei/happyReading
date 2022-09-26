import rAxios from "@/utils/axios";
import type { LoginParams, RegisterParams } from "./model/userModel";

enum Api {
    Register = "/users/register",
    Login = "/users/login",
    Logout = "/users/logout",
    GetUserInfo = "/users/:id",
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams) {
    return rAxios({
        method: "POST",
        url: Api.Login,
        data: params,
    });
}

/**
 * @description: user register api
 */
export function registerApi(params: RegisterParams) {
    return rAxios({
        method: "POST",
        url: Api.Register,
        data: params,
    });
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
    return rAxios({
        method: "GET",
        url: Api.GetUserInfo,
    });
}

// export function getPermCode() {
//     return defHttp.get<string[]>({ url: Api.GetPermCode });
// }

// export function doLogout() {
//     return defHttp.get({ url: Api.Logout });
// }
