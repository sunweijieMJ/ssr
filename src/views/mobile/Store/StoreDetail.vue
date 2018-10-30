<template>
  <div class="box">
    <div class="store-detail">
      <div class="head">
        <div class="title">
          <span>{{store_detail.basic.name}}</span>
          <i style="font-size: 0.12rem;" class="iconfont icon-shop_ic_choose_down" @click="goStoreList()"></i>
        </div>
        <i style="font-size: 0.46rem;" class="iconfont icon-detail_ic_shoppingba" @click.stop="intercept"></i>
      </div>
      <div class="enjoin">
        <span>愉悦度 {{store_detail.basic.joyful_value}}</span>
        <span style="margin-left: 0.16rem;">{{store_detail.basic.visit_count}} 位瓴里朋友来过</span>
      </div>
      <div class="img" @click="goStoreImg(store_detail.basic.headimgs)">
        <img :src="store_detail.basic.headimgs[0]" alt="">
        <div class="t-con">
          <span class="iconfont icon-tab_ic_keyboard_img"></span>
          <span v-if="store_detail.basic.headimgs">{{store_detail.basic.headimgs.length}}</span>
        </div>
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
        <li @click="queryAssign('activity_map',{address:store_detail.basic.addr_detail,latitude:store_detail.basic.latitude,longitude:store_detail.basic.longitude})">
          <span class="ali">
            <span class="iconfont icon-location_lb_normal"></span>
            <span>{{store_detail.basic.addr_brief}}</span>
            <span></span>
          </span>
          <i class="iconfont icon-shopping_next"></i>
        </li>
      </ul>
    </div>
    <div class="active">
      <div class="a-head">
        <div class="title">店内活动</div>
        <span class="href">查看全部</span>
      </div>

      <div v-for="(act, index) in store_detail.activities" :key="index" @click="assign('activity_detail', act.entity_id)">
        <div class="desc">{{act.entity_title}}</div>
        <p>{{act.entity_brief}}</p>
        <div class="img">
          <img :src="act.entity_photos[0]" alt="">
          <div class="tag"></div>
          <span>活动</span>
        </div>
        <div class="footer">
          <span class="state">
            活动进行中
          </span>
          <span class="btn">查看活动</span>
        </div>
      </div>
    </div>
    <div class="coffe">
      <div class="title">
        <span class="left">咖啡轻食</span>
        <span class="right" @click="queryAssign('food_list', {store_id: 2})">查看全部</span>
      </div>
      <ul>
        <li v-for="(a, mindex) in store_detail.menu.slice(0, 8)" :key="mindex"  @click="activePopup({source: a, status: true})">
          <div class="img">
            <img :src="a.basic.list_headimg" alt="">
            <!-- <img :src="store_detail.basic.headimgs[0]" alt=""> -->
          </div>
          <a href="javascript:;">
            <i style="font-size: 0.4rem;" class="iconfont icon-shop_ic_coffee_add" @click.stop="activePopup({source: a, status: true, select: true})"></i>
          </a>
          <div class="name">{{a.basic.title}}</div>
          <div class="val">
            ￥
            <span v-if="a.optionsMaxPrice === a.optionsMinPrice">{{a.optionsMinPrice/100}}</span>
            <span v-else>{{a.optionsMinPrice/100}}-{{a.optionsMaxPrice/100}}</span>
          </div>
        </li>
        <span class="more" v-if="store_detail.menu.length > 8">
          <span>查看</span>
          <span>更多</span>
        </span>
      </ul>
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

export default {
  components: {FoodPopup},
  name: 'StoreDetail',
  mixins: [frequent],
  data(){
    return {

    };
  },
  title() {
    return '商店单页';
  },
  meta() {
    return `<meta name="description" content="商店单页">
    <meta name="keywords" content="商店单页">`;
  },
  asyncData({store, route}) {
    store.registerModule('store_info', store_info);
    store.registerModule('food_list', food_list);
    return Promise.all([store.dispatch('store_info/getStoreDetail', {id: route.params.id ? route.params.id : 2})]);
  },
  mounted() {
    this.$store.registerModule('store_info', store_info, {preserveState: true});
    this.$store.registerModule('food_list', food_list, {preserveState: true});
  },
  destroyed() {
    this.$store.unregisterModule('store_info', store_info);
  },
  computed: {
    ...mapState({
      store_detail: (store) => store.store_info.store_detail
    })
  },
  methods: {
    activePopup(data) {
      this.$store.dispatch('food_list/cutFoodPopup', data);
    },
    goStoreList(){
      this.$router.push({name: 'StoreList'});
    },
    goStoreImg(image){
      window.localStorage.setItem('arr_img', JSON.stringify(image));
      this.$router.push({name: 'StoreImg', query: {}});
    }
  }
};
</script>
<style lang="scss" scoped>
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
    margin-top: 0.2rem;
    li{
      font-size: 0.3rem;
      line-height: 0.3rem;
      color: #222;
      display: flex;
      justify-content: space-between;
      padding: 0.4rem 0;
      border-bottom:  1px solid #e8e8e8;
      &:last-of-type{
        border-bottom: none;
      }
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
    }
    .href{
      font-size: 0.3rem;
      color: #0072dd;
    }
  }
  .desc{
    margin-top: 0.4rem;
    font-size: 0.36rem;
    color: var(--greyish-brown);
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
      background-color: #0072dd;
      color: #ffffff;
      font-size: 0.28rem;
      line-height: 0.28rem;
    }
  }
}
.coffe{
  padding: 0.4rem 0.3rem;
  margin-top: 0.2rem;
  background-color: #fff;
  .title{
    display: flex;
    justify-content: space-between;
    .left{
      font-size: 0.44rem;
      line-height: 0.44rem;
      color: #222;
    }
    .right{
      font-size: 0.3rem;
      color: #0072dd;
    }
  }
  ul{
    width: 6.9rem;
    overflow-x: scroll;
    margin-top: 0.4rem;
    display: flex;
    justify-content: flex-start;
    &::-webkit-scrollbar {display:none}
    li{
      width: 1.4rem;
      margin-right: 0.6rem;
      text-align: center;
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
