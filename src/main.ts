import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store, { key } from '@/store'
import './permission'

import "@/iconfont/iconfont.css";
import "@/iconfont/iconfont.js";
import "@/assets/css/main.css";

const app = createApp(App);

// 配置 store
app.use(store, key);

app.use(router);

app.mount("#app");
