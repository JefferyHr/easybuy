<template>
    <div class="base-width  swiper-box" @mouseleave="currentIndex = -1">
        <swiper @mouseenter="currentIndex = -1" class="h-full" :modules="[Navigation, Pagination, A11y, Autoplay]"
            :autoplay="{ delay: 5000, disableOnInteraction: false }" :loop="true" navigation
            :pagination="{ clickable: true }">
            <swiper-slide>
                <img src="../assets/img/banner1.jpg" alt="">
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/img/banner2.webp" alt="">
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/img/banner3.webp" alt="">
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/img/banner4.webp" alt="">
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/img/banner5.webp" alt="">
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/img/banner6.webp" alt="">
            </swiper-slide>
        </swiper>
        <ul class="list-type">
            <li v-for="(item, index) in goodListData" :key="item.id" @mouseenter="currentIndex = index">
                <a href="#" @click="toSearch(item.products_id)">{{ item.products_name }}</a>
            </li>
        </ul>
        <div class="goods-list" v-for="(item, index) in goodListData" :key="item.id" v-show="currentIndex === index">
            <div class="goods-item" v-for="_item in item.goodsList.slice(0, 24)" :key="_item.id"
                @click="toGoodsDetail(_item)">
                <img :src="baseURL + _item.goods_photo[0]" class="g-img" alt="">
                <span>{{ _item.goods_name }}</span>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, inject } from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import API from "@/utils/API";
import { useRouter } from "vue-router";

const router = useRouter();
const baseURL = inject("baseURL");

let currentIndex = ref(-1)

const goodListData = ref([])
const getTopProductsInfoListAndGoods = () => {
    API.productsInfo.getTopProductsInfoListAndGoods().then(res => {
        // console.log(res);
        goodListData.value = res
    })
}
getTopProductsInfoListAndGoods()

const toSearch = (products_id) => {
    window.open(router.resolve({ name: "Search", query: { products_id } }).href);
}
const toGoodsDetail = (item) => {
    window.open(router.resolve({ name: "goodsDetail", params: { id: item.id } }).href);
}
</script>

<style lang="scss" scoped>
.swiper-box {
    height: 460px;
    position: relative;

    .list-type {
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .5);
        padding: 20px 0;
        width: 234px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        z-index: 2;

        >li {
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            color: #fff;
            font-size: 14px;
            @apply flex flex-row items-center;

            &:hover {
                background-color: #ff6700;
            }

            a {
                flex: 1;
            }

            &::after {
                content: ">";
                font-weight: bold;
            }
        }
    }
}

.goods-list {
    position: absolute;
    left: 234px;
    top: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 2;
    background-color: #fff;
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(4, 1fr);
    grid-auto-flow: column;
    align-self: center;
    width: min-content;
    box-shadow: 0 0 10px lightgray;

    .goods-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 10px;
        width: 265px;
        height: 76px;
        color: black;
        line-height: 1.7;
        font-size: 14px;

        &:hover {
            color: #ff6700;
            cursor: pointer;
        }

        .g-img {
            width: 40px;
            height: 40px;
            margin: 0 20px;
        }
    }
}


:deep(.swiper-button-prev) {
    left: 250px;
}
</style>