<template>
  <div>
    <div v-if="!isShowResult">
      <div class="wrapper">
        <div style="padding: 5px 10px 0 10px;" class="fcblack fs17">已选择
          <span style="color: #e7552e;">“
            {{ packageInfo.name }}
            ”</span>
        </div>
        <div style="padding: 0 10px 10px 10px;" class="fcblack fs14">*根据国家实名制要求，请准确提供身份证信息</div>
        <div class="cont">
          <div class="weui-cells" style="margin-top: 0;">
            <div class="weui-cell_title">请输入办理人信息</div>
            <div class="weui-cell flex" style="padding:10px 26px 10px 10px;justify-content: space-between;">
              <div class="weui-cell__hd" style="margin-right: 5px;">
                <div class="location_msg">
                  <div class="fs15">姓名</div>
                </div>
              </div>
              <div class="weui-cell__ft">
                <input type="text" placeholder="请输入姓名" @change="nameChange">
              </div>
            </div>
            <div class="weui-cell flex" style="padding:10px 26px 10px 10px;justify-content: space-between;">
              <div class="weui-cell__hd" style="margin-right: 5px;">
                <div class="location_msg">
                  <div class="fs15">身份证</div>
                </div>
              </div>
              <div class="weui-cell__ft">
                <input type="text" placeholder="请输入身份证号" @change="socialIdChange">
              </div>
            </div>
            <div class="weui-cell flex" style="padding:10px 26px 10px 10px;justify-content: space-between;">
              <div class="weui-cell__hd" style="margin-right: 5px;">
                <div class="location_msg">
                  <div class="fs15">联系电话</div>
                </div>
              </div>
              <div class="weui-cell__ft">
                <input type="number" placeholder="请输入联系电话" @change="mobileChange">
              </div>
            </div>
          </div>

          <div class="weui-cells" style="margin-top: 0;">
            <div class="weui-cell_title">请选择号码</div>
            <div v-if="isShowArea" class="weui-cell weui-cell_access flex" style="padding:10px 26px 10px 10px;justify-content: space-between;">
              <div class="weui-cell__hd" style="margin-right: 5px;">
                <div class="location_msg">
                  <div class="fs15">号码归属</div>
                </div>
              </div>
              <div class="weui-cell__ft">
                <input id="numberGroupPicker" style="text-align: left;" type="text">
              </div>
            </div>
            <div v-if="isShowAddr" class="weui-cell weui-cell_access flex" style="padding:10px 26px 10px 10px;justify-content: space-between;">
              <div class="weui-cell__hd" style="margin-right: 5px;">
                <div class="location_msg">
                  <div class="fs15">号码归属</div>
                </div>
              </div>
              <div class="weui-cell__ft">
                <input id="city-picker-num" style="text-align: left;" type="text" value="安徽省 合肥市 蜀山区">
              </div>
            </div>
            <div class="weui-cell weui-cell_access flex" style="padding:10px 26px 10px 10px;justify-content: start;" @click="gotoSelectNumber">
              <div class="weui-cell__hd" style="margin-right: 30px;">
                <div class="location_msg">
                  <div class="fs15">选择号码</div>
                </div>
              </div>
              <div class="weui-cell__ft" style="font-size: 14px;">
                {{ numberStrCurr }}
              </div>
            </div>
          </div>

          <div class="weui-cells" style="margin-top: 0;">
            <div class="weui-cell_title">请选择配送地址</div>
            <div class="weui-cell weui-cell_access flex" style="padding:10px 26px 10px 10px;justify-content: space-between;">
              <div class="weui-cell__hd" style="margin-right: 5px;">
                <div class="location_msg">
                  <div class="fs15">所在地区</div>
                </div>
              </div>
              <div class="weui-cell__ft">
                <input id="city-picker" style="text-align: left;" type="text" value="安徽省 合肥市 蜀山区">
              </div>
            </div>
            <div class="weui-cell flex" style="padding:10px 26px 10px 10px;justify-content: space-between;">
              <div class="weui-cell__hd" style="margin-right: 5px;">
                <div class="location_msg">
                  <div class="fs15">详细地址</div>
                </div>
              </div>
              <div class="weui-cell__ft">
                <input type="text" placeholder="街道/镇+村/小区/写字楼+门牌号" @change="addressChange">
              </div>
            </div>
          </div>
        </div>

        <div v-if="isWlSendType" class="weui-cells" style="margin-top: 0;padding-bottom: 5px;">
          <div class="weui-cell_title">
            请上传证件照
            <div class="fs12 fcred">温馨提示：拍摄照片请注意保持证件信息清晰完整，避免证件模糊导致系统无法识别</div>
          </div>
          <div class="weui-cells weui-cells_form uploader" style="margin-top: 0;">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div class="weui-uploader">
                  <div class="weui-uploader__hd">
                    <p class="weui-uploader__title fs14">身份证正面</p>
                  </div>
                  <!-- 容器 -->
                  <div class="ui_uploader_cell">
                    <el-upload
                      key="frontSocial"
                      class="avatar-uploader"
                      :action="uploadImgUrl"
                      :before-upload="beforeUpload"
                      accept="image/jpg,image/jpeg,image/gif,image/png"
                      :data="frontSocialData"
                      name="imgfile"
                      :on-success="handleImgSuccess"
                    >
                      <!-- 根据已选择的图片临时路径数组展示图片-->
                      <div v-show="hasFrontSocial" class="ui_uploader_item">
                        <!-- 图片-->
                        <img style="width: 150px;" :src="images.frontSocial">
                      </div>
                      <!-- 上传按钮+框 -->
                      <div v-show="!hasFrontSocial" class="ui_uploader ui_uploader1" />
                    </el-upload>
                  </div>
                </div>
              </div>
              <div class="weui-cell__bd">
                <div class="weui-uploader">
                  <div class="weui-uploader__hd">
                    <p class="weui-uploader__title fs14">身份证反面</p>
                  </div>
                  <!-- 容器 -->
                  <div class="ui_uploader_cell">
                    <el-upload
                      key="backSocial"
                      class="avatar-uploader"
                      :action="uploadImgUrl"
                      :before-upload="beforeUpload"
                      accept="image/jpg,image/jpeg,image/gif,image/png"
                      :data="backSocialData"
                      name="imgfile"
                      :on-success="handleImgSuccess"
                    >
                      <!-- 根据已选择的图片临时路径数组展示图片-->
                      <div v-show="hasBackSocial" class="ui_uploader_item">
                        <!-- 图片-->
                        <img style="width: 150px;" :src="images.backSocial">
                      </div>
                      <!-- 上传按钮+框 -->
                      <div v-show="!hasBackSocial" class="ui_uploader ui_uploader2" />
                    </el-upload>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="weui-cells weui-cells_form uploader" style="margin-top:0;">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div class="weui-uploader">
                  <div class="weui-uploader__hd">
                    <p class="weui-uploader__title fs14">个人免冠照</p>
                  </div>
                  <!-- 容器 -->
                  <div class="ui_uploader_cell">
                    <el-upload
                      key="autodyne"
                      class="avatar-uploader"
                      :action="uploadImgUrl"
                      :before-upload="beforeUpload"
                      accept="image/jpg,image/jpeg,image/gif,image/png"
                      :data="autodyneData"
                      name="imgfile"
                      :on-success="handleImgSuccess"
                    >
                      <!-- 根据已选择的图片临时路径数组展示图片-->
                      <div v-show="hasAutodyne" class="ui_uploader_item">
                        <!-- 图片-->
                        <img style="width: 150px;" :src="images.autodyne">
                      </div>
                      <!-- 上传按钮+框 -->
                      <div v-show="!hasAutodyne" class="ui_uploader ui_uploader4" />
                    </el-upload>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 30px;margin-bottom: 30px;padding: 0 10px">
        <div class="btn_primary btn17" @click="submitOrder">立即提交</div>
      </div>
      <div class="fs14 fcgrey" style="padding: 0 10px;margin-bottom: 20px;text-align: center;">
        <div style="width: 95%;margin: auto;">请保持联系号码畅通，我们可能随时与您联系，本次为阶段性优惠活动，数量有限，联系电话无人接听或恶意下单情况，将不予发货。</div>
      </div>
      <div v-show="dialogFlag" class="weui-mask weui-mask--visible" />
      <div v-show="dialogFlag" style="bottom: 0;" class="weui-dialog dialog_botm weui-dialog--visible">
        <div class="close" @click="closeMakeDialog">
          <span>x</span>
        </div>
        <div class="weui-dialog__hd">
          <div class="cont mt15">
            <!--<div class="weui-cells__title">号码选择</div>-->
            <div class="weui-cells">
              <div class="weui-cell">
                <div class="weui-cell__bd"><input class="inpsty" type="number" placeholder="手机号码" @input="searchNum"></div>
                <div class="weui-cell__ft" style="text-align: center;">
                  <div style="background: #ef4c1f;padding-left: 10px;padding-right: 10px;font-size: 14px;overflow: auto" class="weui-btn btn02" @click="refreshNumber">查询/换一批</div>
                </div>
              </div>
            </div>
            <div class="chNum" style="bacground: #ffffff;">
              <div class="weui-grids" style="border: none;">
                <!--          <template v-for="item in numbers">-->
                <div v-for="item in numbers" :key="item.id" class="weui-grid" :class="{'curr': numbercurr === item.id}" @click="selectNumber(item.id)">{{ item.number }}</div>
                <!--          </template>-->
                <div style="clear: both" />
              </div>
            </div>
          </div><!--号码选择-->
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
            <div class="weui-btn weui-btn_primary btn03" @click="goToGoodsDetail">返回</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import weui from 'jquery-weui/dist/js/jquery-weui.min'
import picker from 'jquery-weui/dist/js/city-picker.min'
import { tel, idcard } from '../utils'

export default {
  name: 'MakeInfo',
  components: {},
  data() {
    return {
      shopStoreId: '',
      epytdaor: '',
      goodsId: -1,
      stockId: -1,
      packageId: -1,
      packageInfo: {},
      name: '',
      socialId: '',
      mobile: '',
      address: '',
      groupId: -1,
      numderGroupList: {},
      region: ['安徽省', '合肥市', '蜀山区'],
      numberStr: '',
      dialogFlag: false,
      current: 1,
      size: 10,
      searchStr: '',
      numbers: [],
      numbercurr: '',
      numberStrCurr: '',
      isSubmit: true,
      isWlSendType: false,
      images: {},
      autodyneData: { fileTypeName: 'autodyne' },
      frontSocialData: { fileTypeName: 'frontSocial' },
      backSocialData: { fileTypeName: 'backSocial' },
      uploadImgUrl: '',
      hasAutodyne: false,
      hasFrontSocial: false,
      hasBackSocial: false,
      sendType: '',
      orderType: '',
      numberGroupType: '',
      isShowArea: false,
      isShowAddr: false,
      regionNum: ['安徽省', '合肥市', '蜀山区'],
      isShowResult: false,
      isSuccess: false,
      realOrderNo: ''
    }
  },
  created() {
    this.uploadImgUrl = process.env.API_ROOT + '/shop/files/uploadImgByH5'
    if (this.$route.query.shopStoreId !== undefined && this.$route.query.shopStoreId != null && this.$route.query.shopStoreId !== '') {
      this.shopStoreId = this.$route.query.shopStoreId
    }
    if (this.$route.query.epytdaor !== undefined && this.$route.query.epytdaor != null && this.$route.query.epytdaor !== '') {
      this.epytdaor = this.$route.query.epytdaor
    }
    this.goodsId = this.$route.query.goodsId
    this.stockId = this.$route.query.stockId
    this.packageId = this.$route.query.packageId
    this.sendType = this.$route.query.sendType
    this.orderType = this.$route.query.orderType
    this.numberGroupType = this.$route.query.numberGroupType
    if (this.sendType === 'wl' && this.orderType === 'CB') {
      this.isWlSendType = true
    } else {
      this.isWlSendType = false
    }

    if (this.orderType === 'CB') {
      this.isShowArea = false
      this.isShowAddr = true
    } else if (this.orderType === '2I') {
      if (this.numberGroupType === 'need_pro') {
        this.isShowArea = true
        this.isShowAddr = false
        this.getNumberGroupList(this.goodsId)
      } else if (this.numberGroupType === 'common') {
        this.isShowArea = false
        this.isShowAddr = false
      }
    }
  },
  mounted: function() {
    this.getPackageInfo()
    // this.getNumberGroupList()
    // this._initNumberGroupPicker()
    this._initCityPicker()
    this._initNumCityPicker()
  },
  methods: {
    beforeUpload(file) {
      console.log(file.size)
      if (50 / 1024 > file.size || file.size / 1024 / 1024 > 5) {
        $.toptip('请上传大小在50K-5M范围内的图片', 'warning')
        return false
      }
      return true
    },

    handleImgSuccess(res, file) {
      if (res.data.fileTypeName === 'autodyne') {
        this.hasAutodyne = true
      } else if (res.data.fileTypeName === 'frontSocial') {
        this.hasFrontSocial = true
      } else if (res.data.fileTypeName === 'backSocial') {
        this.hasBackSocial = true
      }
      var _this = this
      var reader = new FileReader()
      // 文件装载后将其显示在图片预览里
      reader.readAsDataURL(file.raw)
      reader.onload = function(e) {
        // 将bade64位图片保存至数组里供上面图片显示
        Vue.set(_this.images, res.data.fileTypeName, this.result)
        Vue.set(_this.images, res.data.fileTypeName + '_id', res.data.id)
        // _this.images[res.data.fileTypeName] = this.result
        // _this.images[res.data.fileTypeName + '_id'] = res.data.id
      }
      console.log(this.images)
    },

    async getPackageInfo() {
      const that = this
      try {
        const params = {
          packageId: this.$route.query.packageId
        }
        const res = await this.$api.shopGoods.getPackageInfo(params)
        if (res.status === 'success') {
          that.packageInfo = res.data
        } else {
          $.toptip(res.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getNumberGroupList() {
      const that = this
      try {
        const params = {
          goodsId: this.$route.query.goodsId
        }
        const res = await this.$api.shopGoods.getNumberGroupList(params)
        if (res.status === 'success') {
          that.numberGroupList = res.data
          var vals = []
          for (let i = 0; i < res.data.length; i++) {
            vals.push(res.data[i].areaName)
          }
          that._initNumberGroupPicker(vals)
        } else {
          $.toptip(res.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
    },
    _initNumberGroupPicker(vals) {
      var that = this
      $('#numberGroupPicker').picker({
        title: '请选择号码归属地',
        cols: [
          {
            textAlign: 'center',
            values: vals
          }
        ],
        onChange: function(e) {
          // console.log(e.value)
          var val = e.value.toString()
          for (let i = 0; i < that.numberGroupList.length; i++) {
            if (that.numberGroupList[i].areaName === val) {
              that.groupId = that.numberGroupList[i].id
              break
            }
          }
          // console.log(that.groupId)
          // that.numderGroupId = e.value
        }
      })
    },
    _initCityPicker() {
      var that = this
      $('#city-picker').cityPicker({
        title: '请选择所在地区',
        onChange: function(e) {
          // console.log(e)
          that.region = e.displayValue
        }
      })
    },
    _initNumCityPicker() {
      var that = this
      $('#city-picker-num').cityPicker({
        title: '请选择所在地区',
        onChange: function(e) {
          // console.log(e)
          that.regionNum = e.displayValue
        }
      })
    },
    gotoSelectNumber() {
      var that = this
      if (this.orderType === 'CB') {
        this._initNumber_outside()
      } else if (this.orderType === '2I') {
        if (this.numberGroupType === 'need_pro') {
          if (that.groupId === -1) {
            $.toptip('请选择号码归属地', 'warning')
            return
          }
          this._initNumber()
        } else if (this.numberGroupType === 'common') {
          this._initNumber_local()
        }
      }
      that.dialogFlag = true
    },
    async _initNumber() {
      const that = this
      try {
        const params = {
          groupId: this.groupId
        }
        const res = await this.$api.shopGoods.getShopGoodsNumber4groupId(params)
        if (res.status === 'success') {
          that.numbers = res.data.datas
          var nextp = res.data.currentPage + 1
          console.log(nextp)
          if (nextp > res.data.size) {
            nextp = 1
          }
          that.current = nextp
        } else {
          $.toptip(res.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async _initNumber_outside() {
      const that = this
      try {
        const params = {
          goodsId: this.goodsId,
          provinceName: this.regionNum[0],
          cityName: this.regionNum[1],
          districtName: this.regionNum[2]
        }
        const res = await this.$api.shopGoods.getNumOutside(params)
        if (res.status === 'success') {
          that.numbers = res.data.datas
          var nextp = res.data.currentPage + 1
          console.log(nextp)
          if (nextp > res.data.size) {
            nextp = 1
          }
          that.current = nextp
        } else {
          $.toptip(res.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async _initNumber_local() {
      const that = this
      try {
        const params = {
          goodsId: this.goodsId
        }
        const res = await this.$api.shopGoods.getNumLocal(params)
        if (res.status === 'success') {
          that.numbers = res.data.datas
          var nextp = res.data.currentPage + 1
          console.log(nextp)
          if (nextp > res.data.size) {
            nextp = 1
          }
          that.current = nextp
        } else {
          $.toptip(res.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async loadNumber() {
      const that = this
      var res = {}
      try {
        if (this.orderType === 'CB') {
          const params = {
            goodsId: this.goodsId,
            provinceName: this.regionNum[0],
            cityName: this.regionNum[1],
            districtName: this.regionNum[2],
            current: this.current,
            searchStr: this.searchStr
          }
          res = await this.$api.shopGoods.getNumOutside(params)
        } else if (this.orderType === '2I') {
          if (this.numberGroupType === 'need_pro') {
            const params = {
              groupId: this.groupId,
              current: this.current,
              searchStr: this.searchStr
            }
            res = await this.$api.shopGoods.getShopGoodsNumber4groupId(params)
          } else if (this.numberGroupType === 'common') {
            const params = {
              goodsId: this.goodsId,
              current: this.current,
              searchStr: this.searchStr
            }
            res = await this.$api.shopGoods.getNumLocal(params)
          }
        }
        if (res.status === 'success') {
          var nextp = res.data.currentPage + 1
          console.log(nextp)
          if (nextp > res.data.size) {
            nextp = 1
          }
          that.numbers = res.data.datas
          that.current = nextp
          console.log(that.current)
        } else {
          $.toptip(res.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
    },
    searchNum: function(e) {
      var that = this
      console.log(e.target.value)
      that.searchStr = e.target.value
      that.current = 1
    },
    // 点击查询/换一批时触发
    refreshNumber: function(e) {
      this.loadNumber()
    },

    // 选择号码添加curr样式
    selectNumber: function(id) {
      // console.log(id)
      this.numbercurr = id
      for (let i = 0; i < this.numbers.length; i++) {
        if (this.numbers[i].id === id) {
          this.numberStrCurr = this.numbers[i].number
          break
        }
      }
      this.dialogFlag = false
      // console.log(this.numbercurr)
    },
    closeMakeDialog() {
      this.dialogFlag = false
    },
    nameChange(e) {
      this.name = e.target.value
    },
    socialIdChange(e) {
      this.socialId = e.target.value
    },
    mobileChange(e) {
      this.mobile = e.target.value
    },
    addressChange(e) {
      this.address = e.target.value
    },
    submitOrder() {
      if (this.name === '') {
        $.toptip('请填写姓名', 'warning')
        return
      }
      if (this.socialId === '') {
        $.toptip('请填写身份证号', 'warning')
        return
      }
      if (!idcard(this.socialId)) {
        $.toptip('请填写正确的身份证号', 'warning')
        return
      }
      if (this.mobile === '') {
        $.toptip('请填写联系电话', 'warning')
        return
      }
      if (!tel(this.mobile)) {
        $.toptip('请填写正确的联系电话', 'warning')
        return
      }
      if (this.numbercurr === -1) {
        $.toptip('请选择号码', 'warning')
        return
      }
      if (this.address === '') {
        $.toptip('请填写详细地址', 'warning')
        return
      }
      if (this.isWlSendType) {
        if (this.images['autodyne_id'] === undefined) {
          $.toptip('请上传个人免冠照', 'warning')
          return
        }
        if (this.images['frontSocial_id'] === undefined) {
          $.toptip('请上传身份证正面照', 'warning')
          return
        }
        if (this.images['backSocial_id'] === undefined) {
          $.toptip('请上传身份证反面照', 'warning')
          return
        }
      }
      if (this.isSubmit) {
        this.sendOrder4card()
      }
    },
    async sendOrder4card() {
      const that = this
      that.isSubmit = false
      try {
        const params = {
          shopStoreId: that.shopStoreId,
          goodsId: that.goodsId,
          stockId: that.stockId,
          packageId: that.packageId,
          userName: that.name,
          mobile: that.mobile,
          socialId: that.socialId,
          numberId: that.numbercurr,
          province: that.region[0],
          city: that.region[1],
          district: that.region[2],
          address: that.address,
          autodyneId: that.images['autodyne_id'],		// 上身照id
          frontSocialId: that.images['frontSocial_id'],		// 身份证前照片id
          backSocialId: that.images['backSocial_id']		// 身份证后照片id
        }
        const res = await this.$api.shopGoods.sendOrder4card(params)
        if (res.status === 'success') {
          var orderno = res.data
          that.queryOrder(orderno, that)
        } else {
          that.isSubmit = true
          $.toptip(res.msg, 'error')
        }
      } catch (e) {
        that.isSubmit = true
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
          if (_this.epytdaor !== undefined && _this.epytdaor != null && _this.epytdaor !== '') {
            if (_this.epytdaor === 'guojiang') {
              _ks_trace.push({ event: 'form', convertId: 580, cb: function() { console.log('Your callback function here!') } })
            } else if (_this.epytdaor === 'wenan') {
              _ks_trace.push({ event: 'form', convertId: 643, cb: function() { console.log('Your callback function here!') } })
            } else if (_this.epytdaor === 'baidu') {
              // 百度统计
              window._agl && window._agl.push(['track', ['success', { t: 3 }]])
            } else if (_this.epytdaor === 'toutiao') {
              // 头条统计
              meteor.track('form', { convert_id: 1638723564612620 })
            }
          } else {
            if (_this.goodsId === '5c1ea2c74bc14512b285c1afc5d5a0d5' ||
                _this.goodsId === '824bac099f624ec7a2c06c1e52a54989' ||
                _this.goodsId === 'e76ce791d29748888812a81d7b7da93e' ||
                _this.goodsId === '7be74448f25e40309689652a4d95d2c1' ||
                _this.goodsId === '5904cef6fa4940bd9c67cb2beb29ccb3' ||
                _this.goodsId === 'a73ca75709d34e4f87df24a1fdb82645' ||
                _this.goodsId === '808d7e9076bb4948ad042c0a635a30d1' ||
                _this.goodsId === '3ba8b6e412ae4d68bf60bce915709920' ||
                _this.goodsId === 'd622bfc2b2d74fc68cca33c74b05d312' ||
                _this.goodsId === 'd97fb6c7c5e24c2badb8ecab502fa0c8' ||
                _this.goodsId === '5b194bc22848457a85eaed3a2725abbd' ||
                _this.goodsId === '7111e57c7a3a44499dd04e607b905014') {
              // 百度统计
              window._agl && window._agl.push(['track', ['success', { t: 3 }]])
            }
          }
          console.log(111)
          that.isSubmit = true
          that.realOrderNo = res.data
          that.isShowResult = true
          that.isSuccess = true
        } else if (res.status === 'waiting') {
          that.queryOrder(oderno, _this)
        } else if (res.status === 'error') {
          that.isSubmit = true
          that.realOrderNo = res.data
          that.isShowResult = true
          that.isSuccess = false
          // this.$router.push({
          //   path: '/order/fail',
          //   query: {
          //     orderNo: res.data,
          //     goodsId: _this.goodsId
          //   }
          // })
        } else {
          that.isSubmit = true
          $.toptip(res.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
    },
    goToGoodsDetail() {
      var that = this
      console.log(that.goodsId)
      this.$router.push({
        path: '/goods/detail/' + that.goodsId,
        query: {
          shopStoreId: that.shopStoreId,
          epytdaor: that.epytdaor
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .cont .weui-cells{
    margin-bottom: 10px;
  }
  .cont .weui-cell{
    border-bottom: 1px solid #d9d9d9;
  }
  .weui-cell__hd{
    white-space:nowrap;
  }
  .weui-cell__ft{
    text-align: left;
    color: #333;
  }
  .weui-cell_title{
    padding: 10px 26px 10px 10px;
    font-weight: 500;
  }
  .weui-dialog .weui-dialog__hd{
    background: #ffffff;
  }
  .weui-dialog__hd{
    padding: 0;
  }
  .close{
    border: 1px solid #999999;
    border-radius: 21px;
    text-align: center;
    color: #999999;
    line-height: 12px;
    width: 15px;
    height: 15px;
  }
  .weui-cell_title{
    padding: 10px 26px 0px 10px;
  }

  .ui_uploader1 {
    background: url("https://st3.ahlt10010.com/fenxiao-web-api/imgs/upl_02.jpg") no-repeat;
    background-size:100% 100%;
  }
  .ui_uploader2 {
    background: url("https://st3.ahlt10010.com/fenxiao-web-api/imgs/upl_03.jpg") no-repeat;
    background-size:100% 100%;
  }
  .ui_uploader4 {
    background: url("https://st3.ahlt10010.com/fenxiao-web-api/imgs/upl_04.jpg") no-repeat;
    background-size:100% 100%;
  }
  .ui_uploader {
    margin-right:0px;
    width: 150px;
    height: 100px;
  }
  .ui_uploader_item{
    width: 150px;
  }
  .ui_uploader_cell {
    padding:0 40px;
  }

  .uploader .weui-cell {
    padding: 0;
  }
  .weui-uploader__hd {
    margin-left: 12px;
    padding-bottom: 0;
  }
  .ui_uploader_cell{
    padding: 0 12px;
  }
</style>
<style lang="css">
  @import 'jquery-weui/dist/css/jquery-weui.min.css';
  .dialog_botm {
    width: 100%;
    max-width: 750px;
    border-radius: 10px 10px 0 0;
    text-align: left;
    -webkit-transform: translate(-50%, 0%);
    transform: translate(-50%, 0%);
    bottom: 0;
    top: inherit;
  }
  .weui-cell__ft input{
    color: #333;
    font-size: 14px;
    border: none;
  }
  .chNum .weui-grids {
    padding: 0 2%;
  }

  .chNum .weui-grid {
    background: none;
    width: 46%;
    margin: 2%;
    padding: 5px 10px;
    border: 1px solid #D9D9D9;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 16px;
    color: #000;
    text-align: center;
  }
  .inpsty{
    width: 10rem;
    height: 34px;
    line-height: 34px;
    border: 1px solid #dfdfdf;
    background: none;
    font-size: 14px;
    text-align: left;
    border-radius: 5px;
  }
  .chNum .weui-grids .weui-grid.curr{
    border: 1px solid rgb(239, 76, 31);
    color: rgb(239, 76, 31);
  }
  .weui-icon-cancel:before{
    content:"\EA0D";
  }
  .weui-icon-cancel{
    color: #999999;
    font-size:22px;
  }
  .weui-cell::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1rpx solid #d9d9d9;
    color: #d9d9d9;
    left: 15px;
  }

  .weui-cell:first-child::before {
    display: none;
  }
  .toolbar .title{
    line-height: 1.2rem;
  }
  .toolbar .picker-button{
    text-decoration: none;
  }
  .weui-cell_title{
    padding: 10px 26px 0px 10px;
  }
  .el-upload-list{
    display: none;
  }
</style>
