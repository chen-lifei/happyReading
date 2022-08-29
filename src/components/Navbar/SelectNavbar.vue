<template>
    <div class="select-bar">
        <!-- <div class="top-nav">
            <span class="name">分类：</span>
            <span class="select-name">{{ isNavList ? selectTopNav : topNav }}</span>
            <i class="iconfont icon-arrowDown" @click="showDropdown = !showDropdown" v-if="isNavList"></i>
            <div class="line"></div>
            <div class="dropdown-wrapper hidden-scrollbar" v-if="showDropdown">
                <div class="dropdown-item"
                    v-for="(item, index) in topNav"
                    :key="index"
                    :class="{ 'selected': item.key === 'qingchun' }">
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div class="second-nav">
            <div class="nav-item"
                v-for="(item, index) in navList"
                :key="index"
                :class="{ 'selected': item.key === 'school' }"
                @click="selectItem(item)">
                <div class="name">{{ item.name }}</div>
                <div class="desc">
                    <span class="number" v-if="item.number">数量：{{ item.number }}本</span>
                    <span class="click-number" v-if="item.clickNumber">点击量：{{ item.clickNumber }}</span>
                    <span class="create-date" v-if="item.createDate">创建时间：{{ item.createDate }}</span>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script lang="ts">
    export default class SelectNavbar {
        // @Prop({ type: [Array, String], default: '' }) topNav: any;
        // @Prop({ type: Array, default: [] }) navList: any;

        isNavList = false;
        showDropdown = false;
        selectTopNav = '青春';

        mounted() {
            // this.isNavList = Array.isArray(this.topNav);
            
        }

        // currentSelect = this.topNav[0]
        // currentNav = this.currentSelect.list

        selectItem(item) {   
        }
    }
</script>

<style lang="less" scoped>
    .select-bar {
        width: 220px;
        border-radius: 20px;
        padding: 20px 10px;
        background: #FFFFFF;
        overflow: auto;

        .top-nav {
            position: relative;
            padding-bottom: 20px;

            .name,
            .select-name {
                font-weight: bold;
            }

            .iconfont {
                font-size: 12px;
                font-weight: bold;
                margin-left: 20px;
                cursor: pointer;
                transform: scale(.8);
            }

            .line {
                position: absolute;
                left: -10px;
                bottom: 0;
                width: calc(100% + 20px);
                height: 1px;
                background: var(--borderColor);
            }

            .dropdown-wrapper {
                position: absolute;
                top: 30px;
                width: 100%;
                height: auto;
                border-radius: 6px;
                max-height: 400px;
                padding: 15px 10px;
                overflow: hidden scroll;
                background: #FFFFFF;
                border: 1px solid var(--mainColor);
                box-shadow: 0 5px 15px 0 var(--activeColor);
                z-index: 2;

                .dropdown-item {
                    position: relative;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 20px;
                    border-radius: 5px;
                    cursor: pointer;

                    &:hover,
                    &.selected {
                        background: var(--hoverColor);
                    }

                    &.selected {
                        &::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            right: -10px;
                            height: 100%;
                            width: 4px;
                            border-radius: 6px;
                            background: var(--mainColor);
                        }
                    }
                }
            }
        }

        .second-nav {
            padding: 20px 0;

            .nav-item {
                position: relative;
                padding: 8px 20px;
                margin-bottom: 20px;
                cursor: pointer;

                .name {
                    margin-bottom: 8px;
                    color: var(--textColor);
                    font-weight: bold;
                }

                .desc {
                    font-size: 12px;
                    color: var(--dimColor);

                    .number {
                        margin-right: 6px;
                    }
                }

                &:hover,
                &.selected {
                    border-radius: 10px;
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
                        border-radius: 6px;
                        background: var(--mainColor);
                    }
                }
            }
        }
    }
</style>