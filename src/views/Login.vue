<template>
    <div class="login-view">
        <div class="main-wrapper">
            <div class="logo">
                <img src="@/assets/image/logo.svg" alt="悦阅" />
                悦阅
            </div>
            <div class="inner-wrapper">
                <div class="reset-wrapper" v-if="resetData.show">
                    <div class="tip1">重置密码</div>
                    <div class="tip2">请输入手机号或邮箱</div>
                    <div class="login-animation1">
                        <el-input v-model="resetData.account"></el-input>
                        <div class="send-wrapper">
                            <el-button type="primary">发送</el-button>
                        </div>
                        <div class="resend">
                            未收到验证码?<span>重新发送</span>
                        </div>
                    </div>
                    <div class="code-wrapper">
                        <el-form label-position="top">
                            <el-form-item label="验证码" class="code login-animation2">
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-input v-model="resetData.verifyCode" maxlength="1"></el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-input></el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-input></el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-input></el-input>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="新的密码" class="login-animation3">
                                <el-input
                                    show-password
                                    v-model="resetData.password1"
                                    placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item label="重新输入" class="login-animation4">
                                <el-input
                                    show-password
                                    v-model="resetData.password2"
                                    placeholder="请重新输入密码"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-button type="primary">确定</el-button>
                    <div class="change-type" @click="changeType">返回登录</div>
                </div>
                <div class="sign-wrapper" v-else>
                    <div class="tip1">{{ state.isLogin ? "登录账号" : "注册账号" }}</div>
                    <div class="tip2">请输入{{ state.isLogin ? "账号&密码" : "用户名&账号&密码" }}</div>
                    <el-form label-position="top" v-if="state.isLogin">
                        <el-form-item label="账号" class="login-animation1">
                            <el-input
                                ref="accountInput"
                                v-model="state.account"
                                :class="{ 'error': !state.accountCorrect && state.account.length }"
                                placeholder="请输入手机号或邮箱"
                                @blur="checkAccount"
                                @keyup.enter="handleEnter('password')"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" class="login-animation2">
                            <el-input
                                ref="passwordInput"
                                show-password
                                v-model="state.password"
                                :class="{ 'error': !state.accountCorrect && state.account.length }"
                                placeholder="请输入密码"
                                @keyup.enter="clickSubmitBtn"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form label-position="top" v-else>
                        <el-form-item label="用户名" class="login-animation1">
                            <el-input
                                v-model="state.username"
                                :class="{ 'error': state.username.length && !usernameCorrect }"
                                placeholder="请输入用户名"
                                @keyup.enter="handleEnter('account')"></el-input>
                        </el-form-item>
                        <el-form-item label="账号" class="login-animation2">
                            <el-input
                                ref="accountInput"
                                v-model="state.account"
                                :class="{ 'error': !state.accountCorrect && state.account.length }"
                                placeholder="请输入手机号或邮箱"
                                @blur="checkAccount"
                                @keyup.enter="handleEnter('password')"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" class="login-animation3">
                            <el-input
                                ref="passwordInput"
                                show-password
                                v-model="state.password"
                                :class="{ 'error': !state.accountCorrect && state.account.length }"
                                placeholder="请输入密码"
                                @keyup.enter="clickSubmitBtn"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="tip-wrapper flex-between" v-if="state.isLogin">
                        <div class="remember flex-center">
                            <el-checkbox v-model="state.remember" label="记住我" />
                        </div>
                        <div class="forget" @click="resetData.show = true">忘记密码?</div>
                    </div>
                    <el-button type="primary" @click="clickSubmitBtn">{{ state.isLogin ? "登录" : "注册" }}</el-button>
                    <div class="change-type" @click="changeType">{{ state.isLogin ? "注册" : "登录" }}账号</div>
                    <div class="split-wrapper">
                        <div class="line"></div>
                        <div class="text">或者</div>
                        <div class="line"></div>
                    </div>
                    <div class="quick-method flex-center">
                        <div class="icon-wrapper">
                            <i class="iconfont icon-qq"></i>
                        </div>
                        <div class="icon-wrapper">
                            <i class="iconfont icon-wechat"></i>
                        </div>
                        <div class="icon-wrapper">
                            <i class="iconfont icon-weibo"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, onMounted, computed, ref } from "vue";
    import { registerApi } from "@/api/user";
    import { validatePhone, validateEmail } from "@/utils/validate";
    import { useUserStore } from "@/stores/user";
    import { useRouter } from "vue-router";
    import { ElMessage } from 'element-plus';

    let state = reactive({
        isLogin: true,
        remember: false,
        username: "",
        // account: "",
        // password: "",
        account: "a@a.cn",
        password: "666666",
        nameCorrect: false,
        accountCorrect: false,
        passwordCorrect: false,
        showReset: false,
    });

    let resetData = reactive({
        show: false,
        account: "",
        verifyCode: "",
        password1: "",
        password2: "",
    });
    
    const { push } = useRouter();
    const user = useUserStore();
    const accountInput = ref<HTMLInputElement | null>(null);
    const passwordInput = ref<HTMLInputElement | null>(null);
    const usernameCorrect = computed(() => {
        return state.username.length && state.username.length <= 6;
    });
    const passwordCorrect = computed(() => {
        return state.password.length >= 6 && state.password.length <= 12;
    });

    function changeType() {
        if (resetData.show) {
            resetData.show = false;
        } else {
            state.isLogin = !state.isLogin;
            state.account = "";
            state.password = "";
        }
    }

    function checkAccount() {
        state.accountCorrect =  validatePhone(state.account) || validateEmail(state.account);
    }

    function clickSubmitBtn() {
        checkAccount();
        if (!state.accountCorrect) {
            return ElMessage.error("请输入正确的账号~");
        }
        if (!passwordCorrect) {
            return ElMessage.error("密码需大于6位且小于12位~");
        }

        if (state.isLogin) {
            // 登录
            user.login(state.account, state.password).then(() => {
                ElMessage({
                    message: "登录成功~",
                    type: "success",
                    duration: 1500
                });
                push("/home");
            }).catch(err => {
                ElMessage.error(err || "账号或密码错误~");
            });
        } else {
            if (!usernameCorrect) {
                return ElMessage.error("用户名不能大于6位且不能为空~");
            }

            // 注册
            registerApi({
                name: state.username,
                account: state.account,
                password: state.password
            }).then(res => {
                if (res.status == 1) {
                    ElMessage.success("注册成功，请登录~");
                } else {
                    ElMessage.error("注册失败，请稍后重试~");
                }
            });
        }
    }

    function handleEnter(type) {
        if (type == "account") {
            accountInput.value?.focus();
        } else {
            passwordInput.value?.focus();
        }
    }

    onMounted(() => {
    });
</script>

<style lang="scss" scoped>
    .login-view {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: linear-gradient(to left, #e6f6da, #ebf0e8, var(--whiteColor));

        .main-wrapper {
            .logo {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 30px;
                font-size: 18px;
                color: #000000;
                img {
                    width: 38px;
                    height: 38px;
                    margin-right: 10px;
                }
            }
        }

        .inner-wrapper {
            position: relative;
            width: 450px;
            padding: 40px 30px;
            color: #33303C;
            border-radius: 16px;
            background-color: var(--whiteColor);
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

            @for $i from 1 through 4 {
                .login-animation#{$i} {
                    opacity: 0;
                    animation-name: fadeToTop;
                    animation-duration: 0.5s;
                    animation-fill-mode: forwards;
                    animation-delay: calc($i/10) + s;
                }
            }

            .tip1 {
                color: #2B2B2B;
                font-size: 24px;
                font-weight: 700;
                text-align: center;
                letter-spacing: 2px;
            }

            .tip2 {
                font-size: 14px;
                color: #898989;
                text-align: center;
                margin: 10px 0 25px 0;
            }

            :deep(.el-input) {
                input {
                    padding: 5px 8px;
                    border-radius: 10px;
                    box-sizing: content-box;
    
                    &::placeholder {
                        color: var(--dimColor);
                    }
    
                    &.error {
                        border-color: red;
                    }
                }
            }

            :deep(.el-button) {
                width: 100%;
                margin: 5px 0 20px;
                height: 42px;
                border-radius: 8px;
                font-weight: 600;
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
        }
        
        .sign-wrapper {
            :deep(.el-form) {
                label {
                    color: #2B2B2B;
                }
            }

            .tip-wrapper {
                margin-bottom: 15px;
                .remember {
                    color: #A8A6B0;
                    input {
                        cursor: pointer;
                        margin-right: 6px;
                    }
                }
                .forget {
                    font-size: 14px;
                    color: var(--mainColor);
                    &:hover {
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }
            }
    
            .split-wrapper {
                display: flex;
                align-items: center;
                margin: 20px 0;
                .line {
                    flex: 1;
                    height: 1px;
                    background: rgba(70, 92, 90, 0.1);
                }
                .text {
                    padding: 0 10px;
                    font-size: 14px;
                }
            }
    
            .quick-method {
                .icon-wrapper {
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    border-radius: 50%;
                    margin-right: 15px;
                    background: rgba(140, 171, 145, .1);
                    border: 1px solid rgba(140, 171, 145, .3);
                    transition: all .4s ease;
                    cursor: pointer;
                    &:last-of-type {
                        margin-right: 0;
                    }
                    i {
                        font-size: 16px;
                        color: var(--mainColor);
                        transition: all .4s ease;
                    }
                    &:hover {
                        background: var(--mainColor);
                        i {
                            color: var(--whiteColor);
                        }
                    }
                }
            }
        }

        .reset-wrapper {
            .send-wrapper {
                text-align: right;
                margin: 10px 0;
                button {
                    width: auto;
                    padding: 5px 20px;
                    margin: 0;
                    height: 36px;
                    border-radius: 8px;
                    font-size: 14px;
                }
            }

            .resend {
                font-size: 14px;
                span {
                    padding-left: 4px;
                    color: var(--el-color-danger);
                    text-decoration: underline;
                    cursor: pointer;
                    &:hover {
                        text-decoration: none;
                    }
                }
            }

            .code-wrapper {
                margin: 20px 0;

                .code {
                    :deep(.el-input) {
                        input {
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
</style>