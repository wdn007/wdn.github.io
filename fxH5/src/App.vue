<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style>
  /*@import "@/assets/css/weui.css";*/
  /*@import "@/assets/css/comm.css";*/
  @import "../node_modules/swiper/dist/css/swiper.css";
  .el-tabs__nav-wrap{
    overflow: visible!important;
  }
  .el-tabs__nav-scroll{
    overflow: visible!important;
  }
  .el-tabs--border-card {
    background: #FFFFFF;
    border: none!important;
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
    margin-top: 30px!important;
    text-align: center;
  }
  .el-tabs--border-card > .el-tabs__header{
    display: inline-block;
    background: none;
    border: none;
    margin: 0 auto!important;
  }
  .el-tabs__item{
    box-sizing: border-box;
    line-height: 38px;
    height: 38px;
    cursor: pointer;
    display: inline-block;
    padding: 0px 20px;
    letter-spacing: 0px;
    font-size: 14px;
    margin: 0px -1px;
    color: #333333;
    background-color: #fff;
    border: 1px solid #ccc;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item{
    box-sizing: border-box;
    line-height: 38px;
    height: 38px;
    cursor: pointer;
    display: inline-block;
    padding: 0px 20px;
    letter-spacing: 0px;
    font-size: 14px;
    margin: 0px -1px;
    color: #333333!important;
    background-color: #fff;
    border: 1px solid #ccc!important;
    margin-top: 0!important;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    box-sizing: border-box;
    line-height: 38px;
    height: 38px;
    cursor: pointer;
    display: inline-block;
    padding: 0px 20px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    letter-spacing: 0px;
    font-size: 14px;
    margin: 0px -1px;
    color: #fff!important;
    background-color: #63b62f!important;
    border: 1px solid #63b62f!important;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item:first-child{
    margin-left: 0!important;
    border-bottom-left-radius: 2px;
  }
  .el-tabs--top.el-tabs--border-card .el-tabs__item:last-child{
    border-top-left-radius: 2px;
  }
  .el-tabs__item:first-child {
    border-bottom-left-radius: 2px;
  }
  .el-tabs__item:first-child {
    border-top-left-radius: 2px;
  }
</style>
