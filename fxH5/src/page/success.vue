<template>
  <div class="wrapper">
    <div class="icon-box">
      <img style="width: 100px;" src="@/assets/images/success.png" />
    </div>
    <div class="icon-box__ctn">
      <div class="p">尊敬的用户，您提交的订单</div>
      <div class="h3">{{ orderNo }}</div>
      <div class="p">提交成功！</div>
    </div>
    <div class="btnCont" style="margin-top:100px;text-align: center;">
      <div class="weui-btn weui-btn_primary btn03" @click="goToGoodsDetail">返回</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success',
  components: {},
  data() {
    return {
      orderNo: '',
      goodsId: 2
    }
  },
  created() {
    this.orderNo = this.$route.query.orderNo
    this.goodsId = this.$route.query.goodsId
  },
  mounted: function() {
  },
  methods: {
    goToGoodsDetail() {
      var that = this
      console.log(that.goodsId)
      this.$router.push({
        path: '/goods/detail/' + that.goodsId,
        query: {}
      })
    }
  }
}
</script>

<style scoped>
</style>
