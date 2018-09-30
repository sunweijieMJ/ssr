<template>
  <footer>
    <h2>
      <i class="iconfont icon-footer_ic_logo"></i>
    </h2>
    <div class="tab">
      <a :href="item.router" v-for="(item,index) in tab" :key="index"><span v-if="item.title === '首页'">首页</span>{{item.title}}</a>
    </div>
    <a href="http://www.miibeian.gov.cn/" target="_black">&copy; 2018 LANEHUB·<span>沪ICP备17049047号</span></a>
  </footer>
</template>
<script>
  export default {
    data(){
      return {
        tab: [
          {
            title: '首页',
            router: 'home'
          },
          {
            title: '关于我们',
            router: 'aboutus'
          },
          {
            title: '瓴里产品',
            router: 'lanehub_product'
          },
          {
            title: '商业合作',
            router: 'partners'
          },
          {
            title: '加入我们',
            router: 'joinus'
          }
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  footer{
    min-width: 1280px;
    @include distance(auto, (80px 0));
    color: #ffffff;
    h2{
      text-align: center;
      i {
        font-size: 30px;
        color: #000;
      }
    }
    .tab{
      @include boxSize(590px);
      @include distance((50px auto 80px));
      a{
        @include fontStyle(14px, 300, #000);
        letter-spacing: 1px;
        margin-right: 71px;
        &:last-child{
          margin-right: 0;
        }
        span{
          color: #ffffff;
          opacity: 0;
          visibility: hidden;
        }
      }
    }
    >a{
      display: block;
      @include fontStyle(14px, 300, #777);
      line-height: 20px;
      letter-spacing: 0.9px;
      cursor: pointer;
      span{
        font-weight: 100;
      }
    }
  }
</style>

