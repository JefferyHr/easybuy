<template>
    <div class="header bg-[#333]  text-[#b0b0b0]">
        <div class=" base-width h-[40px] flex flex-row items-center justify-between">
            <div class="title-left  h-full flex items-center flex-row text-[12px] ">
                <a href="javascript:void(0)">小米商城</a>
                <a href="javascript:void(0)">MiUI</a>
                <a href="javascript:void(0)">LoT</a>
                <a href="javascript:void(0)">云服务</a>
                <a href="javascript:void(0)">天星数科</a>
                <a href="javascript:void(0)">有品</a>
                <a href="javascript:void(0)">小爱同学开放</a>
                <a href="javascript:void(0)">企业团购</a>
                <a href="javascript:void(0)">资质证照</a>
                <a href="javascript:void(0)">协议规则</a>
                <a href="javascript:void(0)">下载app</a>
                <a href="javascript:void(0)">Select Location</a>
            </div>
            <div class="title-right  h-full flex items-center flex-row text-[12px] ">
                <span>欢迎登录：H2204</span>
                <span>退出登录</span>
                <a>个人中心</a>
                <div
                    class="shop-car bg-[#424242] cursor-pointer h-full  w-[80px] flex items-center flex-row justify-center hover:text-primaryColor">
                    购物车</div>
            </div>
        </div>
    </div>
    <page-view class="flex flex-col ">
        <div class="page-box flex flex-1 flex-col  overflow-auto  base-width border ">
            <div class="h-[80px] flex flex-row w-[1226px] justify-between border-0 border-b border-[#ff6a00]">
                <div class="flex flex-row items-center">
                    <img src="../../src/assets/img/logo.png" class="w-[56px] h-[56px] ml-[22px]" alt="" />
                    <div class=" flex items-center">
                        <span class="text-[22px] ml-[22px]">我的购物车</span>
                        <span class="text-[12px] text-[#a4aab5] ml-[11px] ">温馨提示：产品是否购买成功，是以最终下单为准，请尽快结算</span>
                    </div>
                </div>
                <div class="flex items-center mr-[22px] ">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link text-primaryColor text-[16px]">
                            H2204
                            <el-icon class="text-primaryColor">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-item>个人中心</el-dropdown-item>
                            <el-dropdown-item>我的订单</el-dropdown-item>
                            <el-dropdown-item divided command="logOut">退出登录</el-dropdown-item>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div>
                <!-- 展示数据 -->
                <el-table border stripe>
                    <el-table-column type="selection" width="75" align="center" />
                    <el-table-column label="商品橱" prop="id" width="150" align="center"></el-table-column>
                    <el-table-column label="商品名称" prop="admin_name" align="center">
                    </el-table-column>
                    <el-table-column label="单价" prop="admin_tel" width="150" align="center">
                    </el-table-column>
                    <el-table-column label="数量" width="150" prop="admin_tel" align="center">
                    </el-table-column>
                    <el-table-column label="小计" width="150" prop="admin_tel" align="center">
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

            </div>
        </div>
    </page-view>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue';
const handleCommand = (command) => {
    console.log(command);
    switch (command) {
        case "logOut":
            logOut();
            break;
    }
}

const logOut = () => {
    ElMessageBox.confirm("你确认要退出吗？", "系统提示", {
        confirmButtonText: '确定退出',
        cancelButtonText: '我点错了',
        type: 'warning',
    }).then(() => {
        store.logOut();
        router.replace({
            name: "Login"
        });
    }).catch(() => {
    });

}

</script>

<style lang="scss" scoped>
.title-left,
.title-right {

    a,
    span {
        @apply cursor-pointer mr-10;

        &:hover {
            @apply text-primaryColor
        }
    }
}

.el-button {
    color: white
}

.nav-bar {
    a {
        @apply mx-12;

        &:hover {
            @apply text-primaryColor
        }
    }
}
</style>