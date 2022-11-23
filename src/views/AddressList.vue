<template>
    <page-view class="p-[22px]">
        <el-card>
            <template #header>
                <div class="flex flex-row justify-between">
                    <span>我的收货地址</span>
                    <el-button plain color="#ff6a00">新增地址</el-button>
                </div>
            </template>
            <!-- 展示数据 -->
            <el-table border stripe>
                <el-table-column label="收件人姓名" prop="id" width="200" align="center"></el-table-column>
                <el-table-column label="收件人电话" prop="admin_name" width="200" align="center">
                </el-table-column>
                <el-table-column label="收货地址" prop="admin_tel" align="center">
                </el-table-column>
                <el-table-column label="地址标签" width="150" prop="admin_tel" align="center">
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <el-button type="danger" size="small">删除</el-button>
                </el-table-column>
            </el-table>

            <!-- 页码
            <div class="flex flex-row justify-between items-center">
                <div class="text-[14px]">当前第{{ queryFormData.pageIndex }}页，共{{ resultData.pageCount }}页，共{{
                        resultData.totalCount
                }}条</div>
                <el-pagination background layout="prev, pager, next" :total="resultData.totalCount"
                    @current-change="currentChange" />
            </div> -->

        </el-card>
    </page-view>
</template>
<script setup>

</script>
<style scoped>

</style>