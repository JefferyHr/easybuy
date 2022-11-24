import axiosInstance from "../axiosInstance"

const addressInfo = {
    /**
     * 分页
     * @param {pageIndex} pageIndex 
     * @returns {Promise<AxiosInstance>}
     */
    getMyAddressInfoList(pageIndex) {
        return axiosInstance.get("/addressInfo/getMyAddressInfoList", {
            params: {
                pageIndex
            }
        })
    },

    /**
     * 根据id查询
     * @param {id} id 
     * @returns {Promise<AxiosInstance>}
     */
    deleteById(id) {
        return axiosInstance.delete("/addressInfo/deleteById", {
            params: {
                id
            }

        })
    },

    /**
     * 新增地址
     * @param {address_name, province, city, area, address_tag, address_tel, address_detail} param0 
     * @returns {Promise<AxiosInstance>}
     */
    addMyAddressInfo({ address_name, province, city, area, address_tag, address_tel, address_detail }) {
        return axiosInstance.post("/addressInfo/addMyAddressInfo", {
            address_name, province, city, area, address_tag, address_tel, address_detail
        })
    }
}

export default addressInfo;