<template>
    <div class="book-card" :class="{ 'tile-card': displayType === 'tile', 'list-card flex-between': displayType === 'list' }">
        <template v-if="displayType === 'tile'">
            <img :src="bookInfo.cover" :alt="bookInfo.name"/>
            <div class="bottom">
                <div class="author">作者：{{ bookInfo.writer }}</div>
                <div class="name">{{ bookInfo.name }}</div>
                <div class="desc">{{ bookInfo.introduction }}</div>
            </div>
        </template>
        <template v-else>
            <img :src="bookInfo.cover" :alt="bookInfo.name">
            <div class="info-wrapper">
                <div class="author">作者：{{ bookInfo.writer }}</div>
                <div class="name">{{ bookInfo.name }}</div>
                <div class="desc">{{ bookInfo.introduction }}</div>
            </div>
            <div class="line"></div>
            <slot></slot>
        </template>
    </div>
</template>

<script lang="ts">
    import { validURL } from '@/utils/validate';

    import { defineComponent, onMounted } from 'vue';

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
            onMounted(() => {
                let cover = props.bookInfo && props.bookInfo.cover;
                if (cover) props.bookInfo.cover = validURL(cover) ? cover : `http://127.0.0.1:3000${cover}`; 
            });
        }
    })
</script>

<style lang="scss" scoped>
    .book-card {
        cursor: pointer;

        &.tile-card {
            position: relative;
            width: 100%;
            height: 280px;
            transition: all .4s ease;
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
                background: var(--whiteColor);
                border-radius: 20px;

                .author {
                    font-size: 12px;
                }

                .name {
                    margin: 8px 0;
                    font-weight: bold;
                    font-size: 14px;
                }

                .desc {
                    width: 100%;
                    font-size: 12px;
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
            background: var(--whiteColor);

            img {
                width: 80px;
                height: 88px;
                object-fit: cover;
            }

            .info-wrapper {
                width: 50%;
                padding: 0 4%;
                flex: 1;
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

        @media screen and (max-width: 1200px) {
            &.tile-card {
                height: 240px;
            }
        }

        @media screen and (max-width: 1100px) {
            &.tile-card {
                height: 220px;
            }
        }
    }
</style>