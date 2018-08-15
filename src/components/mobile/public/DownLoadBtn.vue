<template>
  <div class="download_btn">
    <div class="iPhone" v-if="phone_model === 'iPhone'" @click="iphone_download">
      <img src="../../../assets/mobile/icon/download_ic_ios.png" alt="iPhone图标"><span>iPhone 下载</span>
    </div>
    <div class="Android" v-if="(phone_model === 'Android') || (phone_model !== 'iPhone')" @click="android_download">
      <img src="../../../assets/mobile/icon/download_ic_android.png" alt="Android图标"><span>Android 下载</span>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        phone_model: ''
      };
    },
    mounted(){
      let u = window.navigator.appVersion;
      if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
        this.phone_model = 'Android';
      } else if(u.indexOf('iPhone') > -1){
        this.phone_model = 'iPhone';
      }
    },
    methods: {
      iphone_download(){
        window.location.href = 'https://itunes.apple.com/cn/app/id1319173852?mt=8';
      },
      android_download(){
        window.location.href = 'https://download.lanehub.cn/android';
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
    .iPhone, .Android {
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

