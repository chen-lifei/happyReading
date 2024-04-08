import { defineStore } from "pinia";

export const useReadConfigStore = defineStore("themeConfig", {
    state: (): ReadConfigState => ({
        readConfig: {
            openNavbar: true,
            menuText: "首页",
            menuSite: "home",
            textColor: "#929594",
            textSize: "16",
            bgColor: "#F3FAF1",
            bgPicture: "",
            isDark: false,
        },
    }),
    actions: {
        setReadConfig(data: ReadConfigState) {
            this.readConfig = data.readConfig;
        },
    },
});
