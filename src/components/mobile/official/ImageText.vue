<template>
  <ul class="image_text">
    <li v-for="(vitem,vindex) in imageText" :key="vindex">
      <div class="title">
        <h3 v-for="(witem,windex) in vitem.title" :key="windex">{{witem}}</h3>
      </div>
      <ul class="desc" v-for="(witem,windex) in vitem.content" :key="windex">
        <li v-for="(xitem,xindex) in witem.desc" :key="xindex">
          <p v-if="vitem.link && windex === vitem.link.v && xindex === vitem.link.w">
            <span>地址：</span>
            <a href="https://m.amap.com/search/mapview/keywords=LANEHUB%E7%93%B4%E9%87%8C%E4%BD%93%E9%AA%8C%E5%BA%97&city=310109&poiid=B0FFJY32M8" target="_blank"
            >{{xitem}}</a>
          </p>
          <p v-else>{{xitem}}</p>
        </li>
      </ul>
      <div class="btn" v-if="vitem.btn">
        <a href="javascript:;" @click="skip(vitem.btn_href)">{{vitem.btn_text}}</a>
      </div>
      <div class="img" v-if="vitem.img_url">
        <img v-if="vitem.img_url !== 'video'" :src="vitem.img_url" alt="">
        <VueVideo v-if="vitem.img_url === 'video'" :poster="poster" :sources="sources"></VueVideo>
      </div>
    </li>
  </ul>
</template>
<script>
  import {VueVideo} from '../public';
  import poster from '../../../../static/mobile/img/office/about_img_01.png';

  export default {
    props: ['imageText'],
    components: {VueVideo},
    data(){
      return {
        poster, // ETC 封面图
        sources: {
          video_url: 'https://video.lanehub.cn/7e03c42585ee4837a79f0b8778cdc8c7/388a05d21c8448b2aac868c7a09f6161-db0efca5245333e06a977d5e92205256-ld.mp4',
          width: 670,
          height: 377
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
    box-sizing: border-box;
    @include boxSize(100%);
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
          @include fontStyle(0.32rem, 200, $themeColor, left);
          line-height: 0.48rem;
          span {
            @include fontStyle(0.32rem, 200, $themeColor, left);
            line-height: 0.48rem;
          }
          a {
            @include fontStyle(0.32rem, 200, #197BCE, left);
            line-height: 0.48rem;
          }
        }
      }
      .btn{
        @include boxSize(2.8rem, 0.88rem);
        @include thin-line(#363636, 200px);
        text-align: center;
        @include distance((0.8rem auto 0.88rem), 0);
        a{
          @include fontStyle(0.3rem, 400, $titleColor);
          line-height: 0.88rem;
        }
      }
      .img{
        @include distance((0.8rem 0 0), 0);
        img{
          @include boxSize(100%);
        }
      }
    }
  }
</style>
