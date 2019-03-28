<template>
  <div class="exhibit-list">
    <div class="list-title" v-if="!(response.__platform === 'app' || isTencent)">
      <section>
        <a href="javascript:;" @click="closeWebPage">
          <i class="iconfont icon-download_ic_close"></i>
        </a>
        <h2>LANEHUB</h2>
      </section>
    </div>
    <ul class="list">
      <li class="list-info" v-for="(item, index) in exhibit_list.data" :key="index" @click="assign('product_detail', item.id)">
        <img v-lazy="imageSize(item.options[0].optionImgs[0], '330x330')" alt="">
        <div class="desc">
          <h3>{{item.options[0].msu_brand}}</h3>
          <h4>{{item.options[0].msu_title}}</h4>
          <p class="desc-price" :class="{'sell-out': !sellOut(item.options)}">
            <i>¥</i>
            <span>{{item.options[0].optionPrice | divide(100)}}</span>
          </p>
        </div>
      </li>
    </ul>
    <p>店内的商品会不定时更新，喜欢就快点收藏吧</p>
    <mt-popup v-model="exhibit_popup" position="bottom">
      <div class="exhibit-popup" @click.stop="''">
        <i class="iconfont icon-download_ic_close" @click.stop="exhibit_popup = false"></i>
        <div class="popup-title">
          <img src="../../../../../static/mobile/svg/app_ic_blue_162.svg" alt="">
          <h3>扫码自由购 商品送到家</h3>
        </div>
        <div class="popup-btn">
          <a href="javascript:;" @click.stop="querySkip('ExhibitDownload', {code: params.exhibition, from: 'exhibition'})">下载瓴里 App</a>
          <p>现在下载，领取 1800 元新人礼包</p>
        </div>
      </div>
    </mt-popup>
    <open-app :type="2"></open-app>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../mixins/frequent.js';
  import hidetitle from '../../../../mixins/hidetitle.js';
  import imageSize from '../../../../utils/filters/imageSize.js';
  import exhibit_list from '../../../../store/mall/exhibit_list.js';
  import OpenApp from '../../../../components/mobile/button/OpenApp.vue';

  export default {
    title() {
      return 'LANEHUB';
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
    components: {OpenApp},
    mixins: [frequent, hidetitle],
    data() {
      return {
        imageSize,
        params: this.$route.params,
        exhibit_popup: false
      };
    },
    created() {
      // if(this.exhibit_list.data.length === 1) {
      //   this.$router.push({name: 'ProductDetail', params: {id: this.exhibit_list.data[0].id}});
      // }
    },
    beforeMount() {
      if(!localStorage.getItem('exhibit_popup')) {
        localStorage.setItem('exhibit_popup', true);
        this.exhibit_popup = Boolean(localStorage.getItem('exhibit_popup'));
      }
    },
    mounted() {
      let that = this;
      that.$store.registerModule('exhibit_list', exhibit_list, {preserveState: true});
    },
    methods: {
      cancelBubble() {
        let that = this;
        const modal = that.$el.querySelector('.v-modal');
        const popup = that.$el.querySelector('.exhibit-popup');
        if(modal && popup) {
          // 阻止冒泡
          modal.addEventListener('touchmove', (e) => {
            e.stopPropagation ? e.stopPropagation() : window.event.cancelBubble = true;
            e.preventDefault ? e.preventDefault() : window.event.returnValue = false;
          });
          popup.addEventListener('touchmove', (e) => {
            e.stopPropagation ? e.stopPropagation() : window.event.cancelBubble = true;
            e.preventDefault ? e.preventDefault() : window.event.returnValue = false;
          });
        }
      },
      // 判断售罄
      sellOut(options) {
        for(let i = 0, LEN = options.length; i < LEN; i++){
          if(options[i].stock > 0) return true;
        }
      },
      // 关闭当前窗口
      closeWebPage() {
        if (window.navigator.userAgent.indexOf('MSIE') > 0) {
          if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
            window.opener = null; window.close();
          } else {
            window.open('', '_top'); window.top.close();
          }
        } else if (window.navigator.userAgent.indexOf('Firefox') > 0) {
          // 火狐默认状态非window.open的页面window.close是无效的
          window.location.href = 'about:blank ';
        } else {
          window.opener = null;
          window.open('', '_self', '');
          window.close();
        }
      }
    },
    destroyed() {
      this.$store.unregisterModule('exhibit_list', exhibit_list);
    },
    watch: {
      exhibit_popup(cur) {
        if(cur) this.cancelBubble();
      }
    },
    computed: mapState({
      exhibit_list: store => store.exhibit_list.exhibit_list
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .exhibit-list {
    background-color: #fff;
    .list-title{
      width: 100%;
      height: 0.89rem;
      position: relative;
      section {
        box-sizing: border-box;
        position: fixed;
        top: 0;
        display: flex;
        justify-content: center;
        width: 7.5rem;
        height: 0.89rem;
        padding: 0 0.3rem;
        border-bottom: 0.01rem solid #e5e5e5;
        z-index: 2000;
        background: #fff;
        a {
          position: absolute;
          left: 0.3rem;
          height: 0.89rem;
          display: flex;
          align-items: center;
          i {
            font-size: 0.46rem;
            color: #333;
          }
        }
        h2 {
          font-size: 0.36rem;
          font-weight: 400;
          line-height: 0.89rem;
          text-align: center;
          font-weight: 300;
          color: $themeColor;
          @include tofl(6rem);
        }
      }
    }
    .list {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      padding: 0.4rem 0.3rem 1.4rem;
      .list-info {
        box-sizing: border-box;
        width: 3.3rem;
        margin-bottom: 0.6rem;
        &:last-child {
          margin-bottom: 0;
        }
        img {
          width: 3.3rem;
          height: 3.3rem;
          border-radius: 0.04rem;
        }
        .desc {
          h3 {
            @include tofl(3.3rem);
            margin: 0.25rem 0 0.08rem;
            font-size: 0.22rem;
            font-weight: 300;
            line-height: 0.3rem;
            color: $subColor;
          }
          h4 {
            @include tofl(3.3rem);
            font-size: 0.28rem;
            font-weight: 400;
            line-height: 0.34rem;
            color: $themeColor;
          }
          .desc-price {
            @include tofl(3.3rem);
            margin-top: 0.22rem;
            font-weight: 400;
            line-height: 0.3rem;
            color: $mallRed;
            // &.sell-out {
            //   color: $subColor;
            // }
            i {
              font-style: normal;
              font-size: 0.24rem;
            }
            span {
              font-size: 0.3rem;
            }
          }
        }
      }
    }
    >p {
      padding: 0.4rem 0 0.1rem;
      font-size: 0.24rem;
      text-align: center;
      color: $subColor;
    }
    .footer-btn {
      position: fixed;
      z-index: 2000;
      left: 0;right: 0;
      bottom: 0.8rem;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 6.3rem;
      height: 1.74rem;
      padding: 0 0.3rem;
      box-shadow: 0px 0.24rem 0.28rem 0px rgba(0,0,0,0.22);
      border-radius: 0.3rem;
      background: rgba(241, 243, 245, 1);
      .desc p {
        font-size: 0.32rem;
        font-weight: 400;
        line-height: 0.42rem;
        color:rgba(34,34,34,1);
      }
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.78rem;
        height: 0.8rem;
        border-radius: 0.82rem;
        background:rgba(0,114,221,1);
        font-size: 0.32rem;
        font-weight: 400;
        color: #fff;
      }
    }
    .exhibit-popup {
      position: relative;
      width: 7.5rem;
      height: 7.5rem;
      box-shadow:0px 0.24rem 0.28rem 0px rgba(0,0,0,0.22);
      background:rgba(239,239,239,1);
      i {
        position: absolute;
        top: 0.28rem; right: 0.28rem;
        font-size: 0.42rem;
      }
      .popup-title {
        padding-top: 0.84rem;
        margin-bottom: 1.24rem;
        img {
          width: 1.6rem;
          margin: 0 auto 0.5rem;
        }
        h3 {
          font-size: 0.48rem;
          font-weight: 400;
          line-height: 0.48rem;
          text-align: center;
          color:rgba(34,34,34,1);
        }
      }
      .popup-btn {
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 4.18rem;
          height: 0.96rem;
          margin: 0 auto 0.22rem;
          border-radius: 0.82rem;
          background:rgba(0,114,221,1);
          font-size: 0.36rem;
          color: #fff;
        }
        p {
          font-size: 0.28rem;
          line-height: 1.5;
          text-align: center;
          color: $themeColor;
        }
      }
    }
  }
</style>

