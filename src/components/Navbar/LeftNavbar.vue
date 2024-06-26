<template>
    <div class="navbar-wrapper" :class="{ 'navbar-collapse': data.isCollapse }">
        <div class="logo-wrapper">
            <img class="logo" src="@/assets/image/logo.svg" alt="logo" @click="toHome()">
            <div class="top-name" v-show="!data.isCollapse">悦阅</div>
            <div class="collapse-wrapper flex-center" @click="toggleNavbar">
                <i class="iconfont icon-arrowLeft" :class="{ 'to-right': data.isCollapse }"></i>
            </div>
        </div>
        <div class="nav-list">
            <div class="nav-item"
                v-for="item in data.navList"
                :key="item.key"
                :class="{ 'selected': data.currentNav === item.key }"
                @click="changeNav(item)">
                <el-tooltip :content="item.name" placement="right" effect="customized" :offset="2" :disabled="!data.isCollapse">
                    <i class="iconfont" :class="item.icon"></i>
                </el-tooltip>
                <div class="nav-name" v-show="!data.isCollapse">{{ item.name }}</div>
            </div>
        </div>
        <el-drawer
            v-model="data.openNav"
            direction="ltr"
            size="150"
            :with-header="false"
            modal-class="nav-drawer"
        >
            <div class="nav-list">
                <div class="nav-item"
                    v-for="item in data.navList"
                    :key="item.key"
                    :class="{ 'selected': data.currentNav === item.key }"
                    @click="changeNav(item)">
                    <i class="iconfont" :class="item.icon"></i>
                    <div class="nav-name">{{ item.name }}</div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup lang="ts" name="LeftNavbar">
    import { reactive, onBeforeMount, onMounted, onUnmounted } from "vue";
    import { useRouter } from "vue-router";
    import { throttle } from "@/utils/index";
    import { storeToRefs } from "pinia";
    import { useReadConfigStore } from "@/stores/readConfig";

    // 变量
    const router = useRouter();
    const data = reactive({
        currentNav: "",
        isCollapse: true,
        openNav: false,
        navList: [
            { key: 'home', name: '首页', icon: 'icon-home' },
            { key: 'library', name: '图书馆', icon: 'icon-notebook' },
            { key: 'bookcase', name: '个人书柜', icon: 'icon-book' },
            { key: 'history', name: '观看历史', icon: 'icon-history' },
        ],
    });
    const readConfigStore = useReadConfigStore();
    const { readConfig } = storeToRefs(readConfigStore);

    const toHome = () => {
        router.push("/home");
    }

    const changeNav = (item) => {
        data.currentNav = item.key;
        readConfig.value.menuText = item.name;
        readConfig.value.menuSite = item.key;
        router.push(`/${item.key}`);
        if (data.openNav) data.openNav = false;
    }

    const onPageResize = () => {
        const clientWidth = document.body.clientWidth;
        if (clientWidth < 1000) {
            data.isCollapse = true;
            readConfig.value.openNavbar = false;
        } else {
            readConfig.value.openNavbar = true;
        }
    }

    const toggleNavbar = () => {
        if (readConfig.value.openNavbar) {
            data.isCollapse = !data.isCollapse;
        } else {
            data.openNav = true;
        }
    }

    onBeforeMount(() => {
        onPageResize();
        window.addEventListener("resize", throttle(onPageResize, 300));
    });

    onMounted(() => {
        let pathName = window.location.pathname.split("/")[1];

        if (!pathName || !["home", "library", "bookcase", "history"].includes(pathName)) pathName = data.navList[0].key;
        data.currentNav = pathName;
    });

    onUnmounted(() => {
        window.removeEventListener("resize", onPageResize);
    });
</script>

<style lang="scss" scoped>
    .navbar-wrapper {
        width: 150px;
        background: var(--whiteColor);
        transition: width .4s ease;

        .logo-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
            padding: 20px 10px;
            background: var(--whiteColor);
            box-shadow: -8px 0 20px rgba(89, 122, 97, 0.1);

            .logo {
                width: 36px;
                height: 36px;
                background: var(--mainColor);
                border-radius: 5px;
                cursor: pointer;
            }

            .top-name {
                font-size: 24px;
                font-weight: bold;
                color: var(--mainColor);
                margin-left: 15px;
                letter-spacing: 4px;
                word-break: keep-all;
            }

            .collapse-wrapper {
                position: absolute;
                right: -15px;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                color: var(--whiteColor);
                font-weight: bold;
                border: 6px solid var(--backColor);
                background: var(--mainColor);
                cursor: pointer;

                .iconfont {
                    translate: all .8s ease;
                    &.to-right {
                        transform: rotate(180deg);
                    }
                }
            }
        }

        .nav-list {
            height: calc(100% - 76px);
            padding: 10px;
            margin-top: 8px;
            overflow: auto;

            .nav-item {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                width: 100%;
                padding: 10px 0 10px 15px;
                margin-bottom: 10px;
                border-radius: 5px;
                color: var(--textColor);
                transition: all .4s ease;
                cursor: pointer;

                .iconfont {
                    font-size: 20px;
                    transition: all .4s ease;
                }

                .nav-name {
                    margin-left: 10px;
                    transition: all .4s ease;
                    word-break: keep-all;
                }

                &:hover {
                    background: var(--hoverColor);
                }

                &.selected {
                    background: var(--hoverColor);

                    .iconfont,
                    .nav-name {
                        color: var(--mainColor);
                    }
                }

                &.selected {
                    &::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: -10px;
                        height: 100%;
                        width: 4px;
                        border-radius: 6px 0 0 6px;
                        background: var(--mainColor);
                    }
                }
            }
        }

        &.navbar-collapse {
            width: 80px;
            .nav-list {
                .nav-item {
                    justify-content: center;
                    padding: 0;
                }

                .iconfont {
                    padding: 10px;
                    font-size: 20px;
                    transition: all .4s ease;
                }
            }
        }

        :deep(.nav-drawer) {
            .el-drawer__body {
                padding: 0;
            }

            .nav-list {
                margin-top: 0;
                .nav-item {
                    justify-content: flex-start;
                }
            }
        }
    }
</style>
