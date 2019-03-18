<template>
  <div class="exhibit-list">
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div class="f-w-b">
        <p>{{subtitle}}</p>
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
import auto_logo from '../../../../store/mall/product_list.js';
import frequent from '../../../../mixins/frequent';
import {LifeStyle, CommentNull, Loading, ShopList} from '../../../../components/mobile/business';
import wechat from '../../../../mixins/wechat.js';
export default {
  mixins: [frequent, wechat],
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
    return `${this.subtitle}`;
  },
  meta() {
    return `<meta name="description" content="Lanehub ${this.subtitle}">
    <meta name="keywords" content="${this.subtitle}">`;
  },
  asyncData({store, route}) {
    let pro_id = route.query.type;
    store.registerModule('auto_list', auto_list);
    store.registerModule('auto_logo', auto_logo);
    return Promise.all([
      store.dispatch('auto_list/getAutoNewProduct', {id: pro_id}),
      store.dispatch('auto_logo/getLogo', {})
    ]);
  },
  mounted() {
    this.$store.registerModule('auto_list', auto_list, {id: this.$route.query.type, preserveState: true});
    this.$store.registerModule('auto_logo', auto_logo, {preserveState: true});

    // 微信分享
    const link = window.location.href;
    const title = this.subtitle;
    const desc = '一起创造愉悦的生活方式';
    const imgUrl = this.logo;
    this.wxInit(link, title, desc, imgUrl);
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
      subtitle: (store) => store.auto_list.title,
      logo: (store) => store.artificial_logo.logo
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
  }
</style>
<style lang="scss">
  // @import '../../../../assets/scss/component/_richtext.scss';
  .cate_now > .comment-null{
    border-top: none !important;
  }
</style>

