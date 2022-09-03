<template>
    <div class="bookcase-view">
        <SelectBar class="left-bar hidden-scrollbar" topNav="书柜文件夹" :navList="navList"></SelectBar>
        <div class="right-content">
            <div class="top-wrapper">
                <div class="operation-wrapper">
                    <div class="button confirm"></div>
                    <div class="button cancel"></div>
                </div>
                <div class="filter-wrapper">
                    <div class="read-button button-wrapper">
                        <i class="iconfont icon-remove"></i>
                    </div>
                    <div class="hot-button button-wrapper selected">
                        <i class="iconfont icon-delete"></i>
                    </div>
                    <div class="like-button button-wrapper">
                        <!-- icon-tile -->
                        <i class="iconfont icon-list"></i>
                    </div>
                    <div class="filter-button button-wrapper selected">
                        <i class="iconfont icon-up"></i>
                    </div>
                </div>
                <div class="create-folder">
                    <span class="icon">+</span>
                    <span class="text">新建文件夹</span>
                </div>
            </div>
            <div class="book-wrapper">
                <div class="book-item" v-for="(item, index) in bookList" :key="index">
                    <BookCard :bookInfo="item"></BookCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { toRefs, reactive, defineComponent } from "vue";
    import BookCard from '@/components/BookCard.vue';
    import SelectBar from '@/components/Navbar/SelectNavbar.vue';

    export default defineComponent({
        name: 'Bookcase',
        components: {
            BookCard,
            SelectBar
        },
        setup() {
            const state = reactive({
                bookList: [
                    { name: '星汉灿烂', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
                    { name: '星汉灿烂', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
                    { name: '我和我的祖国', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
                    { name: '我和我的祖国', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
                    { name: '阳光下的一粒坚强的尘埃', author: '无名', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
                    { name: '阳光下的一粒坚强的尘埃', author: '无名', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
                    { name: '阳光下的一粒坚强的尘埃', author: '无名', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
                    { name: '阳光下的一粒坚强的尘埃', author: '无名', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' }
                ],
                navList: [
                    { id: 2, name: '推荐', number: '3', createDate: '2022/04/23' },
                    { id: 4, name: '文学相关', number: '4', createDate: '2022/04/23' },
                    { id: 6, name: '学习相关', number: '5', createDate: '2022/04/23' },
                    { id: 7, name: '科普读物', number: '6', createDate: '2022/02/28' },
                    { id: 11, name: '诗歌', number: '7', createDate: '2021/05/07' }
                ]
            });

            return {
                ...toRefs(state),
            }
        }
    });
</script>

<style lang="less" scoped>
    .bookcase-view {
        display: flex;
        width: 100%;
        height: 100%;

        .left-bar {
            height: calc(100% - 30px);
        }
        
        .right-content {
            margin-left: 30px;
            width: calc(100% - 250px);

            .top-wrapper {
                position: relative;
                margin: 0 30px 20px 0;

                .operation-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;

                    .button {
                        position: relative;
                        display: inline-block;
                        width: 76px;
                        height: 48px;
                        background: #FFFFFF;
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
                                height: 40px;
                                line-height: 40px;
                                text-align: center;
                                color: #071327;
                                font-weight: bold;
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
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            color: #071327;
                            font-weight: bold;
                            border-radius: 24px;
                            background: var(--hoverColor);
                            z-index: 6;
                        }
                    }
                }

                .filter-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 48px;

                    .button-wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 36px;
                        height: 36px;
                        border-radius: 10px;
                        margin-right: 10px;
                        background: #FFFFFF;
                        border: 1px solid transparent;
                        cursor: pointer;

                        .iconfont {
                            color: #0B172A;
                        }

                        &:hover,
                        &.selected {
                            border-color: var(--mainColor);
                            .iconfont {
                                color: var(--mainColor);
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
                    display: flex;
                    align-items: center;
                    height: 48px;
                    color: #FFFFFF;
                    border-radius: 16px;
                    padding: 0 24px;
                    background: var(--mainColor);
                    box-shadow: 2px 6px 8px var(--activeColor);
                    cursor: pointer;

                    .icon {
                        font-size: 20px;
                    }

                    .text {
                        margin-left: 10px;
                    }
                }
            }

            .book-wrapper {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                height: calc(100% - 78px);
                padding-bottom: 10px;
                overflow: auto;
                box-sizing: content-box;

                .book-item {
                    width: 33%;
                    margin-bottom: 20px;
                    border-right: 20px solid transparent;
                }
            }
        }
    }
</style>