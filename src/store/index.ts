// import Vue from 'vue'
// import Vuex from 'vuex'

import type { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

export interface state {
    userInfo: object
}

export default createStore({
    state: {
        userInfo: {},
    },
    getters: {},
    mutations: {
        SET_USERINFO(state, val) {
            state.userInfo = val;
        }
    },
    actions: {},
    modules: {},
});

export const key:InjectionKey<Store<state>> = Symbol();
