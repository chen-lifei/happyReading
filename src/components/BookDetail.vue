<template>
    <div class="book-detail-wrapper">
        <div class="back" @click="$emit('back')">
            <i class="iconfont icon-arrowLeft"></i>
            <span>返回</span>
        </div>
        <div class="book-detail">
            <div class="book-info flex-between">
                <div class="left-wrapper flex-start">
                    <img class="book-cover" :src="state.bookInfo.cover" alt="">
                    <div class="center-wrapper">
                        <div class="info-wrapper">
                            <div class="name">{{ state.bookInfo.name }}</div>
                            <div class="info flex-between">
                                <span>作者：{{ state.bookInfo.writer }}</span>
                                <span>创作于{{ state.bookInfo.finish_time }}</span>
                            </div>
                            <div class="info flex-between">
                                <span>阅读量：{{ state.bookInfo.read_time }}</span>
                                <span>收藏量：{{ state.bookInfo.collections }}</span>
                                <!-- <span>评分：{{ state.bookInfo.rate }}</span> -->
                            </div>
                        </div>
                        <div class="button-wrapper">
                            <div class="button start">开始阅读</div>
                            <div class="button">加入书柜</div>
                        </div>
                    </div>
                </div>
                <div class="reader">
                    <div class="text">他们也在读</div>
                    <div class="user-list">
                        <el-tooltip content="Bruce" placement="top" effect="customized-top">
                            <img class="user user1" src="@/assets/image/book/cover4.jpg" alt="">
                        </el-tooltip>
                        <el-tooltip content="Ivan" placement="top" effect="customized-top">
                            <img class="user user2" src="@/assets/image/book/cover5.jpg" alt="">
                        </el-tooltip>
                        <el-tooltip content="Sivan" placement="top" effect="customized-top">
                            <img class="user user3" src="@/assets/image/book/cover6.jpg" alt="">
                        </el-tooltip>
                        <el-tooltip content="Haven" placement="top" effect="customized-top">
                            <img class="user user4" src="@/assets/image/book/cover7.jpg" alt="">
                        </el-tooltip>
                    </div>
                </div>
            </div>
            <div class="book-desc">
                简介：<br />
                {{ state.bookInfo.introduction }}
            </div>
            <div class="tab-wrapper">
                <div class="tab catalog" :class="{ 'select': state.selectTab === 'catalog' }" @click="state.selectTab = 'catalog'">章节目录</div>
                <div class="tab comment" :class="{ 'select': state.selectTab === 'comment' }" @click="state.selectTab = 'comment'">评论</div>
            </div>
            <!-- 章节目录列表 -->
            <div class="catalog-list" v-if="state.selectTab === 'catalog'">
                <div class="catalog-wrapper" @click="toReadChapter(item.id)" v-for="(item, index) in state.chapterList" :key="index">
                    <div class="catalog">
                        <div class="chapter">第 {{ index + 1 }} 章</div>
                        <div class="name">{{ item.chapter_name }}</div>
                        <div class="tag" :class="item.status">{{ item.status === "read" ? "已读" : item.status === "reading" ? "正在读" : "未读" }}</div>
                    </div>
                </div>
            </div>
            <!-- 评论 -->
            <div class="comment-wrapper" v-else>
                <div class="input-wrapper">
                    <textarea class="input" v-model="state.commentContent" maxlength="300" placeholder="请输入评论内容" @input="commentInput" @blur="commentBlur()" :style="{ height: `${inputHeight}px` }"></textarea>
                    <span class="submit" @click="handleSubmitComment">发布</span>
                </div>
                <div class="comment-name">评论列表：</div>
                <div class="comment-list" v-if="state.commentList.length">
                    <div class="comment-item">
                        <div class="top-comment flex-start" v-for="item in state.commentList" :key="item.id">
                            <img class="user-avatar" :src="formatAvatar(item.avatar)" alt="">
                            <div class="comment-info">
                                <div class="user-info flex-between">
                                    <div class="name">{{ item.name }}</div>
                                    <div class="right">
                                        <span class="comment-date">{{ formatDate(item.comment_date) }}</span>
                                        <span>来自{{ item.from_region }}</span>
                                    </div>
                                </div>
                                <div class="comment">
                                    {{ item.content }}
                                </div>
                                <div class="operation flex-end">
                                    <!-- <span class="add-comment">评论</span> -->
                                    <span>点赞 {{ 9 }}</span>
                                </div>
                                <div class="more-comment" v-if="item.childComment.length && !state.openComment[Number(item.id)]" @click="state.openComment[Number(item.id)] = true">查看{{ item.childComment.length }}条回复></div>
                                <template v-if="item.childComment.length && state.openComment[Number(item.id)]">
                                    <div class="inner-comment comment-item flex-start" v-for="cItem in item.childComment" :key="cItem.id">
                                        <img class="user-avatar" :src="formatAvatar(cItem.avatar)" alt="">
                                        <div class="comment-info">
                                            <div class="user-info flex-between">
                                                <div class="name">{{ cItem.name }}</div>
                                                <div class="right">
                                                    <span class="comment-date">{{ formatDate(cItem.comment_date) }}</span>
                                                    <span>来自{{ cItem.from_region }}</span>
                                                </div>
                                            </div>
                                            <div class="comment">
                                                {{ cItem.content }}
                                            </div>
                                            <div class="operation flex-end">
                                                <span>点赞 {{ 6 }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="more-comment" @click="state.openComment[Number(item.id)] = false">收起评论></div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-empty" v-else>
                    <p>暂未有评论内容~</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="BookDetail">
    import { ref, reactive, onMounted, type Ref } from "vue";
    import { validURL } from "@/utils/validate";
    import { requestUrl } from "@/utils/request";
    import { useRouter } from "vue-router";
    import { useUserStore } from "@/stores/user";
    import { ElMessage } from 'element-plus';

    import { fetchBookInfo, fetchBookComment, addBookComment } from "@/api/book";

    const props = defineProps({
        id: {
            type: [String, Number],
            default: ""
        }
    });
    const router = useRouter();
    const user = useUserStore();

    const HIDDEN_STYLE = `height:0 !important;visibility:hidden !important;overflow:hidden !important;z-index:-999 !important;`;
    const CONTEXT_STYLE = [
        'letter-spacing',
        'line-height',
        'padding-top',
        'padding-bottom',
        'font-family',
        'font-weight',
        'font-size',
        'text-rendering',
        'text-transform',
        'width',
        'text-indent',
        'padding-left',
        'padding-right',
        'border-width',
        'box-sizing',
    ];

    const state = reactive({
        selectTab: "",              // catalog or comment
        commentContent: "",
        openComment: {},
        bookInfo: {} as bookItem,
        chapterList: [] as chapterItem[],
        commentList: [] as commentItem[]
    });

    let hiddenTextarea: any;
    let inputHeight: Ref<Number> = ref(90);   

    function commentInput(e) {
        let target = e.target;
        if (!hiddenTextarea) {
            hiddenTextarea = document.createElement('textarea');
            document.body.appendChild(hiddenTextarea);
        }
        const { borderSize, contextStyle } = calculateNodeStyling(e.target);
        hiddenTextarea.setAttribute('id', 'hidden-textarea');
        hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`)
        hiddenTextarea.value = target.value || target.placeholder || '';

        let height = Math.max(90, hiddenTextarea.scrollHeight + borderSize);
        inputHeight.value = Math.ceil(height);
    }

    function commentBlur() {
        hiddenTextarea = null;
        let hiddenTextareaEle = document.querySelector('#hidden-textarea');
        if (hiddenTextareaEle) document.body.removeChild(hiddenTextareaEle);
    }

    function calculateNodeStyling(targetElement) {
        const style = window.getComputedStyle(targetElement)
        const boxSizing = style.getPropertyValue('box-sizing')
        const paddingSize =
            Number.parseFloat(style.getPropertyValue('padding-bottom')) +
            Number.parseFloat(style.getPropertyValue('padding-top'))
        const borderSize =
            Number.parseFloat(style.getPropertyValue('border-bottom-width')) +
            Number.parseFloat(style.getPropertyValue('border-top-width'))
        const contextStyle = CONTEXT_STYLE.map(
            (name) => `${name}:${style.getPropertyValue(name)}`
        ).join(';')
        return { contextStyle, paddingSize, borderSize, boxSizing }
    }

    function getBookData() {
        if (!props.id) return;
        fetchBookInfo({
            id: props.id
        }).then(res => {
            state.bookInfo = res.result;
            state.bookInfo.cover = validURL(state.bookInfo.cover) ? state.bookInfo.cover : `${requestUrl}/api${state.bookInfo.cover}`;
        });
        state.chapterList = [
            { id: 1, chapter_name: "第一章内容简介", book_id: 1, chapter_index: 1, content: "", status: "reading" },
            { id: 2, chapter_name: "第二章内容简介", book_id: 1, chapter_index: 1, content: "", status: "unread" },
            { id: 3, chapter_name: "第三章内容简介", book_id: 1, chapter_index: 1, content: "", status: "unread" },
            { id: 4, chapter_name: "第四章内容简介", book_id: 1, chapter_index: 1, content: "", status: "read" },
            { id: 5, chapter_name: "第五章内容简介", book_id: 1, chapter_index: 1, content: "", status: "reading" },
            { id: 6, chapter_name: "第六章内容简介", book_id: 1, chapter_index: 1, content: "", status: "read" }
        ];
        
        state.selectTab = 'catalog';
    }

    function toReadChapter(cId) {
        router.push({ name: "ChapterView", params: { bId: props.id, cId: cId } });
    }

    function getBookComment() {
        if (!props.id) return;
        fetchBookComment({
            id: props.id
        }).then(res => {
            if (res.result && res.result.length) {
                state.commentList = res.result;
                state.commentList.forEach(comment => {
                    state.openComment[Number(comment.id)] = false;
                });
            }
        });
    }

    function formatAvatar(avatar) {
        if (avatar) {
            avatar = validURL(avatar) ? avatar : `${requestUrl}/api${avatar}`;
        } else {
            avatar = "https://img1.baidu.com/it/u=2741160338,2445069712&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
        }
        return avatar;
    }

    function formatDate(data) {
        let date = new Date(data);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = (date.getDate()).toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function handleSubmitComment() {
        if (!state.commentContent) return ElMessage.error("评论内容不能为空~");
        if (state.commentContent.length > 500) return ElMessage.error("评论字数不能超出500~");
        if (!props.id) return;
        let date = formatDate(new Date().getTime());

        addBookComment({
            bookId: props.id, content: state.commentContent, uId: user.userInfo.id, date, toCommentId: null, region: "广东", 
        }).then(res => {
            if (res.status == 1) {
                ElMessage.success("评论成功~");
                state.commentList.unshift({
                    id: res.result,
                    childComment: [],
                    content: state.commentContent,
                    name: user.userInfo.name,
                    avatar: user.userInfo.avatar,
                    comment_date: date,
                    from_region: "广东"
                });
                state.commentContent = "";
            }
        });
    }

    onMounted(() => {
        getBookData();
        getBookComment();
    });
</script>

<style lang="scss" scoped>
    .book-detail-wrapper {
        .back {
            display: flex;
            align-items: center;
            width: 60px;
            margin-bottom: 20px;
            cursor: pointer;

            .iconfont {
                margin-right: 8px;
            }

            &:hover {
                .iconfont,
                span {
                    color: var(--mainColor);
                }
            }
        }

        .book-detail {
            width: 100%;
            min-width: 640px;
            height: calc(100% - 42px);
            border-radius: 10px;
            background: var(--whiteColor);
            padding: 30px;
            overflow: hidden auto;

            .book-info {
                width: 100%;
                align-items: flex-start;
                margin-bottom: 10px;

                .left-wrapper {
                    align-items: flex-start;
                    width: calc(100% - 88px);
                }

                .book-cover {
                    width: 200px;
                    height: 240px;
                    object-fit: cover;
                    border-radius: 20px;
                    margin-right: 5%;
                }

                .center-wrapper {
                    width: 300px;

                    .info-wrapper {
                        padding: 30px 20px;
                        margin-bottom: 20px;
                        border-radius: 16px;
                        background: var(--backColor);

                        .name {
                            font-size: 20px;
                            font-weight: bold;
                        }

                        .info {
                            margin-top: 10px;
                        }
                    }

                    .button-wrapper {
                        .button {
                            display: inline-block;
                            width: 88px;
                            height: 36px;
                            line-height: 36px;
                            text-align: center;
                            color: var(--mainColor);
                            border-radius: 6px;
                            transition: all .2s ease;
                            background: var(--backColor);
                            box-shadow: 0 4px 10px 0 rgba(140, 171, 145, .5);
                            cursor: pointer;
                            &.start {
                                margin-right: 24px;
                            }
                            &:hover {
                                color: var(--whiteColor);
                                background: var(--mainColor);
                            }
                        }
                    }
                }

                .reader {
                    .text {
                        font-size: 12px;
                        margin-bottom: 8px;
                    }

                    .user-list {
                        position: relative;

                        .user {
                            position: absolute;
                            top: 0;
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            border: 2px solid var(--whiteColor);
                            image-rendering: -webkit-optimize-contrast;
                            cursor: pointer;

                            &:hover {
                                transform: translateY(-2px);
                                transition: all .2s ease;
                                z-index: 2;
                            }
                        }
                        .user1 {
                            position: relative;
                        }
                        .user2 {
                            left: 18px;
                        }
                        .user3 {
                            left: 36px;
                        }
                        .user4 {
                            left: 54px;
                        }
                    }
                }
            }

            .book-desc {
                line-height: 1.5;
            }

            .tab-wrapper {
                margin: 20px 0;
                .tab {
                    display: inline-block;
                    height: 36px;
                    line-height: 36px;
                    padding: 0 15px;
                    color: var(--mainColor);
                    border-radius: 6px;
                    background: var(--backColor);
                    box-shadow: 0 4px 10px 0 rgba(140, 171, 145, .5);
                    cursor: pointer;
                    transition: all .2s ease;
                    &.catalog {
                        margin-right: 20px;
                    }
                    &:hover,
                    &.select {
                        color: var(--whiteColor);
                        background: var(--mainColor);
                    }
                }
            }

            .catalog-list {
                display: flex;
                flex-wrap: wrap;
                width: calc(100% + 20px);

                .catalog-wrapper {
                    display: flex;
                    width: 20%;
                    height: 108px;
                    margin-bottom: 20px;
                    border-right: 20px solid var(--whiteColor);
                    box-sizing: border-box;

                    .catalog {
                        position: relative;
                        width: 100%;
                        padding: 10px;
                        border-radius: 6px;
                        background: var(--backColor);
                        cursor: pointer;

                        .chapter {
                            color: var(--textColor);
                            font-size: 12px;
                            margin-bottom: 4px;
                        }

                        .name {
                            font-size: 14px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            color: var(--stressColor);
                        }

                        .tag {
                            position: absolute;
                            right: 10px;
                            bottom: 10px;
                            width: 50px;
                            height: 24px;
                            font-size: 12px;
                            line-height: 24px;
                            text-align: center;
                            border-radius: 6px;

                            &.unread {
                                color: #bcbcc2;
                                background: rgba(188, 188, 194, 0.1);
                            }
                            &.reading {
                                color: #ffbd21;
                                background: rgba(255, 189, 33, 0.1);
                            }
                            &.read {
                                color: #00d097;
                                background: rgba(0, 208, 151, 0.1);
                            }
                        }
                    }
                }
            }

            .comment-wrapper {
                .input-wrapper {
                    position: relative;
                    width: 100%;
                    height: auto;
                    .input {
                        width: 100%;
                        height: 90px;
                        padding: 10px 15px 30px;
                        border-radius: 10px;
                        resize: none;
                        outline: none;
                        border: 1px solid transparent;
                        background: var(--backColor);
                        &:focus {
                            border-color: var(--mainColor);
                        }
                        &::placeholder {
                            color: var(--dimColor);
                        }
                    }

                    .submit {
                        position: absolute;
                        bottom: 10px;
                        right: 20px;
                        font-size: 14px;
                        cursor: pointer;
                        &:hover {
                            color: var(--mainColor);
                        }
                    }
                }
                
                .comment-name {
                    margin: 20px 0;
                    color: var(--stressColor);
                }

                .comment-list {
                    .comment-item {
                        .user-avatar {
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                            image-rendering: -webkit-optimize-contrast;
                        }

                        .comment-info {
                            width: calc(100% - 36px);
                            margin-left: 15px;

                            .user-info {
                                height: 36px;
                                margin-bottom: 10px;

                                .right {
                                    font-size: 12px;
                                    span {
                                        color: var(--infoColor);
                                        opacity: .8;
                                    }
                                    .comment-date {
                                        margin-right: 10px;
                                    }
                                }
                            }

                            .operation {
                                font-size: 14px;
                                margin: 4px 0;
                                span {
                                    color: var(--infoColor);
                                    opacity: .8;
                                    cursor: pointer;
                                }
                                .add-comment {
                                    margin-right: 6px;
                                }
                            }

                            .more-comment {
                                font-size: 14px;
                                cursor: pointer;
                            }

                            .inner-comment {
                                align-items: flex-start;
                                margin-top: 20px;
                                padding-top: 20px;
                                border-top: 1px solid var(--borderColor);
                            }
                        }

                        .top-comment {
                            align-items: flex-start;
                            width: 100%;
                            margin-top: 20px;
                            padding-bottom: 20px;
                            border-bottom: 1px solid var(--borderColor);
                        }
                    }
                }

                .comment-empty {
                    text-align: center;
                    color: var(--infoColor);
                }
            }
        }
    }
</style>