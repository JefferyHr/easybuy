import axiosInstance from "../axiosInstance"

const area = {
    // http://www.softeem.xin:9547/area/getAreaList
    getAreaList() {
        return axiosInstance.get("/area/getAreaList")
    },
    // http://www.softeem.xin:9547/area/getListByParentId/:parentId
    getListByParentId(parentId) {
        return axiosInstance.get("/area/getListByParentId", {
            params: {
                parentId
            }
        })
    }
}
export default area