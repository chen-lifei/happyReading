<template>
    <div class="book-chapter-wrapper">
        <div class="left-wrapper">
            <TopNavbar class="top-navbar" />
            <div class="main-wrapper">
                <div class="name">
                    <div class="book-name">书籍名称</div>
                    <div class="chapter-name">第一章：章节名称</div>
                </div>
                <div class="main-chapter">
                    <p>章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章</p>
                    <p>章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容</p>
                    <p>章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容</p>
                    <p>章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章</p>
                    <p>章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容</p>
                    <p>章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容</p>
                    <p>章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容</p>
                    <p>章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容</p>
                    <p>章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章</p>
                    <p>章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容</p>
                    <p>章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容</p>
                    <p>章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章节内容章</p>
                </div>
                <div class="bottom-page">
                    <div class="btn pre-page">上一页</div>
                    <div class="btn next-page">下一页</div>
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

    import TopNavbar from "@/components/Navbar/TopNavbar.vue";

    const route = useRoute();
    const router = useRouter();
    const state = reactive({
        bookId: "" as string | string[],
        chapterId: "" as string | string[],
        toolList: [
            { content: "首页", icon: "icon-home", name: "home" },
            { content: "评论", icon: "icon-message", name: "comment" },
            { content: "章节", icon: "icon-home", name: "chapter" },
            { content: "字体", icon: "icon-message", name: "text" },
        ]
    });

    function handleTool(tool) {
        console.log(tool);
        switch(tool) {
            case "home": 
                router.push("/home");
                break;
            default:
                break;
        }
    }

    onMounted(() => {
        if (!route.params || !route.params.bId || !route.params.cId) return;
        state.bookId = route.params.bId;
        state.chapterId = route.params.cId;
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
                flex-direction: column;
                flex-wrap: wrap;
                align-items: center;
                height: calc(100% - 90px);
                margin: 20px 0;

                p {
                    width: 45%;
                    line-height: 1.6;
                    margin-bottom: 10px;
                    color: var(--textColor);
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