<template>
  <div class="download">
    <div class="download_box clearfix">
      <img src="../../../../static/web/img/download_iphone.png" alt="iPhoneX预览图">
      <div class="download_content clearfix">
        <h3>即刻体验 <span>瓴里 App</span></h3>
        <div class="platform">
          <img src="../../../../static/web/icon/download_pc.png" alt="下载二维码">
          <div class="download_btn">
            <a href="https://itunes.apple.com/cn/app/kk-gou-wu/id1319173852?mt=8" target="_blank">
              <img src="../../../../static/web/icon/download_ic_ios.png" alt="iPhone下载图标"><span>iPhone</span>
            </a>
            <a href="https://download.lanehub.cn/android">
              <img src="../../../../static/web/icon/download_ic_android.png" alt="Android下载图标"><span>Android</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .download {
    min-width: 1280px;
    @include boxSize(auto, 270px, #f1f2f6);
    @include distance((130px 0 0), (60px 0 50px));
    .download_box {
      margin: auto;
      @include boxSize(760px);
      >img {
        float: left;
        @include boxSize(230px);
        transform: translateY(-80px);
      }
      .download_content {
        float: left;
        @include boxSize(440px);
        margin-left: 90px;
        h3 {
          @include fontStyle(48px, 300, #000, left);
          letter-spacing: 2.4px;
          margin-bottom: 67px;
          span {
            font-weight: 400;
          }
        }
        .platform {
          height: 155px;
          >img {
            float: left;
            width: 155px;
          }
          .download_btn {
            float: left;
            @include distance((6px 0 0 60px));
            a {
              @include flex;
              @include boxSize(171px, 55px, #000);
              border-radius: 27.5px;
              margin-bottom: 30px;
              cursor: pointer;
              &:last-child {
                margin-right: 0;
              }
              >img {
                height: 30px;
              }
              span {
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
  }
</style>
