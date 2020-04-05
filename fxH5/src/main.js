import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css'

import 'babel-polyfill' // translate ES6

// 默认会找 filters/index.js
import * as filters from './filters/'
import './icons' // icon

// 把api挂prototype上
import api from './api/install'
import Vant from 'vant'
import { Lazyload } from 'vant'
import 'vant/lib/index.css'

Vue.use(api)
Vue.use(Vant)
Vue.use(Lazyload)

// 把全局方法组件挂载到main.js
import utilsIndex from './utils/index'
import { Area } from 'vant'

Vue.use(Area)

Vue.use(utilsIndex)
// 将API方法绑定到全局
// Vue.prototype.$api = api

Vue.use(ElementUI)

Vue.config.productionTip = false

// 遍历所有导出的过滤器并添加到全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
