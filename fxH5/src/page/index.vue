<!--准备些 cnodejs 的列表页面-->
<template>
  <div>
  <div class="wrapper" style="background: #f5f5f5;position: relative;height: 100vh;overflow: auto;">
    <div class="top" style="background: #ffffff;">
      <img src="@/assets/images/top_logo.png" />
    </div>
    <div class="banner">
      <router-link :to="{ path: '/goods/detail/7be74448f25e40309689652a4d95d2c1?shopStoreId=f2630b91b642451a9154caead7208251&epytdaor=baidu' }">
      <img style="width: 100%;" src="@/assets/images/banner_new.jpg" />
      </router-link>
    </div>
    <div class="cont_desc_box">
      <div class="cont_desc_title">
        <img style="width: 15px;" src="@/assets/images/icon_lx.png" />
        <span>中国联合网络通信有限公司安徽省分公司简介</span>
        <img style="width: 15px;" src="@/assets/images/icon_lx.png" />
      </div>
      <div class="cont_desc">
        <span>中国联合网络通信有限公司安徽省分公司成立于2000年11月20日，注册地位于安徽省合肥市政务区祁门路1669号，法人代表为刘运尧。经营范围包括经营固定网本地电话业务（含本地无线环路业务）、公众电报和用户电报业务、国内通信设施服务业务、固定网国内长途电话业务、IP电话业务（限Phone-Phone的电话业务）、900/1800MHzGSM第二代数字蜂窝移动通信业务、WCDMA第三代数字蜂窝移动通信业务、LTE/第四代数字蜂窝移动通信业务（TD-LTE)、卫星国际专线业务、因特网数据传送业务、国际数据通信业务、26GHz无线接入业务；在安徽省范围内经营3.5GHZ无线接入业务。经营国内甚小口径终端地球站（vsat）通信业务、固定网国内数据传送业务、无线数据传送业务、用户驻地网业务、网络托管业务、在线数据处理与交易处理业务、国内因特网虚拟专用网业务、因特网数据中心业务、语音信箱业务、传真存储转发业务、X.400电信邮件业务、因特网接入服务业务和信息服务业务（含固定网电话信息服务业务、互联网信息服务业务和移动网信息服务业务）。经营与通信及信息业务相关的系统集成、设备生产销售、设计施工业务；技术开发、技术服务、技术咨询、技术培训；寻呼机、手机及其配件的销售、维修；电信卡的制作、销售；客户服务；房屋租赁；编辑、出版、发行电话号码簿。代收水、电、气费用；设计、制作、发布、代理国内外各类广告（涉及许可证或国家专项规定的，须凭许可证经营或按专项规定办理相关手续）。</span>
      </div>
    </div>
    <div class="middle">
      <img style="width: 100%;" src="@/assets/images/banner_middle.png" />
    </div>
    <div class="content">
      <div class="flex_item">
        <router-link :to="{ path: '/goods/detail/824bac099f624ec7a2c06c1e52a54989?shopStoreId=f2630b91b642451a9154caead7208251&epytdaor=baidu' }">
          <img src="@/assets/images/txdwk.png" />
        </router-link>
      </div>
      <div class="flex_item">
        <router-link :to="{ path: '/goods/detail/5c1ea2c74bc14512b285c1afc5d5a0d5?shopStoreId=f2630b91b642451a9154caead7208251&epytdaor=baidu' }">
        <img src="@/assets/images/txdwk_2.png" />
        </router-link>
      </div>
      <div class="flex_item">
        <router-link :to="{ path: '/goods/detail/e76ce791d29748888812a81d7b7da93e?shopStoreId=f2630b91b642451a9154caead7208251&epytdaor=baidu' }">
        <img src="@/assets/images/xbsk.png" />
        </router-link>
      </div>
    </div>

    <div class="footer">
      <p>皖 ICP 05002384号-8 | 中国联合网络通信有限公司安徽省分公司</p>
      <p>客服电话：10010    公司地址：安徽省合肥市蜀山区祁门路1669号</p>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  components: { },
  data() {
    return {
    }
  },
  created() {
  },
  mounted: function() {
  },
  methods: {
    // async getNewsInfo() {
    //   const that = this
    //   try {
    //     // let params = {
    //     //   orderNo: 'TYXS2019042317474621629'
    //     // }
    //     const res = await this.$api.indexInfo.getIndexNews()
    //     if (res.code === 0) {
    //       that.newsList = res.result
    //       that.firstNews = res.result[0]
    //     } else {
    //       console.log(res.message)
    //     }
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
  }
}
</script>
<style scoped>
  .middle{
    padding-top: 20px;
    padding-right: 45px;
    background: #f5f5f5;
  }
  .content{
    display: flex;
    justify-content: space-between;
    background: #f5f5f5;
    padding: 0 5px;
    padding-bottom: 100px;
  }
  .content .flex_item{
    width: 32%;
    border-radius: 10px;
  }
  .content .flex_item img{
    width: 100%;
  }
  .footer{
    /*padding: 0 20px;*/
    font-size: 12px;
    color: #999;
    text-align: center;
    background: #f5f5f5;
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 750px;
  }
  .cont_desc_box {
    color: #7d7d7d;
    margin-top: 20px;
  }
  .cont_desc_box .cont_desc_title{
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  .cont_desc_box .cont_desc_title img{
    display: inline-block;
  }
  .cont_desc_box .cont_desc_title span{
    font-weight: 700;
    font-size: 14px;
    display: inline-block;
    padding: 0 5px;
  }
  .cont_desc_box .cont_desc{
    font-size: 13px;
    text-indent: 2em;
    padding: 0 20px;
  }
</style>
<style>
  html,body{
    height: 100%;
    padding: 0;
    margin: 0;
  }
  #app{
    position: relative;
    height: 100%;
    padding: 0;
    margin: 0;
  }
</style>
