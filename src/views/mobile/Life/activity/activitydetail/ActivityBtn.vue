<template>
  <div class="apply lh-footer" v-if="activity_info" @click="intercept">
    <template v-if="activity_info.entity_extra.enroll_limit <= activity_info.entity_extra.enroll_num">
      <a href="javascript:;">报名已结束</a>
    </template>
    <template v-else>
      <template v-if="activity_info.entity_extra.activity_state === 3 || activity_info.entity_extra.activity_state === 4 || activity_info.entity_extra.activity_state === 5">
        <a href="javascript:;" v-if="activity_info.entity_extra.activity_state === 3" class="active">立即报名</a>
        <a href="javascript:;" v-if="activity_info.entity_extra.activity_state === 4">报名已结束</a>
        <a href="javascript:;" v-if="activity_info.entity_extra.activity_state === 5">活动已结束</a>
      </template>
      <template v-else>
        <a href="javascript:;" v-if="activity_info.entity_extra.activity_enroll_state === 0">报名未开始</a>
        <a href="javascript:;" v-if="activity_info.entity_extra.activity_enroll_state === 1" class="active">立即报名</a>
        <a href="javascript:;" v-if="activity_info.entity_extra.activity_enroll_state === 2">报名已结束</a>
      </template>
    </template>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../../mixins/frequent.js';

  export default {
    mixins: [frequent],
    computed: mapState({
      activity_info: (store) => store.activity_detail.activity_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .apply{
    display: flex;
    align-items: center;
    padding: 0 0.3rem;
    width: 100%;
    height: 1.08rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    a{
      display: block;
      width: 6.90rem;
      height: 0.8rem;
      border-radius: 0.4rem;
      background-color: #ccc;
      font-size: 0.32rem;
      font-weight: 300;
      line-height: 0.8rem;
      letter-spacing: 0.6px;
      text-align: center;
      color: #fff;
      &.active{
        background-color: $darkBlue;
      }
    }
  }
</style>

