<template>
    <div class="bookcase-view">
        <SelectBar class="left-bar hidden-scrollbar" topNav="书柜文件夹" :navList="state.navList"></SelectBar>
        <div class="right-content" v-if="!state.showBookDetail">
            <div class="top-wrapper">
                <div class="operation-wrapper">
                    <div class="button confirm"></div>
                    <div class="button cancel"></div>
                </div>
                <div class="filter-wrapper flex-center">
                    <div class="button-wrapper flex-center">
                        <el-tooltip content="最近阅读" placement="top" effect="customized-top">
                            <i class="iconfont icon-clock"></i>
                        </el-tooltip>
                    </div>
                    <div class="button-wrapper flex-center selected">
                        <el-tooltip content="热度" placement="top" effect="customized-top">
                            <i class="iconfont icon-hot"></i>
                        </el-tooltip>
                    </div>
                    <div class="button-wrapper flex-center">
                        <el-tooltip content="收藏量" placement="top" effect="customized-top">
                            <i class="iconfont icon-like"></i>
                        </el-tooltip>
                    </div>
                    <div class="button-wrapper flex-center selected">
                        <el-tooltip content="升序" placement="top" effect="customized-top">
                            <i class="iconfont icon-up"></i>
                        </el-tooltip>
                    </div>
                </div>
                <div class="create-folder flex-center">
                    <span class="icon">+</span>
                    <span class="text">新建文件夹</span>
                </div>
            </div>
            <div class="book-wrapper">
                <el-row :gutter="20">
                    <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6" v-for="(item, index) in state.bookList" :key="index" @click="toggleBookDetail(true)">
                        <BookCard :bookInfo="item"></BookCard>
                    </el-col>
                </el-row>
            </div>
        </div>
        <BookDetail class="book-detail" @back="toggleBookDetail(false)" v-else></BookDetail>
    </div>
</template>

<script lang="ts" setup>
    import { reactive } from "vue";
    import BookCard from '@/components/BookCard.vue';
    import SelectBar from '@/components/Navbar/SelectNavbar.vue';
    import BookDetail from '@/components/BookDetail.vue';

    const state = reactive({
        bookList: [
            { name: "星汉灿烂", author: "小猪佩奇", desc: "这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字", cover: "https://img0.baidu.com/it/u=1277693020,971471139&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500" },
            { name: "星汉灿烂", author: "小猪佩奇", desc: "这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字", cover: "https://img0.baidu.com/it/u=1277693020,971471139&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500" },
            { name: "我和我的祖国", author: "小猪佩奇", desc: "这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字", cover: "https://img0.baidu.com/it/u=1277693020,971471139&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500" },
            { name: "我和我的祖国", author: "小猪佩奇", desc: "这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字", cover: "https://img0.baidu.com/it/u=1277693020,971471139&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500" },
            { name: "阳光下的一粒坚强的尘埃", author: "无名", desc: "这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字", cover: "https://img0.baidu.com/it/u=1277693020,971471139&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500" },
            { name: "阳光下的一粒坚强的尘埃", author: "无名", desc: "这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字", cover: "https://img0.baidu.com/it/u=1277693020,971471139&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500" },
            { name: "阳光下的一粒坚强的尘埃", author: "无名", desc: "这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字", cover: "https://img0.baidu.com/it/u=1277693020,971471139&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500" },
            { name: "阳光下的一粒坚强的尘埃", author: "无名", desc: "这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字", cover: "https://img0.baidu.com/it/u=1277693020,971471139&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500" }
        ],
        navList: [
            { id: 2, name: "推荐", number: "3", createDate: "2022/04/23" },
            { id: 4, name: "文学相关", number: "4", createDate: "2022/04/23" },
            { id: 6, name: "学习相关", number: "5", createDate: "2022/04/23" },
            { id: 7, name: "科普读物", number: "6", createDate: "2022/02/28" },
            { id: 11, name: "诗歌", number: "7", createDate: "2021/05/07" }
        ],
        showBookDetail: false,
    });

    function toggleBookDetail(isShow) {
        state.showBookDetail = isShow;
    }
</script>

<style lang="scss" scoped>
    .bookcase-view {
        display: flex;
        width: 100%;
        height: 100%;

        .left-bar {
            height: calc(100% - 20px);
        }
        
        .right-content {
            margin-left: 20px;
            width: calc(100% - 250px);

            .top-wrapper {
                position: relative;
                margin: 0 30px 20px 0;

                .operation-wrapper {
                    position: absolute;
                    top: 2px;
                    left: 0;

                    .button {
                        position: relative;
                        display: inline-block;
                        width: 76px;
                        height: 36px;
                        background: var(--whiteColor);
                        border-radius: 24px;
                        cursor: pointer;

                        &.confirm {
                            margin-right: 10px;

                            &::before {
                                content: '确定';
                                position: absolute;
                                top: 4px;
                                left: 4px;
                                width: 68px;
                                height: 28px;
                                line-height: 28px;
                                text-align: center;
                                color: var(--stressColor);
                                font-size: 14px;
                                border-radius: 24px;
                                background: var(--hoverColor);
                                z-index: 6;
                            }
                        }

                        &.cancel::before {
                            content: '取消';
                            position: absolute;
                            top: 4px;
                            left: 4px;
                            width: 68px;
                            height: 28px;
                            line-height: 28px;
                            text-align: center;
                            color: var(--stressColor);
                            font-size: 14px;
                            border-radius: 24px;
                            background: var(--hoverColor);
                            z-index: 6;
                        }
                    }
                }

                .filter-wrapper {
                    position: relative;
                    height: 40px;

                    .button-wrapper {
                        width: 36px;
                        height: 36px;
                        border-radius: 10px;
                        margin-right: 10px;
                        background: var(--whiteColor);
                        border: 1px solid transparent;
                        overflow: hidden;
                        cursor: pointer;

                        .iconfont {
                            padding: 8px;
                            font-size: 14px;
                        }

                        &:hover,
                        &.selected {
                            background: var(--activeColor);
                            .iconfont {
                                color: var(--whiteColor);
                            }
                        }

                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }

                .create-folder {
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 40px;
                    color: var(--whiteColor);
                    border-radius: 10px;
                    padding: 0 24px;
                    background: var(--activeColor);
                    box-shadow: 2px 6px 8px var(--borderColor);
                    cursor: pointer;

                    .icon {
                        font-size: 20px;
                        color: var(--stressColor);
                    }

                    .text {
                        margin-left: 10px;
                        color: var(--stressColor);
                    }
                }
            }

            .book-wrapper {
                width: 100%;
                height: calc(100% - 78px);
                overflow: auto;

                :deep(.el-row) {
                    width: 100%;
                }

                .book-card {
                    margin-bottom: 20px;
                }
            }
        }

        .book-detail {
            margin: 0 20px 0 20px;
            width: calc(100% - 250px);
            height: calc(100% - 20px);
        }
    }
</style>