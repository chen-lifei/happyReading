<template>
    <div class="library-view">
        <SelectBar class="left-bar hidden-scrollbar" :topNav="state.topNav" @selectItem="selectItem"></SelectBar>
        <div class="right-content" v-if="!state.showBookDetail">
            <div class="filter-bar flex-center">
                <div class="button-wrapper flex-center">
                    <el-tooltip content="阅读量" placement="top" effect="customized-top">
                        <i class="iconfont icon-read"></i>
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
            <div class="book-wrapper" v-if="state.bookList.length">
                <el-row :gutter="20">
                    <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6" v-for="item in state.bookList" :key="item.id" @click="toggleBookDetail(item.id)">
                        <BookCard :bookInfo="item"></BookCard>
                    </el-col>
                </el-row>
            </div>
            <div class="empty-wrapper" v-else>
                <img src="@/assets/image/book/empty.svg" alt="">
                <p>还没有该分类的书籍，请等待书籍上新~</p>
            </div>
        </div>
        <BookDetail class="book-detail" :id="state.bookId" @back="toggleBookDetail(false)" v-else></BookDetail>
    </div>
</template>

<script setup lang="ts" name="LibraryView">
    import BookCard from "@/components/BookCard.vue";
    import SelectBar from "@/components/Navbar/SelectNavbar.vue";
    import BookDetail from "@/components/BookDetail.vue";
    
    import { reactive, onMounted } from "vue";
    import { fetchBookCategory, fetchBookType, fetchBookList } from "@/api/book";

    const state = reactive({
        total: 30,
        pageSize: 10,
        currentPage: 1,
        topNav: [],
        navList: [],
        bookList: [] as bookItem[],
        categoryData: [],
        showBookDetail: false,
        bookId: ""
    });

    function toggleBookDetail(isShow) {
        state.showBookDetail = !!isShow;
        if (isShow) state.bookId = isShow;
    }

    async function getBookData() {
        const promise1 = fetchBookCategory();
        const promise2 = fetchBookType();
        let [categoryData, typeData] = await Promise.all([promise1, promise2]);
        categoryData = categoryData.result;
        typeData = typeData.result;
        categoryData.forEach(cItem => {
            let list = typeData.filter(tItem => {
                tItem["id"] = tItem["type_id"];
                return tItem.category_id == cItem.id;
            });
            cItem["list"] = list;
        });
        state.categoryData = categoryData;
        state.topNav = categoryData;
        state.navList = categoryData[0].list;
    }

    function getList(data) {
        fetchBookList({
            category: data.category,
            type: data.type,
            page: 1,
            pageSize: 10
        }).then(res => {
            if (res.status == 1) {
                let { result } = res;
                state.bookList = result.list;
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

<style lang="scss" scoped>
    .library-view {
        display: flex;
        width: 100%;
        height: 100%;

        .left-bar {
            height: calc(100% - 20px);
        }
        
        .right-content {
            margin-left: 20px;
            flex: 1;

            .filter-bar {
                margin-bottom: 20px;

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

            .empty-wrapper {
                text-align: center;
                img {
                    width: 220px;
                    margin: 120px 0 20px;
                }
                p {
                    color: var(--infoColor);
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