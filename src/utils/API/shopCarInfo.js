import axiosInstance from "../axiosInstance"

const shopCarInfo = {
    /**
     * 获取购物车列表
     * @returns {Promise<AxiosInstance>}
     */
    getMyShopCarList() {
        return axiosInstance.get("/shopCarInfo/getMyShopCarList", {

        })
    },

    // http://www.softeem.xin:9547/shopCarInfo/addToShopCar
    addToShopCar({ goods_id, custom_id }) {
        return axiosInstance.patch(`/shopCarInfo/addToShopCar`, {
            goods_id, custom_id
        })
    },

    /**
     * 购物车数量减一
     * @param {goods_id, custom_id} param0 
     * @returns {Promise<AxiosInstance>}
     */
    subToShopCar({ goods_id, custom_id }) {
        return axiosInstance.patch(`/shopCarInfo/subToShopCar`, {
            goods_id, custom_id
        })
    },

    /**
     * 删除
     * @param {id} id 
     * @returns {Promise<AxiosInstance>}
     */
    // deleteById(id) {
    //     return axiosInstance.delete(`/shopCarInfo/deleteById/`, {
    //         id
    //     });
    // },
    deleteById(id) {
        return axiosInstance.delete(`/shopCarInfo/deleteById/${id}`);
    },

    // http://www.softeem.xin:9547/shopCarInfo/getMyCheckoutShopCarList/:Ids

    // getMyCheckoutShopCarList(Ids) {
    //     return axiosInstance.get("/shopCarInfo/getMyCheckoutShopCarList", {
    //         params: {
    //             Ids
    //         }
    //     })
    // }

    /**
    * @param Ids 这里的Ids是一个字符串，如果有多个，用逗号隔开
    */
    getMyCheckoutShopCarList(Ids) {
        return axiosInstance.get(`/shopCarInfo/getMyCheckoutShopCarList/${Ids}`);
    },
}

export default shopCarInfo;
