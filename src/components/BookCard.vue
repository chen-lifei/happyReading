<template>
    <div class="book-card">
    <!-- <div class="book-card" :class="{ 'tile-card': displayType === 'tile', 'list-card': displayType === 'list' }"> -->
        <!-- <template v-if="displayType === 'tile'">
            <img src="@/assets/image/bookCover.png" :alt="bookInfo.name"/>
            <div class="bottom">
                <div class="author">作者：{{ bookInfo.author }}</div>
                <div class="name">{{ bookInfo.name }}</div>
                <div class="desc">{{ bookInfo.desc }}</div>
            </div>
        </template>
        <template v-else>
            <img src="@/assets/image/bookCover2.png" :alt="bookInfo.name">
            <div class="info-wrapper">
                <div class="author">作者：{{ bookInfo.author }}</div>
                <div class="name">{{ bookInfo.name }}</div>
                <div class="desc">{{ bookInfo.desc }}</div>
            </div>
            <div class="line"></div>
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
        </template> -->
    </div>
</template>

<script lang="ts">
    // import { Vue, Component, Prop } from 'vue-property-decorator';

    // @Component
    export default class BookCard {
        // @Prop({ type: Object, default: {} }) readonly bookInfo: any;
        // @Prop({ type: String, default: 'tile' }) readonly displayType: any;
    }
</script>

<style lang="less" scoped>
    .book-card {
        cursor: pointer;

        &.tile-card {
            position: relative;
            width: 100%;
            height: 100%;
            padding-top: 116%;
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 20px;
            }

            .bottom {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 5% 8%;
                border-top-color: transparent;
                background: #FFFFFF;
                border-radius: 20px;

                .author {
                    color: var(--textColor);
                    font-size: 12px;
                }

                .name {
                    margin: 8px 0;
                }

                .desc {
                    width: 100%;
                    color: var(--textColor);
                    font-size: 14px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }

        &.list-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: 0 2%;
            border-radius: 20px;
            background: #FFFFFF;

            img {
                width: 80px;
                height: 88px;
                object-fit: cover;
            }

            .info-wrapper {
                width: 58%;
                .author {
                    font-size: 12px;
                    color: var(--textColor);
                }

                .name {
                    margin: 8px 0;
                }

                .desc {
                    font-size: 12px;
                    color: var(--textColor);
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }

            .line {
                width: 1px;
                height: 100%;
                background: var(--textColor);
                opacity: .2;
            }

            .data-wrapper {
                width: auto;
                max-width: 20%;

                .name {
                    font-size: 14px;
                    margin-bottom: 14px;
                }

                .read-wrapper,
                .favorite-wrapper {
                    display: inline-block;
                    .label {
                        font-size: 12px;
                        color: var(--textColor);
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
</style>