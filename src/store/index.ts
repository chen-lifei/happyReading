import type { InjectionKey } from "vue";
import { loginApi } from '@/api/user';
import { setToken } from '@/utils/auth'

export interface state {
    user: {
        avatar: '';
        email: '';
        id: '';
        name: '';
        password: '';
        phone: '';
        region: '';
        role: '';
    };
}

// export default createStore({
//     state: {
//         user: {
//             token: "",
//             avatar: "",
//             name: "",
//         },
//     },
//     getters: {
//         token: (state) => state.user.token,
//         avatar: (state) => state.user.avatar,
//         name: (state) => state.user.name,
//     },
//     mutations: {
//         SET_TOKEN: (state, token) => {
//             state.user.token = token;
//         },
//     },
//     actions: {
//         login({ commit }, userInfo) {
//             const { name, password } = userInfo;
//             return new Promise((resolve, reject) => {
//                 loginApi({ account: name, password }).then(response => {
//                     const { data } = response;
//                     commit('SET_TOKEN', name);
//                     setToken(name);
//                     resolve(true);
//                 }).catch(error => {
//                     reject(error);
//                 });
//             });
//         },
//     },
//     modules: {},
// });

// export const key: InjectionKey<Store<state>> = Symbol();
