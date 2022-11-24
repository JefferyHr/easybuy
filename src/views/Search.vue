<template>
    <page-view>
        <Header></Header>
        <div class="home-brick-box pt-20 bg-[rgb(245,245,245)]">
            <div class="base-width flex flex-row">
                <div class="brick-list">
                    <template v-for="item, index in queryResultData.listData">
                        <div class="brick-item cursor-pointer">
                            <a>
                                <div class=" w-[160px] h-[160px] mx-auto my-20">
                                    <el-image :src="baseURL + item.goods_photo[0]" class="figure-img" lazy />
                                </div>
                                <div class="w-full p-10 text-box ">
                                    <div class="text-[14px] w-full text-center">{{ item.goods_name }}</div>
                                    <div class="w-full text-[12px] truncate m-5 text-gray-300">{{ item.goods_brief_o
                                    }}</div>
                                    <div class="text-primaryColor text-[14px] text-center">{{ item.goods_sale_price }}元起
                                        <del class="text-gray-400 ml-2">{{ item.goods_price }}元</del>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </template>
                </div>
            </div>
            <div class="py-10 flex flex-row justify-between base-width" v-if="queryResultData.listData.length > 0">
                <p class="text-gray-500 text-[14px]">当前第{{ queryFormData.pageIndex }}页，共{{ queryResultData.pageCount
                }}页，共{{ queryResultData.totalCount }}条</p>
                <el-pagination background layout="prev, pager, next" :current-page="queryFormData.pageIndex"
                    @current-change="pageChange" :total="queryResultData.totalCount"></el-pagination>
            </div>
        </div>
        <Footer></Footer>
    </page-view>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { inject, reactive, ref } from "vue";
import API from "@/utils/API";

const baseURL = inject("baseURL");
const router = useRouter();
const route = useRoute();
const queryFormData = reactive({
    pageIndex: 1,
    goods_name: "",
    products_id: "",
});

const queryResultData = reactive({
    listData: [],
    pageStart: 1,
    pageEnd: 1,
    totalCount: 0,
    pageCount: 0,
});

const isLoading = ref(false);
const queryData = () => {
    API.goodsInfo.getListByPage(queryFormData)
        .then(result => {
            result.listData.forEach(item => {
                item.goods_photo = JSON.parse(item.goods_photo);
            })
            queryResultData.listData = result.listData;
            queryResultData.pageStart = result.pageStart;
            queryResultData.pageEnd = result.pageEnd;
            queryResultData.totalCount = result.totalCount;
            queryResultData.pageCount = result.pageCount;
        })
        .finally(() => {
            isLoading.value = false;
        });
}

queryFormData.goods_name = route.query.keyword;
queryFormData.products_id = route.query.products_id;
queryData();
const pageChange = page => {
    queryFormData.pageIndex = page;
    queryData();
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