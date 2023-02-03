import { setToken } from "@/utils/auth";
import { loginApi } from "@/api/user";
import { defineStore, acceptHMRUpdate } from "pinia";

// function apiLogin(a: string, p: string) {
//     if (a === "ed" && p === "ed") return Promise.resolve({ isAdmin: true });
//     if (p === "ed") return Promise.resolve({ isAdmin: false });
//     return Promise.reject(new Error("invalid credentials"));
// }

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        userInfo: {
            token: "",
            avatar: "",
            name: "yanyan",
        },
        isAdmin: true,
    }),

    actions: {
        logout() {
            this.$patch({
                userInfo: {
                    token: "",
                    avatar: "",
                    name: "",
                },
                isAdmin: false,
            });
        },

        /**
         * Attempt to login a user
         */
        async login(account: string, password: string) {
            return new Promise((resolve, reject) => {
                loginApi({
                    account,
                    password
                }).then(res => {
                    let { data } = res;
                    
                    if (data.status == 1) {
                        this.$patch({
                            userInfo: {
                                token: "99",
                                avatar: "",
                                name: account,
                            },
                            ...data.result
                        });
                        setToken(account);
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
