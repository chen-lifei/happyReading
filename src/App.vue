<script setup lang="ts">
    import router from '@/router';
    import { RouterView } from 'vue-router'
    import { ref } from 'vue';
    import LeftNavbar from '@/components/Navbar/LeftNavbar.vue';
    import TopNavbar from '@/components/Navbar/TopNavbar.vue';
    import { useStore } from 'vuex';
    import { key } from '@/store';

    const store = useStore(key);

    let hiddenNav = ref(true);

    router.beforeEach(async (to, from, next) => {
        hiddenNav.value = !!to.meta.hiddenNav as boolean;

        // if (!store.state.userInfo['id']) {
        //     if (to.meta.ignoreAuth) {
        //         next();
        //         return;
        //     }

        //     // 跳转到登录页
        //     const redirectData: { path: string; replace: boolean; } = {
        //         path: '/login',
        //         replace: true,
        //     };
        //     next(redirectData);
        //     return;
        // }

        next();
    });
</script>

<template>
    <RouterView v-if="hiddenNav" />
    <template v-else>
        <LeftNavbar class="left-navbar" />
        <div class="right-wrapper">
            <TopNavbar class="top-navbar" />
            <div class="main-wrapper">
                <RouterView />
            </div>
        </div>
    </template>
</template>

<style scoped lang="less">
    .left-navbar {
        position: absolute;
        top: 30px;
        left: 30px;
        width: 180px;
        height: calc(100% - 60px);
    }
    .right-wrapper {
        width: calc(100% - 240px);
        height: 100vh;
        margin-left: 240px;
        overflow: hidden;

        .main-wrapper {
            width: 100%;
            height: calc(100% - 72px);
        }
    }
</style>
