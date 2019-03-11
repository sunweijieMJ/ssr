<template>
  <div class="second-search">
    <ul @click.stop="">
      <li :class="second_style === sindex ? 'active-color' : 'se-search-list'" v-for="(se, sindex) in searchlist" :key="sindex" @click="secondChange(sindex, se.name)">{{se.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SecondSearch',
  data(){
    return {
      searchlist: [
        {
          name: '全部沙发'
        },
        {
          name: '椅子'
        },
        {
          name: '捉鸡'
        },
        {
          name: '椅子'
        }
      ],
      second_style: 0
    };
  },
  methods: {
    secondChange(index, name){
      this.second_style = index;
      this.$emit('hiddenOverlay', name);
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
