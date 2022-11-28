<template>
    <Header></Header>
    <div class="good-nav w-full h-[60px]">
        <div class="good-title base-width h-full flex flex-row items-center justify-between">
            <div>
                <span>小米10 青春版</span>
                <span class="text-12 text-gray-400 ml-8">| Redmi 10</span>
            </div>
            <span class="text-14 cursor-pointer hover:text-primaryColor">用户评价</span>
        </div>
    </div>
    <div class="h-[50px] bg-gray-100 text-12 flex flex-row justify-center items-center"
        v-if="store.loginUserInfo == null">
        <span>为方便您购买，请提前登录
            <span class="text-primaryColor cursor-pointer" @click="$router.push({ name: 'Login' })">立即登录</span>
        </span>
    </div>
    <div class=" base-width flex flex-row ">
        <div class="swiper-box pr-20 box-border mt-20">
            <swiper class="w-[560px] h-[560px]" :modules="[Navigation, Pagination, A11y, Autoplay]"
                :autoplay="{ delay: 5000, disableOnInteraction: false }" :loop="true" navigation
                :pagination="{ clickable: true }">
                <swiper-slide v-for="item in resultData.goods_photo">
                    <img :src="baseURL + item" class="w-full h-full object-contain" alt="">
                </swiper-slide>
            </swiper>
        </div>
        <div class="good-info ml-10 mt-18">
            <div class="text-20 my-12">{{ resultData.goods_name }}</div>
            <div class=" text-gray-400 text-14">
                <span class="text-primaryColor">{{ resultData.goods_brief_o }}</span>
                {{ resultData.goods_brief }}
            </div>
            <div class="mt-16">
                <span class="text-primaryColor text-18">{{ resultData.goods_sale_price }}元</span>
                <del class="text-gray-400 text-12 ml-8" v-if="resultData.goods_sale_price !== resultData.goods_price">{{
                        resultData.goods_price
                }}元</del>
            </div>
            <div class="flex flex-row items-center text-14 bg-gray-100 p-[34px] my-10 ">
                <el-icon size="18" class="mr-10">
                    <Location />
                </el-icon>
                <p v-if="store.loginUserInfo == null">北京 北京市 海淀区 清河街道 <span class="text-primaryColor ml-10">有现货</span>
                </p>
                <p v-else>{{ area }}<span class="text-primaryColor ml-10">有现货</span></p>
            </div>
            <div class="my-5" v-for="(item, index) in resultData.goods_desc" :key="index">
                <p>选择{{ index }}</p>
                <div class="tag">
                    <div class="tag-item" v-for="(_item, _index) in item"
                        :class="{ active: selectedTypeMap.get(index) === _index }" :key="_index"
                        @click="selectedTypeMap.set(index, _index)">
                        {{ _item }}
                    </div>
                </div>
            </div>
            <div class=" bg-gray-100 p-[28px] my-10">
                <div class="flex flex-row items-center justify-between">
                    <p>{{ selected_goods_desc }}</p>
                    <div>
                        <span class=" text-18">{{ resultData.goods_sale_price }}元</span>
                        <del class="text-gray-400 text-12 ml-8">{{ resultData.goods_price }}元</del>
                    </div>
                </div>
                <div class="text-primaryColor text-[32px]">
                    总计：{{ resultData.goods_sale_price }}元
                </div>
            </div>
            <div class="flex flex-row justify-between py-10">
                <button type="button" @click="addToShopCar"
                    class="border-none outline-none bg-primaryColor text-white flex flex-row justify-center items-center w-[260px] h-[50px]">加入购物车</button>
                <button type="button"
                    class="border-none outline-none bg-gray-200 flex flex-row justify-center items-center w-[260px] h-[50px]">喜欢</button>
            </div>

        </div>

    </div>
    <div class="bg-gray-100 mt-20">
        <div class="base-width m-auto box-border py-4">
            <p class="text-[22px] text-gray-600">价格说明</p>
            <p class="price-item">
                <span>划线价：</span>商品展示的划横线价格为参考价， 该价格可能是商品首次上市钅肖售价、品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（ 如厂商指导价、建议零售价等）
                或该商品在小米商城曾经展
                示过的诮售价； 由于地区、时间的差异性和市场行情的波动， 品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致， 该价格 <span>并非原价、仅供参考。</span>
            </p>
            <p class="price-item">
                <span>未划线价：</span>指商品的实时诮售价格， 其不因表述的差异改变性质。但商品具体结算价格可能因该商品参与的满减、预售、限时优惠等单个或多个活动，
                或者因使用优惠券、红包、米金等而发生变化，
                <span> 请以订单结算页展示为准</span>
            </p>
            <p class="price-item">
                <span>其它：</span>商品详情页（ 含主图） 以图片或文字形式标注的到手价、券后价、众筹价、尝鲜价等价格可能是商品在使用优惠券或参与特定优惠活动或在特定时间段等情形下，
                由系统根据相应规则计算得出的预
                估单品结算价格，<span>具体请以订单结算页面的标价、优惠条件或具体活动规则为准</span>
            </p>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, inject, computed } from "vue"
import API from '../utils/API';
import { mainStore } from '../store';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Location } from "@element-plus/icons-vue"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const baseURL = inject("baseURL")

const route = useRoute()
const router = useRouter()
const store = mainStore()
const id = route.params.id

const resultData = ref({})
const selectedTypeMap = ref(new Map());

const findById = async () => {
    let res = await API.goodsInfo.findById(id)
    // console.log(res);
    resultData.value = res
    resultData.value.goods_photo = JSON.parse(resultData.value.goods_photo)
    resultData.value.goods_desc = JSON.parse(resultData.value.goods_desc)
    selectedTypeMap.value = new Map();
    Object.keys(res.goods_desc).forEach(item => {
        selectedTypeMap.value.set(item, 0);
    })
}
(() => {
    findById()
})()

const selected_goods_desc = computed(() => {
    if (resultData.value.goods_desc) {
        let arr = []
        let keys = Object.keys(resultData.value.goods_desc)
        keys.forEach(key => {
            let selectedIndex = selectedTypeMap.value.get(key);
            arr.push(resultData.value.goods_desc[key][selectedIndex]);
        })
        return arr.join(" ");
    }
    return "";
});
const area = ref("")
const getAddress = async () => {
    let res = await API.addressInfo.getMyAddressInfoList(1)
    area.value = res.listData[0].province + " " + res.listData[0].city + " " + res.listData[0].area
}
(() => {
    getAddress()
})()
const infoList = reactive({
    goods_id: route.params.id,
    custom_id: store.loginUserInfo.id
})
const addToShopCar = () => {
    API.shopCarInfo.addToShopCar(infoList).then((res) => {
        console.log(res);
        router.push({ name: 'AddToShopCarResult', params: { goods_id: id } })
    })
}

</script>

<style lang="scss" scoped>
.good-nav {
    box-shadow: 0 2px 5px #d3d3d3;
}

.tag {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    .tag-item {
        @apply h-[50px] w-[315px] flex flex-row justify-center items-center border border-solid cursor-pointer;

        &.active {
            @apply border border-solid border-primaryColor
        }
    }
}

.price-item {
    @apply text-gray-400 text-[14px] my-6;
    line-height: 1.7;
    user-select: none;

    span {
        @apply text-gray-600 font-bold;
    }
}
</style>