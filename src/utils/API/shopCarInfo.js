import axiosInstance from "../axiosInstance"

const shopCarInfo = {
    /**
     * 获取购物车列表
     * @returns {Promise<AxiosInstance>}
     */
    getMyShopCarList() {
        return axiosInstance.get("/shopCarInfo/getMyShopCarList", {

        })
    }
}

export default shopCarInfo;