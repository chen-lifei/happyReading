<template>
    <div class="home-wrapper" v-if="!stateData.showBookDetail">
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
                <div class="book-item" v-for="(item, index) in stateData.currentBookList" :key="index" @click="toggleBookDetail(true)">
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
                <div class="book-item" v-for="(item, index) in stateData.bookList" :key="index" @click="toggleBookDetail(true)">
                    <BookCard :bookInfo="item" displayType="list">
                        <div class="data-wrapper">
                            <div class="name">作品数据</div>
                            <div class="data">阅读数: 66</div>
                            <div class="data">收藏数: 88</div>
                        </div>
                    </BookCard>
                </div>
            </div>
        </div>
    </div>
    <BookDetail class="book-detail" @back="toggleBookDetail(false)" v-else></BookDetail>
</template>

<script lang="ts" setup>
    import { fetchBookList } from '@/api/book';

    import {  ref, reactive, onMounted } from 'vue';
    import BookCard from '@/components/BookCard.vue';
    import BookDetail from '@/components/BookDetail.vue';

    const stateData = reactive({
        date: '',
        currentPage: 1,
        showBookDetail: false,
        currentBookList: [] as any,
        bookList: []
    });

    function prePage() {
    }
    
    function nextPage() {
        let page = stateData.currentPage;
        stateData.currentPage++;
        stateData.currentBookList = stateData.bookList.slice(page * 4, page * 4 + 4);
    }

    function toggleBookDetail(isShow) {
        stateData.showBookDetail = isShow;
    }

    function getBookList() {
        fetchBookList({
            page: 1,
            pageSize: 30
        }).then(res => {
            let { data } = res;
            if (data.status == 1) {
                let bookList = data.result.list;
                stateData.bookList = bookList;
                stateData.currentBookList = bookList.slice(0, 4);
            }
        })
    }

    onMounted(() => {
        let currentDate:any = new Date();
        stateData.date = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}  ${currentDate.getHours()}:${currentDate.getMinutes()}`;
        getBookList();
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
                            padding-left: 4%;
                            .name {
                                font-size: 14px;
                                font-weight: bold;
                                margin-bottom: 14px;
                            }
                            .data {
                                font-size: 12px;
                                margin-bottom: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
    .book-detail {
        width: 100%;
        height: calc(100% - 30px);
        padding-right: 30px;
    }
</style>
