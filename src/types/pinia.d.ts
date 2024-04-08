/**
 * pinia 类型定义
 */

// 用户信息
declare interface UserInfo<T = any> {
	token: Number | string;
    avatar: string;
    name: string;
	isAdmin: boolean
}

declare interface UserInfoState {
	userInfo: UserInfo;
}

// 布局配置
declare interface ReadConfigState {
	readConfig: {
		openNavbar: boolean;
		menuText: string;
		menuSite: string;
		textColor: string;
		textSize: string;
		bgColor: string;
		bgPicture: string;
		isDark: boolean;
	};
}
