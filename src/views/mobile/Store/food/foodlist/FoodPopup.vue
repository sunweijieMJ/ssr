<template>
  <div class="food-popup" v-if="food_popup.status">
    <mt-popup v-model="food_popup.status" position="middle">
      <div class="image-box">
        <img :src="food_popup.option.basic.list_headimg" alt="">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-push_ic_delete"></use>
        </svg>
      </div>
      <component :is="com" @comToggle="comToggle"></component>
    </mt-popup>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import FoodInfo from './FoodInfo.vue';
  import FoodSelect from './FoodSelect.vue';
  import {os} from '../../../../../utils/business/judge.js';

  export default {
    data() {
      return {
        FoodInfo,
        FoodSelect,
        com: FoodSelect
      };
    },
    methods: {
      // 组件切换
      comToggle(key) {
        switch (key) {
          case 'select':
            this.com = FoodSelect;
            break;
          case 'info':
            this.com = FoodInfo;
          default:
            break;
        }
      }
    },
    computed: mapState({
      food_popup: (store) => store.food_list.food_popup
    }),
    watch: {
      // 阻止默认滚动事件
      'food_popup.status'(cur){
        if(cur){
          if(this.food_popup.hasOwnProperty('symbol')) this.com = this.FoodSelect;
          else this.com = this.FoodInfo;
          if(!os().isDeskTop) document.querySelector('.food-list').style.position = 'fixed';
        } else {
          if(!os().isDeskTop) document.querySelector('.food-list').style.position = 'static';
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .food-popup {
    .mint-popup {
      width: 6.7rem;
      height: 9rem;
      border-radius: 0.2rem;
      background-color: #fff;
      .image-box {
        position: relative;
        img {
          width: 6.7rem;
          height: 3.7rem;
          border-radius: 0.2rem 0.2rem 0 0;
        }
        svg {
          position: absolute;
          font-size: 0.54rem;
          right: 0.1rem; top: 0.24rem;
        }
      }
    }
  }
</style>


