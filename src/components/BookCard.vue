<template>
    <div class="book-card" :class="{ 'tile-card': displayType === 'tile', 'list-card flex-between': displayType === 'list' }">
        <template v-if="displayType === 'tile'">
            <img src="@/assets/image/cover1.jpg" :alt="bookInfo.name"/>
            <div class="bottom">
                <div class="author">作者：{{ bookInfo.author }}</div>
                <div class="name">{{ bookInfo.name }}</div>
                <div class="desc">{{ bookInfo.desc }}</div>
            </div>
        </template>
        <template v-else>
            <img src="@/assets/image/cover2.jpg" :alt="bookInfo.name">
            <div class="info-wrapper">
                <div class="author">作者：{{ bookInfo.author }}</div>
                <div class="name">{{ bookInfo.name }}</div>
                <div class="desc">{{ bookInfo.desc }}</div>
            </div>
            <div class="line"></div>
            <slot></slot>
        </template>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'BookCard',
        props: {
            displayType: {
                type: String,
                default: 'tile'
            },
            bookInfo: {
                type: Object,
                default: () => {}
            }
        },
        setup(props) {
        }
    })
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
                    font-size: 12px;
                }

                .name {
                    margin: 8px 0;
                    font-weight: bold;
                }

                .desc {
                    width: 100%;
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
            width: 100%;
            height: 100%;
            padding: 0 4%;
            border-radius: 20px;
            background: #FFFFFF;

            img {
                width: 80px;
                height: 88px;
                object-fit: cover;
            }

            .info-wrapper {
                width: 52%;
                .author {
                    font-size: 12px;
                }

                .name {
                    margin: 8px 0;
                    font-weight: bold;
                }

                .desc {
                    font-size: 12px;
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
                opacity: .2;
                background: var(--textColor);
            }
        }
    }
</style>