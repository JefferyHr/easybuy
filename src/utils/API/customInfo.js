import axiosInstance from "../axiosInstance"

const customInfo = {
    // http://www.softeem.xin:9547/customInfo/checkLogin
    checkLogin({ zh, custom_pwd }) {
        return axiosInstance.post("/customInfo/checkLogin", {
            zh, custom_pwd
        })
    },
    // http://www.softeem.xin:9547/customInfo/register
    register({ custom_realName, custom_pwd, custom_tel, custom_email, custom_sex, custom_birthday, custom_addr, custom_photo }) {
        return axiosInstance.post("/customInfo/register", {
            custom_realName, custom_pwd, custom_tel, custom_email, custom_sex, custom_birthday, custom_addr, custom_photo
        })
    },

    /**
     * 修改密码
     * @param {oldPassword, newPassword} param0 
     * @returns {Promise<AxiosInstance>}
     */
    uploadMyPassword({ oldPassword, newPassword }) {
        return axiosInstance.post("/customInfo/uploadMyPassword", {
            oldPassword, newPassword
        })
    }
}

export default customInfo