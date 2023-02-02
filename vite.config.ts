import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";


// https://vitejs.dev/config/
export default defineConfig({
    // 配置端口号
    // server: {
    //     port: 3008,
    // },
    // 将根路径换成相对路径
    base: "./",
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        // postcss: {
        //     plugins: [require("tailwindcss"), require("autoprefixer")]
        // },
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/css/element/index.scss" as *;`,
            },
        },
    },
    plugins: [
        vue(),
        Components({
            extensions: ['vue', 'md'],
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
            dts: 'src/components.d.ts',
        }),
    ],
});
