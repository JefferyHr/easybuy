<template>
    <page-view>
        <el-card>
            <div class="flex flex-row justify-between pt-[22px] pb-[11px]">
                <div class="flex flex-row items-center">
                    <img :src="baseURL + queryFormData.custom_photo" class="w-[100px] h-[100px] img-box ml-[33px]" />
                    <div class="ml-[33px]">
                        <div class="text-[18px] mb-[6px]">{{ queryFormData.custom_realName }}</div>
                        <div class="text-[12px] text-[#757a83]">早上好~</div>
                        <div class="text-[12px] text-[#ff6a00] mt-[6px]">修改个人信息</div>
                    </div>
                </div>
                <div class="flex flex-col justify-around mr-[200px] text-[14px]">
                    <div>账号安全：<span class="text-[#1ca54e]">较高</span></div>
                    <div>绑定手机：<span>{{queryFormData.custom_tel}}</span></div>
                    <div>绑定邮箱：<span>{{queryFormData.custom_email}}</span></div>
                </div>
            </div>
        </el-card>
    </page-view>
</template>
<script setup>
import { reactive, ref } from "vue";
import API from "@/utils/API/index.js";
import { onMounted, inject } from "vue";
import { mainStore } from "../store/index.js"

const store = mainStore();
const baseURL = inject("baseURL");


const queryFormData = reactive({
    custom_realName: "",
    custom_pwd: "",
    custom_tel: "",
    custom_email: "",
    custom_sex: "",
    custom_birthday: "",
    custom_addr: "",
    custom_photo: "",
})

const queryData = () => {
    queryFormData.custom_realName = store.loginUserInfo.custom_realName;
    queryFormData.custom_tel = store.loginUserInfo.custom_tel;
    queryFormData.custom_email = store.loginUserInfo.custom_email;
    queryFormData.custom_photo = store.loginUserInfo.custom_photo;

}

onMounted(() => {
    queryData();
})
</script>
<style scoped>
:deep(.img-box) {
    border-radius: 50%;
}
</style>