// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'

const app = createApp(App)

// const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:5000/', 
// })
app.config.globalProperties.$axios = axios
app.use(router).use(ElementPlus).mount('#app')
