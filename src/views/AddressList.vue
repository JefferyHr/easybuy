<template>
    <page-view class="p-[22px] pb-[120px]">
        <el-card>
            <template #header>
                <div class="flex flex-row justify-between">
                    <span>我的收货地址</span>
                    <el-button plain color="#ff6a00" @click="drawer = true">新增地址</el-button>
                </div>
            </template>
            <!-- 展示数据 -->
            <el-table border stripe :data="resultData.listData">
                <el-table-column label="收件人姓名" prop="address_name" width="200" align="center"></el-table-column>
                <el-table-column label="收件人电话" prop="address_tel" width="200" align="center">
                </el-table-column>
                <el-table-column label="收货地址" align="center">
                    <template #default="{ row }">
                        {{ `${row.province} ${row.city} ${row.area} ${row.address_detail}` }}
                    </template>
                </el-table-column>
                <el-table-column label="地址标签" width="150" align="center">
                    <template #default="{ row }">
                        <el-button type="primary" plain>
                            <template #default>{{ row.address_tag }}</template>
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template #default="{ row }">
                        <el-popconfirm title="你确定要删除吗?" @confirm="deleteCurrentItem(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 页码 -->
            <div class="flex flex-row justify-between items-center pt-[11px]">
                <div class="text-[14px]">当前第{{ queryFormData.pageIndex }}页，共{{ resultData.pageCount }}页，共{{
                        resultData.totalCount
                }}条</div>
                <el-pagination background layout="prev, pager, next" :total="resultData.totalCount"
                    @current-change="currentChange" />
            </div>
        </el-card>
        <!-- 新增地址 -->
        <el-drawer v-model="drawer" :with-header="false" size="40%">
            <template #default>
                <el-form :model="addFormData" :rules="rules" label-width="80px" ref="addressFormEl">
                    <el-form-item label="姓名" prop="address_name">
                        <el-input placeholder="收货人姓名" v-model="addFormData.address_name" />
                    </el-form-item>
                    <el-form-item label="联系电话" prop="address_tel">
                        <el-input placeholder="请输入联系电话" v-model="addFormData.address_tel" />
                    </el-form-item>
                    <el-form-item label="用户地址" prop="address">
                        <el-cascader :options="options" v-model="addFormData.address" style="width: 100%" />
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address_detail">
                        <el-input placeholder="请输入详细地址" type="textarea" :rows="5"
                            v-model="addFormData.address_detail" />
                    </el-form-item>
                    <el-form-item label="标签" prop="address_tag">
                        <el-input placeholder="标签" v-model="addFormData.address_tag" />
                    </el-form-item>
                    <el-form-item>
                        <el-button color="#ff6700" @click="submitForm">保存
                        </el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </template>

        </el-drawer>

    </page-view>
</template>
<script setup>
import { reactive, ref } from "vue";
import API from "@/utils/API/index.js";
import { onMounted, inject } from "vue";
import { ElNotification } from "element-plus";
import { regionData, CodeToText } from 'element-china-area-data'

const drawer = ref(false)
const options = regionData

const queryFormData = reactive({
    pageIndex: 1,
})

const resultData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0,

})

const addFormData = reactive({
    address_name: "",
    province: "",
    city: "",
    area: "",
    address_tag: "",
    address_tel: "",
    address: "",
    address_detail: "",
})
//表单验证的规则

const rules = {
    address_name: [
        { required: true, message: '收货人姓名不能为空', trigger: 'blur' },
    ],
    address_tel: [
        { required: true, message: '联系电话不能为空', trigger: 'blur' },
        { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的手机号格式', trigger: "blur" }
    ],
    address: [
        { required: true, message: '地址不能为空', trigger: 'blur' },
    ],
    address_detail: [
        { required: true, message: '详细地址不能为空', trigger: 'blur' },
    ],
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


//根据页面来查询
const queryData = () => {
    API.addressInfo.getMyAddressInfoList(queryFormData.pageIndex)
        .then(result => {
            console.log(result);
            resultData.listData = result.listData;
            resultData.pageCount = result.pageCount;
            resultData.totalCount = result.totalCount;
        })
}

//网页发生变化
const currentChange = (index) => {
    queryFormData.pageIndex = index;
    queryData();

}

//删除操作
const deleteCurrentItem = (id) => {
    API.addressInfo.deleteById(id)
        .then(result => {
            ElNotification({
                type: "success",
                title: "删除成功",
                message: "当前收货地址删除成功",
            });
            queryData();
        }).catch(error => {
            ElNotification({
                type: "warning",
                title: "删除失败",
                message: "当前收货地址删除失败，请刷新或联系管理员",
            })
        })
}


//新增地址
const isSubmiting = ref(false);
const addAddressInfo = () => {
    isSubmiting.value = true;
    // 格式化地址
    addFormData.address = handleChange1(addFormData.address)
    addFormData.address = addFormData.address.split(" ")
    addFormData.province = addFormData.address[0]
    addFormData.city = addFormData.address[1]
    addFormData.area = addFormData.address[2]

    API.addressInfo.addMyAddressInfo(addFormData)
        .then(result => {
            console.log(result);
            ElNotification({
                type: "success",
                title: "提示",
                message: "新增地址成功",
            })
            location.reload()
        }).catch(error => {
            ElNotification({
                type: "warning",
                title: "失败了",
                message: "新增地址失败"
            });
            console.log(error);
        })
        .finally(() => {
            isSubmiting.value = false;
            drawer.value = false
        })
}

//提交表单
const addressFormEl = ref(null);
const submitForm = () => {
    addressFormEl.value.validate(valid => {
        if (valid) {
            addAddressInfo();
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
    addressFormEl.value.resetFields();
}

onMounted(() => {
    queryData();
})
</script>
<style scoped>

</style>