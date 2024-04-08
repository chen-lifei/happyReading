import { setToken, getToken } from "@/utils/auth";
import { loginApi } from "@/api/user";
import { defineStore, acceptHMRUpdate } from "pinia";

export const useUserStore = defineStore({
    id: "user",
    state: (): UserInfoState => ({
        userInfo: {
            token: "",
            avatar: "",
            name: "",
            isAdmin: true
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
                    token: "",
                    avatar: "",
                    name: "",
                    isAdmin: false
                },
            });
        },

        async login(account: string, password: string) {
            let info = {
                name: account,
                avatar: "https://img1.baidu.com/it/u=2741160338,2445069712&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            }
            this.$patch({
                userInfo: info
            });
            setToken(JSON.stringify(info));
            return Promise.resolve(true);

            // return new Promise((resolve, reject) => {
            //     loginApi({
            //         account,
            //         password
            //     }).then(res => {
            //         let { data } = res;

            //         if (data.status == 1) {
            //             this.$patch({
            //                 userInfo: {
            //                     token: "",
            //                     avatar: "",
            //                     name: account,
            //                 },
            //                 ...data.result
            //             });
            //             setToken(account);
            //             resolve(true);
            //         } else {
            //             reject();
            //         }
            //     }).catch(err => {
            //         reject(err);
            //     });
            // });
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
