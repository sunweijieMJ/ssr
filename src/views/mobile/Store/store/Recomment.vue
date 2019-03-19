<template>
  <div class="recomment" v-if="recoment_list.products.length">
    <div class="title">
      <div class="re-title">
        <span class="hot">本店热门</span><span @click="assign('mall')">查看更多</span>
      </div>
      <div class="look-people">{{recoment_list.explain}}</div>
    </div>
    <div class="re-list" v-if="recoment_list">
      <ShopList2 :shopList="recoment_list.products"></ShopList2>
    </div>
  </div>
</template>
<script>
import imageSize from '../../../../utils/filters/imageSize.js';
import frequent from '../../../../mixins/frequent';
import ShopList2 from '../../../../components/mobile/business/ShopList';
export default {
  name: 'Recomment',
  props: ['recoment_list'],
  mixins: [frequent],
  components: {
    ShopList2
  },
  data(){
    return{
      imageSize
    };
  },
  methods: {
    checkMore(){
      this.$router.push({name: 'ShopList'});
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/scss/_base.scss';
.recomment{
  margin-top: 0.2rem;
  background-color: white;
  .title {
    padding: 0.4rem 0.3rem 0.1rem;
    .re-title{
      font-size:0.28rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color: $darkBlue;
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
  }
}
</style>
