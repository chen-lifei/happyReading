<template>
    <div class="home-wrapper">
        <div class="top-wrapper">
            <div class="sentence">Good Evening, yanyanhuahua! It is time to have a rest.</div>
            <div class="calendar-wrapper">
                <i class="iconfont icon-calendar"></i>
                <span class="time">{{ date }}</span>
            </div>
        </div>
        <!-- <div class="recommend-wrapper">
            <div class="name-wrapper">
                <div class="name">每日推荐</div>
                <div class="change-page">
                    <div class="left" @click="prePage()">
                        <i class="iconfont icon-arrowLeft"></i>
                    </div>
                    <div class="right" @click="nextPage()">
                        <i class="iconfont icon-arrowRight"></i>
                    </div>
                </div>
            </div>
            <div class="book-wrapper">
                <div class="book-item" v-for="(item, index) in currentBookList" :key="index">
                    <BookCard :bookInfo="item"></BookCard>
                </div>
            </div>
        </div>
        <div class="hot-wrapper">
            <div class="name-wrapper">
                <div class="name">最热推荐</div>
                <div class="more">
                    <span>查看全部</span>
                    <i class="iconfont icon-arrowRight"></i>
                </div>
            </div>
            <div class="book-wrapper">
                <div class="book-item" v-for="(item, index) in bookList" :key="index">
                    <BookCard :bookInfo="item" displayType="list"></BookCard>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script lang="ts" setup>
    import {  ref, reactive, onMounted } from 'vue';
    import BookCard from '@/components/BookCard.vue';

    let date:any = '';
    let currentPage: number = 1;
    let currentBookList: any = [];
    let bookList: any = [
        { name: '爱丽丝梦游仙境', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
        { name: '爱丽丝梦游仙境', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
        { name: '爱丽丝梦游仙境', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
        { name: '爱丽丝梦游仙境', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
        { name: '白雪公主', author: '安徒生', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
        { name: '白雪公主', author: '安徒生', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
        { name: '白雪公主', author: '安徒生', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
        { name: '白雪公主', author: '安徒生', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
        { name: '灰姑娘', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
    ];

    function prePage() {}
    
    function nextPage() {
        currentBookList = bookList.slice(4, 8);
    }

    onMounted(() => {
        let date = new Date();
        // date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}: ${date.getMinutes()}`;
        currentBookList = bookList.slice(0, 4);
    });
</script>

<style lang="less" scoped>
    .home-wrapper {
        width: 100%;
        height: 100%;
        padding-right: 30px;
        overflow: auto;
        .top-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .sentence {
                width: 70%;
                color: var(--textColor);
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
                display: flex;
                align-items: center;
                justify-content: space-between;
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
                    display: flex;
                    align-items: center;

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
                            font-size: 12px;
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
                    color: var(--textColor);
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
                justify-content: space-between;

                .book-item {
                    width: 48%;
                    height: 128px;
                    margin-bottom: 20px;
                }
            }
        }
    }
</style>
