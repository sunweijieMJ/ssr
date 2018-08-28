<template>
  <div class="download_btn">
    <a :href="download_link">
      <img v-if="phone_model === 'iPhone'" src="../../../../static/mobile/icon/download_ic_ios.png" alt="iPhone图标">
      <img v-if="phone_model === 'Android'" src="../../../../static/mobile/icon/download_ic_android.png" alt="Android图标">
      <span>{{phone_model}} 下载</span>
    </a>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        phone_model: '',
        download_link: ''
      };
    },
    mounted(){
      this.download();
    },
    methods: {
      download() {
        let that = this;
        const u = window.navigator.userAgent;
        // iPhone or Android
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
          this.phone_model = 'Android';
          that.download_link = 'https://download.lanehub.cn/android';
        } else if(u.indexOf('iPhone') > -1) {
          this.phone_model = 'iPhone';
          that.download_link = 'https://itunes.apple.com/cn/app/id1319173852?mt=8';
        }

        if((/MicroMessenger/i).test(u)){
          that.download_link = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.weihe.myhome';
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .download_btn{
    @include boxSize(3.22rem, 0.96rem, #222);
    border-radius: 0.48rem;
    cursor: pointer;
    a {
      @include flex;
      @include boxSize(auto, 0.96rem);
      img{
        @include boxSize(0.48rem);
      }
      span{
        @include fontStyle(0.3rem, normal, #fff);
        @include distance((0 0 0 0.2rem), 0);
      }
    }
  }
</style>

