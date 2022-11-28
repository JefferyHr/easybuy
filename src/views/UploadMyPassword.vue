<template>
    <page-view>
        <el-card class="pb-[400px]">
            <template #header>修改密码</template>
            <el-form label-width="100px" ref="formEl" :model="queryFormData" :rules="rules" :ref="formEl">
                <el-form-item label="用户" class="pr-[20px]">
                    <el-input v-model="store.loginUserInfo.custom_realName" />
                </el-form-item>
                <el-form-item label="原密码" class="pr-[20px] " prop="oldPassword">
                    <el-input placeholder="请输入原密码" v-model="queryFormData.oldPassword" />
                </el-form-item>
                <el-form-item label="新密码" class="pr-[20px] " prop="newPassword">
                    <el-input placeholder="请输入新密码" v-model="queryFormData.newPassword" />
                </el-form-item>
                <el-form-item label="确认密码" class="pr-[20px] " prop="newPassword1">
                    <el-input placeholder="确认密码" v-model="queryFormData.newPassword1" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交
                    </el-button>
                    <el-button type="danger" @click="resetForm">重置</el-button>
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
import { ElMessageBox } from "element-plus";

const store = mainStore();

const queryFormData = reactive({
    oldPassword: "",
    newPassword: "",
    newPassword1: "",
})



const queryData = () => {
    API.customInfo.uploadMyPassword(queryFormData)
        .then(result => {

        })
}

const validatePwd = (rule, value, callBack) => {
    if (queryFormData.newPassword1 === "") {
        callBack(new Error("密码不能为空"))
    }
    if (queryFormData.newPassword1 != queryFormData.newPassword) {
        callBack(new Error("两次密码必须相同"));
    }
    callBack();
}

//表单验证
const rules = {
    oldPassword: [
        { required: true, message: '账号不能为空', trigger: 'blur' },
    ],
    newPassword: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, message: '密码至少为6位', trigger: 'blur' },
    ],
    newPassword1: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { validator: validatePwd, message: '两次密码不一致', trigger: 'blur' }
    ],
}

//提交表单
const formEl = ref(null);
const submitForm = () => {
    //验证表单的数据是否合格
    // console.log(formEl.value)
    formEl.value.validate(valid => {
        //这个valid就是验证的结果
        if (valid) {
            //表单验证成功，我们要提交数据
            queryData();
            console.log("修改成功")
            ElMessageBox.alert("修改密码成功！");
        } else {
            ElNotification({
                type: "warning",
                title: "提示",
                message: "请正确的填写表单的内容"
            })
        }
    });
}

//重置表单
const resetForm = () => {
    // console.log(formEl);
    formEl.value.resetFields();
}

</script>
<style scoped>

</style>