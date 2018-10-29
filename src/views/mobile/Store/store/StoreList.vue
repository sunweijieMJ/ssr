<template>
  <div>
    <div class="nav">
      <span style="font-size: 0.43rem;" @click="back" class="iconfont icon-nav_ic_return"></span>
      <span>选择店铺</span>
      <span style="opacity: 0;" class="iconfont icon-nav_ic_return"></span>
    </div>
    <div class="banner">
      <div class="img" @click="goStoreDetail(list.basic.brick_id)" v-for="(list, index) in store_list" :key="index">
        <img :src="list.basic.list_imgs[0]" alt="">
        <div class="over">
          <p>{{list.basic.addr_detail}}</p>
          <p class="date">{{list.basic.store_status_desc}}</p>
        </div>
      </div>
      <div class="img">
        <img src="https://p0.ssl.qhimg.com/t013cacbb2aaaed576d.jpg" alt="">
        <div class="none">
          <p>敬请期待</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import store_list from '../../../../store/store/store_list.js';
export default {
  name: 'StoreList',
  data(){
    return {

    };
  },
  title() {
    return '店铺';
  },
  meta() {
    return `<meta name="description" content="店铺">
    <meta name="keywords" content="店铺">`;
  },
  asyncData({store}) {
    store.registerModule('store_list', store_list);
    return Promise.all([store.dispatch('store_list/getStoreList')]);
  },
  mounted() {
    this.$store.registerModule('store_list', store_list, {preserveState: true});
  },
  destroyed() {
    this.$store.unregisterModule('store_list', store_list);
  },
  computed: {
    ...mapState({
      'store_list': (store) => store.store_list.store_list
    })
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    goStoreDetail(brack_id){
      this.$router.push({name: 'StoreDetail', params: {id: brack_id}});
    }
  }
};
</script>
<style lang="scss" scoped>
.nav{
  background-color: #fff;
  padding: 0.3rem;
  border: 1px solid #e8e8e8;
  justify-content: space-between;
  display: flex;
  position: fixed;
  top: 0;
  width: 6.9rem;
  font-size: 0.36rem;
  z-index: 99;
}
.banner{
  // border-top: 1px solid red;
  margin-top: 1.1rem;
  padding: 0.3rem 0.3rem;
  font-size: 0.32rem;
  .img{
    width: 6.9rem;
    position: relative;
    margin-bottom: 0.3rem;
    img{
      width: 100%;
      height: 3.88rem;
      border-radius: 0.1rem;
    }
    .over{
      position: absolute;
      left: 0.2rem;
      bottom: 0.2rem;
      color: #fafafa;
      .date{
        font-size: 0.26rem;
      }
    }
    .none{
      position: absolute;
      top: 0;
      width: 6.9rem;
      text-align: center;
      height: 3.88rem;
      border-radius: 0.1rem;
      background-color:rgba(0,114,221,0.8);
      p{
        line-height: 3.88rem;
        color: #fafafa;
      }
    }
  }
}
</style>
