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
        }
    ]
})

export default router;