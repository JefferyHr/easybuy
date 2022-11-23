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
=======
            path: "/Register",
            name: "Register",
            component: () => import("../views/Register")
>>>>>>> 4eae5d5ee2468a388aaed1c572f2d9e87ec1d4d9
        }
    ]
})

export default router;