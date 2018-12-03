<template>
  <div class="recomment" v-if="recoment_list.products.length">
    <div class="re-title">
      <span class="hot">本店热门</span><span @click="checkMore">查看更多</span>
    </div>
    <div class="look-people">{{recoment_list.explain}}</div>
    <div class="re-list">
      <ul class="clearfix" v-if="recoment_list">
        <li v-for="(item,index) in recoment_list.products" :key="index" @click="assign('product_detail',item.id)">
          <img :src="item.basic.list_headimg | imageSize('330x330')" alt="">
          <div class="desc">
            <span class="lanehub bigtitle" v-if="titleJudge(item.basic.flags)">LANEHUB</span>
            <span v-else class="bigtitle">{{item.basic.list_subtitle}}</span>
            <p class="desc-title">{{item.basic.list_title}}</p>
            <p class="value" :class="{gray : !finely(item.basic.flags)}">
                <i>￥</i>
                <span v-if="item.optionsMaxPrice === item.optionsMinPrice">{{item.optionsMinPrice/100}}</span>
                <span v-else>{{item.optionsMinPrice/100}}-{{item.optionsMaxPrice/100}}</span>
            </p>
            <div class="min-title" :class="{grayfine : !finely(item.basic.flags)}">
              <span v-for="(flag,index) in item.basic.flags" :key="index" v-if="flag.visible">{{flag.title}}</span>
            </div>
            <!-- <div class="min-title grayfine" v-else>
              <span v-for="(flag,index) in item.basic.flags" :key="index" v-if="flag.visible">{{flag.title}}</span>
            </div> -->
          </div>
        </li>
        <div class="clear"></div>
      </ul>
    </div>
  </div>
</template>
<script>
import imageSize from '../../../../utils/filters/imageSize.js';
import frequent from '../../../../mixins/frequent';
export default {
  name: 'Recomment',
  props: ['recoment_list'],
  mixins: [frequent],
  data(){
    return{
      imageSize
    };
  },
  methods: {
    checkMore(){
      this.$router.push({name: 'ShopList'});
    },
    titleJudge(val) {
      if(!val) return true;
      let newArr = [];
      for(let i = 0; i < val.length; i++){
        newArr.push(val[i].visible);
      }
      if(newArr.indexOf(0) !== -1){
        return true;
      }else{
        return false;
      }
    },
    finely(val){
      let newVal = [];
      for(let i = 0; i < val.length; i++){
        newVal.push(val[i].title);
      }
      if(newVal.indexOf('售罄') !== -1){
        return false;
      }else{
        return true;
      }
    },
  }

};
</script>
<style lang="scss" scoped>
@import '../../../../assets/scss/_base.scss';
.recomment{
  margin-top: 0.2rem;
  padding: 0.4rem 0.3rem 0.28rem 0.3rem;
  background-color: white;
  .re-title{
    font-size:0.28rem;
    font-family:PingFangSC-Light;
    font-weight:300;
    color:rgba(0,114,221,1);
    line-height:1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .hot{
      font-size:0.44rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:1;
    }
  }
  .look-people{
    margin-top: 0.16rem;
    font-size:0.24rem;
    font-family:PingFangSC-Light;
    font-weight:300;
    color:rgba(119,119,119,1);
    line-height:1;
  }
   ul{
    width: 6.9rem;
    height: 100%;
    padding: 0.36rem 0 0 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      width: 3.3rem;
      background-color: #ffffff;
      margin: 0 0.3rem 0.2rem 0;
      &:nth-child(2n){
        margin-right: 0;
      }
      img {
        width: 3.3rem;
        border-radius: 4px;
      }
      .desc{
        padding: 0.26rem 0rem 0 0;
        width: 2.9rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .bigtitle{
          font-size: 0.26rem;
          line-height: 0.26rem;
          font-weight: 300;
          color: $themeColor;
          
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .lanehub{
          border-radius: 2px;
          // background-color: $linkBlue;
          // color: #ffffff;
          padding: 0 0.08rem;
          font-size: 0.26rem;
          line-height: 0.26rem;
        }
        .desc-title{
          font-size: 0.28rem;
          line-height: 0.28rem;
          margin-top: 0.1rem;
          margin-bottom: 0.14rem;
          font-weight: normal;

          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;

          color: $themeColor;
        }
        .value{
          margin-bottom: 0.12rem;
        }
        span{
          font-size: 0.3rem;
          font-weight: 300;
          font-weight: 300;
          line-height: 0.3rem;
        }
        p{
          &.gray{
            i{
              color: $subColor;
            }
            span{
              color: $subColor;
            }
          }
          line-height: 0.3rem;
          span{
            color: $mallRed;
            line-height: 0.3rem;
            font-size: 0.3rem;
            font-weight: 400;
          }
          i{
            font-size: 0.24rem;
            line-height: 0.24rem;
            font-style: normal;
            color: $mallRed;
            font-weight: 400;
          }
        }
        .min-title{
          position: relative;
          line-height: 0.24rem;
          margin-bottom: 0.12rem;
          color: #4974a2;
          &.grayfine{
            span{
              color: $subColor;
            }
          }
          span{
            font-size: 0.24rem;
            font-weight: 300;
            line-height: 0.24rem;
            padding-left: 0.1rem;
            padding-right: 0.1rem;
            &:first-of-type{
              padding-left: 0;
            }
            &:before{
              content: "|";
              position: absolute;
              margin-left: -0.13rem;
            }
            &:first-of-type:before{
              content: "";
            }
          }
        }
        
      }
    }
  }
}
</style>
