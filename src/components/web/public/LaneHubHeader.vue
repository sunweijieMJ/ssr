<template>
  <div class="header">
    <h1 @click="chooseTab('home')">
      <i class="iconfont icon-nav_ic_logo"></i>
    </h1>
    <nav>
      <a href="javascript:;" v-for="(item,index) in tab" :key="index" @click="chooseTab(item.router)" :class="{active:activeTab===item.router}">{{item.title}}</a>
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
        },
        {
          title: '加入我们',
          router: 'joinus'
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
      i {
        font-size: 70px;
        font-weight: 300;
        color: #fff;
      }
    }
    nav{
      float: right;
      @include distance((48px 40px 0 0));
      a{
        @include fontStyle(18px, 300, #fff);
        @include distance((0 0 0 40px), (0 3px 5px));
        &.active{
          border-bottom: 2px solid #fff;
        }
      }
    }
  }
</style>

