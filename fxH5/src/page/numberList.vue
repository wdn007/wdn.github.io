<template>
  <div class="wrapper" style="padding-bottom:100px;">
    <div class="cont mt15">
      <!--<div class="weui-cells__title">号码选择</div>-->
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd"><input v-model="searchStr" class="weui-input inpsty" type="number" placeholder="手机号码"></div>
          <div class="weui-cell__ft" style="text-align: center;">
            <div style="background: #ef4c1f;padding-left: 10px;padding-right: 10px;font-size: 12px;overflow: auto" class="weui-btn btn02" @click="refreshNumber">查询/换一批</div>
          </div>
        </div>
      </div>
      <div class="chNum" style="background: #ffffff;">
        <div class="weui-grids" style="border: none;">
          <!--          <template v-for="item in numbers">-->
          <div v-for="item in numbers" :key="item.id" class="weui-grid" :class="{'curr': numbercurr === item.id}" @click="selectNumber(item.id)">{{ item.number }}</div>
          <!--          </template>-->
        </div>
      </div>
    </div><!--号码选择-->
  </div>
</template>

<script>
export default {
  name: 'NumberList',
  components: {},
  data() {
    return {
      groupId: -1,
      current: 1,
      size: 10,
      searchStr: '',
      numbers: [],
      numbercurr: ''
    }
  },
  created() {
    this.groupId = this.$route.query.groupId
  },
  mounted: function() {
    this._initNumber()
  },
  methods: {
    // async getShopGoodsNumber4groupId() {
    //   const that = this
    //   try {
    //     const params = {
    //       groupId: this.$route.query.groupId
    //     }
    //     const res = await this.$api.shopGoods.getShopGoodsNumber4groupId(params)
    //     if (res.status === 'success') {
    //       that.numbers = res.data.datas
    //       if (that.current < res.data.size) {
    //         that.current = res.data.currentPage + 1
    //       } else {
    //         that.current = res.data.currentPage
    //       }
    //     } else {
    //       console.log(res.message)
    //     }
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
    async _initNumber() {
      // this.getShopGoodsNumber4groupId()
      const that = this
      try {
        const params = {
          groupId: this.$route.query.groupId
        }
        const res = await this.$api.shopGoods.getShopGoodsNumber4groupId(params)
        if (res.status === 'success') {
          console.log(res.data.currentPage)
          that.numbers = res.data.datas
          // if (that.current < res.data.size) {
          that.current = res.data.currentPage + 1
          // } else {
          //   that.current = res.data.currentPage
          // }
        } else {
          console.log(res.message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async loadNumber() {
      const that = this
      try {
        const params = {
          groupId: this.$route.query.groupId,
          current: that.current,
          searchStr: that.searchStr
        }
        const res = await this.$api.shopGoods.getShopGoodsNumber4groupId(params)
        if (res.status === 'success') {
          var nextp = res.data.currentPage + 1
          if (nextp > res.data.size) {
            nextp = 1
          }
          console.log(nextp)
          that.numbers = res.data.datas
          that.current = nextp
          console.log(that.current)
        } else {
          console.log(res.message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    searchNum: function(e) {
      var that = this
      console.log(e)
      that.searchStr = e.detail.value
      that.current = 1
    },
    // 点击查询/换一批时触发
    refreshNumber: function(e) {
      this.loadNumber()
    },

    // 选择号码添加curr样式
    selectNumber: function(id) {
      console.log(id)
      this.numbercurr = id
      console.log(this.numbercurr)
    }
  }
}
</script>

<style>
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
</style>
