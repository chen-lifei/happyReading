<template>
    <div class="navbar-wrapper" :class="{ 'navbar-collapse': data.isCollapse }">
        <div class="logo-wrapper">
            <img class="logo" src="@/assets/image/logo.svg" alt="logo" @click="toHome()">
            <div class="name" v-show="!data.isCollapse">悦阅</div>
            <div class="collapse-wrapper flex-center" @click="data.isCollapse = !data.isCollapse">
                <i class="iconfont icon-arrowLeft" :class="{ 'to-right': data.isCollapse }"></i>
            </div>
        </div>
        <div class="nav-list">
            <div class="nav-item flex-start"
                v-for="(item, index) in data.navList"
                :key="index"
                :class="{ 'selected': data.currentNav === item.key }"
                @click="changeNav(item)">
                <i class="iconfont" :class="item.icon"></i>
                <div class="name" v-show="!data.isCollapse">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { reactive, onMounted, defineComponent } from 'vue';
    import { useRouter } from 'vue-router';

    export default defineComponent({
        name: "LeftNavbar",
        setup() {
            const { push } = useRouter();
            const data = reactive({
                currentNav: "",
                isCollapse: false,
                navList: [
                    { key: 'home', name: '首页', icon: 'icon-home' },
                    { key: 'library', name: '图书馆', icon: 'icon-notebook' },
                    { key: 'bookcase', name: '个人书柜', icon: 'icon-book' },
                    { key: 'history', name: '观看历史', icon: 'icon-history' },
                ],
            });
        
            function toHome() {
                push("/home");
            }
        
            function changeNav(item) {
                data.currentNav = item.key;
                push(`/${item.key}`);
            }
        
            onMounted(() => {
                let pathName = window.location.pathname.split("/")[1];

                if (!pathName || !["home", "library", "bookcase", "history"].includes(pathName)) pathName = data.navList[0].key;
                data.currentNav = pathName;
            });

            return {
                data,
                toHome,
                changeNav,
            }
        }
    });
</script>

<style lang="scss" scoped>
    .navbar-wrapper {
        width: 240px;
        background: var(--whiteColor);
        transition: all .4s ease;

        .logo-wrapper {
            position: relative;
            display: flex;
            padding: 20px;
            background: var(--whiteColor);
            box-shadow: -8px 0 20px rgba(89, 122, 97, 0.1);

            .logo {
                width: 36px;
                height: 36px;
                background: var(--mainColor);
                border-radius: 5px;
                cursor: pointer;
            }

            .name {
                font-size: 24px;
                font-weight: bold;
                color: var(--mainColor);
                margin-left: 20px;
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
            padding: 10px 15px;
            margin-top: 8px;
            overflow: auto;

            .nav-item {
                position: relative;
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

                .name {
                    margin-left: 16px;
                    transition: all .4s ease;
                    word-break: keep-all;
                }

                &:hover {
                    background: var(--hoverColor);
                }

                &.selected {
                    background: var(--hoverColor);

                    .iconfont,
                    .name {
                        color: var(--mainColor);
                    }
                }

                &.selected {
                    &::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: -15px;
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
        }
    }
</style>
