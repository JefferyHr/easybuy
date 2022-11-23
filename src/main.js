import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import PiniaPluginPersistedState from "pinia-plugin-persistedstate"



import "./assets/css/index.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn'
import "animate.css"




import PageView from "./components/PageView.vue"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

const app = createApp(App)
const pinia = createPinia()
pinia.use(PiniaPluginPersistedState)

app.provide("baseURL", baseURL)

app.component("page-view", PageView)
app.component("Header", Header)
app.component("Footer", Footer)



app.use(ElementPlus)
app.use(router)
app.use(pinia)


app.mount('#app')
