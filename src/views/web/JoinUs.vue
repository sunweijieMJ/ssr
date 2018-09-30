<template>
  <div class="joinus website">
    <div class="header" v-if="joinData.web.banner" :style="{backgroundImage:`url(${joinData.web.banner})`}">
      <LaneHubHeader></LaneHubHeader>
    </div>
    <div class="join">
      <span>加入我们</span>
    </div>
    <div class="p-tag">
      <p v-for="(p,index) in joinData.web.content" :key="index">{{p}}</p>
    </div>
    <div>
      <table cellspacing="0">
        <tbody>
          <tr v-for="(td,index) in joinData.web.table1" :key="index">
            <td @click="openLink(td.first.link)">{{td.first.name}}</td>
            <td @click="openLink(td.second.link)">{{td.second.name}}</td>
            <td @click="openLink(td.third.link)">{{td.third.name}}</td>
          </tr>
        </tbody>
      </table>
      <div class="link">
        <span>更多职位信息可联系我们</span><a href="mailto:wangbaotong@lanehubinc.com"> wangbaotong@lanehubinc.com</a>
      </div>
    </div>
    <div class="active">
      <span class="theme">瓴里大事记</span>
      <div v-for="(sj,index) in joinData.web.achievement" :key="index" class="box" @click="superLink(sj)">
        <div class="left">
          <img :src="sj.img" alt="">
        </div>
        <div class="right">
          <div class="title">{{sj.title}}</div>
          <div class="p2">
            <p>{{sj.desc_01}}</p>
            <p>{{sj.desc_02}}</p>
          </div>
          <div class="a-link">
            <span class="date">{{sj.date}}</span>
            <a target="_blank" :href="sj.link">{{sj.look}}</a>
          </div>
        </div>
      </div>
      <div class="link link2">
        <span>更多瓴里大事记，<a href="#bottom">下载 App</a> 了解我们吧</span>
      </div>
    </div>
    <div class="life">
      <div class="title">瓴里 Life</div>
      <div class="img">
        <img :src="joinData.web.life" alt="">
      </div>
      <div class="link link2" id="bottom">
        <span>更多瓴里 Life，<a href="#bottom">下载 App</a> 了解我们吧</span>
      </div>
    </div>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import {LaneHubHeader, DownLoad, LaneHubFooter} from '../../components/web/public';
  import joinData from '../../store/official/joinData.js';

  export default {
    title() {
      return 'Lanehub - 加入我们';
    },
    meta() {
      return `<meta name="description" content="Lanehub 加入我们">
      <meta name="keywords" content="joinus">`;
    },
    asyncData({store}) {
      store.registerModule('joinData', joinData);
    },
    mounted() {
      this.$store.registerModule('joinData', joinData);
    },
    components: {
      LaneHubHeader, LaneHubFooter, DownLoad
    },
    methods: {
      superLink(val) {
        let ref = val.link;
        window.open(ref);
      },
      openLink(val) {
        let super_link = val;
        if(super_link !== ''){
          window.open(super_link);
        }
      }
    },
    computed: {
      joinData() {
        return this.$store.state.joinData;
      }
    },
    destroyed() {
      this.$store.unregisterModule('joinData', joinData);
    }
  };
</script>
<style lang="scss" scoped>
  @import './joinus.scss';
</style>

