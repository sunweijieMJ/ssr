<template>
  <div class="second-search">
    <ul @click.stop="">
      <li @click="hiddenHight" :class="second_style === null ? 'active-color' : 'se-search-list'">
        <span>
          全部商品
        </span>
        <span :class="second_style === null ? 'iconfont icon-select' : 'iconfont icon-select_ic_shopping_c1'"></span>
      </li>
      <li :class="second_style === sindex ? 'active-color' : 'se-search-list'" v-for="(se, sindex) in second_type_list.children" :key="sindex" @click="secondChange(sindex, se.obj.name, se.obj.id)" v-if="se && se.obj">
        <span>{{se.obj.name}}</span>
        <span :class="second_style === sindex ? 'iconfont icon-select' : 'iconfont icon-select_ic_shopping_c1'"></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SecondSearch',
  props: ['second_type_list'],
  data(){
    return {
      second_style: null
    };
  },
  methods: {
    secondChange(index, name, categray_id){
      this.second_style = index;
      this.$emit('hiddenOverlay', name, categray_id);
    },
    hiddenHight(){
      this.second_style = null;
      this.$emit('hiddenHight', ' 全部商品 ', null);
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
  width: 6.9rem;
  background-color: #fff;
  border-radius: 0.24rem;
  margin: 2.74rem auto auto auto;
  ul{
    padding: 0.7rem 0.4rem;
    .active-color{
      color: #0072DD;
    }
    li{
      margin-bottom: 0.56rem;
      font-size: 0.3rem;
      color: #777;
      line-height: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:last-of-type{
        margin-bottom: 0.2rem;
      }
    }
  }
}
</style>
