<template>
  <div class="header">
    <div class="menu-header">
      <h1 @click="goHome" :class="logo">
        <img src="../../../../static/mobile/icon/nav_ic_logo_white_tw.png" alt="">
      </h1>
      <div class="menu-header-icon" @click="show_nav">
        <img v-show="!show_menu" src="../../../../static/mobile/icon/nav_ic_menu.png" alt="">
        <img v-show="show_menu" src="../../../../static/mobile/icon/nav_ic_close.png" alt="" style="width: 0.3rem">
      </div>
    </div>
    <div class="menu-nav">
      <p style="height:1rem;"></p>
      <a href="javascript:;" v-for="(item,index) in menu" :key="index" @click="skip(item.router)">{{item.name}}</a>
    </div>
  </div>
</template>
<script>
  import Slider from '../../../assets/js/slide';

  export default {
    data(){
      return {
        menu: [
          {
            name: '首页',
            router: 'Home'
          },
          {
            name: '关于我们',
            router: 'AboutUs'
          },
          {
            name: '瓴里产品',
            router: 'LaneHubProduct'
          },
          {
            name: '商业合作',
            router: 'Partners'
          },
          {
            name: '加入我们',
            router: 'JoinUs'
          },
          {
            name: 'App 下载',
            router: 'LaneHubApp'
          }
        ],
        show_menu: false,
        logo: 'menu-header-logo-in',
        icon_one: 'menu-header-icon-one-out',
        icon_two: 'menu-header-icon-two-out',
        icon_three: 'menu-header-icon-three-out'
      };
    },
    methods: {
      show_nav(){
        if(this.hasClass(document.querySelector('.menu-header>h1'), 'menu-header-logo-out')) {
          this.show_menu = false;
          document.querySelector('.header').style.height = '0.96rem';
          this.logoIn();
          this.navOut();
        } else {
          this.show_menu = true;
          let screenH = window.screen.height;
          document.querySelector('#app').style.height = screenH + 'px';
          document.querySelector('.header').style.height = '100%';
          this.logoOut();
          this.navIn();
        }
      },
      hasClass(obj, cls){
        // 获取 class 内容
        let obj_class = obj.className;
        // 通过split空字符将cls转换成数组
        let obj_class_lst = obj_class.split(/\s+/);
        let x = 0;
        for(x in obj_class_lst) {
          // 循环数组, 判断是否包含cls
          if(obj_class_lst[x] === cls) {
            return true;
          }
        }
        return false;
      },
      logoIn(){
        this.logo = 'menu-header-logo-in';
      },
      logoOut(){
        this.logo = 'menu-header-logo-out';
      },
      navIn(){
        if(document){
          Slider.slideDown(document.querySelector('.menu-nav'), 400);
          Slider.slideDown(document.querySelector('.menu-nav p'), 400);
        }
      },
      navOut(){
        if(document){
          Slider.slideUp(document.querySelector('.menu-nav'), 400);
          Slider.slideUp(document.querySelector('.menu-nav p'), 400);
        }
      },
      skip(name){
        this.show_nav();
        if(name === 'LaneHubApp'){
          this.download();
          return;
        }
        this.$router.push({name});
      },
      goHome(){
        this.$router.push({name: 'Home'});
      },
      download(){
        let u = window.navigator.userAgent;
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
          window.location.href = 'https://download.lanehub.cn/android';
        } else if(u.indexOf('iPhone') > -1){
          window.location.href = 'https://itunes.apple.com/cn/app/id1319173852?mt=8';
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .header {
    box-sizing: border-box;
    @include boxSize(100%, 0.96rem, rgba(000,000,000,0.4));
    position:fixed;
    top:0;
    @include distance(0, (0 0.4rem));
    z-index: 3000;
    .menu-header {
      @include boxSize(100%, 0.96rem);
      @include flex(row, space-between);
      h1 {
        img {
          @include boxSize(1.6rem);
        }
      }
      .menu-header-icon {
        img {
          @include boxSize(0.43rem);
        }
      }
    }
    /*展开菜单动画*/
    .menu-nav {
      display:none;
      @include boxSize(100%, auto, rgba(0,0,0,1));
      position: absolute;
      left: 0;top: 0.96rem;
      overflow: hidden;
    }
    .menu-nav a {
      display: block;
      position: relative;
      width: 80%;
      @include fontStyle(0.4rem, 100, #fff);
      font-family: Helvetica;
      line-height: 1rem;
      margin-left: 10%;
    }
    .menu-nav a::after{
        content:"";
        position:absolute;
        left:0;bottom:0;
        width:100%;
        height:1px;
        background-color:rgba(255,255,255,0.3);

        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-name:slideInBorder;
        animation-name:slideInBorder;
    }
    .menu-nav a:nth-child(1)::after{
        -webkit-animation-delay:0s;
    }
    .menu-nav a:nth-child(2)::after{
        -webkit-animation-delay:0.1s;
    }
    .menu-nav a:nth-child(3)::after{
        -webkit-animation-delay:0.2s;
    }
    .menu-nav a:nth-child(4)::after{
        -webkit-animation-delay:0.3s;
    }
    .menu-nav a:nth-child(5)::after{
        -webkit-animation-delay:0.4s;
    }
    .menu-nav a:nth-child(6)::after{
        -webkit-animation-delay:0.5s;
    }
    .menu-nav a:nth-child(7)::after{
        -webkit-animation-delay:0.6s;
    }
  }

  /* logo入场动画 */
  @keyframes in-logo{
    0%{
      -webkit-transform:translateX(-2.5rem);
    }
    100%{
      -webkit-transform:translateX(0);
    }
  }

  /* logo出场动画 */
  @keyframes out-logo{
    0%{
      -webkit-transform:translateX(0);
    }
    100%{
      -webkit-transform:translateX(-2.5rem);
    }
  }

  /*菜单线条入场动画*/
  @-webkit-keyframes slideInBorder {
    0%{
      -webkit-transform: translate(52%, -24px) scaleY(0.07) rotate(90deg);
      transform: translate(52%, -24px) scaleY(0.07) rotate(90deg);
    }
    100%{
      -webkit-transform: translate(0, 0) scaleY(1) rotate(0deg);
      transform: translate(0, 0) scaleY(1) rotate(0deg);
    }
  }

  .menu-header-logo-in{
    -webkit-animation-name:in-logo;
    -webkit-animation-duration:0.5s;
    -webkit-animation-fill-mode:forwards;
  }
  .menu-header-logo-out{
    -webkit-animation-name:out-logo;
    -webkit-animation-duration:0.5s;
    -webkit-animation-fill-mode:forwards;
  }
</style>

