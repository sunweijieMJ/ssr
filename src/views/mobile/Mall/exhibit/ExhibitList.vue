<template>
  <div class="exhibit-list">
    <public-title :pageTitle="'请选择商品'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <ul class="list">
      <li class="list-info" v-for="(item, index) in exhibit_list.data" :key="index" @click="assign('product_detail', item.id)">
        <img :src="item.options[0].optionImgs[0]" alt="">
        <div class="desc">
          <h3>{{item.options[0].msu_brand}}</h3>
          <h4>{{item.options[0].msu_title}}</h4>
          <p class="desc-price" :class="{'sell-out': !sellOut(item.options)}">
            <i>¥</i>
            <span>{{item.options[0].optionPrice / 100}}</span>
          </p>
        </div>
      </li>
    </ul>
    <p>店内的商品会不定时更新，喜欢就快点收藏吧</p>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {os} from '../../../../utils/business/judge.js';
  import {parseUrl} from '../../../../utils/business/tools.js';
  import frequent from '../../../../mixins/frequent.js';
  import exhibit_list from '../../../../store/mall/exhibit_list.js';
  import {PublicTitle} from '../../../../components/mobile/business';

  export default {
    title() {
      return '请选择商品';
    },
    meta() {
      return `<meta name="description" content="Lanehub 陈列列表">
      <meta name="keywords" content="陈列列表">`;
    },
    asyncData({store, route}) {
      const text = route.params.exhibition;
      store.registerModule('exhibit_list', exhibit_list);
      return Promise.all([store.dispatch('exhibit_list/getExhibitList', {text, type: 0})]);
    },
    components: {PublicTitle},
    mixins: [frequent],
    data() {
      return {
        response: {},
        isTencent: false
      };
    },
    mounted() {
      let that = this;
      that.response = parseUrl();
      that.isTencent = os().isWechat || os().isQQ;
      that.$store.registerModule('exhibit_list', exhibit_list, {preserveState: true});
    },
    methods: {
      sellOut(options) {
        for(let i = 0, LEN = options.length; i < LEN; i++){
          if(options[i].stock > 0) return true;
        }
      }
    },
    destroyed() {
      this.$store.unregisterModule('exhibit_list', exhibit_list);
    },
    computed: mapState({
      exhibit_list: (store) => store.exhibit_list.exhibit_list
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .exhibit-list {
    background-color: #fff;
    .list {
      width: 7.5rem;
      display: flex;
      flex-wrap: wrap;
      .list-info {
        box-sizing: border-box;
        width: 3.75rem;
        padding: 0.4rem 0.3rem 0.5rem;
        border-bottom: 0.01rem solid $borderColor;
        &:nth-child(2n+1) {
          border-right: 0.01rem solid $borderColor;
        }
        img {
          width: 3.14rem;
          height: 3.15rem;
        }
        .desc {
          h3 {
            @include tofl(3.15rem);
            margin: 0.2rem 0 0.1rem;
            font-size: 0.22rem;
            font-weight: 300;
            line-height: 0.3rem;
            color: $subColor;
          }
          h4 {
            @include tofl(3.15rem);
            font-size: 0.28rem;
            font-weight: 300;
            line-height: 0.3rem;
            color: $themeColor;
          }
          .desc-price {
            @include tofl(3.15rem);
            margin-top: 0.24rem;
            font-weight: 400;
            line-height: 0.32rem;
            color: $mallRed;
            &.sell-out {
              color: $subColor;
            }
            i {
              font-style: normal;
              font-size: 0.24rem;
            }
            span {
              font-size: 0.32rem;
            }
          }
        }
      }
    }
    p {
      padding: 0.4rem 0;
      font-size: 0.24rem;
      text-align: center;
      color: $subColor;
    }
  }
</style>

