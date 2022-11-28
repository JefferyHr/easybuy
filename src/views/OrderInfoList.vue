<template>
    <div class="p-[30px] pb-[70px] big-box mb-10">
        <div>
            <span class="text-[22px]">我的订单</span>
            <span class="text-[12px] pl-[8px] text-gray-400">
                请谨防钓鱼链接或诈骗电话
            </span>
        </div>
        <div class="my-[22px] ">
            <el-tabs v-model="activeName" type="border-card" @tab-click="queryDataFromTab">
                <el-tab-pane label="全部" name="first">
                    <el-card v-for="item in resultData.listData" shadow="never" class="demo-tabs mb-14">
                        <div>
                            <span class="text-[18px]">{{ item.order_status == 0 ? '未付款' : '已付款' }}</span>
                            <el-button plain color="#ff6a00" v-if="item.order_status == 0" class="text-[12px] ml-[10px]"
                                size="small" @click="$router.push({ name: 'ConfirmOrder', params: { id: item.id } })">
                                去付款</el-button>
                        </div>
                        <div
                            class="flex flex-row justify-between mt-[22px] border-0  border-b border-gray-200 pb-[6px]">
                            <div class="text-[12px]">
                                <span>{{ formatDateTime(item.order_submission_time) }}</span>
                                |<span class="ml-[2px]">{{ item.customInfo.custom_realName }}</span>
                                |<span class="ml-[2px]">订单号：</span>
                                <span>{{ item.orderDetailInfoList[0]?.order_id }}</span>
                                |<span class="ml-[2px]">在线支付【支付宝】</span>
                            </div>
                            <div class="text-[12px]">
                                订单金额：
                                <span class="text-[18px]">{{ item.orderDetailInfoList[0]?.goodsInfo.goods_price
                                }}</span>元
                            </div>
                        </div>
                        <div class="flex flex-row justify-between ">
                            <div class="flex flex-row items-center pt-[10px]">
                                <img :src="baseURL + item.orderDetailInfoList[0]?.goodsInfo.goods_photo[0]"
                                    class="w-[90px] h-[100px]" />
                                <div class="ml-10 py-[20px]  h-full flex flex-col justify-between">
                                    <p class="text-16">{{ item.orderDetailInfoList[0]?.goodsInfo.goods_name }}</p>
                                    <span class="text-14">{{ item.orderDetailInfoList[0]?.goodsInfo.goods_price }}元
                                        &nbsp; x{{ item.orderDetailInfoList[0]?.goods_num }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex flex-col mt-14">
                                <el-button @click="showDrawer(item.id)">订单详情</el-button>
                                <el-button class="my-10">申请售后</el-button>
                                <el-button>联系商家</el-button>
                            </div>
                        </div>
                    </el-card>

                    <!-- 页码 -->
                    <div class="flex flex-row justify-between items-center pt-[11px]">
                        <div class="text-[14px]">当前第{{ queryFormData.pageIndex }}页，共{{ resultData.pageCount }}页，共{{
                                resultData.totalCount
                        }}条</div>
                        <el-pagination background layout="prev, pager, next" :total="resultData.totalCount"
                            @current-change="currentChange" :current-page="queryFormData.pageIndex" />
                    </div>
                </el-tab-pane>
                <el-tab-pane label="未付款" name="second">
                    <template v-for="item in resultData.listData">
                        <el-card shadow="never" class="demo-tabs mb-14">
                            <div>
                                <span class="text-[18px]">未付款</span>
                                <el-button plain color="#ff6a00"
                                    @click="$router.push({ name: 'ConfirmOrder', params: { id: item.id } })"
                                    class="text-[12px] ml-[10px]" size="small">去付款
                                </el-button>
                            </div>
                            <div
                                class="flex flex-row justify-between mt-[22px] border-0  border-b border-gray-200 pb-[6px]">
                                <div class="text-[12px]">
                                    <span>{{ formatDateTime(item.order_submission_time) }}</span>
                                    |<span class="ml-[2px]">{{ item.customInfo.custom_realName }}</span>
                                    |<span class="ml-[2px]">订单号：</span>
                                    <span>{{ item.orderDetailInfoList[0].order_id }}</span>
                                    |<span class="ml-[2px]">在线支付【支付宝】</span>
                                </div>
                                <div class="text-[12px]">
                                    订单金额：
                                    <span class="text-[18px]">{{ item.orderDetailInfoList[0].goodsInfo.goods_price
                                    }}</span>元
                                </div>
                            </div>
                            <div class="flex flex-row justify-between">
                                <div class="flex flex-row items-center pt-[10px]">
                                    <img :src="baseURL + item.orderDetailInfoList[0].goodsInfo.goods_photo[0]"
                                        class="w-[90px] h-[100px]" />
                                    <div class="ml-10 py-[20px]  h-full flex flex-col justify-between">
                                        <p class="text-16">{{ item.orderDetailInfoList[0].goodsInfo.goods_name }}
                                        </p>
                                        <span class="text-14">{{ item.orderDetailInfoList[0].goodsInfo.goods_price
                                        }}元
                                            &nbsp; x{{ item.orderDetailInfoList[0].goods_num }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-col mt-14">
                                    <el-button @click="showDrawer(item.id)">订单详情</el-button>
                                    <el-button class="my-10">申请售后</el-button>
                                    <el-button>联系商家</el-button>
                                </div>
                            </div>
                        </el-card>
                    </template>
                    <div class="flex flex-row justify-between items-center pt-[11px]">
                        <div class="text-[14px]">当前第{{ queryFormData.pageIndex }}页，共{{ resultData.pageCount }}页，共{{
                                resultData.totalCount
                        }}条</div>
                        <el-pagination background layout="prev, pager, next" :total="resultData.totalCount"
                            @current-change="currentChange" :current-page="queryFormData.pageIndex" />
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已付款" name="third">
                    <template v-for="item in resultData.listData">
                        <el-card shadow="never" class="demo-tabs mb-14">
                            <div>
                                <span class="text-[18px]">已付款</span>
                            </div>
                            <div
                                class="flex flex-row justify-between mt-[22px] border-0  border-b border-gray-200 pb-[6px]">
                                <div class="text-[12px]">
                                    <span>{{ formatDateTime(item.order_submission_time) }}</span>
                                    |<span class="ml-[2px]">{{ item.customInfo.custom_realName }}</span>
                                    |<span class="ml-[2px]">订单号：</span>
                                    <span>{{ item.orderDetailInfoList[0].order_id }}</span>
                                    |<span class="ml-[2px]">在线支付【支付宝】</span>
                                </div>
                                <div class="text-[12px]">
                                    订单金额：
                                    <span class="text-[18px]">{{ item.orderDetailInfoList[0].goodsInfo.goods_price
                                    }}</span>元
                                </div>
                            </div>
                            <div class="flex flex-row justify-between">
                                <div class="flex flex-row items-center pt-[10px]">
                                    <img :src="baseURL + item.orderDetailInfoList[0].goodsInfo.goods_photo[0]"
                                        class="w-[90px] h-[100px]" />
                                    <div class="ml-10 py-[20px]  h-full flex flex-col justify-between">
                                        <p class="text-16">{{ item.orderDetailInfoList[0].goodsInfo.goods_name }}
                                        </p>
                                        <span class="text-14">{{ item.orderDetailInfoList[0].goodsInfo.goods_price
                                        }}元
                                            &nbsp; x{{ item.orderDetailInfoList[0].goods_num }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-col mt-14">
                                    <el-button @click="showDrawer(item.id)">订单详情</el-button>
                                    <el-button class="my-10">申请售后</el-button>
                                    <el-button>联系商家</el-button>
                                </div>
                            </div>
                        </el-card>
                    </template>
                    <div class="flex flex-row justify-between items-center pt-[11px]">
                        <div class="text-[14px]">当前第{{ queryFormData.pageIndex }}页，共{{ resultData.pageCount }}页，共{{
                                resultData.totalCount
                        }}条</div>
                        <el-pagination background layout="prev, pager, next" :total="resultData.totalCount"
                            @current-change="currentChange" :current-page="queryFormData.pageIndex" />
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已发货" name="fourth">
                    <template v-for="item in resultData.listData">
                        <el-card shadow="never" class="demo-tabs mb-14">
                            <div>
                                <span class="text-[18px]">已发货</span>
                            </div>
                            <div
                                class="flex flex-row justify-between mt-[22px] border-0  border-b border-gray-200 pb-[6px]">
                                <div class="text-[12px]">
                                    <span>{{ formatDateTime(item.order_submission_time) }}</span>
                                    |<span class="ml-[2px]">{{ item.customInfo.custom_realName }}</span>
                                    |<span class="ml-[2px]">订单号：</span>
                                    <span>{{ item.orderDetailInfoList[0].order_id }}</span>
                                    |<span class="ml-[2px]">在线支付【支付宝】</span>
                                </div>
                                <div class="text-[12px]">
                                    订单金额：
                                    <span class="text-[18px]">{{ item.orderDetailInfoList[0].goodsInfo.goods_price
                                    }}</span>元
                                </div>
                            </div>
                            <div class="flex flex-row justify-between">
                                <div class="flex flex-row items-center pt-[10px]">
                                    <img :src="baseURL + item.orderDetailInfoList[0].goodsInfo.goods_photo[0]"
                                        class="w-[90px] h-[100px]" />
                                    <div class="ml-10 py-[20px]  h-full flex flex-col justify-between">
                                        <p class="text-16">{{ item.orderDetailInfoList[0].goodsInfo.goods_name }}
                                        </p>
                                        <span class="text-14">{{ item.orderDetailInfoList[0].goodsInfo.goods_price
                                        }}元
                                            &nbsp; x{{ item.orderDetailInfoList[0].goods_num }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-col mt-14">
                                    <el-button @click="showDrawer(item.id)">订单详情</el-button>
                                    <el-button class="my-10">申请售后</el-button>
                                    <el-button>联系商家</el-button>
                                </div>
                            </div>
                        </el-card>
                    </template>
                    <div class="flex flex-row justify-between items-center pt-[11px]">
                        <div class="text-[14px]">当前第{{ queryFormData.pageIndex }}页，共{{ resultData.pageCount }}页，共{{
                                resultData.totalCount
                        }}条</div>
                        <el-pagination background layout="prev, pager, next" :total="resultData.totalCount"
                            @current-change="currentChange" :current-page="queryFormData.pageIndex" />
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已签收" name="five">
                    <template v-for="item in resultData.listData">
                        <el-card shadow="never" class="demo-tabs mb-14">
                            <div>
                                <span class="text-[18px]">已签收</span>
                            </div>
                            <div
                                class="flex flex-row justify-between mt-[22px] border-0  border-b border-gray-200 pb-[6px]">
                                <div class="text-[12px]">
                                    <span>{{ formatDateTime(item.order_submission_time) }}</span>
                                    |<span class="ml-[2px]">{{ item.customInfo.custom_realName }}</span>
                                    |<span class="ml-[2px]">订单号：</span>
                                    <span>{{ item.orderDetailInfoList[0].order_id }}</span>
                                    |<span class="ml-[2px]">在线支付【支付宝】</span>
                                </div>
                                <div class="text-[12px]">
                                    订单金额：
                                    <span class="text-[18px]">{{ item.orderDetailInfoList[0].goodsInfo.goods_price
                                    }}</span>元
                                </div>
                            </div>
                            <div class="flex flex-row justify-between">
                                <div class="flex flex-row items-center pt-[10px]">
                                    <img :src="baseURL + item.orderDetailInfoList[0].goodsInfo.goods_photo[0]"
                                        class="w-[90px] h-[100px]" />
                                    <div class="ml-10 py-[20px]  h-full flex flex-col justify-between">
                                        <p class="text-16">{{ item.orderDetailInfoList[0].goodsInfo.goods_name }}
                                        </p>
                                        <span class="text-14">{{ item.orderDetailInfoList[0].goodsInfo.goods_price
                                        }}元
                                            &nbsp; x{{ item.orderDetailInfoList[0].goods_num }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-col mt-14">
                                    <el-button @click="showDrawer(item.id)">订单详情</el-button>
                                    <el-button class="my-10">申请售后</el-button>
                                    <el-button>联系商家</el-button>
                                </div>
                            </div>
                        </el-card>
                    </template>
                    <div class="flex flex-row justify-between items-center pt-[11px]">
                        <div class="text-[14px]">当前第{{ queryFormData.pageIndex }}页，共{{ resultData.pageCount }}页，共{{
                                resultData.totalCount
                        }}条</div>
                        <el-pagination background layout="prev, pager, next" :total="resultData.totalCount"
                            @current-change="currentChange" :current-page="queryFormData.pageIndex" />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>

    <el-drawer v-model="isShowDrawer" :size="700" :destroy-on-close="true" :with-header="false">
        <order-info-drawer :order-id="currentEditRowId" />
    </el-drawer>
</template>
<script setup>
import { reactive, ref } from "vue";
import API from "@/utils/API/index.js";
import { onMounted, inject } from "vue";
import { formatDateTime } from "../utils/dateTimeUtils"
import OrderInfoDrawer from "../views/OrderInfoDrawer.vue"


const activeName = ref('first');
const baseURL = inject("baseURL");

const queryFormData = reactive({
    pageIndex: 1,
    order_status: 0,
})

const resultData = reactive({
    listData: [],
    pageStart: 1,
    pageEnd: 1,
    totalCount: 0,
    pageCount: 0,

});



//根据页面来查询
const queryData = (queryFormData) => {
    API.orderInfo.getListByPage(queryFormData)
        .then(result => {
            console.log(result)
            resultData.listData = result.listData;
            resultData.listData.forEach(item => {
                item.orderDetailInfoList[0].goodsInfo.goods_photo = JSON.parse(item.orderDetailInfoList[0].goodsInfo.goods_photo)
            })
            resultData.pageStart = result.pageStart;
            resultData.pageEnd = result.pageEnd;
            resultData.totalCount = result.totalCount;
            resultData.pageCount = result.pageCount;
        })
}


onMounted(() => {
    queryData(queryFormData);
})
//改变页数页面发生变化

const currentChange = (index) => {
    queryFormData.pageIndex = index;
    queryData(queryFormData);

}

const queryDataFromTab = (tab, ev) => {
    // console.log(tab, ev);
    // console.log(tab.props.name);
    switch (tab.props.name) {
        case "first":
            queryData(queryFormData);
            break;
        case "second":
            queryFormData.order_status = 0;
            queryData(queryFormData);
            break;
        case "third":
            queryFormData.order_status = 1;
            queryData(queryFormData);
            break;
        case "fourth":
            queryFormData.order_status = 2;
            queryData(queryFormData);
            break;
        case "five":
            queryFormData.order_status = 3;
            queryData(queryFormData);
            break;
        default:
            break;
    }
}

/**
 * 抽屉，展示订单详细信息
 */
const isShowDrawer = ref(false);
const currentEditRowId = ref(null);
const showDrawer = id => {
    isShowDrawer.value = true;
    currentEditRowId.value = id;
}

</script>
<style lang="scss" scoped>
.demo-tabs {
    .el-tabs__content {
        padding: 32px;
        color: #e7e9ed;
        font-size: 32px;
        font-weight: 600;
    }
}

.big-box {
    width: 100%;
}

:deep(.el-button+.el-button) {
    margin-left: 0;
}
</style>