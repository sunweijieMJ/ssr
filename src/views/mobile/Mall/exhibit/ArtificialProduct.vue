<template>
  <div class="exhibit-list">
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <module-desc v-if="textarea" :response="textarea"></module-desc>
      <div class="artificial-pro">
        <ShopList :shopList="product_list"></ShopList>
      </div>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="true" v-if="$route.name !== 'ArtificialProductApp'"></loading>
      <div class="cate_now" v-if="product_list.length === 0 && $route.name === 'ArtificialProduct'">
        <CommentNull :text="'还没有此类商品哟~'"></CommentNull>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import artificial from '../../../../store/mall/artificial.js';
import artificial_logo from '../../../../store/mall/product_list.js';
import ModuleDesc from '../../../../components/app/ModuleDesc';
import frequent from '../../../../mixins/frequent';
import {CommentNull, Loading, ShopList} from '../../../../components/mobile/business';
import Production from './newpro/Production';
import wechat from '../../../../mixins/wechat.js';
export default {
  mixins: [
    frequent,
    wechat
  ],
  components: {
    Loading,
    ModuleDesc,
    CommentNull,
    Production,
    ShopList
  },
  title() {
    return `${this.subtitle}`;
  },
  meta() {
    return `<meta name="description" content="Lanehub ${this.subtitle}">
    <meta name="keywords" content="${this.subtitle}">`;
  },
  asyncData({store, route}) {
    let pro_id = route.query.module_id;
    store.registerModule('artificial', artificial);
    store.registerModule('artificial_logo', artificial_logo);
    return Promise.all([
      store.dispatch('artificial/getNewProduct', {id: pro_id, isApp: route.name === 'ArtificialProductApp'}),
      store.dispatch('artificial_logo/getLogo', {})
    ]);
  },
  mounted() {
    this.$store.registerModule('artificial', artificial, {id: this.$route.query.module_id, preserveState: true});
    this.$store.registerModule('artificial_logo', artificial_logo, {preserveState: true});

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
      that.$store.dispatch('artificial/getNewProduct', {id: that.$route.query.module_id});
    }
  },
  computed: {
    ...mapState({
      product_list: (store) => store.artificial.product_list,
      loadInfo: (store) => store.artificial.loadInfo,
      subtitle: (store) => store.artificial.title,
      textarea: (store) => store.artificial.textarea,
      logo: (store) => store.artificial_logo.logo
    })
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .exhibit-list {
    background-color: white;
    .artificial-pro{
      padding: 0.3rem 0.3rem 0 0.3rem;
    }
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
    /* .f-w-b{
    padding:0.3rem 0.3rem 0 0.3rem;
    } */
    .f-w-t{
      padding:0.3rem 0.3rem 0 0.3rem;
      font-size:0.44rem;
      font-weight:400;
      color: #222;
    }
  }
</style>
<style lang="scss">
  @import '../../../../assets/scss/component/_richtext.scss';
  .cate_now > .comment-null{
    border-top: none !important;
  }
</style>

