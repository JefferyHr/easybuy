import { defineStore } from "pinia";
import WebStorageCache from "web-storage-cache";

const cache = new WebStorageCache({
    storage: window.localStorage
})

export const mainStore = defineStore("main", {
    state() {
        return {
            token: null,
            loginUserInfo: null,
        }
    },
    actions: {
        setToken(token) {
            this.token = token
        },
        setLoginUserInfo(loginUserInfo) {
            this.loginUserInfo = loginUserInfo
        },
        logOut() {
            this.token = null
            this.loginUserInfo = null
        }
    },
    persist: {
        key: "easy-buy-store",
        storage: {
            getItem: key => cache.get(key),
            setItem: (key, value) => cache.set(key, value, { exp: 60 * 60 * 24 }),
            removeItem: key => cache.delete(key),
            clear: () => cache.clear()
        },
        paths: ["token", "loginUserInfo"]
    }
})