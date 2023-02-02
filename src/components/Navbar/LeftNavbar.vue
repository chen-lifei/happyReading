<template>
    <div class="navbar-wrapper">
        <div class="logo-wrapper flex">
            <img class="logo" src="@/assets/image/logo.svg" alt="logo" @click="toHome()">
            <div class="name">悦阅</div>
        </div>
        <div class="nav-list">
            <div class="nav-item flex-start"
                v-for="(item, index) in state.navList"
                :key="index"
                :class="{ 'selected': state.currentNav === item.key }"
                @click="changeNav(item)">
                <i class="iconfont" :class="item.icon"></i>
                <div class="name">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const { push } = useRouter();
    const state = reactive({
        currentNav: '',
        navList: [
            { key: 'home', name: '首页', icon: 'icon-home' },
            { key: 'library', name: '图书馆', icon: 'icon-bookcase' },
            { key: 'bookcase', name: '个人书柜', icon: 'icon-book' },
            { key: 'history', name: '观看历史', icon: 'icon-history' },
        ],
    });

    function toHome() {
        push('/home');
    }

    function changeNav(item) {
        state.currentNav = item.key;
        push(`/${item.key}`);
    }

    onMounted(() => {
        let pathName = window.location.pathname.split('/')[1];
        
        if (!pathName || !['home', 'library', 'bookcase', 'history'].includes(pathName)) pathName = state.navList[0].key;
        state.currentNav = pathName;
    })
</script>

<style lang="scss" scoped>
    .navbar-wrapper {
        border-radius: 20px;
        background: #FFFFFF;
        padding: 20px 10px;

        .logo-wrapper {
            margin-bottom: 30px;

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
            }
        }

        .nav-list {
            display: flex;
            flex-wrap: wrap;

            .nav-item {
                position: relative;
                width: 100%;
                padding: 10px 5px;
                margin-bottom: 10px;
                border-radius: 5px;
                cursor: pointer;

                .iconfont {
                    font-size: 20px;
                    margin-right: 16px;
                }

                &:hover,
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
                        right: -10px;
                        height: 100%;
                        width: 4px;
                        border-radius: 6px;
                        background: var(--mainColor);
                    }
                }
            }
        }
    }
</style>
