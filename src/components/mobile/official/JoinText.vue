<template>
  <ul class="join-text">
    <li v-for="(item, index) in joinText" :key="index">
      <h4>{{item.title}}</h4>
      <ul v-if="item.position" class="position">
        <li v-for="(val, i) in item.position.slice(0, show_more)" :key="i">
          <a :href="val.link" target="_blank">
            <span>{{val.desc}}</span>
            <i class="iconfont icon-shopping_next"></i>
          </a>
        </li>
      </ul>
      <ul v-if="item.desc" class="image-text">
        <li v-for="(item, index) in item.desc" :key="index" @click="skip(item.link)">
          <img :src="item.img" alt="">
          <h5>{{item.title}}</h5>
          <p>{{item.desc}}</p>
          <a :href="item.link" target="_blank">
            <span>查看详情</span>
            <img src="../../../../static/mobile/svg/common/next_ic_blue_14.svg" alt="">
          </a>
        </li>
      </ul>
      <img v-if="item.banner" :src="item.banner" alt="">
      <p v-if="item.more && (item.more.text2 || show_more === 17)">
        <span>{{item.more.text1}}</span>
        <a :href="item.more.text2 ? download_link : 'mailto:'+item.more.link">{{item.more.link}}</a>
        <span v-if="item.more.text2">{{item.more.text2}}</span>
      </p>
      <a v-if="item.btn" href="javascript:;" @click="pack">{{show_more === 17 ? item.btn[0] : item.btn[1]}}</a>
    </li>
  </ul>
</template>
<script>
  export default {
    props: ['joinText'],
    data() {
      return {
        show_more: 10,
        download_link: ''
      };
    },
    mounted() {
      this.download();
    },
    methods: {
      download() {
        let that = this;
        const u = window.navigator.userAgent;
        // iPhone or Android
        if((/MicroMessenger/i).test(u)){
          that.download_link = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.weihe.myhome';
        } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
          that.download_link = 'https://download.lanehub.cn/android';
        } else if(u.indexOf('iPhone') > -1) {
          that.download_link = 'https://itunes.apple.com/cn/app/id1319173852?mt=8';
        }
      },
      skip(src) {
        window.open(src);
      },
      pack() {
        this.show_more === 17 ? this.show_more = 10 : this.show_more = 17;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .join-text {
    >li {
      padding: 0 0.4rem;
      margin-bottom: 0.8rem;
      h4 {
        font-size: 0.4rem;
        font-weight: normal;
        color: $themeColor;
        text-align: center;
        margin-bottom: 0.5rem;
      }
      .position {
        li {
          display: flex;
          align-items: center;
          height: 0.96rem;
          border-top: 0.01rem solid $borderColor;
          &:last-of-type {
            border-bottom: 0.01rem solid $borderColor;
          }
          a {
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            span {
              font-size: 0.34rem;
              font-weight: 200;
              color: #363636;
            }
            i {
              font-size: 0.14rem;
              color: #363636;
            }
          }
        }
      }
      .image-text {
        li {
          margin-bottom: 0.5rem;
          img {
            width: 100%;
          }
          h5 {
            font-size: 0.36rem;
            font-weight: normal;
            color: $themeColor;
            margin: 0.4rem 0 0.2rem;
          }
          p {
            margin-bottom: 0.2rem;
            font-size: 0.3rem;
            font-weight: 200;
            line-height: 0.48rem;
            color: $themeColor;
            @include erow(2);
          }
          a {
            display: flex;
            align-items: center;
            span {
              font-size: 0.3rem;
              font-weight: 200;
              color: #1970ce;
            }
            img {
              width: 0.14rem;
              margin-left: 0.16rem;
            }
          }
        }
      }
      >p {
        font-size: 0.3rem;
        font-weight: 200;
        line-height: 0.48rem;
        text-align: center;
        margin-top: 0.4rem;
        span{
          color: $themeColor;
        }
        a {
          font-size: 0.3rem;
          font-weight: 200;
          color: #1970ce;
        }
      }
      >img {
        width: 100%;
      }
      >a {
        display: block;
        width: 2.9rem;
        height: 0.88rem;
        margin: 0.5rem auto 0;
        border-radius: 2rem;
        border: 0.01rem solid #363636;
        font-size: 0.3rem;
        font-weight: 400;
        line-height: 0.88rem;
        color: #323232;
        text-align: center;
      }
    }
  }
</style>


