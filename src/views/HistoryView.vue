<template>
    <div class="history-view">
        <el-row class="book-wrapper" :gutter="20" v-if="!state.showBookDetail">
            <el-col class="book-item" :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="(item, index) in state.bookList" :key="index" @click="toggleBookDetail(true)">
                <BookCard :bookInfo="item" displayType="list">
                    <div class="data-wrapper">
                        <div class="tag-list">
                            <div class="tag">人文</div>
                            <div class="tag">文学</div>
                            <div class="tag">科幻</div>
                            <div class="tag">旅游纪实文学</div>
                        </div>
                        <div class="time">2022/08/05 08:05</div>
                    </div>
                </BookCard>
            </el-col>
        </el-row>
        <BookDetail class="book-detail" @back="toggleBookDetail(false)" v-else></BookDetail>
    </div>
</template>

<script lang="ts" setup>
    import BookCard from '@/components/BookCard.vue';
    import BookDetail from '@/components/BookDetail.vue';
    import { reactive } from 'vue';

    const state = reactive({
        bookList: [
            { name: '星汉灿烂', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '星汉灿烂', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '我和我的祖国', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '我和我的祖国', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '阳光下的一粒坚强的尘埃', author: '无名', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '阳光下的一粒坚强的尘埃', author: '无名', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '阳光下的一粒坚强的尘埃', author: '无名', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '阳光下的一粒坚强的尘埃', author: '无名', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '我和我的祖国', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '我和我的祖国', author: '小猪佩奇', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '阳光下的一粒坚强的尘埃', author: '无名', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
            { name: '阳光下的一粒坚强的尘埃', author: '无名', desc: '这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字' },
        ],
        showBookDetail: false,
    });

    function toggleBookDetail(isShow) {
        state.showBookDetail = isShow;
    }
</script>

<style lang="scss" scoped>
    .history-view {
        width: 100%;
        height: 100%;
        padding-right: 30px;
        overflow: hidden auto;

        .book-wrapper {
            display: flex;
            flex-wrap: wrap;
            width: calc(100% + 20px);
            padding-bottom: 10px;
            box-sizing: content-box;

            .book-item {
                height: 128px;
                margin-bottom: 20px;
    
                .book-card {
                    .data-wrapper {
                        width: auto;
                        max-width: 25%;
                        height: 88px;
                        padding-left: 4%;

                        .tag-list {
                            display: flex;
                            flex-wrap: wrap;
                            height: 58px;
                            margin-bottom: 10px;
                            overflow: hidden;

                            .tag {
                                font-size: 12px;
                                color: var(--mainColor);
                                padding: 4px;
                                margin: 0 8px 6px 0;
                                background: var(--backColor);
                                border-radius: 2px;
                            }
                        }

                        .time {
                            height: 20px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }

        .book-detail {
            width: 100%;
            height: calc(100% - 30px);
        }
    }
</style>