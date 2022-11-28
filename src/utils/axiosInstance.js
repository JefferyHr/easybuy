import axios from "axios"
import router from "../router"
import { mainStore } from "../store"
import { ElMessage } from "element-plus"


const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 2000
})

axiosInstance.interceptors.request.use(config => {
    const store = mainStore()
    config.headers["easybuy_client_token"] = store.token
    return config
})

axiosInstance.interceptors.response.use(resp => {

    if (resp.data.status == "success") {
        return Promise.resolve(resp.data.data)
    } else {
        return Promise.reject(resp.data)
    }


}, error => {
    if (error.response) {
        if (error.response.status === 403) {
            router.replace({
                name: "Login"
            })
            ElMessage({
                message: `登录信息已过期，请重新登录`,
                type: 'error',
                duration: 2000
            })
        } else {
            // 其他错误处理
            ElMessage({
                message: `网络错误，请检查你的网络`,
                type: 'error',
                duration: 2000
            })
        }
    }
    console.log(error);
    return Promise.reject(error)
})


export default axiosInstance

