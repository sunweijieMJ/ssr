<template>
  <div class="header">
    <h1 @click="goHome">
      <img src="../../../assets/web/icon/nav_ic_logo.png" alt="logo">
    </h1>
    <nav>
      <a :href="item.router=='index'?'/':'/'+item.router" v-for="(item,index) in tab" :key="index" @click="chooseTab(item.router)" :class="{active:activeTab===item.router}">{{item.title}}</a>
    </nav>
  </div>
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
        }
      ],
      activeTab: {}
    };
  },
  created(){
    this.chooseTab(this.$route.name);
  },
  methods: {
    chooseTab(name){
      this.activeTab = name;
      this.$router.push({name});
    },
    goHome(){
      this.$router.push({name: 'home'});
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .header {
    @include boxSize(100%);
    min-width: 1280px;
    position: absolute;
    h1 {
      float: left;
      @include distance((24px 40px));
      cursor: pointer;
      img {
        @include boxSize(241px);
      }
    }
    nav{
      float: right;
      @include distance((48px 40px 0 0));
      position: relative;
      a{
        @include fontStyle(18px, 300, #fff);
        @include distance((0 0 0 40px), (0 3px 5px));
        &.active{
          border-bottom: 2px solid #fff;
        }
      }
      span{
        @include boxSize(40px, 2px, #fff);
        position: absolute;
        left: 7%; top: 24px;
      }
    }
  }
</style>

