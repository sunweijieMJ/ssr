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
      window.addEventListener('scroll', that.throttle(that.listenScroll, that.timeout), false);
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

          scrollTop > offsetTop ? that.timeout = 500 : that.timeout = 0;
          top <= 0 && scrollTop >= offsetTop ? that.tab_style = 'fixed' : that.tab_style = 'relative';
        }
      },
      // 防抖动函数
      debounce(func, delay, immediate){
        let timer = null;
        return () => {
          let [that, args] = [this, arguments];
          if(timer) clearTimeout(timer);
          if(immediate){
            // 根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
            const doNow = !timer;
            // 每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
            timer = setTimeout(() => {
              timer = null;
            }, delay);
            // 立即执行
            if(doNow){
              func.apply(that, args);
            }
          } else {
            timer = setTimeout(() => {
              func.apply(that, args);
            }, delay);
          }
        };
      },
      // 节流函数
      throttle(func, delay) {
        let [timer, startTime] = [null, Date.now()];

        return () => {
          let [that, args, curTime] = [this, arguments, Date.now()];
          const remaining = delay - (curTime - startTime);

          clearTimeout(timer);
          if(remaining <= 0){
            func.apply(that, args);
            startTime = Date.now();
          } else {
            timer = setTimeout(func, remaining);
          }
        };
      }
    },
    watch: {
      '$route'(cur){
        let that = this;
        for(let i = 0, LEN = that.tab.length; i < LEN; i++){
          if(that.tab[i].router === cur.name) that.activeTab = that.tab[i];
        }
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
