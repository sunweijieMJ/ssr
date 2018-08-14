<template>
  <div class="app">
    <img src="../../../assets/web/img/index_img_02.jpg" alt="iPhoneX预览图">
    <div class="app_box">
      <ImgText :imageText="img_text"></ImgText>
      <div class="platform">
        <img src="../../../assets/web/icon/download_pc.png" alt="下载二维码">
        <div class="download_btn">
          <a href="https://itunes.apple.com/cn/app/kk-gou-wu/id1319173852?mt=8" target="_blank">
            <img src="../../../assets/web/icon/download_ic_ios.png" alt="iPhone下载图标"><span>iPhone</span>
          </a>
          <a href="https://download.lanehub.cn/android">
            <img src="../../../assets/web/icon/download_ic_android.png" alt="Android下载图标"><span>Android</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ImgText from '../public/ImageText';

  export default {
    components: {
      ImgText
    },
    data(){
      return {
        img_text: [
          {
            title: ['LANEHUB 瓴里 App'],
            content: [
              {
                desc:[
                  '生活达人分享，打开新世界大门，了解品质生活。',
                  '和志趣相投的朋友一起讨论，碰撞出改造生活的新灵感。',
                  '告诉瓴里你的想法，属于你的梦幻产品即将诞生。',
                ],
              }
            ],
            btn: false,
            btn_text: "",
            btn_her: "",
            img_url: ''
          }
        ]
      };
    }
};
</script>
<style lang="scss" scoped>
@media screen and(max-width:1440px){
  .app{
    min-width: 1280px;
    min-height: auto;
    position: relative;
    >img{
      width: 100%;
      height: 100%;
      display: block;
    }
    .app_box{
      position: absolute;
      right: 0;top: 27%;
      z-index: 2000;
      width: 780px;
      height: 380px;
      margin-right: 14%;
      .image_text_wrap{
        min-width: 780px;
        max-width: 800px;
        margin-bottom: 90px;
        margin-bottom: 10px;
        margin-top: -96px;
      }
      .platform{
        margin: auto;
        width: 390px;
        height: 155px;
        >img{
          float: left;
          width: 155px;
        }
        .download_btn{
          margin: 6px 0 0 60px;
          float: left;
          a{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 171px;
            height: 55px;
            border-radius: 27.5px;
            background-color: #000000;
            margin-bottom: 30px;
            cursor: pointer;
            &:last-child{
              margin-right: 0;
            }
            >img{
              height: 30px;
            }
            span{
              margin-left: 10px;
              font-family: Helvetica;
              font-size: 20px;
              font-weight: 300;
              letter-spacing: 1px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
@media screen and(min-width:1440px){
  .app{
    min-width: 1280px;
    min-height: auto;
    position: relative;
    >img{
      width: 100%;
      height: 100%;
      display: block;
    }
    .app_box{
      position: absolute;
      right: 0;top: 23%;
      z-index: 2000;
      width: 780px;
      height: 380px;
      margin-right: 14%;
      .image_text_wrap{
        min-width: 780px;
        max-width: 800px;
        margin-bottom: 50px;
        margin-top: -96px;
      }
      .platform{
        margin: auto;
        width: 390px;
        height: 155px;
        >img{
          float: left;
          width: 155px;
        }
        .download_btn{
          margin: 6px 0 0 60px;
          float: left;
          a{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 171px;
            height: 55px;
            border-radius: 27.5px;
            background-color: #000000;
            margin-bottom: 30px;
            cursor: pointer;
            &:last-child{
              margin-right: 0;
            }
            >img{
              height: 30px;
            }
            span{
              margin-left: 10px;
              font-family: Helvetica;
              font-size: 20px;
              font-weight: 300;
              letter-spacing: 1px;
              text-align: center;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>


