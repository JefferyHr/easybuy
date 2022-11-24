import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: {
                name: "Index"
            }
        },
        {
            path: "/Index",
            name: "Index",
            component: () => import("../views/Index")
        },
        {
            path: "/Login",
            name: "Login",
            component: () => import("../views/Login")
        },
        {
<<<<<<< HEAD
=======
            path: "/Register",
            name: "Register",
            component: () => import("../views/Register")
        },
        {
>>>>>>> 7350895ddaf3daa6f7e00ac34c656d8381b8c982
            path: "/MyShopCarList",
            name: "MyShopCarList",
            component: () => import("../views/MyShopCarList.vue")
        },
        {
            path: "/CustomCenter",
            name: "CustomCenter",
            component: () => import("../views/CustomCenter.vue"),
            children: [
                {
                    path: "CustomInfo",
                    name: "CustomInfo",
                    component: () => import("../views/CustomInfo.vue"),
                },
                {
                    path: "AddressList",
                    name: "AddressList",
                    component: () => import("../views/AddressList.vue"),
                },
                {
                    path: "OrderInfoList",
                    name: "OrderInfoList",
                    component: () => import("../views/OrderInfoList.vue"),
                },
                {
                    path: "UploadMyPassword",
                    name: "UploadMyPassword",
                    component: () => import("../views/UploadMyPassword.vue"),
                },
            ]
<<<<<<< HEAD

        },
        {
            path: "/Register",
            name: "Register",
            component: () => import("../views/Register")
        }
=======
        },
        {
            path: "/Search",
            name: "Search",
            component: () => import("../views/Search.vue")
        },
>>>>>>> 7350895ddaf3daa6f7e00ac34c656d8381b8c982
    ]
})

export default router;