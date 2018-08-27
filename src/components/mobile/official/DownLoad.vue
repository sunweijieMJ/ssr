<template>
  <div class="download">
    <p>即刻体验 <span>瓴里 App</span></p>
    <img v-if="phone_model === 'iPhone'" src="../../../../static/mobile/img/download_ic_ios.png" alt="二维码下载">
    <img v-if="(phone_model === 'Android') || (phone_model !== 'iPhone')" src="../../../../static/mobile/img/download_ic_android.png" alt="二维码下载">
    <DownLoadBtn></DownLoadBtn>
  </div>
</template>
<script>
  import DownLoadBtn from './DownLoadBtn';
  export default {
    components: {
      DownLoadBtn
    },
    data(){
      return {
        phone_model: ''
      };
    },
    mounted(){
      let u = window.navigator.userAgent;
      if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
        this.phone_model = 'Android';
      } else if(u.indexOf('iPhone') > -1){
        this.phone_model = 'iPhone';
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .download{
    @include boxSize(100%, 5.52rem, #f5f5f5);
    @include distance((0.8rem 0 0), (0.8rem 0 0));
    p{
      @include fontStyle(0.4rem);
      span{
        @include fontStyle(0.4rem, normal, rgba(47,47,47,1));
      }
    }
    img{
      @include boxSize(2rem, 2rem);
      @include distance((0.7rem auto 0.5rem), 0);
    }
    .download_btn{
      @include distance(auto, 0);
    }
  }
</style>
