import axiosInstance from "../axiosInstance"
const shopCarInfo = {
    // http://www.softeem.xin:9547/shopCarInfo/addToShopCar
    addToShopCar({ goods_id, custom_id }) {
        return axiosInstance.patch(`/shopCarInfo/addToShopCar`, {
            goods_id, custom_id
        })
    }
}
export default shopCarInfo