<template>
    <div class="login-view">
        <div class="main-wrapper">
            <img class="top-img" src="@/assets/image/login/top.svg" />
            <img class="bottom-img" src="@/assets/image/login/bottom.svg" />
            <div class="inner-wrapper">
                <div class="logo-wrapper">
                    <img src="@/assets/image/logo.svg" alt="悦阅" />
                    悦阅
                </div>
                <h2>欢迎来到悦阅！</h2>
                <div class="tip">请先{{ state.isLogin ? "登录" : "注册" }}账号~</div>
                <div class="form-area">
                    <input type="text" v-if="!state.isLogin" v-model="state.username" class="form-item" :class="{ 'error': state.username.length && !usernameCorrect }" placeholder="请输入用户名">
                    <input type="text" class="form-item" :class="{ 'error': !state.accountCorrect && state.account.length  }" v-model="state.account" placeholder="请输入手机号或邮箱" @blur="checkAccount">
                    <input type="password" class="form-item" :class="{ 'error': state.password.length && !passwordCorrect  }" v-model="state.password" placeholder="请输入密码">
                </div>
                <div class="tip-wrapper flex-between" v-if="state.isLogin">
                    <div class="remember flex">
                        <el-checkbox v-model="state.remember" label="记住我" />
                    </div>
                    <div class="forget">忘记密码?</div>
                </div>
                <div class="submit-btn" @click="clickSubmitBtn()">{{ state.isLogin ? "登录" : "注册" }}</div>
                <div class="change-type" @click="changeType">{{ state.isLogin ? "注册" : "登录" }}账号</div>
                <div class="split-wrapper">
                    <div class="line"></div>
                    <div class="text">或者</div>
                    <div class="line"></div>
                </div>
                <div class="quick-method flex">
                    <svg class="svg-icon" aria-hidden="true">
                        <use xlink:href="#icon-wechat"></use>
                    </svg>
                    <svg class="svg-icon" aria-hidden="true">
                        <use xlink:href="#icon-qq"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, onMounted, computed } from 'vue';
    import { loginApi, registerApi } from '@/api/user';
    import { validatePhone, validateEmail } from '@/utils/validate';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { key } from '@/store';

    let state = reactive({
        isLogin: true,
        remember: false,
        username: '',
        account: '',
        password: '',
        nameCorrect: false,
        accountCorrect: false,
        passwordCorrect: false,
    });

    const store = useStore(key);
    
    const { push } = useRouter();

    const usernameCorrect = computed(() => {
        return state.username.length && state.username.length <= 6;
    });

    const passwordCorrect = computed(() => {
        return state.password.length >= 6 && state.password.length <= 12;
    });

    function changeType() {
        state.isLogin = !state.isLogin;
        state.account = '';
        state.password = '';
    }

    function checkAccount() {
        state.accountCorrect =  validatePhone(state.account) || validateEmail(state.account);
    }

    function clickSubmitBtn() {
        if (!state.accountCorrect) {
            return window.alert('请输入正确的账号');
        }
        if (!passwordCorrect) {
            return window.alert('密码需大于6位且小于12位');
        }

        if (state.isLogin) {
            // 登录
            store.dispatch('login', {
                account: state.account,
                password: state.password
            }).then(() => {
                push('/');
            }).catch(() => {
                window.alert('账号或密码输入错误，登录失败');
            });
        } else {
            if (!usernameCorrect) {
                return window.alert('用户名不能大于6位且不能为空');
            }

            // 注册
            registerApi({
                name: state.username,
                account: state.account,
                password: state.password
            }).then(res => {
                let { data } = res;
                if (data.status == 1) {
                    window.alert('注册成功，请登录');
                } else {
                    window.alert('注册失败，请稍后重试');
                }
            });
        }
    }

    onMounted(() => {
    });
</script>

<style lang="less" scoped>
    .login-view {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: #FFFFFF;

        .main-wrapper {
            position: relative;

            .top-img {
                position: absolute;
                left: -60px;
                top: -60px;
                inline-size: 240px;
            }

            .bottom-img {
                position: absolute;
                right: -60px;
                bottom: -60px;
                inline-size: 240px;
            }
        }

        .inner-wrapper {
            position: relative;
            width: 440px;
            padding: 40px 30px;
            color: #33303C;
            border-radius: 8px;
            background-color: #FFFFFF;
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
            z-index: 2;

            .logo-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 30px;
                font-size: 20px;
                color: #000000;
                img {
                    margin-right: 14px;
                }
            }

            h2 {
                font-size: 26px;
                color: #000000;
            }

            .tip {
                color: #A8A6B0;
                margin: 4px 0 20px 0;
            }

            .form-area {
                width: 100%;
                .form-item {
                    width: 100%;
                    height: 38px;
                    font-size: 16px;
                    padding: 10px;
                    margin-bottom: 20px;
                    outline: none;
                    border-radius: 4px;
                    border: 1px solid var(--activeColor);

                    &::placeholder {
                        color: var(--dimColor);
                    }

                    &.error {
                        border-color: red;
                    }
                }
            }

            .tip-wrapper {
                .remember {
                    color: #A8A6B0;
                    input {
                        cursor: pointer;
                        margin-right: 6px;
                    }
                }
                .forget {
                    color: var(--mainColor);
                    &:hover {
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }
            }

            .submit-btn {
                margin: 20px 0;
                padding: 8px 0;
                color: #FFFFFF;
                border-radius: 4px;
                text-align: center;
                background: var(--mainColor);
                cursor: pointer;
                &:hover {
                    background: var(--mainHoverColor);
                }
            }

            .change-type {
                font-size: 14px;
                text-align: center;
                color: var(--mainColor);
                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }
            }

            .split-wrapper {
                display: flex;
                align-items: center;
                margin: 20px 0;
                .line {
                    flex: 1;
                    height: 1px;
                    background: #E6EBE4;
                }
                .text {
                    padding: 0 10px;
                    font-size: 14px;
                }
            }

            .quick-method {
                .svg-icon {
                    font-size: 34px;
                    cursor: pointer;
                    &:first-of-type {
                        margin-right: 6px;
                    }
                }
            }
        }
    }
</style>