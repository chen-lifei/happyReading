<template>
    <div class="bookcase-view">
        <SelectBar class="left-bar hidden-scrollbar" topNav="书柜文件夹" :navList="state.navList" @selectItem="selectFolder"></SelectBar>
        <div class="right-content" v-if="!state.showBookDetail">
            <div v-if="state.bookList.length">
                <div class="top-wrapper">
                    <div class="operation-wrapper" v-if="false">
                        <div class="button confirm"></div>
                        <div class="button cancel"></div>
                    </div>
                    <div class="filter-wrapper flex-center">
                        <div class="button-wrapper flex-center">
                            <el-tooltip content="最近阅读" placement="top" effect="customized-top">
                                <i class="iconfont icon-clock"></i>
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
                    <div class="create-folder flex-center">
                        <span class="icon">+</span>
                        <span class="text">新建文件夹</span>
                    </div>
                </div>
                <div class="book-wrapper">
                    <el-row :gutter="20">
                        <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6" v-for="(item, index) in state.bookList" :key="index" @click="toggleBookDetail(item.id)">
                            <BookCard :bookInfo="item"></BookCard>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="empty-wrapper" v-else>
                <img src="@/assets/image/book/empty.svg" alt="">
                <p>该文件夹为空~</p>
            </div>
        </div>
        <BookDetail class="book-detail" :id="state.bookId" @back="toggleBookDetail(false)" v-else></BookDetail>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, reactive } from "vue";
    import BookCard from '@/components/BookCard.vue';
    import SelectBar from '@/components/Navbar/SelectNavbar.vue';
    import BookDetail from '@/components/BookDetail.vue';

    const state = reactive({
        bookList: [] as bookItem[],
        navList: [
            { id: 2, name: "推荐", number: 6, createDate: "2022/04/23" },
            { id: 4, name: "文学相关", number: 0, createDate: "2023/05/02" },
            { id: 6, name: "学习相关", number: 0, createDate: "2023/07/13" },
            { id: 7, name: "科普读物", number: 0, createDate: "2024/01/08" },
            { id: 11, name: "诗歌", number: 0, createDate: "2024/06/01" }
        ],
        folderData: [
            { id: 2, list: [{
                "id": 5,
                "name": "匆匆那年",
                "writer": "九夜茴",
                "introduction": "每个人都有青春，每个青春都有一个故事，每个故事都有一个遗憾，每个遗憾都有它回味不尽的美。</br>这是个关于我们的故事，是转眼匆匆那年的事，如果一起经历，或尚有所感；如果正在怀念，或打算回忆；如果曾经落泪，或不曾忘记；如果已经不屑，或正要抛弃，那么，请一起来回忆我们的《匆匆那年》。",
                "cover": "/images/congcongnanian.jpg",
                "finish_time": null,
                "publish_time": null,
                "publisher": null,
                "read_time": 0,
                "collections": 0,
                "category": 1,
                "type": 1,
                "chapter": 0,
                "country": "中国"
            },
            {
                "id": 7,
                "name": "你是迟来的欢喜",
                "writer": "顾了之",
                "introduction": "-所有旧雨重逢的暗恋，都是蓄谋已久的套路。",
                "cover": "/images/nishichilaidehuanxi.jpg",
                "finish_time": null,
                "publish_time": null,
                "publisher": null,
                "read_time": 8,
                "collections": 14,
                "category": 1,
                "type": 2,
                "chapter": 0,
                "country": "中国"
            },
            {
                "id": 8,
                "name": "最遥远的距离",
                "writer": "张小娴",
                "introduction": "世上最遥远的距离，不是生与死的距离，不是天各一方，而是我就站在你面前，你却不知道我爱你。",
                "cover": "/images/zuiyaoyuandejuli.jpg",
                "finish_time": null,
                "publish_time": null,
                "publisher": null,
                "read_time": 0,
                "collections": 0,
                "category": 1,
                "type": 2,
                "chapter": 0,
                "country": "中国"
            },
            {
                "id": 18,
                "name": "骆驼祥子",
                "writer": "老舍",
                "introduction": "《骆驼祥子》讲述的是中国北平城里的一个年轻好强、充满生命活力的人力车夫祥子三起三落的人生经历。</br>\n祥子来自农村，是个破产的青年农民，勤劳、纯朴、善良，保留着农村哺育他、教养他的一切，却再也不愿意回农村去了。从农村来到城市的祥子，渴望以自己的诚实劳动买一辆属于自己的车。做个独立的劳动者是祥子的志愿、希望、甚至是宗教，凭着勤劳和坚忍，他用三年的时间省吃俭用，终于实现了理想，成为自食其力的上等车夫。但刚拉半年，车就在兵荒马乱中被逃兵掳走，祥子失去了洋车，只牵回三匹骆驼。祥子没有灰心，他依然倔强地从头开始，更加克己地拉车攒钱。可是，还没有等他再买上车，所有的积蓄又被侦探敲诈、洗劫一空，买车的梦想再次成泡影。</br>\n当祥子又一次拉上自己的车，是以与虎妞成就畸形的婚姻为代价的。好景不长，因虎妞死于难产，他不得不卖掉人力车去料理丧事。至此，他的人生理想彻底破灭了。再加上他心爱的女人小福子的自杀，吹熄了心中最后一朵希望的火花。连遭生活的打击，祥子开始丧失了对于生活的任何企求和信心，再也无法鼓起生活的勇气，不再像从前一样以拉车为自豪，他厌恶拉车，厌恶劳作。</br>\n被生活捉弄的祥子开始游戏生活，吃喝嫖赌。为了喝酒，祥子到处骗钱，堕落为“城市垃圾”。最后，靠给人干红白喜事做杂工维持生计。祥子由一个“体面的、要强的、好梦想的、利己的、个人的、健壮的、伟大的”底层劳动者沦为一个“堕落的、自私的、不幸的、社会病胎里的产儿，个人主义的末路鬼”。",
                "cover": "/images/luotuoxiangzi.jpg",
                "finish_time": null,
                "publish_time": null,
                "publisher": null,
                "read_time": 0,
                "collections": 0,
                "category": 2,
                "type": 8,
                "chapter": 0,
                "country": "中国"
            },
            {
                "id": 19,
                "name": "天龙八部",
                "writer": "金庸",
                "introduction": "《天龙八部》以宋哲宗时代为背景，通过宋、辽、大理、西夏、吐蕃等王国之间的武林恩怨和民族矛盾，从哲学的高度对人生和社会进行审视和描写，展示了一幅波澜壮阔的生活画卷。其故事之离奇曲折、涉及人物之众多、历史背景之广泛、武侠战役之庞大、想象力之丰富当属“金书”之最。作品风格宏伟悲壮，是一部写尽人性、悲剧色彩浓厚的史诗巨著。",
                "cover": "/images/tianlongbabu.jpg",
                "finish_time": null,
                "publish_time": null,
                "publisher": null,
                "read_time": 0,
                "collections": 0,
                "category": 2,
                "type": 9,
                "chapter": 0,
                "country": "中国"
            },
            {
                "id": 25,
                "name": "长夜难明",
                "writer": "紫金陈",
                "introduction": "嫌疑人杀人抛尸，却因意外在大庭广众之下被当场抓获。现场至少有几百个目击证人，嫌疑人对整个犯罪经过也供认不讳。人证、物证、口供，证据链齐全。就在检察机关对嫌疑人正式提起公诉之时，案情却陡然生变……<br/>这背后究竟隐藏着怎样令人震惊的案情？为了查清真相，有一位检察官历经十年光阴，付出了青春、事业、名声、前途、家庭等等无数代价，甚至，还包括生命。",
                "cover": "/images/changyenanming.png",
                "finish_time": null,
                "publish_time": null,
                "publisher": null,
                "read_time": 0,
                "collections": 0,
                "category": 2,
                "type": 11,
                "chapter": 0,
                "country": "中国"
            }] },
            { id: 4, list: [] },
            { id: 6, list: [] },
            { id: 7, list: [] },
            { id: 11, list: [] },
        ],
        showBookDetail: false,
        bookId: "",
    });

    function toggleBookDetail(isShow) {
        state.showBookDetail = !!isShow;
        if (isShow) state.bookId = isShow;
    }

    function selectFolder({ type }) {
        let data = state.folderData.find(item => item.id == type);
        state.bookList = data ? data["list"] : [];
    }

    onMounted(() => {
        state.bookList = state.folderData[0]["list"];
    });
</script>

<style lang="scss" scoped>
    .bookcase-view {
        display: flex;
        width: 100%;
        height: 100%;

        .left-bar {
            height: calc(100% - 20px);
        }
        
        .right-content {
            margin-left: 20px;
            flex: 1;

            .top-wrapper {
                position: relative;
                margin: 0 30px 20px 0;

                .operation-wrapper {
                    position: absolute;
                    top: 2px;
                    left: 0;

                    .button {
                        position: relative;
                        display: inline-block;
                        width: 76px;
                        height: 36px;
                        background: var(--whiteColor);
                        border-radius: 24px;
                        cursor: pointer;

                        &.confirm {
                            margin-right: 10px;

                            &::before {
                                content: '确定';
                                position: absolute;
                                top: 4px;
                                left: 4px;
                                width: 68px;
                                height: 28px;
                                line-height: 28px;
                                text-align: center;
                                color: var(--stressColor);
                                font-size: 14px;
                                border-radius: 24px;
                                background: var(--hoverColor);
                                z-index: 6;
                            }
                        }

                        &.cancel::before {
                            content: '取消';
                            position: absolute;
                            top: 4px;
                            left: 4px;
                            width: 68px;
                            height: 28px;
                            line-height: 28px;
                            text-align: center;
                            color: var(--stressColor);
                            font-size: 14px;
                            border-radius: 24px;
                            background: var(--hoverColor);
                            z-index: 6;
                        }
                    }
                }

                .filter-wrapper {
                    position: relative;
                    height: 40px;

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

                .create-folder {
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 34px;
                    font-size: 12px;
                    border-radius: 10px;
                    padding: 0 10px;
                    margin-top: 3px;
                    background: var(--whiteColor);
                    box-shadow: 2px 6px 8px var(--borderColor);
                    transition: all .2s ease;
                    cursor: pointer;

                    .icon {
                        font-size: 20px;
                        color: var(--stressColor);
                    }

                    .text {
                        margin-left: 6px;
                        color: var(--stressColor);
                    }

                    &:hover {
                        background: var(--activeColor);
                        .icon {
                            color: var(--whiteColor);
                        }
                        .text {
                            color: var(--whiteColor);
                        }
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
                    width: 250px;
                    margin: 120px 0 20px;
                }
                p {
                    color: var(--stressColor);
                }
            }
        }

        .book-detail {
            margin: 0 20px 0 20px;
            width: calc(100% - 250px);
            height: calc(100% - 20px);
        }
    }
</style>