<template>
    <div class="select-bar">
        <div class="top-nav">
            <span class="name" v-if="state.isNavList">分类：</span>
            <span class="select-name">{{ state.isNavList ? (state.selectTopNav.cname || state.selectTopNav.name) : topNav }}</span>
            <el-dropdown  v-if="state.isNavList" trigger="click" class="dropdown-wrapper" @command="selectNav" :teleported="false">
                <i class="iconfont icon-arrowDown" v-if="state.isNavList"></i>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            v-for="(item, index) in topNav"
                            :key="index"
                            :command="item"
                            :class="{ 'selected': item.id === state.selectTopNav.id }">
                            {{ item.cname || item.name }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="line"></div>
        </div>

        <div class="second-nav">
            <div class="nav-item"
                v-for="(item, index) in state.currentNavList"
                :key="index"
                :class="{ 'selected': item.id === state.currentItem.id }"
                @click="selectItem(item)">
                <div class="name">{{ item.type_name || item.name }}</div>
                <div class="desc">
                    <p class="number">数量：{{ item.type_count || item.number || 0 }}本</p>
                    <p class="click-number" v-if="item.clickNumber">点击量：{{ item.clickNumber }}</p>
                    <p class="create-date" v-if="item.createDate">创建时间：{{ item.createDate }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="SelectNavbar">
    import { reactive, watch, onMounted } from 'vue';

    const props = defineProps({
        topNav: {
            type: [Array, String] as any,
            default: ""
        },
        navList: {
            type: Array<object>,
            default: []
        }
    });

    const emit = defineEmits(['selectItem']);

    const state = reactive({
        isNavList: false,
        selectTopNav: {} as any,
        currentNavList: [] as any,
        currentItem: {} as any
    });

    watch(
        () => props.topNav,
        (topNav) => {
            state.isNavList = Array.isArray(topNav);
        
            if (state.isNavList) {
                selectNav(topNav[0]);
            } else {
                let navList = props.navList;
                state.currentNavList = navList;
                
                if (navList.length) selectItem(navList[0]);
            }
        },
        {
            immediate: true,
        },
    );

    function selectNav(item) {
        if (!item) return;
        
        state.selectTopNav = item;
        state.currentNavList = item.list;
        if (item.list) selectItem(item.list[0]);
    }

    function selectItem(item) {
        state.currentItem = item;
        
        emit("selectItem", { category: state.selectTopNav && state.selectTopNav.id, type: item && item.id });
    }

    onMounted(() => {
    });
</script>

<style lang="scss" scoped>
    .select-bar {
        width: 220px;
        border-radius: 20px;
        padding: 20px 10px;
        background: var(--whiteColor);
        overflow: auto;

        .top-nav {
            position: relative;
            width: 100%;
            padding: 0 0 15px 8px;

            .name,
            .select-name {
                color: var(--stressColor);
                font-weight: bold;
            }

            .iconfont {
                font-weight: bold;
                margin-left: 8px;
                cursor: pointer;
                transform: scale(.8);
                padding: 4px;
            }

            .line {
                position: absolute;
                left: -10px;
                bottom: 0;
                width: calc(100% + 20px);
                height: 1px;
                background: var(--borderColor);
            }

            :deep(.el-dropdown-menu) {
                li.selected {
                    color: var(--mainColor);
                    background-color: var(--hoverColor) !important;
                }
            }
        }

        .second-nav {
            padding: 20px 0;

            .nav-item {
                position: relative;
                padding: 8px 20px;
                margin-bottom: 10px;
                color: var(--textColor);
                border-radius: 10px;
                transition: all .4s ease;
                cursor: pointer;

                .name {
                    margin-bottom: 8px;
                    font-weight: bold;
                    transition: all .4s ease;
                }

                .desc {
                    font-size: 12px;
                    color: var(--textColor);

                    .number {
                        margin-right: 6px;
                    }

                    p {
                        line-height: 1.5;
                    }
                }

                &:hover {
                    background: var(--hoverColor);
                }

                &.selected {
                    background: var(--hoverColor);

                    .name {
                        color: var(--mainColor);
                    }
                }

                &.selected {
                    &::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: -10px;
                        height: 100%;
                        width: 4px;
                        border-radius: 6px 0 0 6px;
                        background: var(--mainColor);
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1000px) {
        .select-bar {
            width: 180px;
        }
    }

    @media screen and (max-width: 900px) {
        .select-bar {
            width: 160px;
        }
    }
</style>