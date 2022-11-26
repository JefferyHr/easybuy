<template>
    <div class="pt-[30px] pl-[22px] big-box">
        <div>
            <span class="text-[22px]">我的订单</span>
            <span class="text-[12px] pl-[8px]">
                请谨防钓鱼链接或诈骗电话
            </span>
        </div>
        <div class="mt-[22px]">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="全部" name="first">
                    <el-card v-for="item in resultData.listData" class="demo-tabs ">
                        <div>
                            <span class="text-[18px]">{{ item.order_pay_type == 1 ? '未付款' : '已付款' }}</span>
                            <el-button plain color="#ff6a00" class="text-[12px] ml-[10px]" size="small">去付款</el-button>
                        </div>
                        <div
                            class="flex flex-row justify-between mt-[22px] border-0  border-b border-gray-200 pb-[6px]">
                            <div class="text-[12px]">
                                <span>{{ item.order_submission_time }}</span>
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
                                <img :src="baseURL + item.customInfo.custom_photo" class="w-[90px] h-[100px]" />
                                <div class="ml-[6px] text-[12px]">
                                    <p>{{ item.orderDetailInfoList[0].goodsInfo.goods_name }}</p>
                                    <span>{{ item.orderDetailInfoList[0].goodsInfo.goods_price }}元</span>x<span>{{
                                            item.orderDetailInfoList[0].goods_num
                                    }}</span>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <el-button class="mt-[22px]" plain>订单详细</el-button>
                                <el-button class="mt-[6px] px-[6px]" plain>申请售后</el-button>
                                <el-button class="mt-[6px]" plain>联系客户</el-button>
                            </div>
                        </div>
                    </el-card>

                    <!-- 页码 -->
                    <div class="flex flex-row justify-between items-center pt-[11px]">
                        <div class="text-[14px]">当前第{{ queryFormData.pageIndex }}页，共{{ resultData.pageCount }}页，共{{
                                resultData.totalCount
                        }}条</div>
                        <el-pagination background layout="prev, pager, next" :total="resultData.totalCount"
                            @current-change="currentChange" />
                    </div>
                </el-tab-pane>

                <el-tab-pane label="未付款" name="second">
                    <el-card v-for="item in resultData.listData" class="demo-tabs " v-show="item.order_pay_type == 1">
                        <div>
                            <span class="text-[18px]">{{ item.order_pay_type == 1 ? '未付款' : '已付款' }}</span>
                            <el-button plain color="#ff6a00" class="text-[12px] ml-[10px]" size="small">去付款</el-button>
                        </div>
                        <div
                            class="flex flex-row justify-between mt-[22px] border-0  border-b border-gray-200 pb-[6px]">
                            <div class="text-[12px]">
                                <span>{{ item.order_submission_time }}</span>
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
                                <img :src="baseURL + item.customInfo.custom_photo" class="w-[90px] h-[100px]" />
                                <div class="ml-[6px] text-[12px]">
                                    <p>{{ item.orderDetailInfoList[0].goodsInfo.goods_name }}</p>
                                    <span>{{ item.orderDetailInfoList[0].goodsInfo.goods_price }}元</span>x<span>{{
                                            item.orderDetailInfoList[0].goods_num
                                    }}</span>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <el-button class="mt-[22px]" plain>订单详细</el-button>
                                <el-button class="mt-[6px] px-[6px]" plain>申请售后</el-button>
                                <el-button class="mt-[6px]" plain>联系客户</el-button>
                            </div>
                        </div>
                    </el-card>

                </el-tab-pane>
                <el-tab-pane label="已付款" name="third">
                    <el-card v-for="item in resultData.listData" class="demo-tabs " v-show="item.order_pay_type == 0">
                        <div>
                            <span class="text-[18px]">{{ item.order_pay_type == 1 ? '未付款' : '已付款' }}</span>
                            <el-button plain color="#ff6a00" class="text-[12px] ml-[10px]" size="small">去付款</el-button>
                        </div>
                        <div
                            class="flex flex-row justify-between mt-[22px] border-0  border-b border-gray-200 pb-[6px]">
                            <div class="text-[12px]">
                                <span>{{ item.order_submission_time }}</span>
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
                                <img :src="baseURL + item.customInfo.custom_photo" class="w-[90px] h-[100px]" />
                                <div class="ml-[6px] text-[12px]">
                                    <p>{{ item.orderDetailInfoList[0].goodsInfo.goods_name }}</p>
                                    <span>{{ item.orderDetailInfoList[0].goodsInfo.goods_price }}元</span>x<span>{{
                                            item.orderDetailInfoList[0].goods_num
                                    }}</span>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <el-button class="mt-[22px]" plain>订单详细</el-button>
                                <el-button class="mt-[6px] px-[6px]" plain>申请售后</el-button>
                                <el-button class="mt-[6px]" plain>联系客户</el-button>
                            </div>
                        </div>
                    </el-card>

                </el-tab-pane>
                <el-tab-pane label="已发货" name="fourth">

                </el-tab-pane>
                <el-tab-pane label="已签收" name="five">

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import API from "@/utils/API/index.js";
import { onMounted, inject } from "vue";

const activeName = ref('first');
const baseURL = inject("baseURL");

const queryFormData = reactive({
    pageIndex: 3,
})

const resultData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0,

});

//网页发生变化
const currentChange = (index) => {
    queryFormData.pageIndex = index;
    queryData();

}

//根据页面来查询
const queryData = () => {
    API.orderInfo.getListByPage(queryFormData.pageIndex)
        .then(result => {
            console.log(result)
            resultData.listData = result.listData;
            resultData.pageCount = result.pageCount;
            resultData.totalCount = result.totalCount;
        })
}


onMounted(() => {
    queryData();
})


</script>
<style scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #e7e9ed;
    font-size: 32px;
    font-weight: 600;
}

.big-box {
    width: 100%;

}
</style>