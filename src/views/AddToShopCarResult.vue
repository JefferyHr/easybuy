<template>
    <Header></Header>
    <div class="bg-gray-100">
        <div class="base-width py-[30px] flex flex-row justify-between items-center border-0 border-b border-gray-400">
            <div class="flex felx-row items-center">
                <el-icon size="60" color="green">
                    <CircleCheck />
                </el-icon>
                <div class="ml-8">
                    <p class="text-18">添加成功</p>
                    <p class="text-gray-500">您的商品<span class="text-primaryColor font-bold mx-4">{{ goods_name
                    }}</span>已成功添加到购物车
                    </p>
                </div>
            </div>
            <div class="flex flex-row">
                <button type="button" @click="$router.replace({ name: 'MyShopCarList' })"
                    class="border-none outline-none bg-primaryColor text-white flex flex-row justify-center items-center w-[120px] h-[50px]">去购物车结算</button>
                <button type="button" @click="$router.replace({ name: 'Index' })"
                    class="border border-solid border-gray-400  flex flex-row justify-center items-center w-[120px] h-[50px] ml-10">继续购物</button>
            </div>
        </div>

        <div class="base-width py-[30px] ">
            <div class="w-full h-[50px] flex flex-row justify-center items-center text-[22px] text-gray-500">买了该商品的人还买了
            </div>
            <div class="home-brick-box pt-20 bg-[rgb(245,245,245)]">
                <div class="base-width flex flex-row">
                    <div class="brick-list">
                        <template v-for="item, index in RecommendGoodsList">
                            <div class="brick-item cursor-pointer" @click="toGoosDetail(item)">
                                <a>
                                    <div class=" w-[160px] h-[160px] mx-auto my-20">
                                        <el-image :src="baseURL + item.goods_photo[0]" class="figure-img" lazy />
                                    </div>
                                    <div class="w-full p-10 text-box ">
                                        <div class="text-[14px] w-full text-center">{{ item.goods_name }}</div>
                                        <div class="w-full text-[12px] truncate m-5 text-gray-300">{{ item.goods_brief_o
                                        }}</div>
                                        <div class="text-primaryColor text-[14px] text-center">{{ item.goods_sale_price
                                        }}元起
                                            <del class="text-gray-400 ml-2">{{ item.goods_price }}元</del>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Footer></Footer>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, inject, computed, reactive } from "vue"
import API from '../utils/API';
import { mainStore } from '../store';
import { CircleCheck } from "@element-plus/icons-vue"

const route = useRoute()
const router = useRouter()
const store = mainStore()

const baseURL = inject("baseURL")
const infoList = reactive({
    goods_id: route.params.id,
    custom_id: store.loginUserInfo.id
})
const goods_name = ref('')
const RecommendGoodsList = ref()
const addToShopCar = async () => {
    let res = await API.shopCarInfo.addToShopCar(infoList)
    console.log(res);
}
const findById = async () => {
    let res = await API.goodsInfo.findById(infoList.goods_id)
    // console.log(res);
    goods_name.value = res.goods_name

}
(() => {
    findById()
})()
addToShopCar()
const getRecommendGoodsList = async () => {
    let res = await API.goodsInfo.getRecommendGoodsList()
    RecommendGoodsList.value = res.listData
    RecommendGoodsList.value.forEach(element => {
        element.goods_photo = JSON.parse(element.goods_photo)
    });
}
(() => {
    getRecommendGoodsList()
})()
const toGoosDetail = item => {
    window.open(router.resolve({ name: "GoodsDetail", params: { id: item.id } }).href);
}
</script>

<style lang="scss" scoped>
.brick-list {
    @apply grid grid-cols-5 grid-rows-2 gap-[14px] grid mb-10;


    .brick-item {
        @apply w-[234px] h-[300px] bg-white;

        &:hover {
            @apply translate-y-[-6px];
            transition: all .2s linear;
            box-shadow: 0 0 10px 5px rgb(233, 232, 232);
        }

        &.last-item {
            height: 140px;

            >a {
                display: flex;

                .text-box {
                    width: 70%;
                    padding-left: 0;
                    padding-top: 20px;
                }
            }

            .figure-img {
                width: 80px;
                height: 80px;
            }

        }
    }

    .get-more-info {
        width: 234px;
        height: 140px;
        grid-column-start: 5;
        grid-column-end: 6;
        background-color: white;
        @extend .brick-item;
    }

}

.brick-item:nth-child(-n+9) {
    grid-row-start: span 2;
}
</style>