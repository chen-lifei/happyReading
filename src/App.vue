<script setup lang="ts">
    import { ref } from "vue";
    import router from "@/router";
    import { RouterView } from "vue-router";
    import { useUserStore } from '@/stores/user';

    import LeftNavbar from "@/components/Navbar/LeftNavbar.vue";
    import TopNavbar from "@/components/Navbar/TopNavbar.vue";

    let hiddenNav = ref(true);

    const user = useUserStore();

    router.beforeEach(async (to, from, next) => {
        hiddenNav.value = !!to.meta.hiddenNav as boolean;
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

<style scoped lang="scss">
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
