<template>
  <div class="food-popup" v-if="food_popup.status">
    <mt-popup v-model="food_popup.status" position="middle">
      <div class="image-box">
        <img :src="food_popup.option.basic.list_headimg | imageSize('750x422')" alt="">
        <svg class="icon" aria-hidden="true" @click="$store.dispatch('food_list/cutFoodPopup', {status: false})">
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
          // 挂载组件
          if(this.food_popup.hasOwnProperty('symbol')) this.com = this.FoodSelect;
          else this.com = this.FoodInfo;

          if(!os().isDeskTop) {
            document.querySelector('.food-list').style.position = 'fixed';
            document.querySelector('.nav-list').style['overflow-y'] = 'hidden';
            document.querySelector('.menu-list').style['overflow-y'] = 'hidden';
            document.querySelector('.menu-list').style['-webkit-overflow-scrolling'] = '';
          }
        } else {
          if(!os().isDeskTop) {
            document.querySelector('.food-list').style.position = 'static';
            document.querySelector('.nav-list').style['overflow-y'] = 'auto';
            document.querySelector('.menu-list').style['overflow-y'] = 'auto';
            document.querySelector('.menu-list').style['-webkit-overflow-scrolling'] = 'touch';
          }
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .food-popup {
    .mint-popup {
      width: 6.7rem;
      height: 9.2rem;
      border-radius: 0.2rem;
      background-color: #fff;
      .image-box {
        position: relative;
        img {
          width: 6.7rem;
          height: 3.8rem;
          border-radius: 0.2rem 0.2rem 0 0;
        }
        svg {
          position: absolute;
          font-size: 0.54rem;
          right: 0.24rem; top: 0.24rem;
        }
      }
    }
  }
</style>


