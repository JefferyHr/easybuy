import axiosInstance from '../axiosInstance'

const productsInfo = {
    // http://www.softeem.xin:9547/productsInfo/getTopProductsInfoListAndGoods
    getTopProductsInfoListAndGoods() {
        return axiosInstance.get("/productsInfo/getTopProductsInfoListAndGoods")
    }
}

export default productsInfo
