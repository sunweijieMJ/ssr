<template>
  <div class="food-popup">
    <mt-popup v-model="food_popup.status" position="middle">
      <div class="image-box">
        <img src="https://pic2.lanehub.cn/production/8b9d11d4547937b53fceb7810dafadef.jpg?x-oss-process=style/app-00011" alt="">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-push_ic_delete"></use>
        </svg>
      </div>
      <component :is="com"></component>
    </mt-popup>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import FoodInfo from './FoodInfo.vue';
  import FoodSelect from './FoodSelect.vue';

  export default {
    data() {
      return {
        FoodInfo,
        FoodSelect,
        com: FoodSelect
      };
    },
    computed: mapState({
      food_popup: (store) => store.food_list.food_popup
    }),
    watch: {
      // 阻止默认滚动事件
      'food_popup.status'(cur){
        if(cur){
          document.querySelector('.food-popup .v-modal').addEventListener('touchmove', (e) => {
            e.preventDefault ? e.preventDefault() : window.event.returnValue = false;
          }, false);
          // document.body.style.overflow = 'hidden';
          // document.documentElement.style.overflow = 'hidden';
        } else {
          document.querySelector('.food-popup .v-modal').addEventListener('touchmove', (e) => {
            e.preventDefault ? e.preventDefault() : window.event.returnValue = false;
          }, false);
          // document.body.style.overflow = 'visible';
          // document.documentElement.style.overflow = 'visible';
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


