<template>
  <div class="user-gift" v-if="gift_info">
    <public-title :pageTitle="'瓴里-新用户礼包'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <div class="gift-content">
      <h2><i class="iconfont icon-footer_ic_logo"></i> 新用户礼包</h2>
      <div class="gift-price">
        <i class="iconfont icon-new_user_logo"></i>
        <p>
          <i>¥</i><span>{{gift_info.price}}</span>
        </p>
        <a href="javascript:;" @click="intercept">活动已结束</a>
      </div>
      <ul class="explain">
        <h3>{{gift_info.show_message.title}}</h3>
        <li v-for="(item, index) in gift_info.show_message.message" :key="index">
          <span>{{index + 1}}.</span>
          <span>{{item.slice(2)}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat.js';
  import frequent from '../../../../mixins/frequent.js';
  import hidetitle from '../../../../mixins/hidetitle.js';
  import new_user_gift from '../../../../store/mall/new_user_gift.js';
  import {PublicTitle} from '../../../../components/mobile/business';

  export default {
    title() {
      return '瓴里-新用户礼包';
    },
    meta() {
      return `<meta name="description" content="Lanehub 新用户礼包">
              <meta name="keywords" content="新用户礼包">`;
    },
    asyncData({store}) {
      store.registerModule('new_user_gift', new_user_gift);
      return Promise.all([store.dispatch('new_user_gift/getNewUserGift')]);
    },
    components: {PublicTitle},
    mixins: [wechat, frequent, hidetitle],
    mounted() {
      let that = this;
      that.$store.registerModule('new_user_gift', new_user_gift, {preserveState: true});

      // 微信分享
      if(!that.gift_info) return;
      const link = window.location.href;
      const title = that.gift_info.share.title;
      const desc = that.gift_info.share.content;
      const imgUrl = that.gift_info.share.share_img;
      that.wxInit(link, title, desc, imgUrl);
    },
    destroyed() {
      this.$store.unregisterModule('new_user_gift', new_user_gift);
    },
    computed: mapState({
      gift_info: (store) => store.new_user_gift.gift_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .user-gift {
    .gift-content {
      padding-top: 1.14rem;
      background-size: cover;
      background-image: url('../../../../../static/mobile/img/h5/new_user_bg.png');
    }
    h2 {
      margin-bottom: 1rem;
      font-size: 0.5rem;
      font-weight: 500;
      line-height: 0.5rem;
      color: #fff;
      text-align: center;
      .icon-footer_ic_logo {
        font-size: 0.5rem;
      }
    }
    .gift-price {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon-new_user_logo {
        font-size: 1.8rem;
        color: #fff;
      }
      p {
        margin: 0.3rem 0 2rem;
        font-weight: 500;
        line-height: 1.2rem;
        color: #fff;
        i {
          font-size: 0.5rem;
          font-style: normal;
        }
        span {
          font-size: 1.2rem;
        }
      }
      a {
        width: 5rem;
        height: 0.96rem;
        border-radius: 0.58rem;
        background-color: #ccc;
        font-size: 0.4rem;
        font-weight: 500;
        line-height: 0.96rem;
        letter-spacing: 2px;
        text-align: center;
        color: #fff;
      }
    }
    .explain {
      padding: 0 0.8rem 0.5rem;
      background-size: cover;
      background-image: url('../../../../../static/mobile/img/h5/new_user_mask.jpg');
      h3 {
        margin: 0.6rem 0 0.54rem;
        font-size: 0.32rem;
        font-weight: 400;
        line-height: 0.32rem;
        color: #fff;
      }
      li {
        display: flex;
        span {
          font-size: 0.3rem;
          line-height: 0.45rem;
          color: #fff;
          &:first-child {
            width: 0.3rem;
          }
          &:last-child {
            flex: 1
          }
        }
      }
    }
  }
</style>

