<template>
    <page-view>
        <el-card>
            <template #header>修改密码</template>
            <el-form label-width="100px" ref="formEl">
                <el-form-item label="用户" class="pr-[20px]">
                    <el-input v-model="store.loginUserInfo.custom_realName" />
                </el-form-item>
                <el-form-item label="原密码" class="pr-[20px] ">
                    <el-input placeholder="请输入原密码" />
                </el-form-item>
                <el-form-item label="新密码" class="pr-[20px] ">
                    <el-input placeholder="请输入新密码" />
                </el-form-item>
                <el-form-item label="确认密码" class="pr-[20px] ">
                    <el-input placeholder="确认密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">提交
                    </el-button>
                    <el-button type="danger">重置</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </page-view>
</template>
<script setup>
import { reactive, ref } from "vue";
import API from "@/utils/API/index.js";
import { onMounted, inject } from "vue";
import { mainStore } from "../store/index.js";

const store = mainStore();

</script>
<style scoped>

</style>