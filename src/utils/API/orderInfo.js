import axiosInstance from "../axiosInstance";

const orderInfo = {
    /**
     * 分页获取订单信息
     * @param {pageIndex, id, order_status, order_pay_type} param0 
     * @returns {Promise<AxiosInstance>}
     */
    getListByPage({ pageIndex, id, order_status, order_pay_type }) {
        return axiosInstance.get("/orderInfo/getListByPage", {
            params: {
                pageIndex, id, order_status, order_pay_type
            }
        })
    },

    /**
     * 用户提交订单
     * @param {address_id, order_pay_type, goodsList} param0 
     * @returns {Promise<AxiosInstance>}
     */
    submitOrder({ address_id, order_pay_type, goodsList }) {
        return axiosInstance.post("/orderInfo/submitOrder", {
            address_id, order_pay_type, goodsList
        })
    }
}

export default orderInfo;