<template>
  <div class="joinus">
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
          <tr v-for="(td,index) in joinData.web.table" :key="index">
            <td>{{td.first}}</td>
            <td>{{td.second}}</td>
            <td>{{td.third}}</td>
          </tr>
        </tbody>
      </table>
      <div class="link">
        <span>更多职位信息可联系我们</span><a href=""> HR@lanehubinc.com</a>
      </div>
    </div>
    <div class="active">
      <span class="theme">瓴里大事记</span>
      <div v-for="(sj,index) in joinData.web.achievement" :key="index" class="box">
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
            <span>{{sj.date}}</span><a href="">{{sj.look}}</a>
          </div>
        </div>
      </div>
      <div class="link link2">
        <span>更多瓴里大事记，<a href="">下载 App</a> 了解我们吧</span>
      </div>
    </div>
    <div class="life">
      <div class="title">瓴里 Life</div>
      <div class="img">
        <img :src="joinData.web.life" alt="">
      </div>
      <div class="link link2">
        <span>更多瓴里 Life，<a href="">下载 App</a> 了解我们吧</span>
      </div>
    </div>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
import DownLoad from '../../components/web/public/DownLoad';
import LaneHubHeader from '../../components/web/public/LaneHubHeader';
import LaneHubFooter from '../../components/web/public/LaneHubFooter';
export default {
  title() {
    return 'Lanehub - 加入我们';
  },
  meta() {
    return `<meta name="description" content="Lanehub 加入我们">
    <meta name="keywords" content="joinus">`;
  },
  components: {
    LaneHubHeader, LaneHubFooter, DownLoad
  },
  computed: {
    joinData() {
      return this.$store.state.joinData;
    }
  }
};
</script>
<style lang="scss" scoped>
.joinus{
  min-width: 1280px;
}
.header{
  width: 100%;
  height: 390.5px;
  background-size: cover;
}
.join{
  width: 1157px;
  height: 178px;
  text-align: center;
  background-color: #ffffff;
  margin: auto;
  margin-top: -178px;
  span{
    font-size: 60px;
    color:#000000;
    display: inline-block;
    margin: 90px;
    letter-spacing: 3px;
  }
}

.p-tag{
  margin-top: 39.5px;
  margin-bottom: 71.5px;
  text-align: center;
  width: 100%;
  color: #000000;
  p{
    line-height: 39px;
    letter-spacing: 1.8px;
    font-size: 24px;
  }
}
table{
  box-sizing: border-box;
  margin: auto;
  tr{
    color: #000000;
    font-size: 20px;
    letter-spacing: 1.5px;
    td{
      text-indent: 14.5px;
      border: 1px solid #d5d5d5;
      width: 336px;
      height: 82px;
      text-align: left;
    }
    td:nth-child(2n){
      border-left:none;
      border-right:none; 
    }
  }
  tr:nth-child(2n+1){
    background-color: #fafafa;
  }
  tr:nth-child(2n){
    td{
      border-top: none;
      border-bottom: none;
    }
  }
}
.link{
  margin-top: 31.5px;
  font-size: 18px;
  text-align: center;
  line-height: 29px;
  letter-spacing: 1.4px;
  color: #000000;
  a{
    color: #1970ce;
    font-size: 18px;
  }
}
.active{
  width: 1125px;
  margin: auto;
  margin-top: 99.5px;
  // padding: 0 141.5px;
  text-align: center;
  img{
    width: 400px;
    height: 225px;
  }
  .theme{
    font-size: 48px;
    color: #000000;
    display: inline-block;
    margin-bottom: 69.5px;
    letter-spacing: 2.4px;
  }
  .box{
    display: flex;
    margin-top: 45px;
    .right{
      margin-left: 39px;
      text-align: left;
      .title{
        font-size: 24px;
        color: #000000;
        line-height: 47.5px;
        letter-spacing: 1.2px;
      }
      .p2{
        font-size: 18px;
        color: #777777;
        letter-spacing: 0.5px;
        p{
          line-height: 30px;
        }
      }
      .a-link{
        margin-top: 51px;
        font-size: 18px;
        letter-spacing: 0.5px;
        color: #777777;
        line-height: 47.5px;
        display: flex;
        justify-content: space-between;
        a{
          color: #1970ce;
        }
      }
    }
  }
}
.link2{
  margin-top: 70px;
}
.life{
  margin-top: 114.5px;
  width: 100%;
  text-align: center;
  .title{
    font-size: 48px;
    color: #000000;
    display: inline-block;
    margin-bottom: 71px;
    letter-spacing: 2.4px;
  }
  .img{
    width: 100%;
    img{
      width: 100%;
    }
  }
}
</style>

