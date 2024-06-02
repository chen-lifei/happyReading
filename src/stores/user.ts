import { loginApi } from "@/api/user";
import { defineStore, acceptHMRUpdate } from "pinia";
import { setToken, getToken } from "@/utils/auth";
import { validURL } from "@/utils/validate";
import { requestUrl } from "@/utils/request";

export const useUserStore = defineStore({
    id: "user",
    state: (): UserInfoState => ({
        userInfo: {
            id: "",
            token: "",
            avatar: "",
            name: "",
            isAdmin: false,
            email: "",
            phone: "",
            region: "",
            role: "",
        }
    }),

    actions: {
        getInfo(): UserInfo {
            let info = JSON.parse(getToken());
            this.$patch({
                userInfo: info
            });
            return info;
        },

        logout() {
            this.$patch({
                userInfo: {
                    id: "",
                    token: "",
                    avatar: "",
                    name: "",
                    isAdmin: false,
                    email: "",
                    phone: "",
                    region: "",
                    role: "",
                },
            });
        },

        async login(account: string, password: string) {
            // let info = {
            //     name: account,
            //     avatar: "https://img1.baidu.com/it/u=2741160338,2445069712&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            // }
            // this.$patch({
            //     userInfo: info
            // });
            // setToken(JSON.stringify(info));
            // return Promise.resolve(true);
            // a@a.cn 666666
            return new Promise((resolve, reject) => {
                loginApi({
                    account,
                    password
                }).then(res => {
                    if (res.status == 1) {
                        let avatar = res.result.avatar;
                        if (avatar) {
                            avatar = validURL(avatar) ? avatar : `${requestUrl}${avatar}`;
                        } else {
                            avatar = "https://img1.baidu.com/it/u=2741160338,2445069712&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
                        }
                        res.result.avatar = avatar;
                        this.userInfo = res.result;
                        setToken(JSON.stringify(this.userInfo));
                        resolve(true);
                    } else {
                        reject();
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
