<template>
  <div class="life-nav">
    <LifeStyle></LifeStyle>
    <div class="nav-box">
      <div class="nav-tab" :style="{position: tab_style}">
        <a href="javascript:;"
          v-for="(item, index) in tab" :key="index"
          :class="{active:activeTab.router==item.router}"
          :style="{left:item.left + 'rem'}"
          @click="chooseTab(item)"
        >{{item.title}}</a>
        <span :style="{left:(+activeTab.left + 'rem')}"></span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import LifeStyle from '../../../components/mobile/business/LifeStyle.vue';

  export default {
    components: {
      LifeStyle
    },
    data(){
      return {
        tab_style: 'relative',
        tab: [
          {
            title: '精选',
            router: 'Choiceness',
            left: '0.4'
          },
          {
            title: '动态',
            router: 'Moment',
            left: '1.6'
          }
        ],
        activeTab: {
          title: '精选',
          left: '0.4', // ETC 下划线位置
          router: 'Choiceness' // ETC 默认路由
        },
        timeout: 0,
        distance: { // ETC 滚动距离
          Choiceness: 0,
          Moment: 0
        }
      };
    },
    activated(){
      let that = this;
      that.tab_style = 'relative';
      that.wxInit();
    },
    mounted(){
      let that = this;
      JSON.parse(window.sessionStorage.getItem('Life_TopBar')) ? that.activeTab = JSON.parse(window.sessionStorage.getItem('Life_TopBar')) : '';
      that.$router.push({name: that.activeTab.router});

      // 绑定监听
      window.addEventListener('scroll', that.debounce(that.listenScroll, that.timeout, true), false);
      window.addEventListener('scroll', that.throttle(that.listenScroll, that.timeout, 1000), false);
    },
    methods: {
      chooseTab(item){
        let that = this;
        window.sessionStorage.setItem('Life_TopBar', JSON.stringify(item));
        that.activeTab = item;
        that.$router.push({name: item.router});
      },
      listenScroll(){
        let that = this;
        if(document.querySelector('.nav-tab')){
          // 盒子偏移量
          let offsetTop = document.querySelector('.nav-box').offsetTop;
          // 元素顶端到可见区域顶端的距离
          let top = Math.floor(document.querySelector('.nav-tab').getBoundingClientRect().top);
          // 滚动距离
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
          that.saveScroll(scrollTop);

          scrollTop > offsetTop ? that.timeout = 500 : that.timeout = 0;
          top <= 0 && scrollTop >= offsetTop ? that.tab_style = 'fixed' : that.tab_style = 'relative';
        }
      },
      // 防抖动函数
      debounce(func, wait, immediate) {
        let timer;
        return () => {
          let that = this, args = arguments;
          let later = () => {
            timer = null;
            if (!immediate) func.apply(that, args);
          };
          let callNow = immediate && !timer;
          clearTimeout(timer);
          timer = setTimeout(later, wait);
          if (callNow) func.apply(that, args);
        };
      },
      // 节流函数
      throttle(func, wait, mustRun) {
        let timer, startTime = new Date();
        return () => {
          const curTime = new Date();

          clearTimeout(timer);
          // 如果达到了规定的触发时间间隔,触发 handler
          if (curTime - startTime >= mustRun) {
            func.apply(this, arguments);
            startTime = curTime;
          // 没达到触发间隔,重新设定定时器
          } else {
            timer = setTimeout(func, wait);
          }
        };
      },
      saveScroll(scrollTop){
        let that = this;
        let current_route = that.$route.name;
        switch (current_route) {
          case 'Choiceness':
            that.distance.Choiceness = scrollTop;
            break;
          case 'Moment':
            that.distance.Moment = scrollTop;
            break;
          default:
            break;
        }
        // 保存滚动距离
        window.sessionStorage.setItem('scrollDistance', JSON.stringify(that.distance));
      }
    },
    watch: {
      '$route'(cur){
        let that = this;
        that.tab.forEach((item) => {
          if(item.router === cur.name) that.activeTab = item;
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .life-nav{
    background-color: $intervalColor;
    .nav-box{
      position: relative;
      width: 100%;
      height: 0.88rem;
      .nav-tab{
        position: fixed;
        top: 0;
        z-index: 2000;
        width: 6.8rem;
        height: 0.88rem;
        padding: 0 0.3rem 0 0.4rem;
        border-bottom: 0.01rem solid #e5e5e5;
        background: #ffffff;
        a{
          position: absolute;
          top: 0;
          float: left;
          font-size: 0.36rem;
          font-weight: 300;
          line-height: 0.88rem;
          letter-spacing: 0.2px;
          text-align: center;
          color: $subColor;
          margin-right: 0.6rem;
          &.active{
            font-weight: 400;
            color: $darkBlue;
          }
        }
        span{
          transition: all 0.3s;
          position: absolute;
          bottom: -0.02rem;
          width: 0.72rem;
          height: 0.03rem;
          border-radius: 2px;
          background-color: $darkBlue;
        }
      }
    }
  }
</style>
