<template>
    <div class="top-navbar-wrapper flex-end">
        <div class="message-wrapper">
            <i class="iconfont icon-message"></i>
        </div>
        <div class="user-wrapper flex">
            <img src="@/assets/image/myAvatar.jpg" alt="">
            <div class="name">言言花花</div>
            <i class="iconfont icon-arrowDown"></i>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
    .top-navbar-wrapper {
        width: 100%;
        height: 72px;
        padding-right: 30px;

        .message-wrapper {
            width: 36px;
            height: 36px;
            line-height: 36px;
            border-radius: 10px;
            margin-right: 20px;
            background: #FFFFFF;
            text-align: center;
            cursor: pointer;

            .icon-message {
                font-size: 20px;
            }

            &:hover {
                background: var(--mainColor);
            }
        }

        .user-wrapper {
            height: 36px;
            border-radius: 10px;
            background: #FFFFFF;
            padding: 0 8px;

            img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
            }

            .name {
                font-size: 12px;
                max-width: 100px;
                margin: 0 8px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .iconfont {
                font-size: 12px;
                transform: scale(0.9);
                cursor: pointer;
            }
        }
    }
</style>
