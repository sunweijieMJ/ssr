<template>
  <footer>
    <h2>
      <img src="../../../assets/web/icon/footer_ic_logo.png" alt="公司名称">
    </h2>
    <div class="tab">
      <a :href="item.router!=='joinUs'?item.router:'https://mp.weixin.qq.com/s/T7gEFB6M4TvBwPVfFZCGiA'" :target="item.router==='joinUs'?'_black':'_self'" v-for="(item,index) in tab" :key="index"><span v-if="item.title === '首页'">首页</span>{{item.title}}</a>
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
            router: '/'
          },
          {
            title: '关于我们',
            router: 'aboutUs'
          },
          {
            title: '瓴里产品',
            router: 'laneHubProduct'
          },
          {
            title: '商业合作',
            router: 'partners'
          },
          {
            title: '加入我们',
            router: 'joinUs'
          }
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  footer{
    min-width: 1280px;
    padding: 80px 0;
    color: #ffffff;
    h2{
      img{
        display: block;
        margin: auto;
        width: 154px;
      }
    }
    .tab{
      width: 590px;
      margin: 50px auto 80px;
      a{
        font-size: 14px;
        font-weight: 300;
        line-height: 14px;
        letter-spacing: 1px;
        text-align: center;
        color: #000000;
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
      cursor: pointer;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.9px;
      text-align: center;
      color: #777777;
      span{
        font-weight: 100;
      }
    }
  }
</style>

