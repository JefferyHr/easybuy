<template>
    <page-view>
        <Header></Header>
        <IndexSwiper></IndexSwiper>

        <div class="home-hero-sub base-width">
            <div class="left-grid">
                <ul class="home-channel-list bg-[#5f5750]">
                    <li>
                        <a href="javascript:void(0)">
                            <img src="../assets/img/11.png" alt="">
                            保障服务
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <img src="../assets/img/12.png" alt="">
                            企业团购
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <img src="../assets/img/13.png" alt="">
                            F码通道
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <img src="../assets/img/14.png" alt="">
                            米粉卡
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <img src="../assets/img/11.png" alt="">
                            以旧换新
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <img src="../assets/img/16.png" alt="">
                            话费充值
                        </a>
                    </li>
                </ul>
            </div>
            <ul class="flex-1 flex flex-row justify-between pl-[15px]">
                <li class="w-[316px] h-[170px]">
                    <a href="javascript:void(0)">
                        <img src="../assets/img/banner-bottom-01.jpg" alt="" class="w-full h-full">
                    </a>
                </li>
                <li class="w-[316px] h-[170px]">
                    <a href="javascript:void(0)">
                        <img src="../assets/img/banner-bottom-02.jpg" alt="" class="w-full h-full">
                    </a>
                </li>
                <li class="w-[316px] h-[170px]">
                    <a href="javascript:void(0)">
                        <img src="../assets/img/banner-bottom-03.jpg" alt="" class="w-full h-full">
                    </a>
                </li>
            </ul>
        </div>
        <div class="home-banner-box pt-20 bg-[rgb(245,245,245)]">
            <div class="base-width">
                <a href="javascript:void(0)">
                    <img src="../assets/img/home-banner.webp" alt="">
                </a>
            </div>
        </div>
        <div v-loading="isLoading" element-loading-text="正在加载...">
            <!-- 手机 -->
            <div class="home-brick-box pt-20 bg-[rgb(245,245,245)]">
                <div class="flex flex-row base-width justify-between pb-10">
                    <span class="text-[24px]">手机</span>
                    <span class="flex flex-row items-center hover:text-primaryColor cursor-pointer"
                        @click="toSearch(1, '手机')">查看更多
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                </div>
                <div class="base-width flex flex-row">
                    <div class="brick-list">
                        <template v-for="(item, index) in phoneListData" :key="item.id">
                            <div class="brick-item cursor-pointer" @click="toGoosDetail(item.id)"
                                :class="{ 'last-item': index === 9 }">
                                <a>
                                    <div class="w-[160px] h-[160px] mx-auto my-20">
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
                        <a href="javascript:void(0)" class="get-more-info flex flex-row items-center justify-evenly"
                            @click="toSearch(1, '手机')">
                            <div class="flex flex-col ">
                                <span class="text-[22px]">浏览更多</span>
                                <span class="text-[12px] text-gray-500">热门</span>
                            </div>
                            <div>
                                <el-icon size="36" color="#ff671b">
                                    <Promotion />
                                </el-icon>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 电视 -->
            <div class="home-brick-box pt-20 bg-[rgb(245,245,245)]">
                <div class="flex flex-row base-width justify-between pb-10">
                    <span class="text-[24px]">电视</span>
                    <span class="flex flex-row items-center hover:text-primaryColor cursor-pointer"
                        @click="toSearch(2, '电视')">查看更多
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                </div>
                <div class="base-width flex flex-row">
                    <div class="brick-list">
                        <template v-for="item, index in tvListData">
                            <div class="brick-item cursor-pointer" @click="toGoosDetail(item.id)"
                                :class="{ 'last-item': index === 9 }">
                                <a>
                                    <div class="w-[160px] h-[160px] mx-auto my-20">
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
                        <a href="javascript:void(0)" class="get-more-info flex flex-row items-center justify-evenly"
                            @click="toSearch(2, '电视')">
                            <div class="flex flex-col ">
                                <span class="text-[22px]">浏览更多</span>
                                <span class="text-[12px] text-gray-500">热门</span>
                            </div>
                            <div>
                                <el-icon size="36" color="#ff671b">
                                    <Promotion />
                                </el-icon>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 笔记本 -->
            <div class="home-brick-box pt-20 bg-[rgb(245,245,245)]">
                <div class="flex flex-row base-width justify-between pb-10">
                    <span class="text-[24px]">笔记本</span>
                    <span class="flex flex-row items-center hover:text-primaryColor cursor-pointer"
                        @click="toSearch(3, '笔记本')">查看更多
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                </div>
                <div class="base-width flex flex-row">
                    <div class="brick-list">
                        <template v-for="item, index in pcListData">
                            <div class="brick-item cursor-pointer" @click="toGoosDetail(item.id)"
                                :class="{ 'last-item': index === 9 }">
                                <a>
                                    <div class="w-[160px] h-[160px] mx-auto my-20">
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
            <!-- 其他 -->
            <div class="home-brick-box pt-20 bg-[rgb(245,245,245)]">
                <div class="flex flex-row base-width justify-between pb-10">
                    <span class="text-[24px]">其他</span>
                    <span class="flex flex-row items-center hover:text-primaryColor cursor-pointer"
                        @click="toSearch()">查看更多
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </span>
                </div>
                <div class="base-width flex flex-row">
                    <div class="brick-list">
                        <template v-for="item, index in otherListData">
                            <div class="brick-item-last cursor-pointer" @click="toGoosDetail(item.id)">
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
        <Footer></Footer>
    </page-view>
</template>

<script setup>
import { ref, inject, provide } from "vue";
import API from "../utils/API"
import { ArrowRightBold, Promotion } from "@element-plus/icons-vue"
import { useRouter } from "vue-router";

const baseURL = inject("baseURL");
const router = useRouter()

const isLoading = ref(false)
const phoneListData = ref()
const tvListData = ref()
const pcListData = ref()
const otherListData = ref([])


const getTopProductsInfoListAndGoods = async () => {
    isLoading.value = true
    let res = await API.productsInfo.getTopProductsInfoListAndGoods()
    phoneListData.value = res[0].goodsList.splice(0, 10)
    tvListData.value = res[1].goodsList.splice(0, 10)
    pcListData.value = res[2].goodsList.splice(0, 5)
    res.forEach((item, index) => {
        let i = 3
        if (index >= i) {
            otherListData.value.push(item.goodsList)
            i++
        }
    })
    otherListData.value = otherListData.value.flat(Infinity)
    isLoading.value = false

}
getTopProductsInfoListAndGoods()

const toGoosDetail = id => {
    window.open(router.resolve({ name: "GoodsDetail", params: { id: id } }).href);
}
const toSearch = (products_id, goods_name) => {
    window.open(router.resolve({ name: "Search", query: { products_id, goods_name } }).href);
}
</script>

<style lang="scss" scoped>
.home-hero-sub {
    @apply flex flex-row items-center;

    .left-grid {
        width: 234px;
        margin: 20px 0;

        .home-channel-list {
            display: grid;
            grid-template-rows: repeat(1, 1fr);
            grid-template-columns: repeat(3, 1fr);
            font-size: 12px;

            li {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                width: 70px;
                height: 82px;

                a {
                    color: #a49f9b;
                    font-weight: bold;
                    padding: 16px 0;

                    img {
                        display: block;
                        width: 24px;
                        height: 24px;
                        margin: 0 auto 4px;
                    }
                }
            }
        }
    }
}

.home-hero-sub .left-grid .home-channel-list>li::before {
    position: absolute;
    content: "";
    background: #665e57;
    top: 5px;
    left: 4px;
    width: 64px;
    height: 1px;
}

.home-hero-sub .left-grid .home-channel-list>li::after {
    position: absolute;
    content: "";
    background: #665e57;
    bottom: 0px;
    left: 0px;
    height: 64px;
    width: 1px;
}

.brick-list {
    @apply grid grid-cols-5 grid-rows-2 gap-[14px] grid mb-10;


    .brick-item,
    .brick-item-last {
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