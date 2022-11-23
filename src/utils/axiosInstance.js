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
    config.headers["softeem_clietn_token"] = store.token
    return config
})

axiosInstance.interceptors.response.use(resp => {
    if (resp.data.status == "success") {
        return Promise.resolve(resp.data.data)
    } else {
        return Promise.reject(resp.data)
    }
}, error => {
    if (error.response.status == 403) {
        router.replace({ name: "Login" })
    } else if (error.response == "") {
        ElMessage({
            message: `网络错误，请检查你的网络`,
            type: 'error',
            duration: 2000
        })
    }
    return Promise.reject(error)
})


export default axiosInstance

