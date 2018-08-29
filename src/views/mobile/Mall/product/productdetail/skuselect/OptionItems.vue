<template>
  <div class="colorItem">
    <div class="title">{{optionTitle}}</div>
    <div class="content">
      <span
        v-for="(item,index) in optionType" :key="index"
        :class="{disabled: item.state === 2 && optionTitle !== currentTitle, active: item.state === 1}"
        @click="optionItemClick(optionTitle, item)"
      >{{item.type}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['optionType', 'optionTitle', 'currentTitle'],
    methods: {
      optionItemClick(title, item){
        this.$emit('to-parent', title, item);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../../assets/scss/_base.scss';

  .colorItem{
    padding: 0 0.3rem;
    .title{
      font-size: 0.24rem;
      font-weight: 300;
      color: $subColor;
    }
    .content{
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0.2rem 0;
      span{
        padding: 0.1rem 0.3rem;
        margin: 0 0.3rem 0.2rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.3rem;
        border: solid 1px #b9b9b9;
        font-size: 0.28rem;
        font-weight: 300;
        color: $themeColor;
        &:last-child{
          margin-right: 0;
        }
        &.active{
          border-color: $darkBlue;
          color: $darkBlue;
        }
        &.disabled{
          border: 1px solid #eeeeee;
          color: #b6b6b6;
        }
      }
    }
  }
</style>
