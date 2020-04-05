import api from '../index'
import urls from './urls'

// 这个东西是unsplash要求加在header里的验证
const header = {
  'Authorization': 'Client-ID xxxxxxx'
  // 'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
  getShopGoodsInfo(params) {
    return api.get(urls.getShopGoodsInfo, params, header)
  },
  getStockInfoList(params) {
    return api.get(urls.getStockInfoList, params, header)
  },
  getPackageInfoList(params) {
    return api.get(urls.getPackageInfoList, params, header)
  },
  getPackageInfo(params) {
    return api.get(urls.getPackageInfo, params, header)
  },
  getNumberGroupList(params) {
    return api.get(urls.getNumberGroupList, params, header)
  },
  getShopGoodsNumber4groupId(params) {
    return api.get(urls.getShopGoodsNumber4groupId, params, header)
  },
  sendOrder4card(params) {
    // var header = {
    //   'content-type': 'application/x-www-form-urlencoded'
    // }
    return api.post(urls.sendOrder4card, params, header)
  },
  queryOrder(params) {
    return api.get(urls.queryOrder, params, header)
  },
  uploadImg(params) {
    return api.post(urls.uploadImg, params, header)
  },
  getNumLocal(params) {
    return api.get(urls.getNumLocal, params, header)
  },
  getNumOutside(params) {
    return api.get(urls.getNumOutside, params, header)
  },
  saveShopStoreId(params) {
    return api.post(urls.saveShopStoreId, params, header)
  },
  getPayParams(params) {
    return api.get(urls.getPayParams, params, header)
  },
  toPay(params, payUrl) {
    return api.post(payUrl, params, header)
  }
}
