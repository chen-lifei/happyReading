import axios from "axios";
import type {
    LoginParams,
    LoginResultModel,
    GetUserInfoModel,
} from "./model/userModel";

type ErrorMessageMode = "none" | "modal" | "message" | undefined;

enum Api {
    Login = "/login",
    Logout = "/logout",
    GetUserInfo = "/getUserInfo",
    GetPermCode = "/getPermCode",
    TestRetry = "/testRetry",
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams) {
    return axios({
        method: "POST",
        url: Api.Login,
        params,
    });
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
    return axios({
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

// export function testRetry() {
//     return defHttp.get(
//         { url: Api.TestRetry },
//         {
//             retryRequest: {
//                 isOpenRetry: true,
//                 count: 5,
//                 waitTime: 1000,
//             },
//         }
//     );
// }
