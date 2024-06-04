<template>
    <div class="book-detail-wrapper">
        <div class="back" @click="$emit('back')">
            <i class="iconfont icon-arrowLeft"></i>
            <span>返回</span>
        </div>
        <div class="book-detail">
            <div class="book-info flex-between">
                <div class="left-wrapper flex-start">
                    <img class="book-cover" src="@/assets/image/book/cover3.jpg" alt="">
                    <div class="center-wrapper">
                        <div class="info-wrapper">
                            <div class="name">{{ bookInfo.name }}</div>
                            <div class="info flex-between">
                                <span>作者：{{ bookInfo.author }}</span>
                                <span>创作于{{ bookInfo.createDate }}</span>
                            </div>
                            <div class="info flex-between">
                                <span>阅读量：{{ bookInfo.readNum }}</span>
                                <span>收藏量：{{ bookInfo.collectNum }}</span>
                                <span>评分：{{ bookInfo.rate }}</span>
                            </div>
                        </div>
                        <div class="button-wrapper">
                            <div class="button start">开始阅读</div>
                            <div class="button">加入书架</div>
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
                {{ bookInfo.desc }}
            </div>
            <div class="tab-wrapper">
                <div class="tab catalog" :class="{ 'select': selectTab === 'catalog' }" @click="selectTab = 'catalog'">章节目录</div>
                <div class="tab comment" :class="{ 'select': selectTab === 'comment' }" @click="selectTab = 'comment'">评论</div>
            </div>
            <!-- 章节目录列表 -->
            <div class="catalog-list" v-if="selectTab === 'catalog'">
                <div class="catalog-wrapper" v-for="(item, index) in chapterList" :key="index">
                    <div class="catalog">
                        <div class="chapter">第 {{ index + 1 }} 章</div>
                        <div class="name">{{ item.name }}</div>
                        <div class="tag" :class="item.status">{{ item.status === 'read' ? '已读' : item.status === 'reading' ? '正在读' : '未读' }}</div>
                    </div>
                </div>
            </div>
            <!-- 评论 -->
            <div class="comment-wrapper" v-else>
                <div class="input-wrapper">
                    <textarea class="input" maxlength="300" placeholder="请输入评论内容" @input="commentInput" @blur="commentBlur()" :style="{ height: `${inputHeight}px` }"></textarea>
                    <span class="submit">发布</span>
                </div>
                <div class="comment-list">
                    <div class="comment-item">
                        <div class="top-comment flex-start" v-for="(item, index) in commentList" :key="index">
                            <img class="user-avatar" src="@/assets/image/book/cover5.jpg" alt="">
                            <div class="comment-info">
                                <div class="user-info flex-between">
                                    <div class="name">{{ item.userName }}</div>
                                    <div class="right">
                                        <span class="comment-date">{{ item.date }}</span>
                                        <span>来自海{{ item.from }}</span>
                                    </div>
                                </div>
                                <div class="comment">
                                    {{ item.content }}
                                </div>
                                <div class="operation flex-end">
                                    <span class="add-comment">评论</span>
                                    <span>点赞 {{ item.likeNum }}</span>
                                </div>
                                <div class="more-comment" v-if="item.innerComment.length && !openComment[Number(item.id)]" @click="openComment[Number(item.id)] = true">查看{{ item.innerComment.length }}条回复></div>
                                <template v-if="item.innerComment.length && openComment[Number(item.id)]">
                                    <div class="inner-comment comment-item flex-start" v-for="(item, index) in commentList" :key="index">
                                        <img class="user-avatar" src="@/assets/image/book/cover6.jpg" alt="">
                                        <div class="comment-info">
                                            <div class="user-info flex-between">
                                                <div class="name">{{ item.userName }}</div>
                                                <div class="right">
                                                    <span class="comment-date">{{ item.date }}</span>
                                                    <span>来自海{{ item.from }}</span>
                                                </div>
                                            </div>
                                            <div class="comment">
                                                {{ item.content }}
                                            </div>
                                            <div class="operation flex-end">
                                                <span>点赞 {{ item.likeNum }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="more-comment" @click="openComment[Number(item.id)] = false">收起评论></div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { ref, reactive, toRefs, defineComponent, onMounted, type Ref } from 'vue';

    interface chapterItem {
        id: Number | String,
        name: String,
        status: String
    }
    interface bookItem {
        id: Number | String,
        name: String,
        author: String,
        createDate: String,
        readNum: Number,
        collectNum: Number,
        rate: Number,
        desc: String,
    }
    interface commentItem {
        id: Number | String,
        content: String,
        userName: String,
        date: String,
        from: String,
        innerComment: commentItem[] | [],
        likeNum: Number,
    }

    export default defineComponent({
        name: 'BookDetail',
        props: {
            id: {
                type: [String, Number],
                default: ''
            }
        },
        setup() {
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
            const bookInfo = ref({} as bookItem);
            const chapterList = ref([] as chapterItem[]);
            const commentList = ref([] as commentItem[]);
            const state = reactive({
                selectTab: '',              // catalog or comment
                openComment: {}
            });

            let hiddenTextarea: any;
            let inputHeight: Ref<Number> = ref(90);   

            function commentInput(e) {
                let target = e.target;
                if (!hiddenTextarea) {
                    hiddenTextarea = document.createElement('textarea');
                    document.body.appendChild(hiddenTextarea);
                }
                const { borderSize, paddingSize, contextStyle } = calculateNodeStyling(e.target);
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

            onMounted(() => {
                bookInfo.value = {
                    id: 1,
                    name: '一只猫咪的故事',
                    author: 'fei',
                    createDate: '2022.02.22',
                    readNum: 6,
                    collectNum: 6,
                    rate: 5.0,
                    desc: '下面我们会从不同维度分析一下这个APP的社交分享功能设计，看看这里面有哪些值得探讨的地方。用户分享内容到社交媒体或好友，不应该是一种粗暴的强制行为，我们应该在保证产品本身内容有吸引力的核心前提下，仔细揣摩用户心理，结合产品本身的特色，在不同情境下提供给用户最合适的分享内容。',
                }
                chapterList.value = [
                    { id: 1, name: '你是谁？', status: 'reading' },
                    { id: 2, name: '我不知道我是谁', status: 'unread' },
                    { id: 3, name: '那你从何而来？', status: 'unread' },
                    { id: 4, name: '我也不知道我从哪里来，请问这里是哪里呀？！', status: 'read' },
                    { id: 5, name: '呦呵，你这人好生奇怪', status: 'reading' },
                    { id: 6, name: '喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵', status: 'read' }
                ];
                let currentCommentList =  [
                    {
                        id: 1,
                        content: '尤其是刚上线的产品，很难通过产品的内部体系来实现快速的用户增长，所以会更加依赖于分享来达到广泛的传播，获取目标用户。',
                        userName: '香菜和榴莲真好吃',
                        date: '6月4日 12:34',
                        from: '海南',
                        innerComment: [],
                        likeNum: 66,
                    },
                    {
                        id: 2,
                        content: '所以监听用户的截图操作，提示用户进行分享，既缩短了以前分享截图的操作路径，避免了在之前长路径中的行为流失（比如截图完成后忘记分享或觉得麻烦放弃分享等等），也让用户觉得更加贴心。',
                        userName: '为你明灯三千',
                        date: '6月8日 09:10',
                        from: '黑龙江',
                        innerComment: [
                            {
                                id: 1,
                                content: '尤其是刚上线的产品，很难通过产品的内部体系来实现快速的用户增长',
                                userName: '香菜和榴莲真好吃',
                                date: '6月4日 12:34',
                                from: '海南',
                                innerComment: [],
                                likeNum: 66,
                            },
                            {
                                id: 32,
                                content: '所以会更加依赖于分享来达到广泛的传播，获取目标用户。',
                                userName: '香菜和榴莲真好吃',
                                date: '6月4日 12:34',
                                from: '海南',
                                innerComment: [],
                                likeNum: 66,
                            }
                        ],
                        likeNum: 666,
                    }
                ];
                commentList.value = currentCommentList;
                currentCommentList.forEach(comment => {
                    state.openComment[Number(comment.id)] = false;
                });
                state.selectTab = 'catalog';
            });

            return {
                bookInfo,
                chapterList,
                commentList,
                inputHeight,
                commentInput,
                commentBlur,
                ...toRefs(state),
            }
        }
    })
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
                            width: 100px;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            color: var(--whiteColor);
                            border-radius: 10px;
                            background: var(--mainColor);
                            box-shadow: 0 4px 10px 0 rgba(140, 171, 145, .5);
                            cursor: pointer;
                            &.start {
                                margin-right: 20px;
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
                    height: 40px;
                    line-height: 40px;
                    padding: 0 15px;
                    color: var(--mainColor);
                    border-radius: 8px;
                    background: var(--backColor);
                    cursor: pointer;
                    &.catalog {
                        margin-right: 10px;
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
                                        color: var(--dimColor);
                                    }
                                    .comment-date {
                                        margin-right: 6px;
                                    }
                                }
                            }

                            .operation {
                                font-size: 14px;
                                margin: 4px 0;
                                span {
                                    color: var(--dimColor);
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
                                border-top: 1px solid rgba(125, 133, 146, 0.1);
                            }
                        }

                        .top-comment {
                            align-items: flex-start;
                            width: 100%;
                            margin-top: 20px;
                            padding-bottom: 20px;
                            border-bottom: 1px solid rgba(125, 133, 146, 0.1);
                        }
                    }
                }
            }
        }
    }
</style>