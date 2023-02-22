import axios from "axios";
import { ElMessage } from 'element-plus';

const service = axios.create({
    timeout: 30000,
});

service.interceptors.response.use(
    (response) => {
        const res = response.data;

        if (res.status != 1) {
            ElMessage({
                message: res.msg || "Error",
                type: "error",
                duration: 2 * 1000,
            });
            return Promise.reject(new Error(res.msg || "Error"));
        } else {
            return res;
        }
    },
    (error) => {
        console.error("接口错误" + error);
        ElMessage({
            message: error.message,
            type: "error",
            duration: 10 * 1000,
        });
        return Promise.reject(error);
    }
);

export const requestUrl = "http://106.15.38.125";
export default service;
