import { mainStore } from "../store";
import { createRouter, createWebHashHistory } from "vue-router";
import { ElNotification } from "element-plus"

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
            component: () => import("../views/Index"),
            meta: {
                title: '首页'
            }
        },
        {
            path: "/Login",
            name: "Login",
            component: () => import("../views/Login"),
            meta: {
                title: '登录'
            }
        },
        {
            path: "/Register",
            name: "Register",
            component: () => import("../views/Register"),
            meta: {
                title: '注册'
            }
        },
        {
            path: "/MyShopCarList",
            name: "MyShopCarList",
            component: () => import("../views/MyShopCarList.vue"),
            meta: {
                title: '购物车',
                requireAuth: true
            }
        },
        {
            path: "/CheckoutOrder/:Ids",
            name: "CheckoutOrder",
            component: () => import("../views/CheckoutOrder.vue"),
            meta: {
                title: '我的订单',
                requireAuth: true
            }
        },
        {
            path: "/ConfirmOrder/:id",
            name: "ConfirmOrder",
            component: () => import("../views/ConfirmOrder.vue"),
            meta: {
                title: "确认订单",
                requireAuth: true
            }
        },
        {
            path: "/CustomCenter",
            name: "CustomCenter",
            component: () => import("../views/CustomCenter.vue"),
            meta: {
                title: '个人中心'
            },
            children: [
                {
                    path: "CustomInfo",
                    name: "CustomInfo",
                    component: () => import("../views/CustomInfo.vue"),
                    meta: {
                        title: '用户信息',
                        requireAuth: true
                    }
                },
                {
                    path: "AddressList",
                    name: "AddressList",
                    component: () => import("../views/AddressList.vue"),
                    meta: {
                        title: '地址列表',
                        requireAuth: true
                    }
                },
                {
                    path: "OrderInfoList",
                    name: "OrderInfoList",
                    component: () => import("../views/OrderInfoList.vue"),
                    meta: {
                        title: '订单列表',
                        requireAuth: true
                    }
                },
                {
                    path: "UploadMyPassword",
                    name: "UploadMyPassword",
                    component: () => import("../views/UploadMyPassword.vue"),
                    meta: {
                        title: '修改密码',
                        requireAuth: true
                    }
                },
            ]

        },
        {
            path: "/Search",
            name: "Search",
            component: () => import("../views/Search.vue"),
            meta: {
                title: '搜索',
            }
        },
        {
            path: "/GoodsDetail/:id",
            name: "GoodsDetail",
            component: () => import("../views/GoodsDetail.vue"),
            meta: {
                title: '商品详情',
            }
        },
        {
            path: "/AddToShopCarResult/:id",
            name: "AddToShopCarResult",
            component: () => import("../views/AddToShopCarResult.vue"),
            meta: {
                title: '添加购物车',
            }
        }
    ]
})

// 导航守卫拦截登录
router.beforeEach((to, from, next) => {
    const store = mainStore()

    if (to.meta.requireAuth) {
        if (store.token) {
            next();
        } else {
            console.log("你还没有登陆，请去登陆");
            ElNotification({
                type: "error",
                title: "系统提示",
                message: "你还没有登陆，请去登陆"
            })
            next({
                name: "Login"
            })
        }
    } else {
        next();
    }
})


export default router;