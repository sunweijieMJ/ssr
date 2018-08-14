<template>
  <div class="download">
    <div class="download_box clearfix">
      <img src="../../../assets/web/img/download_iphone.png" alt="iPhoneX预览图">
      <div class="download_content clearfix">
        <h3>即刻体验 <span>瓴里 App</span></h3>
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
  </div>
</template>
<style lang="scss" scoped>
  .download{
    margin-top: 130px;
    min-width: 1280px;
    height: 270px;
    padding: 60px 0 50px;
    background-color: #f1f2f6;
    .download_box{
      width: 760px;
      margin: auto;
      >img{
        transform: translateY(-80px);
        width: 230px;
        float: left;
      }
      .download_content{
        float: left;
        width: 440px;
        margin-left: 90px;
        h3{
          font-size: 48px;
          line-height: 48px;
          font-weight: 300;
          letter-spacing: 2.4px;
          text-align: left;
          color: #000000;
          margin-bottom: 67px;
          span{
            font-weight: 400;
          }
        }
        .platform{
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
</style>
