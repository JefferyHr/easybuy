<template>
    <div class="py-6 border-b-2 border-solid" v-loading="isLoading" element-loading-text="正在提交订单">
        <div class="base-width m-auto flex flex-row items-center">
            <img src="../../src/assets/img/logo.png" class="w-[56px] h-[56px] cursor-pointer"
                @click="$router.replace({ name: 'Index' })" alt="">
            <div class="flex-1 flex flex-row items-baseline">
                <div class="text-[22px] ml-[22px]">确认订单</div>
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
                            <el-dropdown-item command="CustomCenter" @click="router.replace({ name: 'OrderInfoList' })">
                                我的订单</el-dropdown-item>
                            <el-dropdown-item divided command="logOut">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>

    <div class="bg-gray-100 overflow-auto">
        <div class="base-width m-auto mt-[22px] p-[20px] bg-white">
            <h2 class="text-gray-700 text-[18px] my-[6px]">收货地址</h2>
            <el-skeleton animated :loading="isAddressInfoLoading">
                <div class="flex flex-row h-[40px] justify-center items-center my-5 bg-gray-100 cursor-pointer text-gray-500"
                    @click="getPrevPageAddress" v-if="myAddressInfoList.pageIndex > 1">
                    加载上一页
                </div>
                <div class="address-list">
                    <div class="address-item  p-[20px]" :class="{ selected: addressIndex === index }"
                        @click="addressIndex = index" v-for="(item, index) in myAddressInfoList.listData"
                        :key="item.id">
                        <div class="text-[18px]">{{ item.address_name }}</div>
                        <p class="text-gray-600 text-[14px]">{{ item.address_tel.substr(0, 3) + "****" +
                                item.address_tel.slice(-4)
                        }}
                        </p>
                        <p class="address-all text-gray-600 text-[14px]">{{ item.province }} {{ item.city }} {{
                                item.area
                        }} {{
        item.address_detail
}}
                        </p>
                    </div>
                    <div
                        class=" flex flex-row justify-center items-center border border-solid border-gray-400 p-6 box-border leading-7">
                        <el-button :icon="CirclePlus" type="text" @click="router.replace({ name: 'AddressList' })">
                            新增地址
                        </el-button>
                    </div>
                </div>
                <div class="flex flex-row h-[40px] justify-center items-center my-5 bg-gray-100 cursor-pointer text-gray-500"
                    @click="getNextPageAddress" v-if="myAddressInfoList.pageIndex < myAddressInfoList.pageCount">
                    加载下一页
                </div>
            </el-skeleton>
            <el-skeleton animated :loading="isGetCheckoutOrderGoodsLoading">
                <h2 class="text-gray-700 text-[18px] mt-[20px] my-[6px]">商品及优惠卷</h2>
                <el-table :data="checkoutOrderGoods" class="w-full">
                    <el-table-column label="编号" width="70" align="center">
                        <template #default="{ $index }">{{ $index + 1 }}</template>
                    </el-table-column>
                    <el-table-column label="图片" width="120" align="center">
                        <template #default="{ row }">
                            <el-image :src="baseURL + row.goodsInfo.goods_photo[0]" class="w-[60px] h-[60px]" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="goodsInfo.goods_name" label="商品名称"></el-table-column>
                    <el-table-column label="价格数量" width="200" align="center">
                        <template #default="{ row }">
                            <span class=" text-[12px]">
                                {{ row.goodsInfo.goods_sale_price }}元 x {{ row.car_goods_num }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="总价" width="120">
                        <template #default="{ row }">
                            <span class="text-primaryColor">{{ row.goodsInfo.goods_sale_price * row.car_goods_num
                            }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="flex flex-row h-[80px] items-center border-b border-solid border-gray-200">
                    <h2 class="text-gray-700 text-[18px] my-[10px]">配送方式</h2>
                    <span class="text-primaryColor ml-10 text-[14px]">包邮</span>
                </div>
                <div class="flex flex-row h-[80px] items-center border-b border-solid border-gray-200">
                    <h2 class="text-gray-700 text-[18px] my-[10px]">发票</h2>
                    <span class="text-primaryColor ml-10 text-[14px]">电子普通发票个人商品明细修改 ></span>
                </div>
                <ul class="total-info-ul">
                    <li><span>商品总件数：</span><span class="text-primaryColor">{{ goodsTotalCount }}件</span></li>
                    <li><span>商品总价：</span><span class="text-primaryColor">{{ goodsTotalPrice }}元</span></li>
                    <li><span>活动优惠：</span><span class="text-primaryColor">-0元</span></li>
                    <li><span>优惠券抵扣：</span><span class="text-primaryColor">-0元</span></li>
                    <li><span>运费：</span><span class="text-primaryColor">0元</span></li>
                    <li class="flex flex-row items-end"><span>应付总额：</span><span class="text-primaryColor text-[28px]">{{
                            goodsTotalPrice
                    }}元</span></li>
                </ul>
                <div class="flex flex-row justify-end mt-[20px] box-border">
                    <button type="button" class="w-[180px] h-[40px] border border-solid border-gray-400 text-gray-400"
                        @click="$router.back()">返回购物车
                    </button>
                    <button type="button" class="w-[160px] h-[40px] bg-[#ff6700] text-white ml-10"
                        @click="confirmSubmitOrder">去结算
                    </button>
                </div>
            </el-skeleton>
        </div>
    </div>

</template>
<script setup>
import {
    ref, inject, computed, onMounted, reactive
} from "vue";
import { ArrowDown, Close, CirclePlus } from "@element-plus/icons-vue";
import API from "@/utils/API/index.js";
import { mainStore } from '../store';
import { ElMessageBox } from "element-plus";
import { useRouter, useRoute } from "vue-router";

const store = mainStore()
const baseURL = inject("baseURL");
const router = useRouter();
const route = useRoute();


const queryAddressData = reactive({
    pageIndex: 1
});
const myAddressInfoList = reactive({
    listData: [],
    pageCount: 0,
    pageIndex: 1,
    totalCount: 0,
})
const isAddressInfoLoading = ref(false);
const queryData = pageIndex => {
    isAddressInfoLoading.value = true;
    API.addressInfo.getMyAddressInfoList(queryAddressData.pageIndex)
        .then(result => {
            console.log(result);
            myAddressInfoList.listData = result.listData;
            myAddressInfoList.pageCount = result.pageCount;
            myAddressInfoList.pageIndex = result.pageIndex;
            myAddressInfoList.totalCount = result.totalCount;
        })
        .finally(() => {
            isAddressInfoLoading.value = false;
        });
}

/**
 * 获取下一页地址的数据
 */
const getNextPageAddress = () => {
    if (myAddressInfoList.pageIndex < myAddressInfoList.pageCount) {
        queryAddressData.pageIndex++;
        isAddressInfoLoading.value = true;
        API.addressInfo.getMyAddressInfoList(queryAddressData.pageIndex)
            .then((result) => {
                myAddressInfoList.listData = result.listData;
                myAddressInfoList.pageCount = result.pageCount;
                myAddressInfoList.pageIndex = result.pageIndex;
                myAddressInfoList.totalCount = result.totalCount;
            })
            .finally(() => {
                isAddressInfoLoading.value = false;
            });
    }
}
const getPrevPageAddress = () => {
    if (myAddressInfoList.pageIndex <= myAddressInfoList.pageCount) {
        queryAddressData.pageIndex--;
        if (queryAddressData.pageIndex < 1) {
            queryAddressData.pageIndex = 1
        } else {
            isAddressInfoLoading.value = true;
            API.addressInfo.getMyAddressInfoList(queryAddressData.pageIndex)
                .then((result) => {
                    myAddressInfoList.listData = result.listData;
                    myAddressInfoList.pageCount = result.pageCount;
                    myAddressInfoList.pageIndex = result.pageIndex;
                    myAddressInfoList.totalCount = result.totalCount;
                })
                .finally(() => {
                    isAddressInfoLoading.value = false;
                });
        }

    }
}
/**
 * 获取确认订单的商品数据
 */

const isGetCheckoutOrderGoodsLoading = ref(false);
const checkoutOrderGoods = ref([]);
const getCheckoutOrderGoodsList = () => {
    isGetCheckoutOrderGoodsLoading.value = true;
    let Ids = route.params.Ids;
    API.shopCarInfo.getMyCheckoutShopCarList(Ids)
        .then(result => {
            console.log(result);
            result.forEach(item => {
                item.goodsInfo.goods_photo = JSON.parse(item.goodsInfo.goods_photo);
            });
            checkoutOrderGoods.value = result;
        })
        .catch(() => {
            ElMessageBox.alert("获取确认订单的商品数据失败");
        })
        .finally((data) => {
            isGetCheckoutOrderGoodsLoading.value = false;
        });
}

/**
 * 计算订单总商品数
 */
const goodsTotalCount = computed(() => {
    let totalCount = 0;
    checkoutOrderGoods.value.forEach(item => {
        totalCount += item.car_goods_num;
    });
    return totalCount;
});
/**
 * 计算订单总价格
 */
const goodsTotalPrice = computed(() => {
    let totalPrice = 0;
    checkoutOrderGoods.value.forEach(item => {
        totalPrice += item.car_goods_num * item.goodsInfo.goods_sale_price;
    });
    return totalPrice;
});


/**
 * 去结算，确认提交订单
 */
const addressIndex = ref(-1);
const isLoading = ref(false);
const confirmSubmitOrder = () => {
    if (addressIndex.value === -1) {
        ElMessageBox.alert("请选择收货地址", "提示");
        return;
    }
    isLoading.value = true;

    let orderInfo = {
        address_id: myAddressInfoList.listData[addressIndex.value].id,
        order_pay_type: 1,
        goodsList: checkoutOrderGoods.value.map(item => {
            return {
                goods_id: item.goods_id,
                goods_num: item.car_goods_num
            }
        })
    }
    API.orderInfo.submitOrder(orderInfo)
        .then((result) => {
            // console.log(result);
            router.replace({ name: 'ConfirmOrder', params: { id: result } });

        })
        .catch(() => {
            ElMessageBox.alert("提交订单失败", "提示", {
                type: "error"
            });
        })
        .finally(() => {
            isLoading.value = false;
        });
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


onMounted(() => {
    queryData(queryAddressData.pageIndex);
    getCheckoutOrderGoodsList();
})
</script>
<style scoped lang="scss">
.address-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;


}

.address-list .address-item {
    @apply relative border border-solid border-gray-400 p-12 box-border leading-7 cursor-pointer;

    &.selected {
        border-width: 2px;
        border-color: #ff6a00;
    }
}

.address-all {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    @apply text-gray-600;
}

.total-info-ul {
    @apply text-gray-600 text-[14px] flex flex-col items-end border-b border-solid border-gray-200 py-[10px];

    >li {
        @apply flex flex-row leading-8;

        span:first-child {
            @apply w-[100px] text-right;
        }

        span:last-child {
            @apply min-w-[100px] text-right;
        }
    }
}
</style>