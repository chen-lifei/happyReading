<template>
    <div class="book-chapter-wrapper">
        <div class="left-wrapper">
            <TopNavbar class="top-navbar" />
            <div class="main-wrapper">
                <div class="name">
                    <div class="book-name">书籍名称</div>
                    <div class="chapter-name">{{ state.chapterData.chapter_name || "第一章：章节名称" }}</div>
                </div>
                <!-- <div class="main-chapter" v-html="state.chapterData.content"> -->
                <div class="main-chapter">
                    <div class="chapter-item left"></div>
                    <div class="chapter-item right"></div>
                </div>
                <div class="bottom-page">
                    <div class="btn pre-page" @click="changePage('pre')">上一页</div>
                    <div class="btn next-page" @click="changePage('next')">下一页</div>
                </div>
            </div>
        </div>
        <div class="tool-wrapper">
            <div v-for="item in state.toolList" :key="item.name" @click="handleTool(item.name)">
                <el-tooltip :content="item.content" placement="top" effect="customized-top" transition="none" >
                    <div class="icon-wrapper">
                        <i class="iconfont" :class="item.icon"></i>
                    </div>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="BookChapter">
    import { reactive, onMounted,  } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { fetchBookChapter } from "@/api/book";

    import TopNavbar from "@/components/Navbar/TopNavbar.vue";

    const route = useRoute();
    const router = useRouter();
    const state = reactive({
        bookId: "" as number | string,
        id: "" as number | string,
        toolList: [
            { content: "首页", icon: "icon-home", name: "home" },
            { content: "评论", icon: "icon-message", name: "comment" },
            { content: "章节", icon: "icon-home", name: "chapter" },
            { content: "字体", icon: "icon-message", name: "text" },
        ],
        chapterData: {} as chapterItem,
        chapterContent: [] as any,
        chapterIndex: 0
    });

    function handleTool(tool) {
        switch(tool) {
            case "home": 
                router.push("/home");
                break;
            default:
                break;
        }
    }

    function getBookChapter() {
        fetchBookChapter({ id: state.id }).then(res => {
            state.chapterData = res.result[0];
            getChapterContent();
        });
    }

    function getChapterContent() {
        let content = state.chapterData.content;
        let i = content.replace(/\<p\>(\s)*/g, "");
        content = i.replace(/\<\/p\>/g, "</br>");
        let chapterEl: any = document.querySelector(".main-chapter .chapter-item");
        let width = Math.floor(chapterEl.offsetWidth);
        let height = Math.floor(chapterEl.offsetHeight);
        let textNumber = Math.floor((width * height) / 300);

        let iterator = Math.ceil(content.length / (textNumber * 2));
        for(let i = 0; i < iterator; i++) {
            let currentContent = content.substring(i * textNumber * 2, i * textNumber * 2 + textNumber * 2);
            state.chapterContent.push({
                left: currentContent.substring(0, currentContent.length / 2),
                right: currentContent.substring(currentContent.length / 2, currentContent.length)
            });
        }

        showChapterContent();
    }

    function showChapterContent() {
        let leftItem: any = document.querySelector(".main-chapter .left");
        let rightItem: any = document.querySelector(".main-chapter .right");
        leftItem.innerHTML = state.chapterContent[state.chapterIndex]["left"];
        rightItem.innerHTML = state.chapterContent[state.chapterIndex]["right"];
    }

    function changePage(type) {
        if (type == "pre") {
            if (state.chapterIndex == 0) return;
            state.chapterIndex--;
        } else {
            if (state.chapterIndex == state.chapterContent.length - 1) return;
            state.chapterIndex++;
        }
        showChapterContent();
    }

    onMounted(() => {
        // if (!route.params || !route.params.bId || !route.params.cId) return;
        // state.bookId = route.params.bId;
        // state.chapterId = route.params.cId;
        state.id = 1;
        getBookChapter();
    });
</script>

<style lang="scss" scoped>
    .book-chapter-wrapper {
        display: flex;
        width: 100%;

        .left-wrapper {
            width: calc(100% - 120px);
            height: 100%;

            .top-navbar {
                padding: 0
            }
        }

        .main-wrapper {
            margin-left: 60px;
            border-radius: 12px;
            padding: 20px 30px;
            height: calc(100% - 80px);
            background: var(--whiteColor);

            .name {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: var(--infoColor);
            }

            .main-chapter {
                display: flex;
                justify-content: space-between;
                height: calc(100% - 90px);
                margin: 20px 0;

                // p {
                //     width: 45%;
                //     line-height: 1.6;
                //     margin-bottom: 10px;
                //     color: var(--textColor);
                // }

                .chapter-item {
                    width: 48%;
                    height: 100%;
                    color: var(--textColor);
                    letter-spacing: 1px;
                    line-height: 1.4;
                }
            }

            .bottom-page {
                display: flex;
                justify-content: space-between;

                .btn {
                    font-size: 12px;
                    color: var(--infoColor);
                    padding: 6px 12px;
                    border-radius: 15px;
                    cursor: pointer;
                    border: 1px solid var(--borderColor);

                    &:hover {
                        background: var(--backColor);
                    }
                }
            }
        }

        .tool-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 1;

            .icon-wrapper {
                width: 36px;
                height: 36px;
                line-height: 36px;
                border-radius: 10px;
                margin-bottom: 20px;
                background: var(--whiteColor);
                text-align: center;
                cursor: pointer;
                transition: all .2s ease;

                .iconfont {
                    font-size: 18px;
                    color: var(--stressColor);
                    transition: all .2s ease;
                }

                &:hover {
                    background: var(--activeColor);

                    .iconfont {
                        color: var(--whiteColor);
                    }
                }
            }
        }
    }
</style>