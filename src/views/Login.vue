<template>
    <div class="login-view">
        <div class="left-wrapper">
            <img class="logo" src="@/assets/image/logo.svg" alt="">
            <div class="text">请尽情徜徉在知识的海洋吧！知识就像海洋，只有意志坚定的人才能到达彼岸！</div>
            <img class="banner" src="@/assets/image/reading2.svg" alt="">
        </div>
        <div class="right-wrapper">
            <div class="name">{{ isLogin ? '登录' : '注册' }}</div>
            <div class="quick-method-wrapper">
                <div class="wechat quick-btn flex">
                    <svg class="svg-icon" aria-hidden="true">
                        <use xlink:href="#icon-wechat"></use>
                    </svg>
                    <span>{{ isLogin ? '微信登录' : '微信注册' }}</span>
                </div>
                <div class="qq quick-btn flex">
                    <svg class="svg-icon" aria-hidden="true">
                        <use xlink:href="#icon-qq"></use>
                    </svg>
                    <span>{{ isLogin ? 'QQ登录' : 'QQ注册' }}</span>
                </div>
            </div>
            <div class="split">-或者-</div>
            <div class="form-area">
                <input type="text" v-if="!isLogin" class="form-item account" placeholder="请输入用户名">
                <input type="text" class="form-item email" placeholder="请输入邮箱">
                <input type="password" class="form-item password" placeholder="请输入密码">
            </div>
            <div class="submit-btn">{{ isLogin ? '登录账号' : '创建账号' }}</div>
            <div class="tip-wrapper flex">
                <span @click="changeType">{{ isLogin ? '注册' : '登录' }}</span>
                <span class="forget" v-if="!isLogin">忘记密码</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, reactive, onMounted } from 'vue';

    let isLogin = ref(true);

    function changeType() {
        isLogin.value = !isLogin.value;
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