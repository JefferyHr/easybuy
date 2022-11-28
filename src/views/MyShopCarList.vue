<template>
    <div class="py-6 border-b-2 border-solid">
        <div class="base-width m-auto flex flex-row items-end">
            <img src="../../src/assets/img/logo.png" class="w-[56px] h-[56px] cursor-pointer"
                @click="$router.replace({ name: 'index' })" alt="">
            <div class="flex-1 ml-10 flex flex-row items-baseline">
                <div class="text-[22px] ml-[11px]">我的购物车</div>
                <p class="text-[12px] ml-[6px] text-gray-400">温馨提示：产品是否购买成功，是以最终下单为准哦，请尽快结算</p>
            </div>
            <div>
                <el-dropdown @command="dropdownCommand">
                    <span class="el-dropdown-link  text-primaryColor font-bold">
                        H2204
                        <el-icon class="text-primaryColor">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="CustomCenter" @click="router.replace({ name: 'CustomInfo' })">
                                人个中心</el-dropdown-item>
                            <el-dropdown-item divided command="logOut">退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                    <span class="mx-2 text-gray-400">|</span>
                    <span @click="$router.replace({ name: 'OrderInfoList' })">我的订单</span>
                </el-dropdown>
            </div>
        </div>
    </div>
    <div class="bg-gray-100 py-[22px]">
        <div class="base-width  bg-white m-auto">
            <el-table max-height="600" class="w-full" @selection-change="shopCarTableSelectionChange"
                :data="myShopCarList" :header-row-style="{ height: '70px' }" v-loading="isGetMyShopCarListLoading">
                <el-table-column type="selection" width="70" align="center" />
                <el-table-column label="商品图" width="150" min-width="80" align="center">
                    <template #default="{ row }">
                        <el-image style="width: 50px; height: 50px;" :src="row.goodsInfo.goods_photo[0]"
                            :preview-src-list="row.goodsInfo.goods_photo" :z-index="9999" :preview-teleported="true">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" prop="goodsInfo.goods_name"></el-table-column>
                <el-table-column label="单价" width="150" align="center" prop="goodsInfo.goods_sale_price">
                </el-table-column>
                <el-table-column label="数量" width="280" align="center">
                    <template #default="{ row }">
                        <el-input-number v-model="row.car_goods_num" :min="1"
                            @change="(currentValue, newValue) => carGoodsNumChange(currentValue, newValue, row)">
                        </el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="小计" width="150">
                    <template #default="{ row }">
                        {{ row.goodsInfo.goods_sale_price * row.car_goods_num }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template #default="{ row }">
                        <el-popconfirm title="确定要删除吗" @confirm="deleteShopCar(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="base-width m-auto bg-white  my-[22px]">
            <div class="flex flex-row h-[50px] items-center">
                <div class="ml-4 text-gray-500 text-[12px] flex">
                    <p>继续购物</p>
                    <span class="mx-2">|</span>
                    <div>已选择 <span class="text-primary">{{ selectedRows.length }}</span> 件商品</div>
                </div>
                <div class="flex flex-row justify-end items-baseline text-primary flex-1 box-border pr-[20px]">
                    合计：<span class="text-[32px]">{{ totalMoney }}</span> 元
                </div>
                <div class="w-[200px] h-full">
                    <button type="button"
                        class="text-white w-full h-full disabled:opacity-30 disabled:cursor-no-drop transition-all bg-[#ff6a00]"
                        @click="toCheckoutOrder">去结算
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, inject, computed, onMounted } from "vue";
import { ArrowDown, Close } from "@element-plus/icons-vue";
import API from "@/utils/API/index.js";
import { mainStore } from '../store';
import { ElMessageBox } from "element-plus";
import { useRouter, useRoute } from "vue-router";

const store = mainStore()
const baseURL = inject("baseURL");
const router = useRouter();
const route = useRoute();

/**
 * 获取我的购物车数据列表
 */
const myShopCarList = ref();
const isGetMyShopCarListLoading = ref(false);
const getMyShopCarList = () => {
    isGetMyShopCarListLoading.value = true;
    API.shopCarInfo.getMyShopCarList()
        .then(result => {
            console.log(result);
            result.forEach(item => {
                item.goodsInfo.goods_photo = JSON.parse(item.goodsInfo.goods_photo).map(item => baseURL + item);
            })
            myShopCarList.value = result;

        })
        .finally(() => {
            isGetMyShopCarListLoading.value = false;
        })
}

// 下拉
// const handleCommand = (command) => {
//     console.log(command);
//     switch (command) {
//         case "logOut":
//             logOut();
//             break;
//     }
// }

const dropdownCommand = (command) => {
    if (command === "customCenter") {
        router.push({ name: "customInfo" })
    } else if (command === "logOut") {
        logOut();
    }

}

const logOut = () => {
    ElMessageBox.confirm("确定要退出吗", "系统提示", {
        confirmButtonText: "确定退出",
        cancelButtonText: "取消",
        type: "warning",
    }).then(() => {
        store.logOut()
        router.replace({
            name: "Login"
        })
    })
}

/**
 * 购物车列表里面点击删除操作的事件方法
 * @param id
 */
const deleteShopCar = (id) => {
    API.shopCarInfo.deleteById(id)
        .then(() => {
            getMyShopCarList();
        })
}

/**
 *  购物车表格前面的得选框选中切换事件
 */
const selectedRows = ref([]);
const shopCarTableSelectionChange = (rows) => {
    selectedRows.value = rows;
}

/**
 * 计算属性，购物车总价
 */
const totalMoney = computed(() => {
    let totalMoney = 0;
    selectedRows.value.forEach(item => {
        totalMoney += item.goodsInfo.goods_sale_price * item.car_goods_num;
    })
    return totalMoney.toFixed(2);
})


/**
 * 购物车的数据改变事件
 */
const carGoodsNumChange = (currentValue, oldValue, row) => {
    if (currentValue < oldValue) {
        //购物车数据减少
        API.shopCarInfo.subToShopCar({ goods_id: row.goods_id })
    } else if (currentValue > oldValue) {
        //购物车数据增加
        API.shopCarInfo.addToShopCar({ goods_id: row.goods_id })
    }
}


/**
 * 去结算
 */
const toCheckoutOrder = () => {
    router.push({ name: "CheckoutOrder", params: { Ids: (selectedRows.value.map(item => item.id)).join(",") } });
}


onMounted(() => {
    getMyShopCarList();
})

</script>


<style scoped lang="scss">

</style>