<template>
  <div class="country-code">
    <PublicTitle :pageTitle="'选择国家或地区'" v-if="!(response.__platform === 'app' || isTencent)"></PublicTitle>
    <div class="code-list">
      <ul class="list">
        <h3 class="list-title" :style="{top: (response.__platform === 'app' || isTencent) ? '0rem' : '0.89rem'}">热门</h3>
        <li v-for="(item, index) in code_list.hot_list" :key="index" @click="chooseCode(item)">
          <span>{{item.countyname}}</span>
          <span>+{{item.countynum}}</span>
        </li>
      </ul>
      <ul class="list" v-for="(item, index) in code_list.list" :key="index">
        <h3 class="list-title" :style="{top: (response.__platform === 'app' || isTencent) ? '0rem' : '0.89rem'}">{{index}}</h3>
        <li v-for="(val, i) in item" :key="i" @click="chooseCode(val)">
          <span>{{val.countyname}}</span>
          <span>+{{val.countynum}}</span>
        </li>
      </ul>
    </div>
    <div class="code-nav">
      <span @click.stop="setScrollTop('热门')">热门</span>
      <span v-for="(val, i) in code_list.list" :key="i" @click.stop="setScrollTop(i)">{{i}}</span>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {os} from '../../../utils/business/judge.js';
  import {parseUrl} from '../../../utils/business/tools.js';
  import country_code from '../../../store/tools/country_code.js';
  import {PublicTitle} from '../../../components/mobile/business';
  let prev_page = '';

  export default {
    title() {
      return '选择国家或地区';
    },
    meta() {
      return `<meta name="description" content="选择国家或地区">
              <meta name="keywords" content="选择国家或地区">`;
    },
    beforeRouteEnter(to, from, next) {
      prev_page = from.name;
      next();
    },
    asyncData({store}) {
      store.registerModule('country_code', country_code);
      return Promise.all([store.dispatch('country_code/getCountryCode')]);
    },
    components: {PublicTitle},
    data() {
      return {
        response: {},
        isTencent: false,
        list_nav: new Map()
      };
    },
    mounted() {
      let that = this;
      that.response = parseUrl();
      that.isTencent = os().isWechat || os().isQQ;
      that.offsetCalc();
      that.$store.registerModule('country_code', country_code, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('country_code', country_code);
    },
    methods: {
      // 计算偏移量
      offsetCalc(){
        let that = this;
        let title = 0;
        if(document.querySelector('.public-title')) {
          title = document.querySelector('.public-title').offsetHeight;
        }

        const nameArr = Object.keys(this.code_list.list);
        nameArr.unshift('热门');

        for(let i = 0, LEN = that.$el.querySelectorAll('.list').length; i < LEN; i++) {
          that.list_nav.set(nameArr[i], that.$el.querySelectorAll('.list')[i].offsetTop - title);
        }
      },
      // 设置scrollTop值
      setScrollTop(index) {
        let that = this;
        window.pageYOffset = that.list_nav.get(index);
        document.documentElement.scrollTop = that.list_nav.get(index);
        document.body.scrollTop = that.list_nav.get(index);
      },
      // 选择国家码
      chooseCode(data) {
        this.$router.push({name: prev_page, query: {country: JSON.stringify(data)}});
      }
    },
    computed: mapState({
      code_list: (store) => store.country_code.code_list
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .country-code {
    background-color: #fff;
    .code-list {
      width: 100%;
      .list-title {
        position:sticky;
        height: 0.52rem;
        padding: 0 0.3rem;
        font-size: 0.24rem;
        font-weight: 400;
        line-height: 0.52rem;
        color: $subColor;
        background-color: $intervalColor;
      }
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.88rem;
        padding-right: 0.2rem;
        margin: 0 0.6rem 0 0.3rem;
        border-bottom: 0.01rem solid $borderColor;
        &:last-child {
          border-bottom: none;
        }
        span {
          font-size: 0.3rem;
          color: $themeColor;
        }
      }
    }
    .code-nav {
      position: fixed;
      top: 2.5rem;right: 0;
      z-index: 3000;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 0.6rem;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 0.3rem;
        font-size: 0.12rem;
        font-weight: 400;
        color: $darkBlue;
      }
    }
  }
</style>
