<template>
    <div class="message-wrapper" :class="{ 'message-view': state.isPage, 'message-panel': !state.isPage }">
        <div class="message-list">
            <div class="message flex"
                v-for="(item, index) in state.messageList"
                :key="index">
                <img :src="item.replyAvatar" alt="">
                <div class="right">
                    <div class="reply-user">{{ item.replyName }}</div>
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
                <div class="unread" v-if="item.unread"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { reactive, defineComponent, onMounted } from "vue";

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
                isPage: false,
                messageList: [
                    {
                        unread: true,
                        replyName: "落英缤纷",
                        replyAvatar: "https://img2.baidu.com/it/u=2286725608,1362072907&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
                        replyComment: "姐妹，我也是超喜欢这个角色的呜呜呜呜，知己呀姐妹五五呜呜呜呜呜呜呜",
                        replyTime: "01/12 12:34",
                        myComment: "没错，般若怎么能说，阿护心里第一的是权利呢?其实是你自己啊!如果般若，肯舍弃一点点权利的欲望的话，那阿护就能好过点了。但就是这么虐，我们才更喜欢这对。"
                    },
                    {
                        unread: false,
                        replyName: "落英缤纷",
                        replyAvatar: "https://img2.baidu.com/it/u=2286725608,1362072907&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
                        replyComment: "吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼",
                        replyTime: "01/12 12:34",
                        myComment: "俺也一样！"
                    },
                    {
                        unread: false,
                        replyName: "落英缤纷",
                        replyAvatar: "https://img2.baidu.com/it/u=2286725608,1362072907&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
                        replyComment: "吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼",
                        replyTime: "01/12 12:34",
                        myComment: "俺也一样！"
                    }
                ]
            });

            onMounted(() => {
                state.isPage = !props.limit;
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
            position: relative;
            padding: 8px 15px;
            transition: all .4s ease;
            border-top: 1px solid var(--borderColor);
            cursor: pointer;

            img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin-right: 8px;
            }

            .right {
                flex: 1;

                .reply-user {
                    margin: 2px 0;
                    color: var(--stressColor);
                }
    
                .reply-info {
                    margin: 5px 0;
                    color: var(--textColor);
                }
    
                .my-comment {
                    padding: 4px;
                    color: var(--textColor);
                    border-radius: 2px;
                    background: var(--greyColor);
                }
    
                .bottom {
                    color: var(--dimColor);
                    margin-top: 5px;
    
                    .reply:hover {
                        color: var(--mainColor);
                    }
                }
            }

            .unread {
                position: absolute;
                right: 20px;
                top: 15px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: var(--dangerColor);
            }

            &:hover {
                background: var(--hoverColor);
            }
        }
    }

    .message-view {
        width: 100%;
        height: 100%;
        padding-right: 20px;
        overflow: hidden auto;

        .message-list {
            padding: 20px 0;
            margin-bottom: 20px;
            border-radius: 10px;
            background: var(--whiteColor);

            .message {
                position: relative;
                padding: 20px;
                border-bottom: 1px solid var(--borderColor);
                transition: all .4s ease;
                cursor: pointer;

                img {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    margin-right: 20px;
                }

                .right {
                    flex: 1;

                    .reply-user {
                        margin: 8px 0;
                        color: var(--stressColor);
                    }
        
                    .reply-info {
                        margin: 15px 0;
                        color: var(--textColor);
                    }
        
                    .my-comment {
                        padding: 10px;
                        color: var(--textColor);
                        border-radius: 8px;
                        background: var(--greyColor);
                    }
        
                    .bottom {
                        color: var(--dimColor);
                        margin-top: 15px;
        
                        .reply {
                            .iconfont {
                                font-size: 14px;
                            }
                            &:hover {
                                color: var(--mainColor);
                            }
                        }
                    }
                }

                .unread {
                    position: absolute;
                    right: 30px;
                    top: 32px;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--dangerColor);
                }

                &:hover {
                    background: var(--hoverColor);
                }

                &:last-child {
                    border: none;
                }
            }
        }
    }
</style>