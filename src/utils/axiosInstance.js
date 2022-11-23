import axios from "axios"
import router from "../router"

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 2000
})

export default axiosInstance

