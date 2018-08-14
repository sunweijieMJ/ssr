<template>
  <div class="image_text_wrap">
      <div class="image_text_content" v-for="(item,index) in imageText" :key="index">
        <div class="title">
          <h3 v-for="(val,index) in item.title" :key="index">{{val}}</h3>
        </div>
        <div class="desc" v-for="(item,index) in item.content" :key="index">
          <p v-for="(val,index) in item.desc" :key="index">{{val}}</p>
        </div>
        <div class="btn_wrap" v-if="item.btn">
          <a :href="item.btn_href">{{item.btn_text}}</a>
        </div>
        <div class="img_wrap" v-if="item.img_url">
          <img :src="item.img_url" alt="简介图">
          <img v-if="item.video" src="../../../assets/web/icon/video_ic_play.png" alt="" @click="video = !video">
          <VueVideo v-if="item.video && video" :poster="poster" :sources="sources" :video="video" @from-vueVideo="hide_video"></VueVideo>
        </div>
      </div>
  </div>
</template>
<script>
  import VueVideo from './VueVideo.vue';
  import poster from '../../../assets/web/img/about_img_01.jpg';

  export default {
    props: ['imageText'],
    components: {VueVideo},
    data(){
      return {
        video: false, // ETC 播放视频
        poster, // ETC 封面图
        sources: {
          video_url: 'http://video.lanehub.cn/48f7c11baafc44a7a1f1a959ac1d2de3/7112d8d643864053b942b71d7566b1fc-1a97605ef90cc213707b52e4c15cecea-od-S00000001-200000.mp4',
          width: 1440,
          height: 700
        }
      };
    },
    methods: {
      hide_video(data) {
        this.video = data;
      }
    },
    watch: {
      video(cur){
        if(cur) {
          document.documentElement.style.overflow = 'hidden';
        } else {
          document.documentElement.style.overflow = 'visible';
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @media screen and(max-width:1440px){
    .image_text_wrap{
      min-width: 1280px;
      .image_text_content {
        color: #000000;
        padding-top: 96px;
        .title{
            margin-bottom: 44px;
          h3 {
            font-size: 36px;
            letter-spacing: 1.8px;
            font-weight: 300;
            font-style: normal;
            line-height: 50px;
            text-align: center;
          }
        }
        .desc{
          margin-bottom: 24px;
          p{
            font-size: 20px;
            font-weight: 300;
            letter-spacing: 1.5px;
            line-height: 34px;
            text-align: center;
          }
        }
        .btn_wrap {
          margin: 72px 0 102px;
          a {
            display: block;
            margin: auto;
            width: 112px;
            height: 36px;
            border-radius: 24px;
            border: solid 1px #000000;
            font-size: 14px;
            font-weight: 300;
            line-height: 36px;
            text-align: center;
            color: #000000;
          }
        }
        .img_wrap {
          margin: 91px auto 0 auto;
          min-width: 1280px;
          min-height: auto;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            display: block;
            &:nth-of-type(2){
              cursor: pointer;
              position: absolute;
              z-index: 1000;
              top: 0;bottom: 0;left: 0;right: 0;
              margin: auto;
              width: 70px;
              height: 70px;
            }
          }
        }
      }
    }
  }
  @media screen and(min-width:1440px){
    .image_text_wrap{
      min-width: 1440px;
      .image_text_content {
        color: #000000;
        padding-top: 124px;
        .title{
            margin-bottom: 56px;
          h3 {
            font-size: 48px;
            font-weight: 300;
            font-style: normal;
            letter-spacing: 2.4px;
            line-height: 60px;
            text-align: center;
          }
        }
        .desc{
          margin-bottom: 34px;
          p{
            font-size: 24px;
            font-weight: 300;
            line-height: 40px;
            letter-spacing: 1.8px;
            text-align: center;
          }
        }
        .btn_wrap {
          margin: 82px 0 130px;
          a {
            display: block;
            margin: auto;
            width: 152px;
            height: 48px;
            border-radius: 24px;
            border: solid 1px #000000;
            font-size: 18px;
            font-weight: 300;
            line-height: 48px;
            text-align: center;
            color: #000000;
          }
        }
        .img_wrap {
          margin: 122px auto 0 auto;
          min-width: 1280px;
          min-height: auto;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            display: block;
            &:nth-of-type(2){
              cursor: pointer;
              position: absolute;
              z-index: 1000;
              top: 0;bottom: 0;left: 0;right: 0;
              margin: auto;
              width: 80px;
              height: 80px;
            }
          }
        }
      }
    }
  }
</style>
