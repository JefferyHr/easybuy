<template>
    <page-view>
        <div class="flex flex-row h-full">
            <img src="../assets/img/banner.jpg" class="w-[375px] h-full min-h-[867px] " alt="">
            <div class="right-content w-full  p-18 ">
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
                <div class="login-form w-[450px]  m-auto mt-[80px] p-20 pt-[30px]">
                    <div class="flex flex-row items-center justify-between">
                        <span class="text-[22px]">欢迎注册</span>
                        <router-link to="Login" class="text-primaryColor">去登录</router-link>
                    </div>
                    <div class="mt-[50px]">
                        <el-form :model="registerFromData" :rules="rules" ref="loginFormEl">
                            <el-form-item label="用户姓名" prop="custom_realName">
                                <el-input v-model="registerFromData.custom_realName" placeholder="请输入用户名" clearable />
                            </el-form-item>
                            <el-form-item label="登录密码" prop="custom_pwd">
                                <el-input v-model="registerFromData.custom_pwd" placeholder="请输入密码" clearable />
                            </el-form-item>
                            <el-form-item label="确认密码" prop="confirm_password">
                                <el-input v-model="registerFromData.confirm_password" placeholder="请再次输入密码" clearable />
                            </el-form-item>
                            <el-form-item label="手机号码" prop="custom_tel">
                                <el-input v-model="registerFromData.custom_tel" placeholder="请输入手机号码" clearable />
                            </el-form-item>
                            <el-form-item label="电子邮箱" prop="custom_email">
                                <el-input v-model="registerFromData.custom_email" placeholder="请输入邮箱" clearable />
                            </el-form-item>
                            <el-form-item label="用户性别" prop="custom_sex">
                                <el-radio-group v-model="registerFromData.custom_sex">
                                    <el-radio label="男" />男
                                    <el-radio label="女" />女
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="用户生日" prop="custom_birthday">
                                <el-date-picker v-model="registerFromData.custom_birthday" format="YYYY/MM/DD"
                                    value-format="YYYY-MM-DD" type="date" placeholder="生日当天会有小惊喜哦"
                                    style="width: 100%" />
                            </el-form-item>
                            <el-form-item label="用户地址" prop="custom_addr">
                                <el-cascader :options="options" v-model="registerFromData.custom_addr"
                                    style="width: 100%" />
                            </el-form-item>
                            <el-form-item label="管理员头像" prop="custom_photo">
                                <el-upload :before-upload="beforeAvatarUpload"
                                    :action="baseURL + `/customInfo/uploadCustomPhoto`" :show-file-list="false"
                                    name="custom_photo"
                                    class="w-[220px] h-[140px] border border-dotted border-gray-400 flex flex-row justify-center items-center"
                                    :headers="{ softeem_ele_admin_token: store.token }" :on-success="onSuccess">
                                    <el-image class="el-upload-list__item-thumbnail w-[220px] h-[140px]" alt=""
                                        fit="contain" :src="baseURL + registerFromData.custom_photo"
                                        v-if="registerFromData.custom_photo" lazy>
                                        <template #placeholder>
                                            <div
                                                class="text-primaryColor text-[14px] w-full h-full flex flex- row justify-center items-center">
                                                正在加载图片...</div>
                                        </template>
                                    </el-image>
                                    <el-icon size="65px" color="#808080" v-else>
                                        <UploadFilled />
                                    </el-icon>
                                </el-upload>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="w-full" :loading="isSubmiting" @click="SubmitFormEl"
                                    color="rgb(255,103,27)">
                                    注册
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

    </page-view>
</template>

<script setup>
import { reactive, ref, inject } from 'vue'
import API from "../utils/API"
import { UploadFilled, Loading } from '@element-plus/icons-vue'
import { regionData, CodeToText } from 'element-china-area-data'
import { ElNotification, ElMessage } from 'element-plus'
import { mainStore } from '../store';
import { useRouter } from 'vue-router'

const baseURL = inject("baseURL")
const store = mainStore()
const isLoading = ref(false)
const isSubmiting = ref(false)
const isSubmitImg = ref(false)
const options = regionData
const router = useRouter()

const registerFromData = reactive({
    custom_realName: '',
    custom_pwd: "",
    custom_tel: "",
    custom_email: "",
    custom_sex: "男",
    custom_birthday: "",
    custom_addr: "",
    custom_photo: "",
    confirm_password: ""
})

const validatePwd = (rule, value, callBack) => {
    if (registerFromData.confirm_password === "") {
        callBack(new Error("密码不能为空"))
    }
    if (registerFromData.confirm_password != registerFromData.custom_pwd) {
        callBack(new Error("两次密码必须相同"));
    }
    callBack();
}

const rules = {
    custom_realName: [
        { required: true, message: '账号不能为空', trigger: 'blur' },
    ],
    custom_pwd: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, message: '密码至少为6位', trigger: 'blur' },
    ],
    custom_tel: [
        { required: true, message: '手机号不能为空', trigger: 'blur' },
        { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的手机号格式', trigger: "blur" }
    ],
    custom_email: [
        { required: true, message: '邮箱不能为空', trigger: 'blur' },
        { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '请输入正确的邮箱格式', trigger: "blur" }
    ],
    custom_sex: [
        { required: true, message: '性别不能为空', trigger: 'blur' },
    ],
    custom_birthday: [
        { required: true, message: '生日不能为空', trigger: 'blur' },
    ],
    custom_addr: [
        { required: true, message: '地址不能为空', trigger: 'blur' },
    ],
    custom_photo: [
        { required: true, message: '头像不能为空', trigger: 'blur' },
    ],
    confirm_password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { validator: validatePwd, message: '两次密码不一致', trigger: 'blur' }
    ],
};

const beforeAvatarUpload = (rawFile) => {
    const reg = /^image\/(jpe?g|png|gif|webp)/
    if (reg.test(rawFile.type)) {
        //图片
        if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('图片大小不能超过2MB!')
            return false
        } else {
            isSubmitImg.value = true
        }
    } else {
        //不是图片
        ElNotification({
            title: '文件格式错误',
            message: `请选择图片文件`,
            type: 'error',
        })
        return true
    }

}
const onSuccess = (res) => {
    registerFromData.custom_photo = res.data
    isSubmitImg.value = false
}
const handleChange1 = (value) => {
    if (value[1] != null && value[2] != null) {
        var dz = CodeToText[value[0]] + ' ' + CodeToText[value[1]] + ' ' + CodeToText[value[2]]
    } else {
        if (value[1] != null) {
            dz = CodeToText[value[0]] + ' ' + CodeToText[value[1]]
        } else {
            dz = CodeToText[value[0]]
        }
    }
    return dz
}
const loginFormEl = ref(null);
const register = () => {
    isSubmiting.value = true
    registerFromData.custom_addr = handleChange1(registerFromData.custom_addr)
    API.customInfo.register(registerFromData).then(res => {
        ElMessage({
            message: `注册成功`,
            type: 'success',
            duration: 1200
        })
        router.replace({ name: "Login" })
    }).catch(error => {
        if (error.msg == '该手机号已被注册') {
            ElMessage({
                message: `该手机号已被注册,换一个试试`,
                type: 'error',
                duration: 1200
            })
        } else if (error.msg == '该邮箱已被注册') {
            ElMessage({
                message: `该邮箱已被注册,换一个试试`,
                type: 'error',
                duration: 1200
            })
        }
    }).finally(() => {
        isSubmiting.value = false
    })
}
const SubmitFormEl = () => {
    loginFormEl.value.validate(valid => {
        if (valid) {
            console.log("成功");
            register()
        }
        else {
            console.log("失败");
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