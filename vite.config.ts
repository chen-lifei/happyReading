import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        // 配置端口号
        // port: 3008,
        // 请求接口配置
        proxy: {
            "/api": {
                target: "http://127.0.0.1:3000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            }
        }
    },
    // 将根路径换成相对路径
    base: "./",
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
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
