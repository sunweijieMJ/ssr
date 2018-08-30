<template>
  <div class="spec-params">
    <public-title :pageTitle="'规格参数'"></public-title>
    <ul>
      <li v-for="(item,index) in product_info.params" :key="index">
        <span>{{item.paramTitle}}</span>
        <span>{{item.paramValue}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {PublicTitle} from '../../../../components/mobile/business';
  import spec_params from '../../../../store/mall/spec_params.js';
  import {mapState} from 'vuex';

  export default {
    title() {
      return '规格参数';
    },
    meta() {
      return `<meta name="description" content="规格参数">
      <meta name="keywords" content="规格参数">`;
    },
    asyncData({store, route}) {
      store.registerModule('spec_params', spec_params);
      const id = route.params.id;
      return Promise.all([store.dispatch('spec_params/getProductParams', id)]);
    },
    components: {
      PublicTitle
    },
    mounted(){
      this.$store.registerModule('spec_params', spec_params, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('spec_params', spec_params);
    },
    computed: mapState({
      product_info: (store) => store.spec_params.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .spec-params {
    ul {
      background-color: #fff;
      li{
        display: flex;
        align-items: center;
        padding: 0.3rem;
        border-bottom: 0.01rem solid $borderColor;
        &:last-child{
          border-bottom: 0 none;
        }
        span{
          font-size: 0.28rem;
          line-height: 0.28rem;
          color: $themeColor;
          &:first-of-type{
            display: inline-block;
            font-size: 0.24rem;
            color: $subColor;
            width: 1.2rem;
          }
          &:last-child{
            flex: 1;
            line-height: 0.4rem;
          }
        }
      }
    }
  }
</style>
