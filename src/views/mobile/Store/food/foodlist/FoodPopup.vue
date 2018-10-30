<template>
  <div class="food-popup" v-if="food_popup.status">
    <mt-popup v-model="food_popup.status" position="middle">
      <div class="image-box">
        <vue-swiper
          :images="food_popup.source.basic.headimgs.length ? food_popup.source.basic.headimgs : [food_popup.source.basic.list_headimg]"
          :type="7" :index="0">
        </vue-swiper>
        <svg class="icon" aria-hidden="true" @click.stop="$store.dispatch('food_list/cutFoodPopup', {status: false})">
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
  import {VueSwiper} from '../../../../../components/mobile/business';
  import {setTimer} from '../../../../../utils/business/tools.js';

  export default {
    components: {VueSwiper},
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
          // 阻止默认滚动
          setTimer(() => {
            this.$el.querySelector('.mint-popup').addEventListener('touchmove', (e) => {
              e.stopPropagation ? e.stopPropagation() : window.event.cancelBubble = true;
              e.preventDefault ? e.preventDefault() : window.event.returnValue = false;
            });
          });

          // 挂载组件
          if(this.food_popup.hasOwnProperty('select')) this.com = this.FoodSelect;
          else this.com = this.FoodInfo;

          if(!os().isDeskTop) {
            if(document.querySelector('.food-list')) document.querySelector('.food-list').style.position = 'fixed';
          }
        } else {
          if(!os().isDeskTop) {
            if(document.querySelector('.food-list')) document.querySelector('.food-list').style.position = 'static';
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
        svg {
          position: absolute;
          font-size: 0.54rem;
          right: 0.24rem; top: 0.15rem;
        }
      }
    }
  }
</style>
<style lang="scss">
  .food-popup {
    .mint-popup{
      z-index: 3001!important;
      .image-box {
        .wrapper {
          border-radius: 0.2rem 0.2rem 0 0;
        }
        .swiper-slide {
          border-radius: 0.2rem 0.2rem 0 0;
        }
        img {
          height: 3.8rem;
          border-radius: 0.2rem 0.2rem 0 0;
        }
      }
    }
    .v-modal{
      z-index: 3000!important;
    }
  }
</style>


