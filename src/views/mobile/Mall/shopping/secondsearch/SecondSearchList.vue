<template>
  <div class="second-search">
    <ul @click.stop="">
      <li @click="hiddenHight">{{type === 1 ? '全部家具' : '综合排序'}}</li>
      <li :class="second_style === sindex ? 'active-color' : 'se-search-list'" v-for="(se, sindex) in second_type_list.children" :key="sindex" @click="secondChange(sindex, se.obj.name)" v-if="se && se.obj">{{se.obj.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SecondSearch',
  props: ['type', 'second_type_list'],
  data(){
    return {
      second_style: null
    };
  },
  methods: {
    secondChange(index, name){
      this.second_style = index;
      this.$emit('hiddenOverlay', name);
    },
    hiddenHight(){
      if(this.type === 1){
        this.$emit('hiddenHight', '全部家具');
      }else if(this.type === 2){
        this.$emit('hiddenHight', '综合排序');
      }
    }
  },
  watch: {
    second_type_list(){
      this.second_style = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.second-search{
  background-color: #fff;
  ul{
    padding: 0.3rem 1.15rem;
    .active-color{
      color: #0072DD;
    }
    li{
      margin-bottom: 0.56rem;
      font-size: 0.3rem;
      color: #777;
      line-height: 1;
      &:last-of-type{
        margin-bottom: 0.2rem;
      }
    }
  }
}
</style>
