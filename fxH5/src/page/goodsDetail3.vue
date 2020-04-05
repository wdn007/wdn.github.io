<template>
  <div>
    <div v-if="!isShowResult" class="body" :style="{backgroundColor:bodyColor}">
      <div class="wrapper">
        <div class="banner">
          <!--        <img :src="bannerImgs" alt="banner image">-->
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in bannerImgs" :key="index">
              <img :src="image" alt="banner image">
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="tips">
          <div class="tips1 tAc">
            <div class="tips1_content">0元领卡&nbsp;&nbsp;包邮到家</div>
          </div>
          <div class="tips2 tAc">
            注意：未满17岁不能申请！
          </div>
        </div>
        <div class="form">
          <van-form @submit="onSubmit">
            <van-field
              v-model="username"
              name="姓名"
              label="姓名"
              placeholder="请输入姓名"
              :rules="[{ required: true, message: '请输入姓名' }]"
            />
            <van-field
              v-model="phoneNumber"
              type="tel"
              name="手机号"
              label="手机号"
              placeholder="请输入手机号"
              :rules="[{ required: true, message: '请输入手机号' }]"
            />
            <van-field
              v-model="idCard"
              type="text"
              name="身份证号"
              label="身份证号"
              placeholder="已加密，仅用于运营商实名认证"
              :rules="[{ required: true, message: '请输入身份证号' }]"
            />
            <van-field
              readonly
              clickable
              label="省市区"
              :value="region"
              placeholder="请选择省市区"
              :is-link="isLink"
              arrow-direction="right"
              :rules="[{ required: true, message: '请选择省市区' }]"
              @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-area
                :area-list="areaList"
                :columns-placeholder="['请选择省', '请选择市', '请选择区']"
                @cancel="showPicker = false"
                @confirm="regionPickerOnConfirm"
              />
            </van-popup>
            <van-field
              v-model="address"
              type="text"
              name="详细地址"
              label="详细地址"
              placeholder="请输入**街道**门牌号"
              :rules="[{ required: true, message: '请输入详细地址' }]"
            />
            <div style="padding: 20px 5px;background-color: #FFFFFF;">
              <van-button :color="btnColor" square block type="info" native-type="submit">
                提交申请
              </van-button>
            </div>
          </van-form>
        </div>
        <!--        <div class="news-scroll tAc" style="padding: 10px 5px;">-->
        <!--          <div style="display: flex;width: auto;margin: 0 auto;align-items: center;justify-content: center;">-->
        <!--            <div style="display: inline-block;width: 20px;margin-right: 5px;"><svg-icon icon-class="lb" /></div>-->
        <!--            <div class="scroll_left">-->
        <!--              <van-swipe-->
        <!--                style="height: 21px;"-->
        <!--                :show-indicators="showIndicators"-->
        <!--                :autoplay="3000"-->
        <!--                vertical-->
        <!--              >-->
        <!--                <van-swipe-item v-for="(item, index) in userList" :key="index">-->
        <!--                  <div style="color: #F5A623;" class="fs14">-->
        <!--                    {{ item.name }}&nbsp;&nbsp;{{ item.phone }}&nbsp;&nbsp;{{ item.submitTime }}-->
        <!--                  </div>-->
        <!--                </van-swipe-item>-->
        <!--              </van-swipe>-->
        <!--            </div>-->
        <!--            <div class="text_right fs14" style="color: #FFFFFF;margin-left: 5px;">已报名</div>-->
        <!--          </div>-->
        <!--        </div>-->
        <div v-for="(item, index) in detailImgs">
          <img :src="item" alt="商品详情图">
        </div>
        <div class="footer tAc">
          <div class="tips2">立即申请&nbsp;&nbsp;包邮到家</div>
          <div class="tips2" style="font-size: 15px;margin-top: -1px;padding-top: 0">注意：未满17岁不能申请！</div>
        </div>
      </div>
    </div>
    <div v-else-if="isShowResult">
      <div v-if="isSuccess">
        <div class="wrapper">
          <div class="icon-box">
            <img style="width: 100px;" src="@/assets/images/success.png">
          </div>
          <div class="icon-box__ctn">
            <div class="p">尊敬的用户，您提交的订单</div>
            <div class="h3">{{ realOrderNo }}</div>
            <div class="p">提交成功！</div>
          </div>
          <div class="btnCont" style="margin-top:100px;text-align: center;">
            <div class="weui-btn weui-btn_primary btn03" @click="goToGoodsDetail">返回</div>
          </div>
        </div>
      </div>
      <div v-else-if="!isSuccess">
        <div class="wrapper">
          <div class="icon-box">
            <img style="width: 100px;" src="@/assets/images/fail.png">
          </div>
          <div class="icon-box__ctn">
            <div class="p">尊敬的用户，您提交的订单</div>
            <div class="h3">{{ realOrderNo }}</div>
            <div class="p">提交失败！</div>
          </div>
          <div class="btnCont" style="margin-top:100px;text-align: center;">
            <van-button :color="btnColor" square block type="info" @click="goToGoodsDetail">
              返回
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import AreaList from '@/utils/area.js'
import { tel, idcard } from '@/utils'
export default {
  name: 'GoodsDetail3',
  components: { },
  data() {
    return {
      shopStoreId: '',
      goodsId: -1,
      stockId: -1,
      packageId: -1,
      goodsInfo: {},
      stocks: {},
      currentStock: [],
      packages: {},
      currentPackageId: '',

      isLink: true,

      bodyColor: '#237',
      btnColor: '#fdb002',
      bannerImgs: ['https://xj.gdtimg.com/xjimg/0/4fe4811711b31de80061e87c6edf5f0dc1367b2d.png/0'],
      detailImgs: [
        'https://xj.gdtimg.com/xjimg/0/724ff3b1372691d11fff04580e7fdc0a977d04e4.png/0',
        'https://xj.gdtimg.com/xjimg/0/f879f4d2f523dae1eac255fa05c78d96ae53b198.png/0',
        'https://xj.gdtimg.com/xjimg/0/4b6ef9f50c6a0f55d7a4f1c5fc6a1eded050a93a.png/0'
      ],

      username: '',
      phoneNumber: '',
      idCard: '',
      address: '',
      region: '',
      regionCode: '',
      province: '',
      city: '',
      district: '',
      showPicker: false,
      isSubmit: true,
      areaList: AreaList,
      userList: [{
        name: '李*小',
        phone: '137****9167',
        submitTime: '1小时前'
      }, {
        name: '刘*朵',
        phone: '130****2515',
        submitTime: '7天前'
      }],
      showIndicators: false,
      isShowResult: false,
      isSuccess: false,
      realOrderNo: ''
    }
  },
  created() {
    if (this.$route.query.shopStoreId !== undefined && this.$route.query.shopStoreId != null && this.$route.query.shopStoreId !== '') {
      this.shopStoreId = this.$route.query.shopStoreId
    }
    this.goodsId = this.$route.query.goodsId
    this.stockId = this.$route.query.stockId
    this.packageId = this.$route.query.packageId

    if (typeof (this.$route.query.bodyColor) !== 'undefined' && this.$route.query.bodyColor != null && this.$route.query.bodyColor !== '') {
      console.log(this.$route.query.bodyColor)
      this.bodyColor = this.$route.query.bodyColor
    }
    if (typeof this.$route.query.btnColor !== 'undefined' && this.$route.query.btnColor != null && this.$route.query.btnColor !== '') {
      this.btnColor = this.$route.query.btnColor
    }
    if (typeof this.$route.query.bannerImgs !== 'undefined' && this.$route.query.bannerImgs != null && this.$route.query.bannerImgs !== '') {
      this.bannerImgs = JSON.parse(this.$route.query.bannerImgs)
    }
    if (typeof this.$route.query.detailImgs !== 'undefined' && this.$route.query.detailImgs != null && this.$route.query.detailImgs !== '') {
      this.detailImgs = JSON.parse(this.$route.query.detailImgs)
    }
  },
  mounted() {
    this.getShopGoodsInfo()
    this.getStockInfoList()
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
      if (this.shopStoreId === '') {
        Toast('请配置参数shopStoreId')
        return
      }
      if (this.goodsId === -1) {
        Toast('请配置参数goodsId')
        return
      }
      if (this.currentPackageId === '') {
        Toast('商品参数缺失')
        return
      }
      // if (this.stockId === -1) {
      //   Toast('请配置参数stockId')
      //   return
      // }
      // if (this.packageId === -1) {
      //   Toast('请配置参数packageId')
      //   return
      // }
      if (!tel(this.phoneNumber)) {
        Toast('请填写正确的手机号码')
        return
      }
      if (!idcard(this.idCard)) {
        Toast('请填写正确有效的身份证号')
        return
      }
      if (this.province === '') {
        Toast('请选择省地址')
        return
      }
      if (this.city === '') {
        Toast('请选择市地址')
        return
      }
      if (this.district === '') {
        Toast('请选择区地址')
        return
      }
      this.sendOrder4card()
    },
    regionPickerOnConfirm(valueArray) {
      console.log(valueArray)
      this.region = valueArray[0].name + ' ' + valueArray[1].name + ' ' + valueArray[2].name
      this.regionCode = valueArray[0].code + ' ' + valueArray[1].code + ' ' + valueArray[2].code
      this.province = valueArray[0].name
      this.city = valueArray[1].name
      this.district = valueArray[2].name
      console.log(this.region)
      console.log(this.regionCode)
      this.showPicker = false
    },
    async sendOrder4card() {
      const that = this
      that.isSubmit = false
      Toast.loading({
        forbidClick: true
      })
      try {
        const params = {
          shopStoreId: that.shopStoreId,
          goodsId: that.goodsId,
          stockId: that.currentStock.id,
          packageId: that.currentPackageId,
          userName: that.username,
          mobile: that.phoneNumber,
          socialId: that.idCard,
          province: that.province,
          city: that.city,
          district: that.district,
          address: that.address
        }
        const res = await this.$api.shopGoods.sendOrder4card(params)
        if (res.status === 'success') {
          var orderno = res.data
          that.queryOrder(orderno, that)
        } else {
          Toast.clear()
          that.isSubmit = true
          Toast.fail(res.msg)
        }
      } catch (e) {
        Toast.clear()
        that.isSubmit = true
        Toast.fail('服务异常')
        console.log(e)
      }
    },
    async queryOrder(oderno, obj) {
      const that = this
      const _this = obj
      try {
        const params = {
          oderno: oderno
        }
        const res = await _this.$api.shopGoods.queryOrder(params)
        if (res.status === 'success') {
          Toast.clear()
          that.isSubmit = true
          Toast.success('提交成功！')
          that.realOrderNo = res.data
          that.isShowResult = true
          that.isSuccess = true
        } else if (res.status === 'waiting') {
          that.queryOrder(oderno, _this)
        } else if (res.status === 'error') {
          Toast.clear()
          that.isSubmit = true
          Toast.fail('提交失败！')
          that.realOrderNo = res.data
          that.isShowResult = true
          that.isSuccess = false
        } else {
          Toast.clear()
          that.isSubmit = true
          Toast.fail(res.msg)
        }
      } catch (e) {
        Toast.clear()
        Toast.fail('服务异常')
        console.log(e)
      }
    },
    goToGoodsDetail() {
      var that = this
      var queryObj = {}
      queryObj.shopStoreId = that.shopStoreId
      queryObj.goodsId = that.goodsId
      // queryObj.stockId = that.stockId
      // queryObj.packageId = that.packageId
      if (typeof (this.$route.query.bodyColor) !== 'undefined' && this.$route.query.bodyColor != null && this.$route.query.bodyColor !== '') {
        queryObj.bodyColor = this.$route.query.bodyColor
      }
      if (typeof this.$route.query.btnColor !== 'undefined' && this.$route.query.btnColor != null && this.$route.query.btnColor !== '') {
        queryObj.btnColor = this.$route.query.btnColor
      }
      if (typeof this.$route.query.bannerImgs !== 'undefined' && this.$route.query.bannerImgs != null && this.$route.query.bannerImgs !== '') {
        queryObj.bannerImgs = this.$route.query.bannerImgs
      }
      if (typeof this.$route.query.detailImgs !== 'undefined' && this.$route.query.detailImgs != null && this.$route.query.detailImgs !== '') {
        queryObj.detailImgs = this.$route.query.detailImgs
      }
      this.$router.push({
        path: '/detail',
        query: queryObj
      })
    },
    async getShopGoodsInfo() {
      const that = this
      try {
        const params = {
          shopGoodId: this.goodsId,
          shopStoreId: this.shopStoreId
        }
        const res = await this.$api.shopGoods.getShopGoodsInfo(params)
        if (res.status === 'success') {
          that.goodsInfo = res.data
          that.getStockInfoList()
        } else {
          Toast.fail(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getStockInfoList() {
      const that = this
      try {
        const params = {
          shopGoodId: this.goodsId,
          shopStoreId: this.shopStoreId
        }
        const res = await this.$api.shopGoods.getStockInfoList(params)
        if (res.status === 'success') {
          that.stocks = res.data
          that.currentStock = []
          if (res.data.length > 0) {
            that.currentStock = res.data[0]
            that.getPackageInfoList()
          }
        } else {
          Toast.fail(res.msg)
          // $.toptip(res.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getPackageInfoList() {
      const that = this
      try {
        const params = {
          stockId: that.currentStock.id
        }
        const res = await this.$api.shopGoods.getPackageInfoList(params)
        if (res.status === 'success') {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].internetFlow = res.data[i].internetFlow / 1024
          }
          that.packages = res.data
          if (res.data.length > 0) {
            that.currentPackageId = res.data[0].id
          }
        } else {
          Toast.fail(res.msg)
          // $.toptip(res.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
  img{
    width: 100%;
  }
  .body{
    color: #555;
  }
  .banner{
    width: 100%;
  }
  .tips1{
    background-color: #FFFFFF;
    padding: 15px 0;
  }
  .tips1_content{
    color: #FFFFFF;
    padding: 10px 0;
    text-align: center;
    background-color: #fe0000;
    font-size: 25px;
    width: 90%;
    margin: 0 auto;
    font-weight: bold;
    border-radius: 56px;
  }
  .tips2{
    background-color: #fe0000;
    color: #FFFFFF;
    text-align: center;
    font-size: 20px;
    padding: 10px 0;
  }
</style>
<style>
  ::-webkit-input-placeholder { /* WebKit browsers */
    direction: ltr;
    text-align: left;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    direction: ltr;
    text-align: left;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ but I'm not sure about working */
    direction: ltr;
    text-align: left;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    direction: ltr;
    text-align: left;
  }
  .body .van-button--square{
    border-radius: 5px;
  }
</style>
