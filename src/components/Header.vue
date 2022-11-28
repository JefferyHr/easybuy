<template>
    <div class="header bg-[#333]  text-[#b0b0b0]">
        <div class=" base-width h-[40px] flex flex-row items-center justify-between">
            <div class="title-left  h-full flex items-center flex-row text-[12px] ">
                <a href="javascript:void(0)">小米商城</a>
                <a href="javascript:void(0)">MiUI</a>
                <a href="javascript:void(0)">LoT</a>
                <a href="javascript:void(0)">云服务</a>
                <a href="javascript:void(0)">天星数科</a>
                <a href="javascript:void(0)">有品</a>
                <a href="javascript:void(0)">小爱同学开放</a>
                <a href="javascript:void(0)">企业团购</a>
                <a href="javascript:void(0)">资质证照</a>
                <a href="javascript:void(0)">协议规则</a>
                <a href="javascript:void(0)">下载app</a>
                <a href="javascript:void(0)">Select Location</a>
            </div>
            <div class="title-right  h-full flex items-center flex-row text-[12px] ">
                <div v-if="loginUserInfo">
                    <span>欢迎登录：{{ loginUserInfo.custom_realName }}</span>
                    <span @click="logOut">退出登录</span>
                </div>
                <div v-else>
                    <span @click="$router.push({ name: 'Login' })">请登录</span>
                </div>
                <div class="cursor-pointer hover:text-primaryColor mr-6"
                    @click="$router.push({ name: 'CustomCenter' })">
                    个人中心</div>
                <div class="shop-car bg-[#424242] cursor-pointer h-full  w-[80px] flex items-center flex-row justify-center hover:text-primaryColor"
                    @click="$router.push({ name: 'MyShopCarList' })">
                    购物车</div>
            </div>
        </div>
    </div>
    <div class="base-width bg-white flex flex-row justify-between items-center h-[76px]">
        <img src="../assets/img/logo.png" class="w-[56px] h-[56px] cursor-pointer" @click="toIndex" alt="">
        <div class="nav-bar flex flex-row text-black text-[14px]">
            <a href="javascript:void(0)">Xiaomi手机</a>
            <a href="javascript:void(0)">Redmi手机</a>
            <a href="javascript:void(0)">电视</a>
            <a href="javascript:void(0)">笔记本</a>
            <a href="javascript:void(0)">平板</a>
            <a href="javascript:void(0)">家电</a>
            <a href="javascript:void(0)">路由器</a>
            <a href="javascript:void(0)">服务</a>
            <a href="javascript:void(0)">社区</a>
        </div>
        <div class="flex  flex-row w-[280px]">
            <el-input placeholder="请输入要搜索的商品" v-model="goods_name"></el-input>
            <el-button color="rgb(255,103,27)" @click="toSearch(goods_name)">搜索</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from "vue"
import { mainStore } from "../store"
import { useRouter } from 'vue-router';
import { ElMessageBox } from "element-plus"
import { storeToRefs } from 'pinia';


const store = mainStore()
const router = useRouter()
const { loginUserInfo } = storeToRefs(store)
const goods_name = ref('')

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
const toIndex = () => {
    router.replace({ name: "Index" })
}
const toSearch = (goods_name) => {
    window.open(router.resolve({ name: "Search", query: { goods_name } }).href);
}
</script>

<style lang="scss" scoped>
.title-left,
.title-right {

    a,
    span {
        @apply cursor-pointer mr-10;

        &:hover {
            @apply text-primaryColor
        }
    }
}

.el-button {
    color: white
}

.nav-bar {
    a {
        @apply mx-12;

        &:hover {
            @apply text-primaryColor
        }
    }
}
</style>