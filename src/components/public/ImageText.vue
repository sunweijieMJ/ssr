<template>
  <div class="image_text">
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
  </div>
</template>
<script>
  import VueVideo from '../public/VueVideo.vue';
  import poster from '../../assets/img/about_img_01.jpg';

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
          window.location.href = 'mailto:cooperation@lanehubinc.com';
          return;
        }
        this.$router.push({name});
      }
    }
  };
</script>
<style lang="scss" scoped>
  .image_text{
    width: 6.7rem;
    padding: 0 0.4rem;
    li{
      list-style: none;
      width: 100%;
      .title{
        margin: 0.58rem 0 0.5rem;
        h3{
          font-size: 0.4rem;
          font-weight: normal;
          line-height: 0.56rem;
	        text-align: center;
        }
      }
      .desc{
        margin-bottom: 0.3rem;
        p{
          font-size: 0.32rem;
          font-weight: 200;
          line-height: 0.45rem;
          text-align: left;
        }
      }
      .btn{
        margin: 0.8rem auto 0.88rem;
        width: 2.8rem;
        height: 0.88rem;
        border-radius: 2rem;
        border: solid 1px #363636;
        text-align: center;
        a{
          font-size: 0.3rem;
          line-height: 0.88rem;
          color: #363636;
        }
      }
      .img{
        width: 6.7rem;
        margin-top: 0.8rem;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
</style>
