import router from ".";
import { getToken } from "@/utils/auth";
import { useUserStore } from "@/stores/user";
import getPageTitle from "@/utils/get-page-title";

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
    document.title = getPageTitle(to.meta.title);

    // 用户是否登录过
    const hasToken = getToken();
    const user = useUserStore();

    if (hasToken) {
        if (to.path === "/login") {
            next({ path: "/" });
        } else {
            user.getInfo();
            next();
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
