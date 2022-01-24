import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import store from './store'

const app = createApp(App).use(store);
app.use(VueAxios, axios)
app.mount('#app')
