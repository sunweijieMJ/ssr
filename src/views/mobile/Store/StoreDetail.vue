<template>
  <div class="box">
    <div class="store-detail">
      <div class="head">
        <div class="title" @click="goStoreList()">
          <span>{{store_detail.basic.name}}</span>
          <i style="font-size: 0.12rem;" class="iconfont icon-shop_ic_choose_down" ></i>
        </div>
        <i style="font-size: 0.46rem;" class="iconfont icon-detail_ic_shoppingba" @click.stop="intercept"></i>
      </div>
      <div class="enjoin">
        <span>愉悦度 {{store_detail.basic.joyful_value}}</span>
        <span style="margin-left: 0.16rem;">{{store_detail.basic.visit_count}} 位瓴里朋友来过</span>
      </div>
      <div class="img" @click="goStoreImg(store_detail.basic.headimgs)">
        <img v-lazy="imageSize(store_detail.basic.headimgs[0], '690x388')" alt="">
        <div class="t-con">
          <span class="iconfont icon-tab_ic_keyboard_img"></span>
          <span v-if="store_detail.basic.headimgs">{{store_detail.basic.headimgs.length}}</span>
        </div>
      </div>
      <div class="notice" v-if="store_detail.notice.desc" @click="goStoreContruct(store_detail.notice.desc, store_detail.basic.brick_id)">
        <span class="iconfont icon-shop_ic_announcement"></span>
        <span>{{store_detail.notice.desc}}</span>
      </div>
      <ul>
        <li>
          <span class="ali">
            <span class="iconfont icon-shop_ic_operating_st"></span>
            <span>{{store_detail.basic.store_status_desc}}</span>
            <span></span>
          </span>
          <!-- <i class="iconfont icon-shopping_next"></i> -->
        </li>
        <li @click="queryAssign('tools/amap',{name:store_detail.basic.list_name, desc: store_detail.basic.addr_detail})">
          <span class="ali">
            <span class="iconfont icon-location_lb_normal"></span>
            <span>{{store_detail.basic.addr_brief}}</span>
            <span></span>
          </span>
          <i style="fontSize: 0.24rem;" class="iconfont icon-shopping_next"></i>
        </li>
      </ul>
    </div>
    <div class="active" v-if="store_detail.activities.length">
      <div class="a-head">
        <div class="title">店内活动</div>
        <span class="href" @click.stop="goActicityList">查看全部</span>
      </div>

      <div v-for="(act, index) in store_detail.activities" :key="index" @click="assign('activity_detail', act.entity_id)">
        <div class="desc">{{act.entity_title.slice(4)}}</div>
        <p>{{act.entity_brief}}</p>
        <div class="img">
          <img v-lazy="act.entity_photos[0]" alt="">
          <div class="tag"></div>
          <span>活动</span>
        </div>
        <div class="footer">
          <span class="state" v-if="(act.entity_extra.enroll_num < act.entity_extra.enroll_limit) && act.entity_extra.activity_state === 3">
            活动未开始
          </span>
          <span class="state" v-if="act.entity_extra.activity_state === 4">
            活动进行中
          </span>
          <span class="state" v-if="act.entity_extra.activity_state === 5">
            活动已结束
          </span>
          <span class="btn">查看活动</span>
        </div>
      </div>
    </div>
    <div class="coffe" v-if="store_detail.menu">
      <div class="title">
        <span class="left">咖啡吧</span>
        <span class="right" @click="queryAssign('food_list', {store_id: 2, store_name: store_detail.basic.name})">查看全部</span>
      </div>
      <ul>
        <li v-for="(a, mindex) in store_detail.menu.slice(0, 8)" :key="mindex"  @click="activePopup({source: a, status: true})">
          <div class="img">
            <img v-lazy="a.basic.list_headimg" alt="">
          </div>
          <a href="javascript:;">
            <i style="font-size: 0.44rem; color: #0072dd" class="iconfont icon-shop_ic_coffee_add" @click.stop="activePopup({source: a, status: true, select: true})"></i>
          </a>
          <div class="name">{{a.basic.title}}</div>
          <div class="val">
            <i>￥</i>
            <span v-if="a.optionsMaxPrice === a.optionsMinPrice">{{a.optionsMinPrice/100}}</span>
            <span v-else>{{a.optionsMinPrice/100}}-{{a.optionsMaxPrice/100}}</span>
          </div>
        </li>
        <span class="more" v-if="store_detail.menu.length > 8" @click="queryAssign('food_list', {store_id: 2})">
          <span>查看</span>
          <span>更多</span>
        </span>
      </ul>
    </div>
    <div>
      <Recomment :recoment_list="recoment_list"></Recomment>
    </div>
    <food-popup></food-popup>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import store_info from '../../../store/store/store_detail.js';
import food_list from '../../../store/store/food_list.js';
import frequent from '../../../mixins/frequent';
import {FoodPopup} from './food/foodlist/index.js';
import wechat from '../../../mixins/wechat.js';
import imageSize from '../../../utils/filters/imageSize.js';

import Recomment from './store/Recomment';

export default {
  components: {FoodPopup, Recomment},
  name: 'StoreDetail',
  mixins: [frequent, wechat],
  data(){
    return {
      imageSize
    };
  },
  title() {
    return '瓴里体验店';
  },
  meta() {
    return `<meta name="description" content="瓴里体验店">
    <meta name="keywords" content="瓴里体验店">`;
  },
  asyncData({store, route}) {
    store.registerModule('store_info', store_info);
    store.registerModule('food_list', food_list);
    const id = route.query.store_id;
    return Promise.all([
      store.dispatch('store_info/getStoreDetail', id),
      store.dispatch('store_info/getStoreContruct', id),
      store.dispatch('store_info/getLogo', {})
    ]);
  },
  mounted() {
    this.$store.registerModule('store_info', store_info, {preserveState: true});
    this.$store.registerModule('food_list', food_list, {preserveState: true});
    this.$store.dispatch('store_info/getStoreDetail', this.$route.query.store_id);
    // 微信分享
    if(!this.store_detail) return;
    const link = window.location.href;
    const title = '瓴里体验店';
    const desc = this.store_detail.basic.name;
    const imgUrl = this.logo;
    this.wxInit(link, title, desc, imgUrl);
  },
  destroyed() {
    this.$store.unregisterModule('store_info', store_info);
  },
  computed: {
    ...mapState({
      store_detail: (store) => store.store_info.store_detail,
      recoment_list: (store) => store.store_info.recoment_list,
      logo: (store) => store.store_info.logo
    })
  },
  filters: {
    activity(num1, num2, state){
      if(num1 <= num2 && state === 3){
        return '活动未开始';
      }
      if(state === 4){
        return '活动进行中';
      }else if(state === 5){
        return '活动已结束';
      }
    }
  },
  methods: {
    goStoreContruct(desc, id){
      this.$router.push({name: 'StoreNotice', params: {id: id ? id : 2}});
    },
    activePopup(data) {
      this.$store.dispatch('food_list/cutFoodPopup', data);
    },
    goStoreList(){
      this.$router.push({name: 'StoreList'});
    },
    goStoreImg(image){
      window.localStorage.setItem('arr_img', JSON.stringify(image));
      this.$router.push({name: 'StoreImg', query: {}});
    },
    goActicityList(){
      this.assign('activity_list');
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/_base.scss';
.box{
  background-color: #fafafa;
}
.store-detail{
  background-color: #ffffff;
  padding: 0.4rem 0.3rem 0 0.3rem;
  .head{
    display: flex;
    justify-content: space-between;
    .title{
      font-size: 0.44rem;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      color: #222;
      span{
        line-height: 0.44rem;
        counter-reset: #222;
        margin-right: 0.1rem;
      }
    }
  }
  .enjoin{
    margin-top: 0.2rem;
    font-size: 0.28rem;
    padding-bottom:0.4rem;
    color: #666;
    line-height: 0.28rem;
  }
  .notice{
    margin-top: 0.26rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span{
      margin-right: 0.2rem;
      color: $linkBlue;
      font-size:0.32rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      line-height:1;
    }
    span:nth-child(2){
      font-size: 0.28rem;
    }
  }
  .img{
    width: 100%;
    position: relative;
    img{
      width: 100%;
      height: 3.88rem;
      border-radius: 0.1rem;
    }
    .t-con{
      position: absolute;
      font-size: 0.22rem;
      padding: 0.08rem 0.24rem;
      background-color: rgba(0,0,0,0.5);;
      display: flex;
      align-items: center;
      border-radius: 0.25rem;
      color: #ffffff;
      position: absolute;
      right: 0.2rem;
      bottom: 0.2rem;
      span:nth-child(1){
        margin-right: 0.1rem;
      }
    }
  }
  ul{
    margin-top: 0.26rem;
    li{
      font-size: 0.3rem;
      line-height: 0.3rem;
      color: #222;
      display: flex;
      justify-content: space-between;
      padding: 0.4rem 0;
      border-top:  1px solid #e8e8e8;
      .ali{
        display: flex;
        justify-content: flex-start;
        span{
          margin-right: 0.16rem;
        }
      }
    }
  }
}
.active{
  background-color: #ffffff;
  margin-top: 0.2rem;
  padding: 0.4rem 0.3rem;
  .a-head{
    display: flex;
    justify-content: space-between;
    .title{
      font-size: 0.44rem;
      line-height: 0.44rem;
      color: #222;
      font-weight: 400;
    }
    .href{
      font-size: 0.3rem;
      color: $linkBlue;
    }
  }
  .desc{
    margin-top: 0.4rem;
    font-size: 0.36rem;
    color: var(--greyish-brown);
    line-height: 1;
  }
  p{
    margin-top: 0.2rem;
    font-size: 0.32rem;
    line-height: 1.5;
  }
  .img{
    position: relative;
    margin-top: 0.3rem;
    img{
      height: 3.88rem;
      width: 100%;
    }
    .tag{
      position: absolute;
      right: 0;
      top: 0.4rem;
      width: 0.7rem;
      height: 0.4rem;
      opacity: 0.5;
      background-color: #000000;
    }
    span{
      position: absolute;
      right: 0.1rem;
      top: 0.46rem;
      font-size: 0.24rem;
      color: #fff;
    }
  }
  .footer{
    display: flex;
    justify-content: space-between;
    margin-top: 0.37rem;
    align-items: center;
    .btn{
      padding: 0.16rem 0.28rem;
      border-radius: 0.3rem;
      background-color: $linkBlue;
      color: #ffffff;
      font-size: 0.28rem;
      line-height: 0.28rem;
    }
  }
}
.coffe{
  padding: 0.4rem 0rem 0rem 0rem;
  margin-top: 0.2rem;
  background-color: #fff;
  .title{
    display: flex;
    justify-content: space-between;
    padding: 0 0.3rem;
    .left{
      font-size: 0.44rem;
      line-height: 0.44rem;
      color: #222;
      font-weight: 400;
    }
    .right{
      font-size: 0.3rem;
      color: $linkBlue;
    }
  }
  ul{
    width: 7.5rem;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    padding: 0.4rem 0;
    display: flex;
    justify-content: flex-start;
    &::-webkit-scrollbar {display:none}
    li{
      width: 1.4rem;
      margin-right: 0.6rem;
      text-align: center;
      font-weight: 400;
      .img{
        width: 100%;
        img{
          margin: auto;
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 0.8rem;
        }
      }
      a{
        background-color: white;
        border-radius: 0.5rem;
        position: relative;
        top: -0.4rem;
        left: 0.4rem;
      }
      .name{
        color: #222;
        font-size: 0.3rem;
        line-height: 0.3rem;
        margin-top: -0.3rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .val{
        color: #e00c00;
        margin-top: 0.16rem;
        font-size: 0.3rem;
        line-height: 0.3rem;

        i{
          font-size: 0.3rem;
          line-height: 0.3rem;
          font-style: normal;
          font-weight: 400;
        }
      }
    }
    .more{
      display: inline-block;
      width: 1.4rem;
      height: 1.12rem;
      text-align: center;
      border-radius: 0.8rem;
      background-color: #dddddd;
      padding: 0 0.42rem;
      padding-top: 0.3rem;
      color: #333;
      font-size: 0.28rem;
      span{
        line-height: 0.28rem;
        white-space: nowrap;
        &:nth-child(2){
          display: block;
          margin-top: 0.15rem;
        }
      }
    }
  }
}
</style>
