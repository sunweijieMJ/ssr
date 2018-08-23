<template>
  <ul class="image_text">
    <li v-for="(item,index) in imageText" :key="index">
      <div class="title">
        <h3 v-for="(val,index) in item.title" :key="index">{{val}}</h3>
      </div>
      <div class="desc" v-for="(item,index) in item.content" :key="index">
        <p v-for="(val,index) in item.desc" :key="index">{{val}}</p>
      </div>
      <div class="btn" v-if="item.btn">
        <a href="javascript:;" @click="skip(item.btn_href)">{{item.btn_text}}</a>
      </div>
      <div class="img" v-if="item.img_url">
        <img v-if="item.img_url !== 'video'" :src="item.img_url" alt="">
        <VueVideo v-if="item.img_url === 'video'" :poster="poster" :sources="sources"></VueVideo>
      </div>
    </li>
  </ul>
</template>
<script>
  import VueVideo from '../official/VueVideo.vue';
  import poster from '../../../../static/mobile/img/about_img_01.jpg';

  export default {
    props: ['imageText'],
    components: {VueVideo},
    data(){
      return {
        poster, // ETC 封面图
        sources: {
          video_url: 'http://video.lanehub.cn/48f7c11baafc44a7a1f1a959ac1d2de3/7112d8d643864053b942b71d7566b1fc-1a97605ef90cc213707b52e4c15cecea-od-S00000001-200000.mp4',
          width: 670,
          height: 600
        }
      };
    },
    methods: {
      skip(name){
        if(name === 'Partners'){
          window.location.href = 'mailto:wmzeng@lanehubinc.com';
          return;
        }
        this.$router.push({name});
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .image_text{
    @include boxSize(6.7rem);
    @include distance(0, (0 0.4rem));
    li{
      .title{
        @include distance((0.58rem 0 0.5rem), 0);
        h3{
          @include fontStyle(0.4rem, normal, $titleColor);
          line-height: 0.56rem;
        }
      }
      .desc{
        @include distance((0 0 0.3rem), 0);
        p{
          @include fontStyle(0.32rem, 200, $textColor, left);
          line-height: 0.45rem;
        }
      }
      .btn{
        @include boxSize(2.8rem, 0.88rem);
        border-radius: 2rem;
        border: solid 1px #363636;
        text-align: center;
        @include distance((0.8rem auto 0.88rem), 0);
        a{
          @include fontStyle(0.3rem, 400, $titleColor);
          line-height: 0.88rem;
        }
      }
      .img{
        @include boxSize(6.7rem);
        @include distance((0.8rem 0 0), 0);
        img{
          @include boxSize(100%);
        }
      }
    }
  }
</style>
