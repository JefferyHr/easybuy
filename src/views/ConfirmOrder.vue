<template>
    <div class="py-6 border-b-2 border-solid" v-loading="isLoading" element-loading-text="正在提交订单">
        <div class="base-width m-auto flex flex-row items-end">
            <img src="../../src/assets/img/logo.png" class="w-[56px] h-[56px] cursor-pointer"
                @click="$router.replace({ name: 'index' })" alt="">
            <div class="flex-1 ml-10 flex flex-row items-baseline">
                <div class="text-[22px] ml-[22px]">支付订单</div>
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
                            <el-dropdown-item command="CustomInfo" @click="router.replace({ name: 'CustomInfo' })">
                                人个中心</el-dropdown-item>
                            <el-dropdown-item divided command="logOut">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>

    <div class="bg-gray-100 overflow-auto">
        <div class="base-width bg-white m-auto mt-[20px] flex flex-row items-center p-[20px]">
            <span class="iconfont icon-chenggong1 text-green-600" style="font-size: 72px"></span>
            <div class="flex-1 text-[14px] text-gray-600 ml-[20px] leading-8">
                <p class="text-[22px] text-gray-800">订单提交成功！去支付喽~</p>
                <p>请在 <span class="text-primaryColor">2小时内完成支付，超时后将取消订单</span></p>
                <p>收货地址：</p>
            </div>
            <div class="text-[14px] text-gray-600">
                <div>订单总金额：<span class="text-primaryColor text-[22px]">{{ totalMoney }}</span><span
                        class="text-primaryColor">元</span>
                </div>
            </div>
        </div>
        <div class="base-width bg-white my-[20px] m-auto p-[20px]">
            <h2 class="border-b border-solid border-gray-200 pb-5">请选择以下支付方式支付</h2>
            <div class="pay-type-list">
                <div class="w-[180px] h-[60px] border border-solid border-gray-200" @click="toAliPay">
                    <img src="../../src/assets/img/01.png" class="block w-full h-full" alt="">
                </div>
                <div class="w-[180px] h-[60px] border border-solid border-gray-200">
                    <img src="../../src/assets/img/02.jpg" class="block w-full h-full" alt="">
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { ref, inject, computed, onMounted, reactive } from "vue";
import { ArrowDown, Close, CirclePlus } from "@element-plus/icons-vue";
import API from "@/utils/API/index.js";
import { mainStore } from '../store';
import { ElMessageBox } from "element-plus";
import { useRouter, useRoute } from "vue-router";

const store = mainStore()
const baseURL = inject("baseURL");
const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const currentOrderInfo = ref();
const totalMoney = ref(0);
const findById = id => {
    isLoading.value = true;
    API.orderInfo.findById(id).then(result => {
        console.log(result);
        currentOrderInfo.value = result;
        result.orderDetailInfoList.forEach(item => {
            totalMoney.value += item.goodsInfo.goods_sale_price * item.goods_num;
        });
    })
        .finally(() => {
            isLoading.value = false;
        });
}
findById(route.params.id);

/**
 * 去调用阿里的支付宝接口
 */
const toAliPay = () => {
    let id = route.params.id;
    if (id) {
        isLoading.value = true;
        API.orderInfo.aliPay(id)
            .then(result => {
                location.href = result.data;
            })
            .finally(() => {
                isLoading.value = false;
            });
    } else {
        ElMessageBox.alert("订单号不存在，请重新下单", "提示", {
            type: "error"
        })
            .then(() => {
                router.replace({ name: "index" });
            })
    }
}


/**
 * 退出
 */
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

</script>
<style>
.pay-type-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 180px);
    grid-gap: 20px;
    box-sizing: border-box;
    @apply py-[20px];


}

.pay-type-list>div {
    @apply cursor-pointer transition-all;

}

.pay-type-list>div:hover {
    border-color: #ff6a00;
}
</style>