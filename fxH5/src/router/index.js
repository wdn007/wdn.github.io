import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/page/index'
import GoodsDetail from '@/page/goodsDetail'
import GoodsDetail2 from '@/page/goodsDetail2'
import GoodsDetail3 from '@/page/goodsDetail3'
import MakeInfo from '@/page/makeInfo'
import NumberList from '@/page/numberList'
import Success from '@/page/success'
import Fail from '@/page/fail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    // {
    //   path: '/',
    //   component: GoodsDetail
    // },
    {
      path: '/goods/detail/:id',
      component: GoodsDetail
    },
    {
      path: '/order/dataInfo',
      component: MakeInfo
    },
    {
      path: '/numbers',
      component: NumberList
    },
    {
      path: '/order/success',
      component: Success
    },
    {
      path: '/order/fail',
      component: Fail
    },
    {
      path: '/goods/detail2/:id',
      component: GoodsDetail2
    },
    {
      path: '/detail',
      component: GoodsDetail3
    }
  ]
})
