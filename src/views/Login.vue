<template>
    <page-view>
        <div class="flex flex-row h-full">
            <img src="../assets/img/banner.jpg" class="w-[375px] h-full min-h-[876px]" alt="">
            <div class="right-content  w-full  p-18 ">
                <!-- 头部 -->
                <div class="flex flex-row justify-between">
                    <div class="left-logo flex flex-row items-center ml-18">
                        <img src="../assets/img/logo.png" class="w-[40px] object-cover" alt="">
                        <div class="text-[26px] text-gray-700 ml-10 ">小米账号</div>
                    </div>
                    <div class="right-menu  text-[14px] flex flex-row items-center text-[#808080]">
                        <ul class="menu-item flex flex-row justify-around items-center border-0 border-r w-[300px]">
                            <li>用户协议</li>
                            <li class="mx-8">隐私政策</li>
                            <li>帮助中心</li>
                        </ul>
                        <span class="ml-12">中文(简体)</span>
                    </div>
                </div>
                <!-- 主体 -->
                <transition enter-active-class=" animate__animated animate__flipIny">
                    <div class="login-form w-[450px] h-[370px] m-auto mt-[80px] p-20 pt-[30px]">
                        <div class="flex flex-row items-center justify-between">
                            <span class="text-[22px]">欢迎登录</span>
                            <router-link to="Register" class="text-primaryColor">去注册</router-link>
                        </div>
                        <div class=" mt-[50px]">
                            <el-form :model="loginFromData" :rules="rules" size="large" ref="loginFormEl">
                                <el-form-item prop="zh">
                                    <el-input v-model="loginFromData.zh" placeholder="邮箱/手机号" clearable />
                                </el-form-item>
                                <el-form-item prop="custom_pwd">
                                    <el-input v-model="loginFromData.custom_pwd" placeholder="密码" type="password"
                                        clearable />
                                </el-form-item>
                                <el-form-item>
                                    <el-checkbox v-model="loginFromData.checked" label="已阅读并同意小米账号 用户协议 和 隐私政策" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button class="w-full" color="rgb(255,103,27)" :disabled="!loginFromData.checked"
                                        @click="SubmitFormEl">登陆系统
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </page-view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import API from "../utils/API"
import { mainStore } from "../store"
import { ElMessage } from "element-plus"
import { useRouter } from 'vue-router';

const store = mainStore()
const router = useRouter()


const loginFromData = reactive({
    zh: "13811111111",
    custom_pwd: "123456",
    checked: true
})
const rules = reactive({
    zh: [
        { required: true, message: '账号不能为空', trigger: 'blur' },
    ],
    custom_pwd: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ],
})


const loginFormEl = ref(null)
const SubmitFormEl = () => {
    loginFormEl.value.validate((valid, fields) => {
        if (valid) {
            console.log("验证成功");
            checkLogin()
        } else {
            console.log("验证失败", fields);
        }
    })
}

const checkLogin = () => {
    API.customInfo.checkLogin(loginFromData).then(res => {
        store.setLoginUserInfo(res.loginClientInfo)
        store.setToken(res.token)
        ElMessage({
            message: `欢迎登录，${res.loginClientInfo.custom_realName}`,
            type: 'success',
            duration: 1200
        })
        router.replace({ name: "Index" })
    }).catch(error => {
        if (error.status == "fail") {
            ElMessage({
                message: `账号或密码不正确，请检查`,
                type: 'error',
                duration: 1200
            })
        }

    })
}
</script>

<style lang="scss" scoped>
.el-button {
    color: white;
}

.login-form {
    box-shadow: 0 0 10px 3px lightgray;
}
</style>