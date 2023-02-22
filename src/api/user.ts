import request from "@/utils/request";
import type { LoginParams, RegisterParams } from "./model/userModel";

enum Api {
    Register = "/api/users/register",
    Login = "/api/users/login",
    Logout = "/api/users/logout",
    GetUserInfo = "/api/users/:id",
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams) {
    return request({
        method: "POST",
        url: Api.Login,
        data: params,
    });
}

/**
 * @description: user register api
 */
export function registerApi(params: RegisterParams) {
    return request({
        method: "POST",
        url: Api.Register,
        data: params,
    });
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
    return request({
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
