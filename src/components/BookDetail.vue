<template>
    <div class="book-detail-wrapper">
        <div class="back">
            <i class="iconfont icon-arrowLeft"></i>
            <span>返回</span>
        </div>
        <div class="book-detail">
            <div class="book-info">
                <img class="book-cover" src="@/assets/image/bookCover4.png" alt="">
                <div class="center-wrapper">
                    <div class="info-wrapper">
                        <div class="name">一只驯鹿的故事</div>
                        <div class="info">
                            <span>作者：埃尔</span>
                            <span>创作于2022.01.23</span>
                        </div>
                        <div class="info">
                            <span>阅读量：666</span>
                            <span>收藏量：6</span>
                            <span>评分：5.0</span>
                        </div>
                    </div>
                    <div class="button-wrapper">
                        <div class="button start">开始阅读</div>
                        <div class="button">加入书架</div>
                    </div>
                </div>
                <div class="reader">
                    <div class="text">他们也在读</div>
                    <div class="user-list">
                        <img class="user user1" src="@/assets/image/bookCover4.png" alt="">
                        <img class="user user2" src="@/assets/image/bookCover4.png" alt="">
                        <img class="user user3" src="@/assets/image/bookCover4.png" alt="">
                        <div class="user user-more">+6</div>
                    </div>
                </div>
            </div>
            <div class="book-desc">
                简介：<br />
                下面我们会从不同维度分析一下这个APP的社交分享功能设计，看看这里面有哪些值得探讨的地方。
                用户分享内容到社交媒体或好友，不应该是一种粗暴的强制行为，我们应该在保证产品本身内容有吸引力的核心前提下，仔细揣摩用户心理，结合产品本身的特色，在不同情境下提供给用户最合适的分享内容。
            </div>
            <div class="tab-wrapper">
                <div class="tab catalog">章节目录</div>
                <div class="tab select">评论</div>
            </div>
            <!-- 章节目录列表 -->
            <div class="catalog-list">
                <div class="catalog-wrapper">
                    <div class="catalog">
                        <div class="chapter">第 1 章</div>
                        <div class="name">你说你是谁？</div>
                        <div class="tag unread">未读</div>
                    </div>
                </div>
            </div>
            <!-- 评论 -->
            <div class="comment-wrapper">
                <div class="input-wrapper">
                    <textarea class="input" maxlength="300" placeholder="请输入评论内容"></textarea>
                    <span class="submit">发布</span>
                </div>
                <div class="comment-list">
                    <div class="comment-item">
                        <div class="top-comment">
                            <img class="user-avatar" src="@/assets/image/bookCover4.png" alt="">
                            <div class="comment-info">
                                <div class="user-info">
                                    <div class="name">用户姓名</div>
                                    <div class="right">
                                        <span class="comment-date">6月4日 12:34</span>
                                        <span>来自海南</span>
                                    </div>
                                </div>
                                <div class="comment">
                                    尤其是刚上线的产品，很难通过产品的内部体系来实现快速的用户增长，所以会更加依赖于分享来达到广泛的传播，获取目标用户。所以监听用户的截图操作，提示用户进行分享，既缩短了以前分享截图的操作路径，避免了在之前长路径中的行为流失（比如截图完成后忘记分享或觉得麻烦放弃分享等等），也让用户觉得更加贴心。
                                </div>
                                <div class="operation">
                                    <span class="add-comment">评论</span>
                                    <span>点赞 66</span>
                                </div>
                                <div class="more-comment">查看6条回复></div>
                            </div>
                        </div>
                        <div class="top-comment">
                            <img class="user-avatar" src="@/assets/image/bookCover4.png" alt="">
                            <div class="comment-info">
                                <div class="user-info">
                                    <div class="name">用户姓名</div>
                                    <div class="right">
                                        <span class="comment-date">6月4日 12:34</span>
                                        <span>来自海南</span>
                                    </div>
                                </div>
                                <div class="comment">
                                    尤其是刚上线的产品，很难通过产品的内部体系来实现快速的用户增长，所以会更加依赖于分享来达到广泛的传播，获取目标用户。所以监听用户的截图操作，提示用户进行分享，既缩短了以前分享截图的操作路径，避免了在之前长路径中的行为流失（比如截图完成后忘记分享或觉得麻烦放弃分享等等），也让用户觉得更加贴心。
                                </div>
                                <div class="operation">
                                    <span class="add-comment">评论</span>
                                    <span>点赞 66</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'BookDetail',
    })
</script>

<style lang="less" scoped>
    .book-detail-wrapper {
        .back {
            color: var(--mainColor);
            margin-bottom: 20px;
            cursor: pointer;

            .iconfont {
                font-size: 14px;
                margin-right: 8px;
            }
        }

        .book-detail {
            width: 100%;
            min-width: 640px;
            height: calc(100% - 42px);
            border-radius: 10px;
            background: #FFFFFF;
            padding: 30px;
            overflow: hidden auto;

            .book-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;

                .book-cover {
                    width: 200px;
                    height: 240px;
                    object-fit: cover;
                    border-radius: 20px;
                }

                .center-wrapper {
                    width: 300px;

                    .info-wrapper {
                        padding: 30px 20px;
                        margin-bottom: 20px;
                        border-radius: 16px;
                        background: #f6fcf2;

                        .name {
                            font-size: 20px;
                            font-weight: bold;
                        }

                        .info {
                            display: flex;
                            justify-content: space-between;
                            margin-top: 10px;
                            span {
                                color: #737a74;
                            }
                        }
                    }

                    .button-wrapper {
                        .button {
                            display: inline-block;
                            width: 100px;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            color: #FFFFFF;
                            border-radius: 14px;
                            background: #8CAB91;
                            box-shadow: 0 4px 10px 0 rgba(140, 171, 145, .5);
                            cursor: pointer;
                            &.start {
                                margin-right: 20px;
                            }
                        }
                    }
                }

                .reader {
                    width: 88px;

                    .text {
                        font-size: 12px;
                        color: #737a74;
                        margin-bottom: 8px;
                    }

                    .user-list {
                        position: relative;

                        .user {
                            position: absolute;
                            top: 0;
                            width: 24px;
                            height: 24px;
                            font-size: 12px;
                            color: #FFFFFF;
                            text-align: center;
                            line-height: 24px;
                            border-radius: 50%;
                            border: 2px solid #FFFFFF;
                            image-rendering: -webkit-optimize-contrast;
                        }
                        .user1 {
                            position: relative;
                        }
                        .user2 {
                            left: 20px;
                        }
                        .user3 {
                            left: 40px;
                        }
                        .user-more {
                            left: 60px;
                            background: #8CAB91;
                        }
                    }
                }
            }

            .book-desc {
                color: #737a74;
                line-height: 1.5;
                font-size: 18px;
            }

            .tab-wrapper {
                margin: 20px 0;
                .tab {
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 15px;
                    color: #8CAB91;
                    border-radius: 8px;
                    background: #F5FAF1;
                    cursor: pointer;
                    &.catalog {
                        margin-right: 10px;
                    }
                    &.select {
                        color: #FFFFFF;
                        background: #8CAB91;
                    }
                }
            }

            .catalog-list {
                display: flex;
                flex-wrap: wrap;
                width: calc(100% + 20px);

                .catalog-wrapper {
                    display: flex;
                    width: 25%;
                    height: 108px;
                    margin-bottom: 20px;
                    border-right: 20px solid #FFFFFF;
                    box-sizing: border-box;

                    .catalog {
                        position: relative;
                        width: calc(100% - 20px);
                        height: calc(100% - 20px);
                        padding: 10px;
                        border-radius: 6px;
                        background: #F5FAF1;
                        cursor: pointer;

                        .chapter {
                            color: #bdbdbd;
                            font-size: 12px;
                            margin-bottom: 4px;
                        }

                        .name {
                            color: #737a74;
                            font-size: 14px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        .tag {
                            position: absolute;
                            right: 10px;
                            bottom: 10px;
                            width: 50px;
                            height: 24px;
                            font-size: 12px;
                            line-height: 24px;
                            text-align: center;
                            border-radius: 6px;

                            &.unread {
                                color: #bcbcc2;
                                background: rgba(188, 188, 194, 0.25);
                            }
                            &.reading {
                                color: #ffbd21;
                                background: rgba(255, 189, 33, 0.25);
                            }
                            &.read {
                                color: #00d097;
                                background: rgba(0, 208, 151, 0.25);
                            }
                        }
                    }
                }
            }

            .comment-wrapper {
                .input-wrapper {
                    position: relative;
                    width: 100%;
                    height: auto;
                    .input {
                        width: 100%;
                        height: 90px;
                        color: #737a74;
                        padding: 10px 15px 30px;
                        border-radius: 10px;
                        resize: none;
                        outline: none;
                        border: 1px solid transparent;
                        background: #F6FCF2;
                        &:focus {
                            border-color: #8cab91;
                        }
                        &::placeholder {
                            color: #bdbdbd;
                        }
                    }

                    .submit {
                        position: absolute;
                        bottom: 10px;
                        right: 20px;
                        font-size: 14px;
                        color: #737a74;
                        cursor: pointer;
                        &:hover {
                            color: #8cab91;
                        }
                    }
                }

                .comment-list {
                    .comment-item {
                        .user-avatar {
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                            image-rendering: -webkit-optimize-contrast;
                        }

                        .comment-info {
                            width: calc(100% - 36px);
                            margin-left: 15px;

                            .user-info {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;            
                                height: 36px;
                                margin-bottom: 10px;

                                .right {
                                    font-size: 12px;
                                    color: #BDBDBD;
                                    .comment-date {
                                        margin-right: 6px;
                                    }
                                }
                            }

                            .operation {
                                display: flex;
                                justify-content: flex-end;
                                font-size: 14px;
                                cursor: pointer;
                                margin: 4px 0;
                                .add-comment {
                                    margin-right: 6px;
                                }
                            }

                            .more-comment {
                                font-size: 14px;
                                cursor: pointer;
                            }
                        }

                        .top-comment {
                            display: flex;
                            width: 100%;
                            margin-top: 20px;
                            padding-bottom: 20px;
                            border-bottom: 1px solid rgba(125, 133, 146, 0.1);
                        }
                    }
                }
            }
        }
    }
</style>