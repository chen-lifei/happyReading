import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
        // {
        //     path: "/login",
        //     name: "Login",
        //     // route level code-splitting
        //     // this generates a separate chunk (About.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import("../views/Login/Login.vue"),
        // },
        // {
        //     path: "/signup",
        //     name: "Signup",
        //     component: () => import("../views/Login/Signup.vue"),
        // },
        {
            path: "/home",
            name: "Home",
            component: () => import("../views/Home.vue"),
        },
        {
            path: "/library",
            name: "LibraryView",
            component: () => import("../views/LibraryView.vue"),
        },
        {
            path: "/bookcase",
            name: "BookcaseView",
            component: () => import("../views/BookcaseView.vue"),
        },
        {
            path: "/history",
            name: "HistoryView",
            component: () => import("../views/HistoryView.vue"),
        },
    ],
});

export default router;
