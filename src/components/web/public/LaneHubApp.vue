<template>
  <div class="app">
    <img src="../../../../static/web/img/index_img_02.png" alt="iPhoneX预览图">
    <div class="app_box">
      <ImgText :imageText="img_text"></ImgText>
      <div class="platform">
        <img src="../../../../static/web/icon/download_pc.png" alt="下载二维码">
        <div class="download_btn">
          <a href="//itunes.apple.com/cn/app/kk-gou-wu/id1319173852?mt=8" target="_blank" rel="nofollow">
            <i class="iconfont icon-download_ic_ios"></i><span>iPhone</span>
          </a>
          <a href="//download.lanehub.cn/android" rel="nofollow">
            <i class="iconfont icon-download_ic_android"></i><span>Android</span>
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
                desc: [
                  '遇见新惊喜，发现好物，发现充满向往感的生活方式。',
                  '在瓴里体验店，通过 App 感受全新购物方式，',
                  '品尝咖啡、预定享座和更多服务。',
                  '立刻下载，和瓴友一起分享灵感，创造愉悦生活。'
                ]
              }
            ],
            btn: false,
            btn_text: '',
            btn_her: '',
            img_url: ''
          }
        ]
      };
    }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .app{
    min-width: 1280px;
    position: relative;
    >img{
      @include boxSize(100%);
    }
    .app_box{
      position: absolute;
      right: 0;
      z-index: 2000;
      @include boxSize(780px, 380px);
      margin-right: 14%;
      .image_text_wrap{
        min-width: 780px;
        @include distance((-96px 0 10px));
      }
      .platform{
        @include boxSize(390px, 155px);
        @include distance(auto);
        >img{
          float: left;
          @include boxSize(155px);
        }
        .download_btn{
          float: left;
          @include distance((6px 0 0 60px));
          a{
            @include flex;
            @include boxSize(171px, 55px, #000);
            border-radius: 27.5px;
            margin-bottom: 30px;
            cursor: pointer;
            &:last-child{
              margin-right: 0;
            }
            i {
              font-size: 30px;
              color: #fff;
            }
            span{
              margin-left: 10px;
              @include fontStyle(20px, 300, #fff);
              font-family: Helvetica;
              letter-spacing: 1px;
            }
          }
        }
      }
    }
  }

  @media screen and(max-width:1440px){
    .app{
      .app_box{
        top: 27%;
        .image_text_wrap{
          @include distance((-96px 0 10px));
        }
      }
    }
  }
  @media screen and(min-width:1440px){
    .app{
      .app_box{
        top: 23%;
        .image_text_wrap{
          @include distance((-96px 0 50px));
        }
      }
    }
  }
</style>


