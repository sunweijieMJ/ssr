<template>
  <mt-popup v-model="getGuidePopup" position="middle">
    <div class="mask" @click="editGuide">
      <div class="guide">
        <i class="iconfont icon-download_ic_arrow"></i>
        <div class="guide-text">
          <p>点击右上角<i class="iconfont icon-download_ic_operatio"></i></p>
          <p>选择在 Safari 中打开</p>
        </div>
      </div>
      <div class="circle">
        <img src="../../../../static/mobile/img/download_ic_share-display.png" alt="">
      </div>
    </div>
  </mt-popup>
</template>
<script>
  import {mapGetters} from 'vuex';

  export default {
    mounted() {
      document.querySelector('.mint-popup .mask').addEventListener('touchmove', (e) => {
        e.preventDefault ? e.preventDefault() : window.event.returnValue = false;
      }, false);
    },
    methods: {
      editGuide(){
        this.$store.dispatch('setGuidePopup', false);
      }
    },
    computed: {
      ...mapGetters(['getGuidePopup']),
      getGuidePopup: {
        // 获取计算属性值
        get(){
          return this.$store.getters.getGuidePopup;
        },
        // 修改计算属性值
        set(val){
          this.$store.dispatch('setGuidePopup', val);
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .mint-popup{
    width: 100%;
    height: 100%;
    z-index: 3200!important;
    background-color: rgba(0,0,0,0.5);
    .mask{
      position: absolute;
      width: 100%;
      height: 100%;
      .guide{
        text-align: right;
        >i{
          position: absolute;
          top: 0.1rem;right: 0;
          font-size: 2.2rem;
          color: #fff;
        }
        .guide-text{
          margin-top: 1.6rem;
          p {
            margin-bottom: 0.2rem;
            font-size: 0.36rem;
            color: #fff;
            text-align: center;
          }
          i {
            font-size: 0.2rem;
          }
        }
      }
      .circle{
        position: fixed;
        bottom: 0;
        img{
          width: 100%;
        }
      }
    }
  }
</style>
