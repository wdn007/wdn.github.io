const BaseUrl = process.env.API_ROOT

export default {
  getShopGoodsInfo: BaseUrl + '/shop/h5/goods/getShopGoodsInfo',
  getStockInfoList: BaseUrl + '/shop/h5/goods/getStockInfoList',
  getPackageInfoList: BaseUrl + '/shop/h5/goods/getPackageInfoList',
  getPackageInfo: BaseUrl + '/shop/h5/goods/getPackageInfo',
  getNumberGroupList: BaseUrl + '/shop/h5/goodsNumber/getNumberGroupList',
  getShopGoodsNumber4groupId: BaseUrl + '/shop/h5/goodsNumber/getShopGoodsNumber4groupId',
  sendOrder4card: BaseUrl + '/shop/h5/order/sendOrder4card',
  queryOrder: BaseUrl + '/shop/h5/order/queryOrder',
  uploadImg: BaseUrl + '/shop/files/uploadImg',
  getNumLocal: BaseUrl + '/shop/h5/goodsNumber/getShopGoodsNumber',
  getNumOutside: BaseUrl + '/shop/h5/goodsNumber/getOrderShopGoodsNumber',
  saveShopStoreId: BaseUrl + '/shop/h5/store/saveShopStoreId',
  getPayParams: BaseUrl + '/shop/h5/pay/getParams'
}
