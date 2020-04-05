<template>
  <div>
    <div v-show="!isShowMakeInfo" class="goodsDetail">
      <div class="wrapper">
        <div class="banner">
          <template v-for="item in currentStock.shopGoodsFilesList">
            <img
              v-if="item.fileType == 3"
              :key="item.id"
              style="width:100%;"
              :src="imgNetWork + item.filePath"
            >
          </template>
        </div>
        <div class="cont" style="padding-bottom:0;padding: 20px 0px;background: #ffffff;margin-bottom: 0;">
          <carousel-3d
            ref="myCarousel3d"
            :count="packages.length"
            :loop="false"
            :width="250"
            :height="150"
            :on-slide-change="carousel3dSlideChange"
          >
            <slide v-for="(item, i) in packages" :key="i" :index="i">
              <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                <div
                  class="h_sp"
                  :data-index="index"
                  :class="{ active: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"
                >
                  <div class="selected_flag">已选</div>
                  <div class="package_info">
                    <div class="package_title">
                      <div style="color: #ffffff;font-size: 20px;">
                        {{ item.name }}
                      </div>
                      <!--                    <div class="fs17">{{ item.remark }}</div>-->
                    </div>
                  </div>
                </div>
              </template>
            </slide>
          </carousel-3d>
        </div>
        <div class="gotoOrder_btn" style="padding: 0 20px;">
          <!--          <router-link-->
          <!--            :to="{path:'/order/dataInfo',query:{shopStoreId: shopStoreId, epytdaor: epytdaor, goodsId: goodsInfo.id,stockId: currentStock.id, packageId:currentPackageId, sendType: goodsInfo.sendType, orderType: goodsInfo.orderType, numberGroupType: goodsInfo.numberGroupType}}"-->
          <!--          >-->
          <div style="background: #ec4747;color: #ffffff;border-radius: 5px;font-size: 20px;" class="btn_primary btn17" @click="gotoShowMakeInfo">立即申请</div>
          <!--          </router-link>-->
        </div>
      </div>
      <div class="weui-panel" style="margin-top: 0;">
        <div class="weui-panel__bd">
          <div class="desc_img_box" style="box-sizing: border-box;width: 100%;" v-html="goodsInfo.description">
            <!--            {{goodsInfo.description}}-->
            <!--            <img-->
            <!--              style="width:100%;"-->
            <!--              :src=""-->
            <!--            >-->
          </div>
        </div>
      </div>
    </div>
    <div v-show="isShowMakeInfo" class="makeInfo">
      <div v-if="!isShowResult">
        <form @submit.prevent="submitOrder">
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
              <div v-show="isShowNum" class="weui-cells" style="margin-top: 0;">
                <div class="weui-cell_title">请选择号码</div>
                <div v-show="isShowArea" class="weui-cell weui-cell_access flex" style="padding:10px 26px 10px 10px;justify-content: space-between;">
                  <div class="weui-cell__hd" style="margin-right: 5px;">
                    <div class="location_msg">
                      <div class="fs15">号码归属</div>
                    </div>
                  </div>
                  <div class="weui-cell__ft">
                    <input id="numberGroupPicker" style="text-align: left;" type="text">
                  </div>
                </div>
                <div v-show="isShowAddr" class="weui-cell weui-cell_access flex" style="padding:10px 26px 10px 10px;justify-content: space-between;">
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
            <!--            <div class="btn_primary btn17" @click="submitOrder">立即提交</div>-->
            <input type="submit" style="height: 2rem;line-height: 2rem;padding: 0;border: none;" class="btn_primary btn17" value="立即提交">
          </div>
          <div class="fs14 fcgrey" style="padding: 0 10px;margin-bottom: 20px;text-align: center;">
            <div style="width: 95%;margin: auto;">请保持联系号码畅通，我们可能随时与您联系，本次为阶段性优惠活动，数量有限，联系电话无人接听或恶意下单情况，将不予发货。</div>
          </div>
        </form>
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
              <div style="background: #f76260;" class="weui-btn weui-btn_primary btn03" @click="goToGoodsDetail">返回</div>
            </div>
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
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
// import 'jquery-weui/dist/css/jquery-weui.min.css'

// import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { Carousel3d, Slide } from 'vue-carousel-3d'

export default {
  name: 'GoodsDetail',
  components: { Carousel3d, Slide },
  inject: ['reload'],
  data() {
    return {
      imgNetWork: 'https://st3.ahlt10010.com/',
      goodsId: 2,
      goodsInfo: {},
      stocks: {},
      currentStock: {},
      packages: {},
      currentPackageId: -1,
      shopStoreId: '',
      epytdaor: '',
      isShowMakeInfo: false,
      // makeInfo data
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
      realOrderNo: '',
      isShowNum: false
    }
  },
  created() {
    if (this.$route.query.epytdaor !== undefined && this.$route.query.epytdaor != null && this.$route.query.epytdaor !== '') {
      if (this.$route.query.epytdaor === 'guojiang') {
        (function(root) {
          var ksscript = document.createElement('script')
          ksscript.type = 'text/javascript'
          ksscript.async = true
          ksscript.src = 'https://static.yximgs.com/udata/pkg/ks-ad-trace-sdk/ks-trace.1.0.0.beta.js'
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(ksscript, s)
        })(window)
      } else if (this.$route.query.epytdaor === 'tiandizaixianks') {
        (function(root) {
          var ksscript = document.createElement('script')
          ksscript.type = 'text/javascript'
          ksscript.async = true
          ksscript.src = 'https://static.yximgs.com/udata/pkg/ks-ad-trace-sdk/ks-trace.2.0.0.beta.js'
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(ksscript, s)
        })(window)
      } else if (this.$route.query.epytdaor === 'tengyuwhks') {
        (function(root) {
          var ksscript = document.createElement('script')
          ksscript.type = 'text/javascript'
          ksscript.async = true
          ksscript.src = 'https://static.yximgs.com/udata/pkg/ks-ad-trace-sdk/ks-trace.2.0.0.beta.js'
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(ksscript, s)
        })(window)
      } else if (this.$route.query.epytdaor === 'wenan') {
        (function(root) {
          var ksscript = document.createElement('script')
          ksscript.type = 'text/javascript'
          ksscript.async = true
          ksscript.src = 'https://static.yximgs.com/udata/pkg/ks-ad-trace-sdk/ks-trace.1.0.0.beta.js'
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(ksscript, s)
        })(window)
      } else if (this.$route.query.epytdaor === 'tengyu') {
        (function(root) {
          var ksscript = document.createElement('script')
          ksscript.type = 'text/javascript'
          ksscript.async = true
          ksscript.src = 'https://static.yximgs.com/udata/pkg/ks-ad-trace-sdk/ks-trace.2.0.0.beta.js'
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(ksscript, s)
        })(window)
      } else if (this.$route.query.epytdaor === 'shike') {
        // 百度统计
        window._agl = window._agl || []
        window._agl.push(
          ['production', '_f7L2XwGXjyszb4d1e2oxPybgD']
        );
        (function() {
          var agl = document.createElement('script')
          agl.type = 'text/javascript'
          agl.async = true
          agl.src = 'https://fxgate.baidu.com/angelia/fcagl.js?production=_f7L2XwGXjyszb4d1e2oxPybgD'
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(agl, s)
        })()
      } else if (this.$route.query.epytdaor === 'tengxunguangdiantong') {
        !(function(g, d, t, e, v, n, s) { if (g.gdt) return; v = g.gdt = function() { v.tk ? v.tk.apply(v, arguments) : v.queue.push(arguments) }; v.sv = '1.0'; v.bt = 1; v.queue = []; n = d.createElement(t); n.async = !0; n.src = e; s = d.getElementsByTagName(t)[0]; s.parentNode.insertBefore(n, s) }(window, document, 'script', '//qzonestyle.gtimg.cn/qzone/biz/gdt/dmp/user-action/gdtevent.min.js'))
        gdt('init', '1109903208')
        gdt('track', 'PAGE_VIEW')
      } else if (this.$route.query.epytdaor === 'tiandizaixian') {
        !(function(g, d, t, e, v, n, s) { if (g.gdt) return; v = g.gdt = function() { v.tk ? v.tk.apply(v, arguments) : v.queue.push(arguments) }; v.sv = '1.0'; v.bt = 1; v.queue = []; n = d.createElement(t); n.async = !0; n.src = e; s = d.getElementsByTagName(t)[0]; s.parentNode.insertBefore(n, s) }(window, document, 'script', '//qzonestyle.gtimg.cn/qzone/biz/gdt/dmp/user-action/gdtevent.min.js'))
        gdt('init', '1109838539')
        gdt('track', 'PAGE_VIEW')
      } else if (this.$route.query.epytdaor === 'baidu') {
        // 百度统计
        window._agl = window._agl || []
        window._agl.push(
          ['production', '_f7L2XwGXjyszb4d1e2oxPybgD']
        );
        (function() {
          var agl = document.createElement('script')
          agl.type = 'text/javascript'
          agl.async = true
          agl.src = 'https://fxgate.baidu.com/angelia/fcagl.js?production=_f7L2XwGXjyszb4d1e2oxPybgD'
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(agl, s)
        })()
      } else if (this.$route.query.epytdaor === 'toutiao') {
        // 头条统计
        (function(r, d, s, l) {
          var meteor = r.meteor = r.meteor || []
          console.log('meteor' + meteor instanceof Array)
          meteor.methods = ['track', 'off', 'on']; meteor.factory = function(method) {
            return function() {
              // 将函数传入的method参数转换为数组对象,Array.prototype.slice.call()方法能够将一个具有length属性的对象转换为数组
              var args = Array.prototype.slice.call(arguments)
              console.log('args')
              console.log(args)
              console.log(typeof arguments)
              console.log(arguments)
              // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
              console.log(method)
              args.unshift(method)
              console.log(args)
              Array.prototype.push.apply(meteor, args)
              // [].push.apply(meteor,args)
              // 两者效果相同，理论上Array.prototype.push比[].push要快. 因为[].push这种方式需要在原型链上查找两次才能捕获到push方法.
              // meteor.push(args)
              return meteor
            }
          }; for (var i = 0; i < meteor.methods.length; i++) {
            var key = meteor.methods[i]; meteor[key] = meteor.factory(key)
          }meteor.load = function() {
            var js; var fjs = d.getElementsByTagName(s)[0]; js = d.createElement(s)
            js.src = 'https://analytics.snssdk.com/meteor.js/v1/' + l + '/sdk'; fjs.parentNode.insertBefore(js, fjs)
          }; meteor.load(); if (meteor.invoked) { return }
          meteor.invoked = true; meteor.track('pageview')
        })(window, document, 'script', '1636847399120904')
      } else if (this.$route.query.epytdaor === 'tengyudy') {
        // 腾宇抖音
        (function(r, d, s, l) {
          var meteor = r.meteor = r.meteor || []
          console.log('meteor' + meteor instanceof Array)
          meteor.methods = ['track', 'off', 'on']; meteor.factory = function(method) {
            return function() {
              // 将函数传入的method参数转换为数组对象,Array.prototype.slice.call()方法能够将一个具有length属性的对象转换为数组
              var args = Array.prototype.slice.call(arguments)
              console.log('args')
              console.log(args)
              console.log(typeof arguments)
              console.log(arguments)
              // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
              console.log(method)
              args.unshift(method)
              console.log(args)
              Array.prototype.push.apply(meteor, args)
              // [].push.apply(meteor,args)
              // 两者效果相同，理论上Array.prototype.push比[].push要快. 因为[].push这种方式需要在原型链上查找两次才能捕获到push方法.
              // meteor.push(args)
              return meteor
            }
          }; for (var i = 0; i < meteor.methods.length; i++) {
            var key = meteor.methods[i]; meteor[key] = meteor.factory(key)
          }meteor.load = function() {
            var js; var fjs = d.getElementsByTagName(s)[0]; js = d.createElement(s)
            js.src = 'https://analytics.snssdk.com/meteor.js/v1/' + l + '/sdk'; fjs.parentNode.insertBefore(js, fjs)
          }; meteor.load(); if (meteor.invoked) { return }
          meteor.invoked = true; meteor.track('pageview')
        })(window, document, 'script', '1644371402841095')
      }
    } else {
      if (this.$route.params.id === '5c1ea2c74bc14512b285c1afc5d5a0d5' ||
        this.$route.params.id === '824bac099f624ec7a2c06c1e52a54989' ||
        this.$route.params.id === 'e76ce791d29748888812a81d7b7da93e' ||
        this.$route.params.id === '7be74448f25e40309689652a4d95d2c1' ||
        this.$route.params.id === '5904cef6fa4940bd9c67cb2beb29ccb3' ||
        this.$route.params.id === 'a73ca75709d34e4f87df24a1fdb82645' ||
        this.$route.params.id === '808d7e9076bb4948ad042c0a635a30d1' ||
        this.$route.params.id === '3ba8b6e412ae4d68bf60bce915709920' ||
        this.$route.params.id === 'd622bfc2b2d74fc68cca33c74b05d312' ||
        this.$route.params.id === 'd97fb6c7c5e24c2badb8ecab502fa0c8' ||
        this.$route.params.id === '5b194bc22848457a85eaed3a2725abbd' ||
        this.$route.params.id === '7111e57c7a3a44499dd04e607b905014' ||
        this.$route.query.goodsId === '5c1ea2c74bc14512b285c1afc5d5a0d5' ||
        this.$route.query.goodsId === '824bac099f624ec7a2c06c1e52a54989' ||
        this.$route.query.goodsId === 'e76ce791d29748888812a81d7b7da93e' ||
        this.$route.query.goodsId === '7be74448f25e40309689652a4d95d2c1' ||
        this.$route.query.goodsId === '5904cef6fa4940bd9c67cb2beb29ccb3' ||
        this.$route.query.goodsId === 'a73ca75709d34e4f87df24a1fdb82645' ||
        this.$route.query.goodsId === '808d7e9076bb4948ad042c0a635a30d1' ||
        this.$route.query.goodsId === '3ba8b6e412ae4d68bf60bce915709920' ||
        this.$route.query.goodsId === 'd622bfc2b2d74fc68cca33c74b05d312' ||
        this.$route.query.goodsId === 'd97fb6c7c5e24c2badb8ecab502fa0c8' ||
        this.$route.query.goodsId === '5b194bc22848457a85eaed3a2725abbd' ||
        this.$route.query.goodsId === '7111e57c7a3a44499dd04e607b905014') {
        // 百度统计
        window._agl = window._agl || []
        window._agl.push(
          ['production', '_f7L2XwGXjyszb4d1e2oxPybgD']
        );
        (function() {
          var agl = document.createElement('script')
          agl.type = 'text/javascript'
          agl.async = true
          agl.src = 'https://fxgate.baidu.com/angelia/fcagl.js?production=_f7L2XwGXjyszb4d1e2oxPybgD'
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(agl, s)
        })()
      }
    }

    this.goodsId = this.$route.params.id
    if (this.$route.query.shopStoreId !== undefined && this.$route.query.shopStoreId != null && this.$route.query.shopStoreId !== '') {
      this.shopStoreId = this.$route.query.shopStoreId
    }
    if (this.$route.query.epytdaor !== undefined && this.$route.query.epytdaor != null && this.$route.query.epytdaor !== '') {
      this.epytdaor = this.$route.query.epytdaor
    }
    //  makeInfo
    this.uploadImgUrl = process.env.API_ROOT + '/shop/files/uploadImgByH5'
    if (this.$route.query.orderNo !== undefined && this.$route.query.orderNo != null && this.$route.query.orderNo !== '') {
      this.realOrderNo = this.$route.query.orderNo
    }
    if (this.$route.query.isSuccess !== undefined && this.$route.query.isSuccess != null && this.$route.query.isSuccess !== '') {
      this.isShowMakeInfo = true
      this.isSubmit = true
      this.isShowResult = true
      if (this.$route.query.isSuccess === 'true') {
        if (this.epytdaor !== undefined && this.epytdaor != null && this.epytdaor !== '') {
          if (this.epytdaor === 'guojiang') {
            setTimeout(function() {
              _ks_trace.push({ event: 'form', convertId: 580, cb: function() {
                console.log('计数成功')
              } })
            }, 100)
            // _ks_trace.push({ event: 'form', convertId: 580, cb: function() { console.log('Your callback function here!') } })
          } else if (this.epytdaor === 'wenan') {
            setTimeout(function() {
              _ks_trace.push({ event: 'form', convertId: 643, cb: function() {
                console.log('计数成功')
              } })
            }, 100)
            // _ks_trace.push({ event: 'form', convertId: 643, cb: function() { console.log('Your callback function here!') } })
          } else if (this.epytdaor === 'tengyu') {
            setTimeout(function() {
              _ks_trace.push({ event: 'form', convertId: 1705, cb: function() {
                console.log('计数成功')
              } })
            }, 100)
          } else if (this.epytdaor === 'shike') {
            window._agl && window._agl.push(['track', ['success', { t: 3 }]])
          } else if (this.epytdaor === 'tengxunguangdiantong') {
            gdt('track', 'COMPLETE_ORDER', { 'key1': 'value1', 'key2': 'value2' })
          } else if (this.epytdaor === 'tiandizaixian') {
            gdt('track', 'RESERVATION', { 'key1': 'value1', 'key2': 'value2' })
          } else if (this.epytdaor === 'baidu') {
            // 百度统计
            window._agl && window._agl.push(['track', ['success', { t: 3 }]])
          } else if (this.epytdaor === 'toutiao') {
            // 头条统计
            meteor.track('form', { convert_id: 1638723564612620 })
          } else if (this.epytdaor === 'tengyudy') {
            // 腾宇抖音
            meteor.track('shopping', { convert_id: 1645425537935372 })
          } else if (this.epytdaor === 'tiandizaixianks') {
            _ks_trace.push({ event: 'form', convertId: 2465, cb: function() { console.log('Your callback function here!') } })
          } else if (this.epytdaor === 'tengyuwhks') {
            _ks_trace.push({ event: 'form', convertId: 2565, cb: function() { console.log('Your callback function here!') } })
          }
        } else {
          if (this.goodsId === '5c1ea2c74bc14512b285c1afc5d5a0d5' ||
            this.goodsId === '824bac099f624ec7a2c06c1e52a54989' ||
            this.goodsId === 'e76ce791d29748888812a81d7b7da93e' ||
            this.goodsId === '7be74448f25e40309689652a4d95d2c1' ||
            this.goodsId === '5904cef6fa4940bd9c67cb2beb29ccb3' ||
            this.goodsId === 'a73ca75709d34e4f87df24a1fdb82645' ||
            this.goodsId === '808d7e9076bb4948ad042c0a635a30d1' ||
            this.goodsId === '3ba8b6e412ae4d68bf60bce915709920' ||
            this.goodsId === 'd622bfc2b2d74fc68cca33c74b05d312' ||
            this.goodsId === 'd97fb6c7c5e24c2badb8ecab502fa0c8' ||
            this.goodsId === '5b194bc22848457a85eaed3a2725abbd' ||
            this.goodsId === '7111e57c7a3a44499dd04e607b905014') {
            // 百度统计
            window._agl && window._agl.push(['track', ['success', { t: 3 }]])
          }
        }
        console.log(111)
        this.isSuccess = true
      } else if (this.$route.query.isSuccess === 'false') {
        this.isSuccess = false
      }
    }
  },
  mounted: function() {
    this.getShopGoodsInfo()
    this.getStockInfoList()
  },
  methods: {
    gotoShowMakeInfo() {
      // shopStoreId: shopStoreId, epytdaor: epytdaor, goodsId: goodsInfo.id,stockId: currentStock.id, packageId:currentPackageId, sendType: goodsInfo.sendType, orderType: goodsInfo.orderType, numberGroupType: goodsInfo.numberGroupType
      this.goodsId = this.goodsInfo.id
      this.stockId = this.currentStock.id
      this.packageId = this.currentPackageId
      this.sendType = this.goodsInfo.sendType
      this.orderType = this.goodsInfo.orderType
      this.numberGroupType = this.goodsInfo.numberGroupType
      // 配置三张图片
      if (this.sendType === 'wl' && this.orderType === 'CB') {
        this.isWlSendType = true
      } else {
        this.isWlSendType = false
      }
      // 配置号码
      if (this.orderType === 'CB') {
        console.log('CB')
        this.isShowArea = false
        this.isShowAddr = true
        this.isShowNum = true
      } else if (this.orderType === '2I') {
        if (this.numberGroupType === 'need_pro') {
          this.isShowArea = true
          this.isShowAddr = false
          this.isShowNum = true
          this.getNumberGroupList(this.goodsId)
        } else if (this.numberGroupType === 'common') {
          this.isShowArea = false
          this.isShowAddr = false
          this.isShowNum = true
        } else if (this.numberGroupType === 'random') {
          this.isShowArea = false
          this.isShowAddr = false
          this.isShowNum = false
        }
      }
      this.getPackageInfo()
      // this.getNumberGroupList()
      this._initCityPicker()
      this._initNumCityPicker()
      // show makeInfo
      this.isShowMakeInfo = true
    },
    async saveShopStoreId() {
      const that = this
      try {
        const params = {
          shopStoreId: this.shopStoreId
        }
        const res = await this.$api.shopGoods.saveShopStoreId(params)
        if (res.status === 'success') {
          that.getShopGoodsInfo()
        } else {
          $.toptip(res.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
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
          $.toptip(res.msg, 'error')
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
          $.toptip(res.msg, 'error')
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
            console.log(that.$refs.myCarousel3d)
            that.$refs.myCarousel3d.currentIndex = 0
            console.log(that.$refs.myCarousel3d)
            that.currentPackageId = res.data[0].id
          }
          this._initSwiper()
          // this.swiperInit()
        } else {
          $.toptip(res.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
    },
    _initSwiper() {
      var that = this
      new Swiper('.swiper-container', {
        autoplay: false, // 可选选项，自动滑动
        on: {
          slideChange: function() {
            console.log(this.activeIndex)
            that.changeCurrentPackage(this.activeIndex)
          }
        },
        loop: false,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      })
    },
    changeCurrentPackage(activeIndex) {
      this.currentPackageId = this.packages[activeIndex].id
      console.log(this.currentPackageId)
    },
    carousel3dSlideChange(currentIndex) {
      console.log(currentIndex)
      this.currentPackageId = this.packages[currentIndex].id
    },
    // makeInfo
    beforeUpload(file) {
      console.log(file.size)
      if (50 / 1024 > file.size || file.size / 1024 / 1024 > 5) {
        $.toptip('请上传大小在50K-5M范围内的图片', 'warning')
        return false
      }
      return true
    },

    handleImgSuccess(res, file) {
      console.log(res)
      if (res.status === 'error') {
        $.toptip(res.msg, 'error')
      } else if (res.status === 'success') {
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
      }
    },
    async getPackageInfo() {
      const that = this
      try {
        const params = {
          packageId: this.packageId
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
          goodsId: this.goodsId
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
          goodsId: this.goodsId,
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
              goodsId: this.goodsId,
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
      if (this.isShowNum) {
        if (this.numbercurr === -1) {
          $.toptip('请选择号码', 'warning')
          return
        }
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
        var params = {}
        if (that.isShowNum) {
          params = {
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
        } else {
          params = {
            shopStoreId: that.shopStoreId,
            goodsId: that.goodsId,
            stockId: that.stockId,
            packageId: that.packageId,
            userName: that.name,
            mobile: that.mobile,
            socialId: that.socialId,
            // numberId: that.numbercurr,
            province: that.region[0],
            city: that.region[1],
            district: that.region[2],
            address: that.address,
            autodyneId: that.images['autodyne_id'],		// 上身照id
            frontSocialId: that.images['frontSocial_id'],		// 身份证前照片id
            backSocialId: that.images['backSocial_id']		// 身份证后照片id
          }
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
          // orderstatus:1：未付款  2：订单已关闭 3：订单已提交
          // that.isSubmit = true
          // that.realOrderNo = res.data
          // // that.realOrderNo = res.data.orderId.id
          // that.isShowResult = true
          // that.isSuccess = true
          var orderstatus = res.data.orderstatus
          console.log(orderstatus)
          // orderstatus:1：未付款  2：订单已关闭 3：订单已提交
          if (orderstatus === '1') {
            $.confirm({
              title: '提示',
              text: '订单提交成功，马上支付？',
              onOK: function() {
                // 点击确认
                that.getPayParams(res.data.orderId.id)
              },
              onCancel: function() {
                that.isSubmit = true
                that.realOrderNo = res.data.orderId.id
                that.isShowResult = true
                that.isSuccess = false
                $.toptip('您已取消支付', 'warning')
              }
            })
          } else if (orderstatus === '2') {
            that.isSubmit = true
            that.realOrderNo = res.data.orderId.id
            that.isShowResult = true
            that.isSuccess = false
            $.toptip('订单已关闭', 'error')
          } else if (orderstatus === '3') {
            if (_this.epytdaor !== undefined && _this.epytdaor != null && _this.epytdaor !== '') {
              if (_this.epytdaor === 'guojiang') {
                setTimeout(function() {
                  _ks_trace.push({ event: 'form', convertId: 580, cb: function() {
                    console.log('计数成功')
                  } })
                }, 100)
                // _ks_trace.push({ event: 'form', convertId: 580, cb: function() { console.log('Your callback function here!') } })
              } else if (_this.epytdaor === 'wenan') {
                setTimeout(function() {
                  _ks_trace.push({ event: 'form', convertId: 643, cb: function() {
                    console.log('计数成功')
                  } })
                }, 100)
                // _ks_trace.push({ event: 'form', convertId: 643, cb: function() { console.log('Your callback function here!') } })
              } else if (_this.epytdaor === 'tengyu') {
                setTimeout(function() {
                  _ks_trace.push({ event: 'form', convertId: 1705, cb: function() {
                    console.log('计数成功')
                  } })
                }, 100)
              } else if (_this.epytdaor === 'shike') {
                window._agl && window._agl.push(['track', ['success', { t: 3 }]])
              } else if (_this.epytdaor === 'tengxunguangdiantong') {
                gdt('track', 'COMPLETE_ORDER', { 'key1': 'value1', 'key2': 'value2' })
              } else if (_this.epytdaor === 'tiandizaixian') {
                gdt('track', 'RESERVATION', { 'key1': 'value1', 'key2': 'value2' })
              } else if (_this.epytdaor === 'baidu') {
                // 百度统计
                window._agl && window._agl.push(['track', ['success', { t: 3 }]])
              } else if (_this.epytdaor === 'toutiao') {
                // 头条统计
                meteor.track('form', { convert_id: 1638723564612620 })
              } else if (_this.epytdaor === 'tengyudy') {
                // 腾宇抖音
                meteor.track('shopping', { convert_id: 1645425537935372 })
              } else if (_this.epytdaor === 'tiandizaixianks') {
                _ks_trace.push({ event: 'form', convertId: 2465, cb: function() { console.log('Your callback function here!') } })
              } else if (_this.epytdaor === 'tengyuwhks') {
                _ks_trace.push({ event: 'form', convertId: 2565, cb: function() { console.log('Your callback function here!') } })
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
            that.realOrderNo = res.data.orderId.id
            that.isShowResult = true
            that.isSuccess = true
          }
        } else if (res.status === 'waiting') {
          that.queryOrder(oderno, _this)
        } else if (res.status === 'error') {
          that.isSubmit = true
          // that.realOrderNo = res.data
          that.realOrderNo = res.data.orderId.id
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
      // this.reload()
      this.$router.push({
        path: '/goods/detail/' + that.goodsId,
        query: {
          shopStoreId: that.shopStoreId,
          epytdaor: that.epytdaor
        }
      })
      this.reload()
    },
    async getPayParams(shopOrderId) {
      const that = this
      try {
        const params = {
          shopOrderId: shopOrderId
        }
        const res = await this.$api.shopGoods.getPayParams(params)
        if (res.status === 'success') {
          // that.isSubmit = true
          var data = res.data
          console.log(data)
          var payUrl = data.payUrl
          that.postOpenWindow(payUrl, data, '_self')
          // that.toPay(data, payUrl)
        } else {
          that.isSubmit = true
          $.toptip(data.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async toPay(paramsData, payUrl) {
      const that = this
      try {
        const params = paramsData
        const res = await this.$api.shopGoods.toPay(params, payUrl)
        if (res.status === 'success') {
          that.isSubmit = true
          var data = res.data
          console.log(data)
        } else {
          that.isSubmit = true
          $.toptip(data.msg, 'error')
        }
      } catch (e) {
        console.log(e)
      }
    },
    postOpenWindow(URL, PARAMS, target) {
      if (target == null) target = '_self'
      var temp_form = document.createElement('form')
      temp_form.action = URL
      temp_form.target = target
      temp_form.method = 'get'
      temp_form.style.display = 'none'
      temp_form.acceptCharset = 'gbk'
      temp_form.onsubmit = 'document.charset="gbk"'
      for (var x in PARAMS) {
        var opt = document.createElement('input')
        opt.name = x
        opt.value = PARAMS[x]
        temp_form.appendChild(opt)
      }
      document.body.appendChild(temp_form)
      temp_form.submit()
      document.body.removeChild(temp_form)
    }
  }
}
</script>

<style scoped>
  .swiper-container {
    overflow: visible !important;
  }

  .swiper-wrapper {
    width: 100%;
    /*justify-content: center;*/
  }

  .swiper-slide {
    width: 100% !important;
    margin-right: 0px !important;
  }

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
<style lang="scss">
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

  .desc_img_box img {
    width: 100%;
  }

  .gotoOrder_btn a {
    text-decoration: none;
  }

  .carousel-3d-container {
    height: 170px !important;
    margin: 0 auto !important;
    display: flex!important;
    align-items: center!important;
  }

  .carousel-3d-slide {
    border: none!important;
    background: none!important;
    width: 250px!important;
    height: 160px !important;
  }

  .carousel-3d-slider {
    width: 250px!important;
    height: 150px !important;
  }

  .h_sp {
    /*display: inline-block;*/
    box-shadow: 0 5px 10px -1px #dfdfdf;
    margin: 0 auto;
    border-radius: 20px;
    width: 100%;
    min-height: 150px;
    transition: 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    /*background: -webkit-linear-gradient(to right top, #f17d31, #ef4c1f); !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(to right top, #f17d31, #ef4c1f); !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(to right top, #f17d31, #ef4c1f); !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(to right top, #f17d31, #ef4c1f); !* 标准的语法 *!*/
    background: url(~@/assets/images/bg_card_orange_new.png) no-repeat;
    overflow: hidden;
    /*line-height: 130px;*/
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .h_sp.active {
    min-height: 150px;
  }

  .active .pos_c {
    z-index: 1
  }

  .selected_flag {
    background: rgba(249, 234, 191, .8);
    padding: 10px 30px 0;
    text-align: center;
    color: #ef4c1f;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    display: none;
    margin-left: -30px;
    font-size: 15px;
  }

  .carousel-3d-slide.current .h_sp .selected_flag {
    display: inline-block;
  }

  .carousel-3d-slide.current .h_sp {
    display: inline-block;
  }

  .package_title {
    text-align: center;
    margin-top: 0px;
  }

  .h_sp.active .package_title {
    margin-top: 30px;
  }

  .flex_item {
    display: flex;
    justify-content: space-between;
  }

  .flex_item .item {
    width: 40%;
    text-align: center;
  }

  .flex_item .item view {
    text-align: center;
  }

  .package_info {
    color: #ffffff;
  }
</style>
