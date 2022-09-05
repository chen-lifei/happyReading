<template>
    <div class="home-wrapper">
        <div class="top-wrapper flex-between">
            <div class="sentence">Good Evening, yanyanhuahua! It is time to have a rest.</div>
            <div class="calendar-wrapper">
                <i class="iconfont icon-calendar"></i>
                <span class="time">{{ stateData.date }}</span>
            </div>
        </div>
        <div class="recommend-wrapper">
            <div class="name-wrapper flex-between">
                <div class="name">每日推荐</div>
                <div class="change-page flex">
                    <div class="left" @click="prePage()">
                        <i class="iconfont icon-arrowLeft"></i>
                    </div>
                    <div class="right" @click="nextPage()">
                        <i class="iconfont icon-arrowRight"></i>
                    </div>
                </div>
            </div>
            <div class="book-wrapper">
                <div class="book-item" v-for="(item, index) in stateData.currentBookList" :key="index">
                    <BookCard :bookInfo="item"></BookCard>
                </div>
            </div>
        </div>
        <div class="hot-wrapper">
            <div class="name-wrapper flex-between">
                <div class="name">最热推荐</div>
                <div class="more">
                    <span>查看全部</span>
                    <i class="iconfont icon-arrowRight"></i>
                </div>
            </div>
            <div class="book-wrapper">
                <div class="book-item" v-for="(item, index) in stateData.bookList" :key="index">
                    <BookCard :bookInfo="item" displayType="list">
                        <div class="data-wrapper">
                            <div class="name">作品数据</div>
                            <div class="read-wrapper">
                                <div class="label">阅读数</div>
                                <div class="number">66</div>
                            </div>
                            <div class="favorite-wrapper">
                                <div class="label">收藏数</div>
                                <div class="number">88</div>
                            </div>
                        </div>
                    </BookCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {  ref, reactive, onMounted } from 'vue';
    import BookCard from '@/components/BookCard.vue';

    const stateData = reactive({
        date: '',
        currentPage: 1,
        currentBookList: [] as any,
        bookList: [
            { name: '爱丽丝梦游仙境', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '爱丽丝梦游仙境', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '爱丽丝梦游仙境', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '爱丽丝梦游仙境', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '白雪公主', author: '安徒生', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '白雪公主', author: '安徒生', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '白雪公主', author: '安徒生', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '白雪公主', author: '安徒生', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '灰姑娘', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
        ]
    });

    function prePage() {}
    
    function nextPage() {
        stateData.currentBookList = stateData.bookList.slice(4, 8);
    }

    onMounted(() => {
        let currentDate:any = new Date();
        stateData.date = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}  ${currentDate.getHours()}:${currentDate.getMinutes()}`;
        stateData.currentBookList = stateData.bookList.slice(0, 4);
    });
</script>

<style lang="less" scoped>
    .home-wrapper {
        width: 100%;
        height: 100%;
        padding-right: 30px;
        overflow: auto;
        .top-wrapper {
            .sentence {
                width: 70%;
            }

            .calendar-wrapper {
                height: 40px;
                line-height: 40px;
                border-radius: 10px;
                background: #FFFFFF;
                padding: 0 16px;

                .iconfont {
                    margin-right: 6px;
                    font-size: 20px;
                }
            }
        }

        .recommend-wrapper,
        .hot-wrapper {
            .name-wrapper {
                margin: 20px 0;

                .name {
                    font-size: 20px;
                }
            }
        }

        .recommend-wrapper {
            margin-bottom: 40px;
            .name-wrapper {
                .change-page {
                    .left,
                    .right {
                        display: inline-block;
                        position: relative;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #FFFFFF;
                        cursor: pointer;

                        .iconfont {
                            position: absolute;
                            top: 3px;
                            left: 4px;
                            transform: scale(0.8);
                        }
                    }
    
                    .left {
                        margin-right: 8px;
                    }
                }
            }

            .book-wrapper {
                display: flex;
                flex-wrap: nowrap;
                width: 100%;
                overflow: hidden;

                .book-item {
                    width: 25%;
                    margin-right: 25px;

                    &:nth-child(4n) {
                        margin-right: 0;
                    }
                }
            }
        }

        .hot-wrapper {
            .more {
                cursor: pointer;

                span,
                .iconfont {
                    font-size: 12px;
                }

                .iconfont {
                    transform: scale(0.8);
                    margin-left: 5px;
                }

                &:hover {
                    span,
                    .iconfont {
                        color: var(--mainColor);
                    }
                }
            }

            .book-wrapper {
                display: flex;
                flex-wrap: wrap;
                width: calc(100% + 20px);
                box-sizing: content-box;
                padding-bottom: 10px;

                .book-item {
                    width: 50%;
                    height: 128px;
                    margin-bottom: 20px;
                    border-right: 20px solid transparent;

                    .book-card {
                        .data-wrapper {
                            width: auto;
                            max-width: 25%;

                            .name {
                                font-size: 14px;
                                font-weight: bold;
                                margin-bottom: 14px;
                            }

                            .read-wrapper,
                            .favorite-wrapper {
                                display: inline-block;
                                .label {
                                    font-size: 12px;
                                    margin-bottom: 5px;
                                }
                                .number {
                                    font-size: 14px;
                                }
                            }

                            .read-wrapper {
                                margin-right: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
