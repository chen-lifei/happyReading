import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import "./permission";

// ElementPlus
import "@/assets/css/index.scss";
import "element-plus/theme-chalk/src/message.scss"
// tailwind
// import "tailwindcss/tailwind.css";
// iconfont
import "@/iconfont/iconfont.css";
import "@/iconfont/iconfont.js";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
