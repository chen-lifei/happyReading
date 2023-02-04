<template>
    <div class="pagination-wrapper">
        <el-pagination
            background
            :total="total"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            :hide-on-single-page="hideSingle"
            layout="total, sizes, ->, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent ({
        name: 'Pagination',
        props: {
            currentPage: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 10
            },
            pageSizes: {
                type: Array<number>,
                default: () => [10, 20, 30, 40, 50]
            },
            total: {
                type: Number,
                default: 0
            },
            hideSingle: {
                type: Boolean,
                default: true
            }
        },
        emits: ["sizeChange", "pageChange"],
        setup(props, { emit }) {
            function handleSizeChange(size) {
                emit('sizeChange', size);
            }

            function handleCurrentChange(page) {
                emit('pageChange', page);
            }

            return {
                handleSizeChange,
                handleCurrentChange,
            }
        }
    });
</script>

<style lang="scss" scoped>
    .pagination-wrapper {
        margin-top: 20px;
    }
</style>