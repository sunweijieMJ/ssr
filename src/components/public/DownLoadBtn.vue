<template>
  <div class="download_btn">
    <div v-if="phone_model === 'iPhone'" @click="iphone_download">
      <img src="../../assets/icon/download_ic_ios.png" alt="iPhone图标"><span>iPhone 下载</span>
    </div>
    <div v-if="(phone_model === 'Android') || (phone_model !== 'iPhone')" @click="android_download">
      <img src="../../assets/icon/download_ic_android.png" alt="Android图标"><span>Android 下载</span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      phone_model: ''
    }
  },
  created(){
    // let u = window.navigator.userAgent;
    // if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
    //   this.phone_model = 'Android';
    // } else if(u.indexOf('iPhone') > -1){
    //   this.phone_model = 'iPhone';
    // }
  },
  methods: {
    iphone_download(){
      //window.location.href = 'https://itunes.apple.com/cn/app/id1319173852?mt=8';
    },
    android_download(){
      //window.location.href = 'https://download.lanehub.cn/android';
    }
  }
}
</script>

<style lang="scss" scoped>
  .download_btn{
    width: 3.22rem;
    height: 0.96rem;
    line-height: 0.96rem;
    border-radius: 0.48rem;
    background-color: #222222;
    text-align: center;
    cursor: pointer;
    img{
      width: 0.48rem;
      height: 0.58rem;
      vertical-align: middle;
      transform: translateY(-0.03rem);
    }
    span{
      margin-left: 0.2rem;
      display: inline-block;
      vertical-align: middle;
      font-size: 0.3rem;
      color: #ffffff;
    }
  }
</style>

