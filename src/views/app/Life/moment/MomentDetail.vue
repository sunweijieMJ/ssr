<template>
  <div class="moment-detail">
    <life-style></life-style>
    <public-list :listData="list"></public-list>
  </div>
</template>
<script>
  import LifeStyle from '../../../../components/app/public/LifeStyle.vue';
  import PublicList from '../../../../components/app/public/PublicList.vue';
  import MallApi from '../../../../api/Mall.js';

  export default {
    title() {
      return '动态详情';
    },
    meta() {
      return `<meta name="description" content="动态详情">
      <meta name="keywords" content="动态详情">`;
    },
    components: {
      LifeStyle, PublicList
    },
    data() {
      return {
        id: this.$route.params.id,
        list: []
      };
    },
    created() {
      let that = this;
      this.getMomentDetail(that.id);
    },
    methods: {
      getMomentDetail(id) {
        let that = this;
        MallApi().getMomentDetail(id).then(res => {
          if(!res.state) {
            that.list.push(res);
          }
        });
      }
    }
  };
</script>

