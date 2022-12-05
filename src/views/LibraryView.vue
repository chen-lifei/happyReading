<template>
    <div class="library-view">
        <SelectBar class="left-bar hidden-scrollbar" :topNav="state.topNav" @selectItem="selectItem"></SelectBar>
        <div class="right-content" v-if="!showBookDetail">
            <div class="filter-wrapper flex">
                <div class="text">搜素结果：</div>
                <div class="filter-bar">
                    <div class="read-button button-wrapper flex">
                        <i class="iconfont icon-read"></i>
                    </div>
                    <div class="hot-button button-wrapper flex selected">
                        <i class="iconfont icon-hot"></i>
                    </div>
                    <div class="like-button button-wrapper flex">
                        <i class="iconfont icon-like"></i>
                    </div>
                    <div class="filter-button button-wrapper flex selected">
                        <i class="iconfont icon-up"></i>
                    </div>
                </div>
            </div>
            <div class="explain-wrapper">
                根据 <span class="strong">热度</span> <span class="strong">升序</span> 显示
            </div>
            <div class="book-wrapper">
                <div class="book-item" v-for="(item, index) in state.bookList" :key="index" @click="toggleBookDetail(true)">
                    <BookCard :bookInfo="item"></BookCard>
                </div>
            </div>
        </div>
        <BookDetail class="book-detail" @back="toggleBookDetail(false)" v-else></BookDetail>
    </div>
</template>

<script lang="ts" setup>
    import BookCard from '@/components/BookCard.vue';
    import SelectBar from '@/components/Navbar/SelectNavbar.vue';
    import BookDetail from '@/components/BookDetail.vue';
    
    import { ref, reactive, onMounted } from 'vue';
    import { getBookCategory, getBookList } from '@/api/book';

    const state = reactive({
        total: 30,
        pageSize: 10,
        currentPage: 1,
        topNav: [],
        navList: [],
        bookList: [],
        categoryData: [],
    });
    
    let showBookDetail =  ref(false);

    function toggleBookDetail(isShow) {
        showBookDetail.value = isShow;
    }

    function getBookData() {
        getBookCategory().then(res => {
            let { data } = res;
            if (data.status == 1) {
                let categoryData = data.result;
                state.categoryData = categoryData;
                state.topNav = categoryData;
                state.navList = categoryData[0].list;
            } else {
                window.alert('获取书籍分类失败');
            }
        });
    }

    function getList(data) {
        getBookList({
            category: data.category,
            type: data.type,
            page: 1,
            pageSize: 10
        }).then(res => {
            let { data } = res;
            if (data.status == 1) {
                let { result } = data;
                state.bookList = result.list;
                console.log(result);
            } else {
            }
        });
    }

    function selectItem(data) {
        getList(data);
    }

    onMounted(() => {
        getBookData();
    });
</script>

<style lang="less" scoped>
    .library-view {
        display: flex;
        width: 100%;
        height: 100%;

        .left-bar {
            height: calc(100% - 30px);
        }
        
        .right-content {
            margin-left: 30px;
            width: calc(100% - 250px);

            .filter-wrapper {
                position: relative;
                height: 48px;
                margin-right: 30px;

                .text {
                    position: absolute;
                    left: 0;
                    font-weight: bold;
                }

                .filter-bar {
                    display: flex;

                    .button-wrapper {
                        width: 36px;
                        height: 36px;
                        border-radius: 10px;
                        margin-right: 10px;
                        background: #FFFFFF;
                        border: 1px solid transparent;
                        cursor: pointer;

                        .iconfont {
                            font-size: 14px;
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
            }

            .explain-wrapper {
                height: 40px;
                line-height: 40px;
                border-radius: 12px;
                margin: 15px 30px 20px 0;
                text-align: center;
                background: var(--activeColor);

                .strong {
                    color: var(--mainColor);
                }
            }

            .book-wrapper {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                height: calc(100% - 133px);
                padding-bottom: 10px;
                overflow: auto;
                box-sizing: content-box;

                .book-item {
                    width: 33%;
                    height: 280px;
                    margin-bottom: 20px;
                    border-right: 20px solid transparent;
                }
            }
        }

        .book-detail {
            margin: 0 30px 0 30px;
            width: calc(100% - 250px);
            height: calc(100% - 30px);
        }
    }
</style>