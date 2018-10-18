<template>
  <div>
    <div class="default" v-if="key_word == ''">
      <div class="hot-sea" v-if="hotlist">
        <div>热门搜索</div>
        <span class="history-tab" v-for="(hot, index) in hotlist" :key="index" @click="hotEvent(hot.text)">{{hot.text}}</span>
      </div>

      <div class="clear"></div>
      <div class="hot-sea histroy" v-if="history.lenght > 0">
        <div class="history-title">
          <span>历史搜索</span>
          <i class="iconfont icon-detail_ic_shoppingba" @click="reset"></i>
        </div>
        <span class="history-tab" v-for="(hot, index) in history" :key="index">{{hot.keyword}}</span>
      </div>
      <div class="clear"></div>
    </div>
    <div v-if="key_word !== ''" class="searching">
      <ul>
        <li v-for="(h, index) in thinklist" :key="index" @click="keySearch(h.text)">{{h.text}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'keyEmpty',
  props: ['key_word', 'hotlist', 'history', 'thinklist'],
  data(){
    return {
      hot: ['打扫打扫打扫大']
    };
  },
  methods: {
    reset(){
      this.$api.poet('/mall/misc/reset_search_history', res => {
      })
    },
    hotEvent(keys){
      console.log(this.proid);
      if(this.$route.name === 'SearchContent'){
        console.log('1')
        this.$emit('localSearch', false, this.key_word);
      }else{
        console.log('2')
        this.$router.push({name: 'SearchContent', params: {key: keys, id: 0}});
      }
    },
    keySearch(keys){
      this.$router.push({name: 'SearchContent', params: {id: 0, key: keys}});
    }
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
