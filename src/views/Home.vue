<template>
    <div class="home-wrapper" v-if="!state.showBookDetail">
        <div class="top-wrapper flex-between">
            <div class="sentence">{{ state.greetingInfo }}</div>
            <div class="calendar-wrapper">
                <i class="iconfont icon-calendar"></i>
                <span class="time">{{ state.date }}</span>
            </div>
        </div>
        <div class="recommend-wrapper">
            <div class="name-wrapper flex-between">
                <div class="name">每日推荐</div>
                <div class="change-page flex-center">
                    <div class="left" @click="prePage()" :class="{ 'disabled': state.isFirstPage }">
                        <i class="iconfont icon-arrowLeft"></i>
                    </div>
                    <div class="right" @click="nextPage()" :class="{ 'disabled': state.isLastPage }">
                        <i class="iconfont icon-arrowRight"></i>
                    </div>
                </div>
            </div>
            <el-row :class="{ 'fade-card': state.showFade }" class="book-wrapper" :gutter="10">
                <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4" v-for="(item, index) in state.currentBookList" :key="item.id" @click="toggleBookDetail(item.id)">
                    <BookCard :bookInfo="item"></BookCard>
                </el-col>
            </el-row>
        </div>
        <div class="hot-wrapper">
            <div class="name-wrapper flex-between">
                <div class="name">最热推荐</div>
                <div class="more">
                    <span>查看全部</span>
                    <i class="iconfont icon-arrowRight"></i>
                </div>
            </div>
            <el-row class="book-wrapper" :gutter="20">
                <el-col class="book-item" :xs="12" :sm="12" :md="8" :lg="8" :xl="8" v-for="(item, index) in state.hotBookList" :key="item.id" @click="toggleBookDetail(item.id)">
                    <BookCard :bookInfo="item" displayType="list">
                        <div class="data-wrapper">
                            <div class="name">作品数据</div>
                            <div class="data">阅读量: {{ item.read_time }}</div>
                            <div class="data">收藏量: {{ item.collections }}</div>
                        </div>
                    </BookCard>
                </el-col>
            </el-row>
        </div>
    </div>
    <BookDetail class="book-detail" :id="state.bookId" @back="toggleBookDetail(false)" v-else></BookDetail>
</template>

<script lang="ts" setup>
    import { fetchBookList, fetchHotBookList } from "@/api/book";
    import { reactive, onMounted, onBeforeMount, onUnmounted, watch } from "vue";
    import { throttle } from "@/utils/index";

    import BookCard from "@/components/BookCard.vue";
    import BookDetail from "@/components/BookDetail.vue";

    const state = reactive({
        date: "",
        greetingInfo: "",
        currentPage: 1,
        showBookDetail: false,
        currentBookList: [] as any,
        bookList: [],
        bookId: "",
        hotBookList: [] as any,
        pageOfBook: 6,              // 轮播显示的书本数：6：≥1200px  4：992~1200  3：0~992
        showFade: false,
        isFirstPage: true,          // 轮播是否为第一页
        isLastPage: false,          // 轮播是否为最后一页
    });

    function prePage() {
        let page = state.currentPage;
        if (state.isFirstPage) return;
        state.currentPage--;
        state.currentBookList = state.bookList.slice((page - 2) * state.pageOfBook, (page - 2) * state.pageOfBook + state.pageOfBook);
    }
    
    function nextPage() {
        state.showFade = true;
        let page = state.currentPage;
        if (state.isLastPage) return;
        state.currentPage++;
        state.currentBookList = state.bookList.slice(page * state.pageOfBook, page * state.pageOfBook + state.pageOfBook);
    }

    function toggleBookDetail(isShow) {
        state.showBookDetail = !!isShow;
        if (isShow) state.bookId = isShow;
    }

    function getBookList() {
        fetchBookList({
            page: 1,
            pageSize: 30
        }).then(res => {
            if (res.status == 1) {
                let bookList = res.result.list;
                state.bookList = bookList;
                state.currentBookList = bookList.slice(0, state.pageOfBook);
            }
        })
    }

    function getHotBookList() {
        fetchHotBookList({
            page: 1,
            pageSize: 9
        }).then(res => {
            if (res.status == 1) {
                state.hotBookList = res.result.list;
            }
        })
    }

    const onPageResize = () => {
        const clientWidth = document.body.clientWidth;
        if (clientWidth < 992) {
            state.pageOfBook = 3;
        } else if (clientWidth >= 1200) {
            state.pageOfBook = 6;
        } else {
            state.pageOfBook = 4;
        }
    }

    watch(
        () => state.pageOfBook,
        () => {
            let page = state.currentPage - 1;
            state.currentBookList = state.bookList.slice(page * state.pageOfBook, page * state.pageOfBook + state.pageOfBook);
        }
    );

    watch(
        () => state.currentPage,
        (page) => {
            state.isFirstPage = page == 1;
            state.isLastPage = page == Math.ceil(state.bookList.length / state.pageOfBook);
        }
    );

    onBeforeMount(() => {
        onPageResize();
        window.addEventListener("resize", throttle(onPageResize, 300));
    });

    onMounted(() => {
        let currentDate = new Date();
        state.date = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}  ${currentDate.getHours()}:${currentDate.getMinutes()}`;
        getBookList();
        getHotBookList();

        // 显示问好文字
        let infoList = [
            "成长就是一遍遍的怀疑自己以前深信不疑的东西，然后推翻一个又一个阶段的自己，长出新的智慧和性情，带着无数的迷惘与不确定，坚定的走向下一个阶段的自己。",
            "不惊扰别人的宁静，就是慈悲；不伤害别人的自尊，就是善良。人活着，发自己的光就好，不要吹灭别人的灯。",
            "在这个世界上，你再优秀，也不可能万事无忧；你再聪明，也不可能事事都懂；你再豁达，也不可能没有烦愁；你活得再漂亮，也不可能没有凄凉。",
            "成长就是一遍遍的怀疑自己以前深信不疑的东西，然后推翻一个又一个阶段的自己，长出新的智慧和性情，带着无数的迷惘与不确定，坚定的走向下一个阶段的自己。"
        ];
        let random = Math.floor(Math.random() * infoList.length);
        state.greetingInfo = "今日语录：" + infoList[random];
    });

    onUnmounted(() => {
        window.removeEventListener("resize", onPageResize);
    });
</script>

<style lang="scss" scoped>
    .home-wrapper {
        width: 100%;
        height: 100%;
        padding-right: 20px;
        overflow: auto;

        .top-wrapper {
            .sentence {
                width: 70%;
                line-height: 1.6;
                font-size: 15px;
                letter-spacing: 1px;
                color: var(--infoColor);
            }

            .calendar-wrapper {
                height: 40px;
                line-height: 40px;
                border-radius: 10px;
                background: var(--whiteColor);
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
                        background: var(--whiteColor);
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

                    .disabled {
                        cursor: no-drop;
                        background: var(--greyColor);
                    }
                }
            }

            .book-wrapper {
                display: flex;
                flex-wrap: nowrap;
                overflow: hidden;                
            }
            .fade-card {
                .book-card {
                    opacity: 0;
                    animation: .8s linear fade forwards;
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
                .book-item {
                    height: 128px;
                    margin-bottom: 20px;

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
