import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import App from './App.vue'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

let  pinia = createPinia()



//导入路由器
import router from './router'

createApp(App)
.use(router)
.use(ElementPlus)
.use(createPinia())
.use(pinia)
.mount('#app')

