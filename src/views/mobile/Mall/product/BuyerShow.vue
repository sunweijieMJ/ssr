<template>
  <div class="buyershow" v-if="product_info">
    <life-style></life-style>
    <div class="buyershow-title">
      <dl>
        <dt>
          <img :src="product_info.options[0].optionImgs[0]" alt="">
        </dt>
        <div class="desc">
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-detail_lb_happiness_"></use>
            </svg>
            <span>{{product_info.joyful.value}}</span>
            <span>愉悦度</span>
          </p>
          <p>{{product_info.joyful.title}}</p>
        </div>
      </dl>
    </div>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <public-list :listData="buyer_show_list"></public-list>
        <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat.js';
  import buyer_show from '../../../../store/mall/buyer_show.js';
  import {LifeStyle, PublicList, Loading} from '../../../../components/mobile/business';

  export default {
    title() {
      return '买家秀';
    },
    meta() {
      return `<meta name="description" content="买家秀">
      <meta name="keywords" content="买家秀">`;
    },
    asyncData({store, route}) {
      store.registerModule('buyer_show', buyer_show);
      const id = route.params.id;
      return Promise.all([
        store.dispatch('buyer_show/getProductDetail', id),
        store.dispatch('buyer_show/getProductDynamic', id)
      ]);
    },
    components: {
      LifeStyle, PublicList, Loading
    },
    mixins: [wechat],
    data() {
      return {
        id: this.$route.params.id // ETC 商品id
      };
    },
    mounted(){
      let that = this;
      this.$store.registerModule('buyer_show', buyer_show, {preserveState: true});
      // 微信分享
      if(!that.product_info) return;
      const link = window.location.href;
      const title = that.product_info.basic.title;
      const desc = `商品愉悦度${that.product_info.joyful.value}，${that.product_info.joyful.buyers_count}位瓴里朋友购买，${that.product_info.joyful.shares_count}条体验秀`;
      const imgUrl = that.product_info.dynamics[0].entity_photos[0];
      that.wxInit(link, title, desc, imgUrl);
    },
    destroyed() {
      this.$store.unregisterModule('buyer_show', buyer_show);
    },
    methods: {
      infinite() {
        let that = this;
        that.$store.dispatch('buyer_show/getProductDynamic', that.id);
      }
    },
    computed: {
      ...mapState({
        product_info: (store) => store.buyer_show.product_info,
        buyer_show_list: (store) => store.buyer_show.buyer_show_list,
        loadInfo: (store) => store.buyer_show.loadInfo
      }),
      loading() {
        return this.$store.state.buyer_show.loadInfo.loading;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .buyershow{
    background-color: #ffffff;
    .buyershow-title{
      padding: 0.3rem;
      height: 1.6rem;
      border-bottom: 0.01rem solid #f5f5f5;
      dl{
        display: flex;
        dt{
          img{
            width: 1.6rem;
          }
        }
      }
      .desc{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 0.3rem;
        p{
          font-size: 0.28rem;
          font-weight: 300;
          color: $subColor;
          display: flex;
          align-items: center;
          &:first-child{
            margin-bottom: 0.2rem;
          }
          svg {
            width: 0.48rem;
            height: 0.48rem;
          }
          span{
            font-size: 0.24rem;
            font-weight: 300;
            color: $subColor;
            &:first-of-type{
              font-size: 0.32rem;
              font-weight: 300;
              color: $mallRed;
              margin: 0 0.1rem;
            }
          }
        }
      }
    }
  }
</style>
