<template>
  <div class="exhibit-list">
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div class="f-w-b">
        <p>{{title}}</p>
      </div>
      <div class="pro-list">
        <ShopList :shopList="product_list"></ShopList>
      </div>
      <Loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="true"></Loading>
      <div class="cate_now" v-if="product_list.length === 0">
        <CommentNull :text="'还没有此类商品哟~'"></CommentNull>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import auto_list from '../../../../store/mall/auto_list.js';
import frequent from '../../../../mixins/frequent';
import {LifeStyle, CommentNull, Loading, ShopList} from '../../../../components/mobile/business';
export default {
  mixins: [frequent],
  components: {
    Loading,
    LifeStyle,
    ShopList,
    CommentNull
  },
  data(){
    return{

    };
  },
  title() {
    return `${this.title}`;
  },
  meta() {
    return `<meta name="description" content="Lanehub ${this.title}">
    <meta name="keywords" content="${this.title}">`;
  },
  asyncData({store, route}) {
    let pro_id = route.query.type;
    store.registerModule('auto_list', auto_list);
    return Promise.all([store.dispatch('auto_list/getAutoNewProduct', {id: pro_id})]);
  },
  mounted() {
    this.$store.registerModule('auto_list', auto_list, {id: this.$route.query.type, preserveState: true});
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    infinite() {
      let that = this;
      that.$store.dispatch('auto_list/getAutoNewProduct', {id: this.$route.query.type});
    }
  },
  computed: {
    ...mapState({
      product_list: (store) => store.auto_list.product_list,
      loadInfo: (store) => store.auto_list.loadInfo,
      title: (store) => store.auto_list.title
      // textarea: (store) => store.auto_list.textarea
    })
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .exhibit-list {
    background-color: white;
    .nav{
      z-index: 99;
      padding: 0.21rem 0.3rem;
      font-size: 0.36rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      position: fixed;
      top: 0;
      background-color: #fff;
      width: 6.9rem;
    }
    .f-w-b{
      padding:0.3rem 0.3rem 0 0.3rem;
      font-size:0.44rem;
      font-weight:400;
      color: #222;
    }
    .pro-list{
      padding: 0.3rem 0.3rem 0 0.3rem;
    }
  }
</style>
<style lang="scss">
  // @import '../../../../assets/scss/component/_richtext.scss';
  .cate_now > .comment-null{
    border-top: none !important;
  }
</style>

