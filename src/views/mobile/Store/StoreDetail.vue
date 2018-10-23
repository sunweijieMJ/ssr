<template>
  <div class="box">
    <div class="store-detail">
      <div class="head">
        <div class="title">
          <span>白玉兰广场旗舰店</span>
          <i style="font-size: 0.12rem;" class="iconfont icon-shop_ic_choose_down"></i>
        </div>
        <i style="font-size: 0.46rem;" class="iconfont icon-detail_ic_shoppingba"></i>
      </div>
      <div class="enjoin">
        <span>愉悦度 99%</span>
        <span>2345 位瓴里朋友来过</span>
      </div>
      <div class="img">
        <img src="http://originoo-1.b0.upaiyun.com/highpic/161025/RF/bji18803605.jpg!thumb" alt="">
        <div class="tag">
          
        </div>
        <div class="t-con">
          <span class="iconfont icon-tab_ic_keyboard_img"></span>
          <span>10</span>
        </div>
      </div>
      <ul>
        <li>
          <span class="ali">
            <span class="iconfont icon-shop_ic_operating_st"></span>
            <span>营业中  周一至周日 10:00-22:00</span>
            <span></span>
          </span>
          <i class="iconfont icon-shopping_next"></i>
        </li>
        <li>
          <span class="ali">
            <span class="iconfont icon-location_lb_normal"></span>
            <span>白玉兰广场 1F </span>
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
      <div class="desc">圣诞会员日 欢乐无极限</div>
      <p>圣诞会员日，与瓴里好友欢聚，共同享受愉悦的圣诞会员日。</p>
      <div class="img">
        <img src="http://originoo-1.b0.upaiyun.com/highpic/161025/RF/bji18803605.jpg!thumb" alt="">
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
    <div class="coffe">
      <div class="title">
        <span class="left">咖啡轻食</span>
        <span class="right">查看全部</span>
      </div>
      <ul>
        <li v-for="(a, index) in 5" :key="index">
          <div class="img">
            <img src="http://originoo-1.b0.upaiyun.com/highpic/161025/RF/bji18803605.jpg!thumb" alt="">
          </div>
          <a href="javascript:;">
            <i style="font-size: 0.4rem;" class="iconfont icon-shop_ic_coffee_add"></i>
          </a>
          <div class="name">冰拿铁</div>
          <div class="val">
            ￥36
          </div>
        </li>
        <span class="more">
          <span>查看</span>
          <span>更多</span>
        </span>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'storedetail',
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
    .tag{
      width: 1.16rem;
      height: 0.5rem;
      border-radius: 0.25rem;
      background-color: #000000;
      opacity: 0.5;
      color: #ffffff;
      position: absolute;
      right: 0.2rem;
      bottom: 0.55rem;
    }
    .t-con{
      position: absolute;
      font-size: 0.22rem;
      // width: 1.16rem;
      // height: 0.5rem;
      padding: 0.11rem 0.12rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-radius: 0.25rem;
      color: #ffffff;
      position: absolute;
      right: 0.2rem;
      bottom: 0.55rem;
      span{
        margin-right: 0.1rem;
        line-height: 0.22rem;
      }
    }
  }
  ul{
    margin-top: 0.2rem;
    li{
      font-size: 0.3rem;
      line-height: 0.3rem;
      columns: #222;
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
      // width: 1.4rem;
      margin-right: 0.7rem;
      text-align: center;
      .img{
        width: 100%;
        img{
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
