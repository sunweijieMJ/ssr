<template>
  <div class="mall-category">
    <mall-search>
      <!-- <a :href="global_data.mall.category_banner[0].link" class="banner" v-if="global_data && global_data.mall && global_data.mall.category_banner && global_data.mall.category_banner.length">
        <img v-lazy="imageSize(global_data.mall.category_banner[0].img, '690x0')" alt="">
        <p>
          <span>到访体验店 发现更多惊喜</span>
          <i class="iconfont icon-shopping_next"></i>
        </p>
      </a>
      <ul class="category">
        <li v-for="(item, index) in category.children" :key="index" @click="queryAssign('shop_list', {id: item.obj.id})">{{item.obj.name.slice(0,3)}}</li>
      </ul> -->
      <div class="secondary">
        <!-- 类目 -->
        <div class="seond-left">
          <ul>
            <li v-for="(a, index) in categray" :class="(active === index) ? 'active' : 'disable'" :key="index" @click="changeTab(index)">{{a.name}}</li>
          </ul>
        </div>
        <div class="second-right">
          <!-- 热门区 -->
          <ul class="recommend" v-if="active === 0">
            <li class="re-li" v-for="(img, mindex) in 10" :key="mindex">
              <img src="https://imgx.mediav.com/rimg.png?size=112x112&resizetype=3&quality=100&axisreset=1&img=https%3A%2F%2Fp17.ssl.qhimgs3.com%2Fdr%2F240_240_%2Ft01fa0f1f240a37f475.jpg%3Ft%3D1544004883" alt="">
            </li>
          </ul>
          <!-- 分类区 -->
          <div class="pro-cate" v-else>
            <div class="pro-banner">
              <img src="https://imgx.mediav.com/rimg.png?size=112x112&resizetype=3&quality=100&axisreset=1&img=https%3A%2F%2Fp17.ssl.qhimgs3.com%2Fdr%2F240_240_%2Ft01fa0f1f240a37f475.jpg%3Ft%3D1544004883" alt="">
            </div>
            <div class="pro-number">
              <div v-for="(c, cindex) in 5" :key="cindex">
                <img src="https://imgx.mediav.com/rimg.png?size=112x112&resizetype=3&quality=100&axisreset=1&img=https%3A%2F%2Fp17.ssl.qhimgs3.com%2Fdr%2F240_240_%2Ft01fa0f1f240a37f475.jpg%3Ft%3D1544004883" alt="">
                <p>三人撒发</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mall-search>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../mixins/frequent.js';
  import imageSize from '../../../../utils/filters/imageSize.js';
  import mall_search from '../../../../store/mall/mall_search.js';
  import mall_category from '../../../../store/mall/mall_category.js';
  import MallSearch from '../../../../components/mobile/popup/MallSearch.vue';

  export default {
    title() {
      return '商城类目';
    },
    meta() {
      return `<meta name="description" content="商城类目">
      <meta name="keywords" content="商城类目">`;
    },
    asyncData({store}) {
      store.registerModule('mall_search', mall_search);
      store.registerModule('mall_category', mall_category);
      return Promise.all([
        store.dispatch('getGlobal'),
        store.dispatch('mall_category/getCategoryList')
      ]);
    },
    components: {MallSearch},
    mixins: [frequent],
    data() {
      return {
        imageSize,
        categray: [
          {
            name: '沙发',
            id: 1
          },
          {
            name: '桌椅',
            id: 2
          },
          {
            name: '以利萨拜',
            id: 3
          },

          {
            name: '各地阿斯顿',
            id: 4
          },
          {
            name: '快到拉萨看到吗',
            id: 5
          },
          {
            name: '沙扣扣开门发',
            id: 6
          },
          {
            name: '登审批单',
            id: 7
          },
          {
            name: '偶滴送滴',
            id: 8
          }
        ],
        active: +this.$route.query.active ? +this.$route.query.active : 0
      };
    },
    methods: {
      changeTab(num){
        this.active = num;
        this.$router.replace({name: 'ShopCategory', query: {active: this.active}});
      }
    },
    mounted() {
      let that = this;
      that.$store.registerModule('mall_search', mall_search, {preserveState: true});
      that.$store.registerModule('mall_category', mall_category, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('mall_category');
    },
    computed: mapState({
      global_data: (store) => store.global_data,
      category: (store) => store.mall_category.category
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .mall-category {
    background-color: #fff;
    .banner {
      position: relative;
      display: flex;
      margin: 0.5rem;
      img {
        width: 100%;
        height: 3.2rem;
      }
      p {
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 0.67rem;
        padding: 0 0.24rem;
        opacity: 0.8;
        background: linear-gradient(180deg,rgba(0,0,0,0.94) 0%,rgba(0,0,0,0.71) 100%);
        span {
          font-size: 0.3rem;
          font-weight: 400;
          color: #fff;
        }
        i {
          font-size: 12px;
          color: #fff;
        }
      }
    }
    // .category {
    //   display: flex;
    //   flex-wrap: wrap;
    //   padding: 0.1rem 0.5rem;
    //   justify-content: space-between;
    //   li {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     width: 3rem;
    //     height: 0.88rem;
    //     margin-bottom: 0.5rem;
    //     @include thin-line(#b6b6b6, 4px);
    //     font-size: 0.34rem;
    //     font-weight: 400;
    //     color: $themeColor;
    //     background-color: rgba(250,250,250,1);;
    //   }
    // }
    .secondary{
      display: flex;
      justify-content: flex-end;
      .seond-left{
        width: 1.8rem;
        height: calc(100vh - 0.89rem);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {display:none}
        border-right: 1px solid #FAFAFA;
        box-sizing: border-box;
        // position: fixed;
        // bottom: 0;
        // left: 0;
        ul{
          li{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 1.2rem;
            text-align: center;
            font-size: 0.3rem;
            font-weight:300;
            color: #222222;
            border: 1px solid #FAFAFA;
            box-sizing: border-box;
            background: #FAFAFA;
          }
          .active{
            border-left: 0.04rem solid #0072DD;
            background-color: #FFFFFF;
          }
        }
      }
      .second-right{
        width: 5.7rem;
        height: calc(100vh - 0.89rem);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {display:none}
        // padding: 0.4rem 0.4rem;
        .recommend{
          margin: 0.4rem 0.4rem;
          // width: 100%;
          .re-li{
            width: 4.9rem;
            height: 2.36rem;
            margin-bottom: 0.2rem;
            img{
              width: 100%;
              height: 2.36rem;
            }
          }
        }
        .pro-cate{
          margin: 0.4rem 0.3rem;
          .pro-banner{
            width: 5.1rem;
            height: 1.7rem;
            img{
              width: 5.1rem;
              height: 1.7rem;
            }
          }
          .pro-number{
            padding: 0.4rem;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            div{
              margin-bottom: 0.56rem;
              text-align: center;
              img{
                width: 1.8rem;
                height: 1.8rem;
              }
              p{
                margin-top: 0.2rem;
                font-size: 0.28rem;
                font-weight:300;
                color: #222222;
                line-height:1;
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .mall-category .mall-search {
    .search-input {
      .input {
        width: 5.54rem !important;
      }
      .icon-download_ic_menu {
        display: none;
      }
    }
  }
</style>
