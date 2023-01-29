import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    // 配置端口号
    // server: {
    //     port: 3008,
    // },
    // 将根路径换成相对路径
    base: "./",
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")]
        }
    }
});
