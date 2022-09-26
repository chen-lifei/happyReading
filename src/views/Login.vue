<template>
    <div class="login-view">
        <div class="left-wrapper">
            <img class="logo" src="@/assets/image/logo.svg" alt="">
            <div class="text">请尽情徜徉在知识的海洋吧！知识就像海洋，只有意志坚定的人才能到达彼岸！</div>
            <img class="banner" src="@/assets/image/reading2.svg" alt="">
        </div>
        <div class="right-wrapper">
            <div class="name">{{ state.isLogin ? '登录' : '注册' }}</div>
            <div class="quick-method-wrapper">
                <div class="wechat quick-btn flex">
                    <svg class="svg-icon" aria-hidden="true">
                        <use xlink:href="#icon-wechat"></use>
                    </svg>
                    <span>{{ state.isLogin ? '微信登录' : '微信注册' }}</span>
                </div>
                <div class="qq quick-btn flex">
                    <svg class="svg-icon" aria-hidden="true">
                        <use xlink:href="#icon-qq"></use>
                    </svg>
                    <span>{{ state.isLogin ? 'QQ登录' : 'QQ注册' }}</span>
                </div>
            </div>
            <div class="split">-或者-</div>
            <div class="form-area">
                <input type="text" v-if="!state.isLogin" v-model="state.username" class="form-item" :class="{ 'error': state.username.length && !usernameCorrect }" placeholder="请输入用户名">
                <input type="text" class="form-item" :class="{ 'error': !state.accountCorrect && state.account.length  }" v-model="state.account" placeholder="请输入手机号或邮箱" @blur="checkAccount">
                <input type="password" class="form-item" :class="{ 'error': state.password.length && !passwordCorrect  }" v-model="state.password" placeholder="请输入密码">
            </div>
            <div class="submit-btn" @click="clickSubmitBtn()">{{ state.isLogin ? '登录账号' : '创建账号' }}</div>
            <div class="tip-wrapper flex">
                <span @click="changeType">{{ state.isLogin ? '注册' : '登录' }}</span>
                <span class="forget" v-if="!state.isLogin">忘记密码</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, reactive, onMounted, computed } from 'vue';
    import { loginApi, registerApi } from '@/api/user';
    import { validatePhone, validateEmail } from '@/utils/validate';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { key } from '@/store';

    let state = reactive({
        isLogin: true,
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
            loginApi({
                account: state.account,
                password: state.password
            }).then(res => {
                let { data } = res;
                console.log(data);
                if (data.status == 1) {
                    push('/home');
                    store.commit('SET_USERINFO', data.result);
                } else {
                    window.alert('账号或密码输入错误，登录失败');
                }
            })
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
        width: 100%;
        height: 100%;
        background: var(--mainColor);

        .left-wrapper {
            position: relative;
            width: 35%;

            .logo {
                position: absolute;
                left: 20px;
                top: 20px;
                width: 60px;
                height: 60px;
            }

            .text {
                position: absolute;
                top: 120px;
                left: 28px;
                width: calc(100% - 60px);
                word-spacing: 10px;
                font-size: 20px;
                line-height: 2;
                color: #FFFFFF;
            }

            .banner {
                position: absolute;
                top: 30%;
                left: 30%;
                width: 90%;
            }
        }

        .right-wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding: 0 16%;
            width: 65%;
            background: #FFFFFF;
            border-radius: 30px 0 0 30px;

            .name {
                font-size: 30px;
                font-weight: bold;
                margin-bottom: 40px;
                color: var(--stressColor);
            }

            .quick-method-wrapper {
                display: flex;

                .quick-btn {
                    height: 48px;
                    padding: 0 12px;
                    border: 1px solid var(--activeColor);
                    border-radius: 5px;
                    cursor: pointer;

                    .svg-icon {
                        margin-right: 10px;
                    }

                    &.wechat {
                        margin-right: 20px;
                    }
                }
            }

            .split {
                width: 100%;
                text-align: center;
                margin: 30px 0;
            }
            .form-area {
                .form-item {
                    width: 100%;
                    height: 38px;
                    font-size: 16px;
                    padding: 10px 0;
                    margin-bottom: 30px;
                    outline: none;
                    border: 1px solid transparent;
                    border-bottom-color: var(--activeColor);

                    &::placeholder {
                        color: var(--dimColor);
                    }

                    &.error {
                        border-bottom-color: red;
                    }
                }
            }
            .submit-btn {
                width: 100%;
                height: 48px;
                line-height: 48px;
                border-radius: 8px;
                color: #FFFFFF;
                margin: 20px 0;
                text-align: center;
                background: var(--mainColor);
                cursor: pointer;
            }

            .tip-wrapper {
                width: 100%;
                span {
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                        color: var(--mainColor);
                    }
                }
                .forget {
                    margin-left: 20px;
                }
            }
        }
    }
</style>