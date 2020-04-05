<template>
  <div>
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
      <!--      <div class="cont" style="padding-bottom:0;padding: 20px 10px;background: #ffffff;margin-bottom: 0;">-->
      <!--                <div class="swiper-container" style="margin-bottom: 10px;">-->
      <!--                  <div class="swiper-wrapper">-->
      <!--                    <div v-for="(item, index) in packages" :key="index" class="swiper-slide">-->
      <!--                      <div class="h_sp">-->
      <!--                        <div class="selected_flag">已选</div>-->
      <!--                        <div class="package_info">-->
      <!--                          <div class="package_title">-->
      <!--                            <div style="color: #f4d093;font-size: 17px;">-->
      <!--                              {{ item.name }}-->
      <!--                            </div>-->
      <!--        &lt;!&ndash;                    <div class="fs15">{{ item.remark }}</div>&ndash;&gt;-->
      <!--                          </div>-->
      <!--        &lt;!&ndash;                  <div class="flex_item">&ndash;&gt;-->
      <!--        &lt;!&ndash;                    <div class="item l_item">&ndash;&gt;-->
      <!--        &lt;!&ndash;                      <div class="fs17">{{ item.internetFlow }}GB</div>&ndash;&gt;-->
      <!--        &lt;!&ndash;                      <div class="fs15">国内流量</div>&ndash;&gt;-->
      <!--        &lt;!&ndash;                    </div>&ndash;&gt;-->
      <!--        &lt;!&ndash;                    <div class="item r_item">&ndash;&gt;-->
      <!--        &lt;!&ndash;                      <div class="fs17">{{ item.callTime }}分钟</div>&ndash;&gt;-->
      <!--        &lt;!&ndash;                      <div class="fs15">国内通话</div>&ndash;&gt;-->
      <!--        &lt;!&ndash;                    </div>&ndash;&gt;-->
      <!--        &lt;!&ndash;                  </div>&ndash;&gt;-->
      <!--                        </div>-->
      <!--                      </div>-->
      <!--                    </div>-->
      <!--                  </div>-->
      <!--                  &lt;!&ndash; 如果需要分页器 &ndash;&gt;-->
      <!--                  &lt;!&ndash;          <div class="swiper-pagination"></div>&ndash;&gt;-->
      <!--                  &lt;!&ndash; 如果需要导航按钮 &ndash;&gt;-->
      <!--                  &lt;!&ndash;          <div class="swiper-button-prev"></div>&ndash;&gt;-->
      <!--                  &lt;!&ndash;          <div class="swiper-button-next"></div>&ndash;&gt;-->
      <!--                  &lt;!&ndash; 如果需要滚动条 &ndash;&gt;-->
      <!--                  &lt;!&ndash;          <div class="swiper-scrollbar"></div>&ndash;&gt;-->
      <!--                </div>-->
      <div class="gotoOrder_btn" style="padding: 0 20px;">
        <router-link
          :to="{path:'/order/dataInfo',query:{shopStoreId: shopStoreId, epytdaor: epytdaor, goodsId: goodsInfo.id,stockId: currentStock.id, packageId:currentPackageId, sendType: goodsInfo.sendType, orderType: goodsInfo.orderType, numberGroupType: goodsInfo.numberGroupType}}"
        >
          <div style="background: #ec4747;color: #ffffff;border-radius: 5px;font-size: 20px;" class="btn_primary btn17">免费领取</div>
        </router-link>
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
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

// import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { Carousel3d, Slide } from 'vue-carousel-3d'

export default {
  name: 'GoodsDetail2',
  components: { Carousel3d, Slide },
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
      epytdaor: ''
    }
  },
  created() {
    this.goodsId = this.$route.params.id
    if (this.$route.query.shopStoreId !== undefined && this.$route.query.shopStoreId != null && this.$route.query.shopStoreId !== '') {
      this.shopStoreId = this.$route.query.shopStoreId
    }
    if (this.$route.query.epytdaor !== undefined && this.$route.query.epytdaor != null && this.$route.query.epytdaor !== '') {
      this.epytdaor = this.$route.query.epytdaor
    }
  },
  mounted: function() {
    // this.saveShopStoreId()
    this.getShopGoodsInfo()
    this.getStockInfoList()
    // console.log(this.$refs.myCarousel3d)
    // this.$refs.myCarousel3d.goSlide('0')
  },
  methods: {
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
</style>
<style>
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
<template>
  <div>
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
      <!--      <div class="cont" style="padding-bottom:0;padding: 20px 10px;background: #ffffff;margin-bottom: 0;">-->
      <!--                <div class="swiper-container" style="margin-bottom: 10px;">-->
      <!--                  <div class="swiper-wrapper">-->
      <!--                    <div v-for="(item, index) in packages" :key="index" class="swiper-slide">-->
      <!--                      <div class="h_sp">-->
      <!--                        <div class="selected_flag">已选</div>-->
      <!--                        <div class="package_info">-->
      <!--                          <div class="package_title">-->
      <!--                            <div style="color: #f4d093;font-size: 17px;">-->
      <!--                              {{ item.name }}-->
      <!--                            </div>-->
      <!--        &lt;!&ndash;                    <div class="fs15">{{ item.remark }}</div>&ndash;&gt;-->
      <!--                          </div>-->
      <!--        &lt;!&ndash;                  <div class="flex_item">&ndash;&gt;-->
      <!--        &lt;!&ndash;                    <div class="item l_item">&ndash;&gt;-->
      <!--        &lt;!&ndash;                      <div class="fs17">{{ item.internetFlow }}GB</div>&ndash;&gt;-->
      <!--        &lt;!&ndash;                      <div class="fs15">国内流量</div>&ndash;&gt;-->
      <!--        &lt;!&ndash;                    </div>&ndash;&gt;-->
      <!--        &lt;!&ndash;                    <div class="item r_item">&ndash;&gt;-->
      <!--        &lt;!&ndash;                      <div class="fs17">{{ item.callTime }}分钟</div>&ndash;&gt;-->
      <!--        &lt;!&ndash;                      <div class="fs15">国内通话</div>&ndash;&gt;-->
      <!--        &lt;!&ndash;                    </div>&ndash;&gt;-->
      <!--        &lt;!&ndash;                  </div>&ndash;&gt;-->
      <!--                        </div>-->
      <!--                      </div>-->
      <!--                    </div>-->
      <!--                  </div>-->
      <!--                  &lt;!&ndash; 如果需要分页器 &ndash;&gt;-->
      <!--                  &lt;!&ndash;          <div class="swiper-pagination"></div>&ndash;&gt;-->
      <!--                  &lt;!&ndash; 如果需要导航按钮 &ndash;&gt;-->
      <!--                  &lt;!&ndash;          <div class="swiper-button-prev"></div>&ndash;&gt;-->
      <!--                  &lt;!&ndash;          <div class="swiper-button-next"></div>&ndash;&gt;-->
      <!--                  &lt;!&ndash; 如果需要滚动条 &ndash;&gt;-->
      <!--                  &lt;!&ndash;          <div class="swiper-scrollbar"></div>&ndash;&gt;-->
      <!--                </div>-->
      <div class="gotoOrder_btn" style="padding: 0 20px;">
        <router-link
          :to="{path:'/order/dataInfo',query:{shopStoreId: shopStoreId, epytdaor: epytdaor, goodsId: goodsInfo.id,stockId: currentStock.id, packageId:currentPackageId, sendType: goodsInfo.sendType, orderType: goodsInfo.orderType, numberGroupType: goodsInfo.numberGroupType}}"
        >
          <div style="background: #ec4747;color: #ffffff;border-radius: 5px;font-size: 20px;" class="btn_primary btn17">免费领取</div>
        </router-link>
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
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'

  // import { swiper, swiperSlide } from 'vue-awesome-swiper'

  import { Carousel3d, Slide } from 'vue-carousel-3d'

  export default {
    name: 'GoodsDetail',
    components: { Carousel3d, Slide },
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
        epytdaor: ''
      }
    },
    created() {
      this.goodsId = this.$route.params.id
      if (this.$route.query.shopStoreId !== undefined && this.$route.query.shopStoreId != null && this.$route.query.shopStoreId !== '') {
        this.shopStoreId = this.$route.query.shopStoreId
      }
      if (this.$route.query.epytdaor !== undefined && this.$route.query.epytdaor != null && this.$route.query.epytdaor !== '') {
        this.epytdaor = this.$route.query.epytdaor
      }
    },
    mounted: function() {
      // this.saveShopStoreId()
      this.getShopGoodsInfo()
      this.getStockInfoList()
      // console.log(this.$refs.myCarousel3d)
      // this.$refs.myCarousel3d.goSlide('0')
    },
    methods: {
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
</style>
<style>
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
