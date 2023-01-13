import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import mixins from './mixins/mixins.js'
import './assets/main.css'
import store from "./store";

const app = createApp(App)

app.use(router)
app.mixin(mixins)
app.use(store)

app.mount('#app')
