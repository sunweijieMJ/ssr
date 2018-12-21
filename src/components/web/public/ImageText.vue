<template>
  <div class="image_text_wrap">
    <div class="image_text_content" v-for="(vitem,vindex) in imageText" :key="vindex">
      <div class="title">
        <h3 v-for="(witem,windex) in vitem.title" :key="windex">{{witem}}</h3>
      </div>
      <div class="desc" v-for="(witem,windex) in vitem.content" :key="windex">
        <li v-for="(xitem,xindex) in witem.desc" :key="xindex">
          <a href="https://www.amap.com/search?id=B0FFJY32M8&city=310109&geoobj=121.492508%7C31.244578%7C121.511927%7C31.255346&query_type=IDQ&query=LANEHUB%E7%93%B4%E9%87%8C%E4%BD%93%E9%AA%8C%E5%BA%97&zoom=16" target="_blank"
            v-if="vitem.link && windex === vitem.link.v && xindex === vitem.link.w">{{xitem}}</a>
          <p v-else>{{xitem}}</p>
        </li>
      </div>
      <div class="btn_wrap" v-if="vitem.btn">
        <a href="javascript:;" @click="$router.push({name: vitem.btn_href})">{{vitem.btn_text}}</a>
      </div>
      <div class="img_wrap" v-if="vitem.img_url">
        <img :src="vitem.img_url" alt="lanehub简介图">
        <img v-if="vitem.video" src="../../../../static/web/icon/video_ic_play.png" alt="视频海报图" @click="video = !video">
        <VueVideo v-if="vitem.video && video" :poster="poster" :sources="sources" :video="video" @from-vueVideo="hide_video"></VueVideo>
      </div>
    </div>
  </div>
</template>
<script>
  import VueVideo from './VueVideo.vue';
  import poster from '../../../../static/web/img/about_img_01.jpg';

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
  @import '../../../assets/scss/_base.scss';

  .image_text_wrap {
    .image_text_content {
      color: #000;
      .desc a {
        display: block;
        margin: auto;
        @include fontStyle(20px, 300, #197BCE);
        letter-spacing: 1.5px;
        line-height: 34px;
      }
      .btn_wrap {
        a {
          display: block;
          margin: auto;
          border-radius: 24px;
          border: solid 1px #000000;
        }
      }
      .img_wrap {
        min-width: 1280px;
        min-height: auto;
        position: relative;
        img {
          @include boxSize(100%);
          &:nth-of-type(2){
            position: absolute;
            z-index: 1000;
            top: 0;bottom: 0;left: 0;right: 0;
            margin: auto;
            cursor: pointer;
          }
        }
      }
    }
  }

  @media screen and(max-width:1440px) {
    .image_text_wrap {
      min-width: 1280px;
      .image_text_content {
        padding-top: 30px;
        .title {
          margin-bottom: 44px;
          h3 {
            @include fontStyle(36px, 300, #000);
            line-height: 50px;
            letter-spacing: 1.8px;
          }
        }
        .desc {
          margin-bottom: 24px;
          p {
            @include fontStyle(20px, 300, #000);
            letter-spacing: 1.5px;
            line-height: 34px;
          }
        }
        .btn_wrap {
          @include distance((72px 0 102px));
          a {
            @include boxSize(112px, 36px);
            @include fontStyle(14px, 300, #000);
            line-height: 36px;
          }
        }
        .img_wrap {
          @include distance((91px auto 0 auto));
          img {
            &:nth-of-type(2) {
              @include boxSize(70px, 70px);
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
        padding-top: 50px;
        .title{
            margin-bottom: 56px;
          h3 {
            @include fontStyle(48px, 300, #000);
            letter-spacing: 2.4px;
            line-height: 60px;
          }
        }
        .desc{
          margin-bottom: 34px;
          p {
            @include fontStyle(24px, 300, #000);
            line-height: 40px;
            letter-spacing: 1.8px;
          }
        }
        .btn_wrap {
          @include distance((82px 0 130px));
          a {
            @include boxSize(152px, 48px);
            @include fontStyle(18px, 300, #000);
            border: solid 1px #000000;
            line-height: 48px;
          }
        }
        .img_wrap {
          @include distance((122px auto 0 auto));
          img {
            &:nth-of-type(2){
              @include boxSize(80px, 80px);
            }
          }
        }
      }
    }
  }
</style>
