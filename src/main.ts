import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";
import "@/router/permission";

// iconfont
import "@/iconfont/iconfont.css";
import "@/iconfont/iconfont.js";
import "@/assets/css/index.scss";
// ElementPlus
import 'element-plus/theme-chalk/display.css';
import "element-plus/theme-chalk/src/message.scss";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
