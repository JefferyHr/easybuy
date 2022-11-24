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
    }
}

export default orderInfo;