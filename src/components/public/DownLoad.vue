<template>
  <div class="download">
    <p>即刻体验 <span>瓴里 App</span></p>
    <img v-if="phone_model === 'iPhone'" src="../../assets/img/download_ic_ios.png" alt="二维码下载">
    <img v-if="(phone_model === 'Android') || (phone_model !== 'iPhone')" src="../../assets/img/download_ic_android.png" alt="二维码下载">
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
      let u = window.navigator.appVersion;
      if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
        this.phone_model = 'Android';
      } else if(u.indexOf('iPhone') > -1){
        this.phone_model = 'iPhone';
      }
    }
  };
</script>
<style lang="scss" scoped>
  .download{
    width: 7.5rem;
    height: 5.52rem;
    background-color: #f5f5f5;
    text-align: center;
    padding-top: 0.8rem;
    margin-top: 0.8rem;
    p{
      font-size: 0.4rem;
      font-weight: 100;
      text-align: center;
      span{
        font-weight: normal;
      }
    }
    img{
      width: 2rem;
      height: 2rem;
      margin: 0.7rem auto 0.5rem;
    }
    .download_btn{
      margin: auto;
    }
  }
</style>
