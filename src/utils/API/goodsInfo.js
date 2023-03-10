import axiosInstance from "../axiosInstance"
const goodsInfo = {
    // http://www.softeem.xin:9547/goodsInfo/getListByPage\
    getListByPage({ pageIndex, goods_name, goods_status, products_id, goods_price_low, goods_price_high }) {
        return axiosInstance.get("/goodsInfo/getListByPage", {
            params: {
                pageIndex, goods_name, goods_status, products_id, goods_price_low, goods_price_high
            }
        })
    },
    // http://www.softeem.xin:9547/goodsInfo/getListByParentId/:parent_id
    getListByParentId(products_id) {
        return axiosInstance.get(`/goodsInfo/getListByParentId`, {
            params: {
                products_id
            }
        })
    },
    // http://www.softeem.xin:9547/goodsInfo/findById/:id
    findById(id) {
        return axiosInstance.get(`/goodsInfo/findById/${id}`)
    },
    // http://www.softeem.xin:9547/goodsInfo/getRecommendGoodsList
    getRecommendGoodsList() {
        return axiosInstance.get(`/goodsInfo/getRecommendGoodsList`)
    }

}
export default goodsInfo