<template>
    <div class="message-panel">
        <div class="message-list">
            <div class="message"
                v-for="(item, index) in state.messageList"
                :key="index">
                <div class="reply-user flex-start">
                    <img :src="item.replyAvatar" alt="">
                    <div class="name">{{ item.replyName }}</div>
                </div>
                <div class="reply-info">{{ item.replyComment }}</div>
                <div class="my-comment">我的评论：{{ item.myComment }}</div>
                <div class="bottom flex-between">
                    <div>{{ item.replyTime }}</div>
                    <div class="reply">
                        <i class="iconfont icon-news"></i>
                        回复
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { ref, reactive, defineComponent } from "vue";

    export default defineComponent({
        name: "MessagePanel",
        props: {
            limit: {
                type: Boolean,
                default: false
            }
        },
        setup(props) {
            let state = reactive({
                messageList: [
                    {
                        replyName: "落英缤纷",
                        replyAvatar: "https://img2.baidu.com/it/u=2286725608,1362072907&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
                        replyComment: "姐妹，我也是超喜欢这个角色的呜呜呜呜，知己呀姐妹五五呜呜呜呜呜呜呜",
                        replyTime: "01/12 12:34",
                        myComment: "没错，般若怎么能说，阿护心里第一的是权利呢?其实是你自己啊!如果般若，肯舍弃一点点权利的欲望的话，那阿护就能好过点了。但就是这么虐，我们才更喜欢这对。"
                    },
                    {
                        replyName: "落英缤纷",
                        replyAvatar: "https://img2.baidu.com/it/u=2286725608,1362072907&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
                        replyComment: "吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼",
                        replyTime: "01/12 12:34",
                        myComment: "俺也一样！"
                    },
                    {
                        replyName: "落英缤纷",
                        replyAvatar: "https://img2.baidu.com/it/u=2286725608,1362072907&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
                        replyComment: "吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼",
                        replyTime: "01/12 12:34",
                        myComment: "俺也一样！"
                    }
                ]
            });

            return {
                state,
            }
        }
    });
</script>

<style lang="scss" scoped>
    .message-panel {
        width: 100%;
        .message {
            padding: 8px 15px;
            border-top: 1px solid var(--borderColor);
            cursor: pointer;

            .reply-user {
                img {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    margin-right: 8px;
                }
                .name {
                    color: var(--stressColor);
                }
            }

            .reply-info {
                margin: 5px 0 5px 32px;
                color: var(--textColor);
            }

            .my-comment {
                padding: 4px;
                margin-left: 32px;
                color: var(--textColor);
                border-radius: 2px;
                background: #F5F5F5;
            }

            .bottom {
                color: var(--textColor);
                opacity: .5;
                margin: 5px 0 0 32px;

                .reply:hover {
                    opacity: 1;
                    color: var(--mainColor);
                }
            }

            &:hover {
                background: var(--hoverColor);
            }
        }
    }
</style>