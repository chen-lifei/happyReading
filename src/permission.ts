import router from "./router";
// import store from "./store";
// import { Message } from "element-ui";
import { getToken } from "@/utils/auth";
import getPageTitle from "@/utils/get-page-title";

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
    document.title = getPageTitle(to.meta.title);

    // 用户是否登录过
    const hasToken = getToken();
    if (hasToken) {
        if (to.path === "/login") {
            // if is logged in, redirect to the home page
            next({ path: "/" });
        } else {
            next();

            // const hasRoles = store.getters.roles && store.getters.roles.length > 0;
            // const hasRoles = false;
            // if (hasRoles) {
            //     next();
            // } else {
            //     try {
            //         // get user info
            //         // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
            //         const { roles } = await store.dispatch("user/getInfo");

            //         // generate accessible routes map based on roles
            //         const accessRoutes = await store.dispatch(
            //             "permission/generateRoutes",
            //             roles
            //         );

            //         // dynamically add accessible routes
            //         router.addRoutes(accessRoutes);

            //         // hack method to ensure that addRoutes is complete
            //         // set the replace: true, so the navigation will not leave a history record
            //         next({ ...to, replace: true });
            //     } catch (error) {
            //         // remove token and go to login page to re-login
            //         await store.dispatch("user/resetToken");
            //         // Message.error(error || "Has Error");
            //         next(`/login`);
            //     }
            // }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login`);
        }
    }
});

router.afterEach(() => {
});
