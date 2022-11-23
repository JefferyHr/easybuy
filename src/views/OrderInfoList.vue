<template>
    <page-view class="pt-[30px] pl-[22px]">
        <div>
            <span class="text-[22px]">我的订单</span>
            <span class="text-[12px] pl-[8px]">
                请谨防钓鱼链接或诈骗电话
            </span>
        </div>
        <div class="mt-[22px]">
            <el-tabs v-model="activeName" class="demo-tabs " type="card">
                <el-tab-pane label="全部" name="first">
                    <el-card>
                        <div>
                            <span class="text-[18px]">未付款</span>
                            <el-button plain color="#ff6a00" class="text-[12px] ml-[10px]" size="small">去付款</el-button>
                        </div>
                        <div
                            class="flex flex-row justify-between mt-[22px] border-0  border-b border-gray-200 pb-[6px]">
                            <div class="text-[12px]">
                                <span>2022年11月23日 10:22:22</span>
                                |<span class="ml-[2px]">bgg</span>
                                |<span class="ml-[2px]">订单号：</span>
                                <span>254</span>
                                |<span class="ml-[2px]">在线支付【支付宝】</span>
                            </div>
                            <div class="text-[12px]">
                                订单金额：
                                <span class="text-[18px]">1122.00</span>元
                            </div>
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="flex flex-row items-center pt-[10px]">
                                <div class="w-[90px] h-[100px]">图片</div>
                                <div class="ml-[6px] text-[12px]">
                                    <p>小米加湿器</p>
                                    <span>188.00元</span>x<span>1</span>
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
                <el-tab-pane label="未付款" name="second">
                    <el-card>
                        未付款
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="已付款" name="third">
                    <el-card>
                        已付款
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="已发货" name="fourth">
                    <el-card>
                        已发货
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="已签收" name="five">
                    <el-card>
                        已签收
                    </el-card>
                </el-tab-pane>
            </el-tabs>
        </div>
    </page-view>
</template>
<script setup>
import { ref } from 'vue';


const activeName = ref('first')


</script>
<style scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #e7e9ed;
    font-size: 32px;
    font-weight: 600;
}
</style>