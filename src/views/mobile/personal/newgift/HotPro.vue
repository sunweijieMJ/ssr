<template>
  <div class="hot-pro">
    <div class="title">
      <span class="iconfont icon-download_ic_logo"></span>
      <!-- <span class="iconfont icon-footer_ic_logo"></span> -->
      <span class="lanehub"> LANEHUB </span>
      <span>热门商品</span>
    </div>
    <div class="hot-pro-img">
      <ul>
        <li v-for="(h, hindex) in image" :key="hindex">
          <div class="hot-img">
            <img :src="h.img" alt="">
          </div>
          <div class="hot-tag">
            {{h.tag}}
          </div>
          <p class="hot-title">{{h.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import hot1 from '../../../../../static/mobile/img/personal/hot1.png';
import hot2 from '../../../../../static/mobile/img/personal/hot2.png';
import hot3 from '../../../../../static/mobile/img/personal/hot3.png';
import hot4 from '../../../../../static/mobile/img/personal/hot4.png';
import hot5 from '../../../../../static/mobile/img/personal/hot5.png';
import hot6 from '../../../../../static/mobile/img/personal/hot6.png';
export default {
  name: 'hotpro',
  data(){
    return {
      image: [
        {
          img: hot1,
          tag: '丹麦设计师 Hans Thyge',
          title: 'LANEHUB unit 沙发'
        },
        {
          img: hot2,
          tag: '日式简约风 Ins达人都在用',
          title: 'KINTO 旅行保温杯'
        },
        {
          img: hot3,
          tag: '弱捻纱 来自新疆的长绒棉',
          title: 'LANEHUB Adriana 系列轻柔打孔款方巾'
        },
        {
          img: hot4,
          tag: '150年英国品牌 顶级手工打磨',
          title: 'Fox umbrellas 动物头长柄雨伞'
        },
        {
          img: hot5,
          tag: '新加坡总理用的国宝级品牌',
          title: 'Luzerne 陆升 knit 系列餐具'
        },
        {
          img: hot6,
          tag: '成为艺术品的家居香氛',
          title: 'VOLUSPA 山茶花系列马卡龙蜡烛'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.hot-pro{
  .title{
    padding: 0 0.3rem;
    font-size:0.36rem;
    font-weight:400;
    color: #222222;
    .iconfont{
      font-size: 0.36rem;
    }
    .lanehub{
      font-weight: 500;
    }
  }
  .hot-pro-img{
    width: 100%;
    ul{
      margin: 0.4rem 0.3rem 0 0.3rem;
      padding-bottom: 0.2rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border-bottom: 1px solid #E8E8E8;
      li{
        width: 3.3rem;
        margin-bottom: 0.4rem;
        .hot-img{
          img{
            width: 3.3rem;
          }
        }
        .hot-tag{
          z-index: 99;
          position: relative;
          margin-top: -0.46rem;

          padding: 0.11rem 0.09rem;
          font-size: 0.24rem;
          font-weight:400;
          color: #5B7AA1;
          line-height: 1;
          background: #EBEEF6;
        }
        .hot-title{
          margin-top: 0.17rem;
          font-size: 0.3rem;
          font-weight:400;
          color: #222222;
          line-height: 0.42rem;
        }
      }
    }
  }
}
</style>
