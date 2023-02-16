<template>
    <div class="top-navbar-wrapper flex-end">
        <el-dropdown ref="messageDropdown" trigger="click" :teleported="false" popper-class="message-wrapper" @visible-change="toggleMessage">
            <div class="icon-wrapper" :class="{ active: messageVisible }">
                <i class="iconfont icon-message"></i>
            </div>
            <template #dropdown>
                <div class="message-dropdown">
                    <div class="top flex-between">
                        <span class="name">回复消息</span>
                        <span class="all" @click="toAllMessage">查看全部</span>
                    </div>
                    <MessagePanel :limit="true"></MessagePanel>
                </div>
            </template>
        </el-dropdown>
        <div class="icon-wrapper">
            <i class="iconfont icon-sun"></i>
        </div>
        <div class="user-wrapper flex-center">
            <img :src="userInfo.avatar" alt="">
            <div class="name">{{ userInfo.name }}</div>
            <i class="iconfont icon-arrowDown"></i>
        </div>
    </div>
</template>

<script lang="ts">
    import { validURL } from "@/utils/validate";
    import { useUserStore } from '@/stores/user';
    import { ref, onMounted, defineComponent } from 'vue';
    import { useRouter } from 'vue-router';

    import MessagePanel from "@/components/MessagePanel.vue";

    export default defineComponent({
        name: "TopNavBar",
        setup() {
            const user = useUserStore();
            const { push } = useRouter();

            let userInfo = ref({} as any);
            let messageVisible = ref(false);
            let messageDropdown = ref<any | null>(null);

            function toAllMessage() {
                push("/message");
                messageDropdown.value?.handleClose();
            }

            function toggleMessage(value) {
                messageVisible.value = value;
            }
    
            onMounted(() => {
                let info = user.getInfo();
                info.avatar = validURL(info.avatar) ? info.avatar : `http://127.0.0.1:3000${info.avatar}`;
                userInfo.value = info;
            });

            return {
                userInfo,
                messageVisible,
                messageDropdown,
                toAllMessage,
                toggleMessage,
            }
        }
    });
</script>

<style lang="scss" scoped>
    .top-navbar-wrapper {
        width: 100%;
        height: 72px;
        padding-right: 30px;

        .icon-wrapper {
            width: 36px;
            height: 36px;
            line-height: 36px;
            border-radius: 10px;
            margin-right: 10px;
            background: var(--whiteColor);
            text-align: center;
            transition: all .2s ease;
            cursor: pointer;

            .iconfont {
                font-size: 18px;
                color: var(--stressColor);
                transition: all .2s ease;
            }

            &:hover,
            &.active {
                background: var(--activeColor);

                .iconfont {
                    color: var(--whiteColor);
                }
            }
        }

        .message-wrapper {
            max-height: 400px;
            border-radius: 6px;
            overflow: auto;

            .message-dropdown {
                width: 360px;

                .top {
                    padding: 10px 15px;
                    .name {
                        font-size: 14px;
                        color: var(--stressColor);
                    }
                    .all {
                        color: var(--textColor);
                        text-decoration: underline;
                        cursor: pointer;
                        &:hover {
                            color: var(--mainColor);
                        }
                    }
                }

                :deep(.message) {
                    &:last-child {
                        border-radius: 0 0 6px 6px;
                    }
                }
            }
        }

        .user-wrapper {
            height: 36px;
            border-radius: 10px;
            background: var(--whiteColor);
            padding: 0 8px;

            img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
            }

            .name {
                font-size: 12px;
                max-width: 80px;
                margin: 0 8px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .iconfont {
                transform: scale(0.9);
                cursor: pointer;
            }
        }
    }
</style>
