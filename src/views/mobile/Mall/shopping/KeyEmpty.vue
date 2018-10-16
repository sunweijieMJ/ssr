<template>
  <div>
    <div class="default" v-if="key_word == ''">
      <div class="hot-sea">
        <div>热门搜索</div>
        <span class="history-tab" v-for="(hot, index) in hot" :key="index">{{hot}}</span>
      </div>
      <div class="clear"></div>
      <div class="hot-sea histroy">
        <div class="history-title">
          <span>历史搜索</span>
          <i class="iconfont icon-detail_ic_shoppingba"></i>
        </div>
        <span class="history-tab" v-for="(hot, index) in hot" :key="index">{{hot}}</span>
      </div>
      <div class="clear"></div>
    </div>
    <div v-if="key_word !== ''" class="searching">
      <ul>
        <li v-for="(h, index) in hot" :key="index">{{h}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'keyEmpty',
  props: ['key_word'],
  data(){
    return {
      hot: ['u突然有人个', '有热热', '噶发放发', '让娃说', '大大']
    };
  },
  mounted(){
    console.log(this.key_word)
  }
};
</script>
<style lang="scss" scoped>
.default{
  padding: 0rem 0.3rem 0.3rem 0.3rem;
}
.hot-sea{

  font-size: 0.28rem;
  div{
    height: 0.88rem;
    line-height: 0.88rem;
  }
  .history-tab{
    float: left;
    padding: 0.13rem 0.18rem;
    color: #444444;
    font-size: 0.32rem;
    border-radius: 0.04rem;
    background-color: #f5f5f5;
    margin-right: 0.3rem;
    margin-bottom: 0.3rem;
    letter-spacing: normal;
  }
  .history-title{
    display: flex;
    justify-content: space-between;
  }
}
.clear{
  clear: both;
}
.searching{
  li{
    padding: 0.3rem;
    border-bottom: 1px solid #e8e8e8;
  }
}
</style>
