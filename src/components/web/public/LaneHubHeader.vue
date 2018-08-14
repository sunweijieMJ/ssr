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
          router: 'Home'
        },
        {
          title: '关于我们',
          router: 'AboutUs'
        },
        {
          title: '瓴里产品',
          router: 'LaneHubProduct'
        },
        {
          title: '商业合作',
          router: 'Partners'
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
      this.$router.push({name: 'index'});
    }
  }
};
</script>
<style lang="scss" scoped>
  .header{
    width: 100%;
    min-width: 1280px;
    position: absolute;
    h1{
      margin: 24px 40px;
      float: left;
      cursor: pointer;
      img{
        width: 241px;
        display: block;
      }
    }
    nav{
      float: right;
      margin: 48px 40px 0 0;
      position: relative;
      a{
        font-size: 18px;
        font-weight: 300;
        line-height: 18px;
        text-align: center;
        color: #ffffff;
        padding: 0 3px 5px;
        margin-left: 40px;
        &.active{
          border-bottom: 2px solid #ffffff;
        }
      }
      span{
        position: absolute;
        left: 7%; top: 24px;
        width: 40px;
        height: 2px;
        background-color: #ffffff;
      }
    }
  }
</style>

