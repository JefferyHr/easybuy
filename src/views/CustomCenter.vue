<template>
    <Header></Header>
    <page-view class="flex flex-col justify-center items-center bg-[#f3f4f6]">
        <div class="flex flex-1 overflow-auto  w-[1226px]  mt-[22px]">
            <div class="left flex flex-row ">
                <el-menu :unique-opened="true" class=" w-[200px]" :router='true'>
                    <el-menu-item index="/CustomCenter/CustomInfo" class="flex flex-row justify-center ">
                        <template #title>
                            <el-icon>
                                <Avatar />
                            </el-icon>
                            <span class="text-[16px]">个人中心</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/CustomCenter/AddressList" class="flex flex-row justify-center">
                        <template #title>
                            <el-icon>
                                <BellFilled />
                            </el-icon>
                            <span class="text-[16px]">收货地址</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/CustomCenter/OrderInfoList" class="flex flex-row justify-center">
                        <template #title>
                            <el-icon>
                                <List />
                            </el-icon>
                            <span class="text-[16px]">订单列表</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/CustomCenter/UploadMyPassword" class="flex flex-row justify-center">
                        <template #title>
                            <el-icon>
                                <Ticket />
                            </el-icon>
                            <span class="text-[16px]">修改密码</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/MyShopCarList" class="flex flex-row justify-center">
                        <template #title>
                            <el-icon>
                                <Briefcase />
                            </el-icon>
                            <span class="text-[16px]">我的购物车</span>
                        </template>
                    </el-menu-item>
                </el-menu>

            </div>
            <div class="right ml-[22px] flex-1 flex overflow-auto  bg-[#ffffff]">
                <router-view></router-view>
            </div>
        </div>
    </page-view>
    <Footer></Footer>

</template>
<script setup>
import {
    Document,
    Menu as IconMenu,
    BellFilled,
    Avatar,
    Briefcase,
    Ticket,
    List
} from '@element-plus/icons-vue';
import { useRouter, useRoute } from "vue-router";


const router = useRouter();
const route = useRoute();




</script>
<style scoped lang="scss">
:deep.el-sub-menu__icon-arrow {
    display: none;
    opacity: 0;
}
</style>