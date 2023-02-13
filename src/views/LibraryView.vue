<template>
    <div class="library-view">
        <SelectBar class="left-bar hidden-scrollbar" :topNav="state.topNav" @selectItem="selectItem"></SelectBar>
        <div class="right-content" v-if="!showBookDetail">
            <div class="filter-bar flex-center">
                <div class="button-wrapper flex-center">
                    <el-tooltip content="阅读量" placement="top" effect="light">
                        <i class="iconfont icon-read"></i>
                    </el-tooltip>
                </div>
                <div class="button-wrapper flex-center selected">
                    <el-tooltip content="热度" placement="top" effect="light">
                        <i class="iconfont icon-hot"></i>
                    </el-tooltip>
                </div>
                <div class="button-wrapper flex-center">
                    <el-tooltip content="收藏量" placement="top" effect="light">
                        <i class="iconfont icon-like"></i>
                    </el-tooltip>
                </div>
                <div class="button-wrapper flex-center selected">
                    <el-tooltip content="升序" placement="top" effect="light">
                        <i class="iconfont icon-up"></i>
                    </el-tooltip>
                </div>
            </div>
            <div class="book-wrapper">
                <el-row :gutter="20">
                    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8" v-for="(item, index) in state.bookList" :key="index" @click="toggleBookDetail(true)">
                        <BookCard :bookInfo="item"></BookCard>
                    </el-col>
                </el-row>
            </div>
        </div>
        <BookDetail class="book-detail" @back="toggleBookDetail(false)" v-else></BookDetail>
    </div>
</template>

<script lang="ts" setup>
    import BookCard from '@/components/BookCard.vue';
    import SelectBar from '@/components/Navbar/SelectNavbar.vue';
    import BookDetail from '@/components/BookDetail.vue';
    import { ElMessage } from 'element-plus';
    
    import { ref, reactive, onMounted } from 'vue';
    import { fetchBookCategory, fetchBookList } from '@/api/book';

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
        fetchBookCategory().then(res => {
            let { data } = res;
            if (data.status == 1) {
                let categoryData = data.result;
                state.categoryData = categoryData;
                state.topNav = categoryData;
                state.navList = categoryData[0].list;
            } else {
                ElMessage.error("获取书籍分类失败~");
            }
        });
    }

    function getList(data) {
        fetchBookList({
            category: data.category,
            type: data.type,
            page: 1,
            pageSize: 10
        }).then(res => {
            let { data } = res;
            if (data.status == 1) {
                let { result } = data;
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
            width: calc(100% - 250px);

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
        }

        .book-detail {
            margin: 0 30px 0 30px;
            width: calc(100% - 250px);
            height: calc(100% - 30px);
        }
    }
</style>