<template>
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
            <div class="mt-[22px]">
                <!-- 展示数据 -->
                <!-- <el-table border stripe :data="resultData">
                    <el-table-column type="selection" width="75" align="center" />
                    <el-table-column label="商品橱" width="150" align="center">
                        <template #default="{ row }">
                            <el-image :src="baseURL + row.goodsInfo.goods_photo" class="w-[80px] h-[80px]" fit="cover"
                                :preview-src-list="[baseURL + row.goodsInfo.goods_photo]" :preview-teleported="true" />
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" prop="goodsInfo.goods_name" align="center">
                    </el-table-column>
                    <el-table-column label="单价" prop="goodsInfo.goods_price" width="150" align="center">
                    </el-table-column>
                    <el-table-column label="数量" width="150" prop="car_goods_num" align="center">
                    </el-table-column>
                    <el-table-column label="小计" width="150" align="center">
                    </el-table-column>
                    <el-table-column label="操作" width="150" align="center">
                        <el-button type="danger" size="small">删除</el-button>
                    </el-table-column>
                </el-table> -->


            </div>
        </div>
    </page-view>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue';
import { reactive, ref } from "vue";
import API from "@/utils/API/index.js";
import { onMounted, inject } from "vue";

const baseURL = inject("baseURL");


const resultData = ref({
    goods_photo: "",
    goods_name: "",
    goods_price: "",
    car_goods_num: "",
})

const queryData = () => {
    API.shopCarInfo.getMyShopCarList()
        .then(result => {
            console.log(result);
            // console.log(result.goodsInfo.goods_photo)
            resultData.value = result;
            // console.log(resultData.value.goodsInfo.goods_photo)
        })
}


onMounted(() => {
    queryData();
})
</script>

<style lang="scss" scoped>

</style>