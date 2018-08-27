<template>
  <ul class="join-text">
    <li v-for="(item, index) in joinText" :key="index">
      <h4>{{item.title}}</h4>
      <ul v-if="item.position" class="position">
        <li v-for="(val, i) in item.position.slice(0, 4)" :key="i">
          <a :href="val.link" target="_blank">
            <span>{{val.desc}}</span>
            <img src="../../../../static/app/svg/customer/shopping_next.svg" alt="">
          </a>
        </li>
      </ul>
      <ul v-if="item.desc" class="image-text">
        <li v-for="(item, index) in item.desc" :key="index">
          <img :src="item.img" alt="">
          <h5>{{item.title}}</h5>
          <p>{{item.desc}}</p>
          <a :href="item.link" target="_blank">查看详情</a>
        </li>
      </ul>
      <img v-if="item.banner" :src="item.banner" alt="">
      <p v-if="item.more">
        <span>{{item.more.text1}}</span>
        <a :href="item.more.text2 ? download_link : 'mailto:'+item.more.link">{{item.more.link}}</a>
        <span v-if="item.more.text2">{{item.more.text2}}</span>
      </p>
      <a v-if="item.btn" href="javascript:;" @click="pack">{{item.btn}}</a>
    </li>
  </ul>
</template>
<script>
  export default {
    props: ['joinText'],
    data() {
      return {
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
      pack() {

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
        font-weight: 300;
        color: #363636;
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
              color: #363636;
            }
            img {
              width: 0.12rem;
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
            font-size: 0.4rem;
            font-weight: 300;
            color: #363636;
            margin: 0.4rem 0 0.2rem;
          }
          p {
            margin-bottom: 0.2rem;
            font-size: 0.3rem;
            line-height: 0.45rem;
            color: #363636;
          }
          a {
            font-size: 0.3rem;
            line-height: 0.42rem;
            color: #1970ce;
          }
        }
      }
      >p {
        font-size: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        margin-top: 0.4rem;
        span{
          color: #444;
        }
        a {
          font-size: 0.3rem;
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
        margin: 0.8rem auto 0;
        border-radius: 2rem;
        border: 2px solid $borderColor;
        font-size: 0.3rem;
        line-height: 0.88rem;
        color: #363636;
        text-align: center;
      }
    }
  }
</style>


