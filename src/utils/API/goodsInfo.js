import axiosInstance from "../axiosInstance"
const goodsInfo = {
    // http://www.softeem.xin:9547/goodsInfo/getListByPage\
    getListByPage({ pageIndex, goods_name, goods_status, products_id, goods_price_low, goods_price_high }) {
        return axiosInstance.get("/goodsInfo/getListByPage", {
            params: {
                pageIndex, goods_name, goods_status, products_id, goods_price_low, goods_price_high
            }
        })
    }
}
export default goodsInfo