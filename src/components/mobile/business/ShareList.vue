<template>
  <div class="shart_list" v-if="list.length && list">
    <li v-for="(item,index) in list" :key="index" @click="assign('profile',item.skip_id)">
      <div class="author">
        <div class="author_icon">
          <img :src="item.photo_url || item.object_user_photo || item.user_photo_url | imageSize('165x165')" alt="">
          <img v-if="item.user_type == 2" src="../../../../static/mobile/svg/private/list_ic_v-36.svg" alt="">
          <img v-if="item.user_type == 3" src="../../../../static/mobile/svg/private/list_ic_l-36.svg" alt="">
        </div>
        <div class="author_name">
          <span>{{item.user_name || item.object_user_name}}</span>
          <span>{{item.signiture || '不需要签名'}}</span>
          <p v-if="item.fans">
            <span>粉丝 {{item.fans.funs}}</span>
            <span>动态 {{item.moment_num}}</span>
          </p>
        </div>
      </div>
      <FocusBtn></FocusBtn>
    </li>
  </div>
</template>
<script>
  import FocusBtn from './FocusBtn';
  import frequent from '../../../mixins/frequent';
  import imageSize from '../../../utils/filters/imageSize';

  export default {
    mixins: [frequent],
    props: ['list'],
    components: {
      FocusBtn
    },
    data(){
      return{
        imageSize
      };
    }
  };
</script>
<style lang="scss" scoped>

  .shart_list{
    background-color: #ffffff;
    li{
      list-style: none;
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.68rem;
      border-bottom: 1px solid #e8e8e8;
      &:last-of-type{
        border: none;
      }
      .author{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .author_icon{
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 0.2rem;
          position: relative;
          img{
            width: 100%;
            border-radius: 50%;
            &:nth-of-type(2){
              width: 0.38rem;
              position: absolute;
              right: 0;bottom: 0;
            }
          }
        }
        .author_name{
          height: 1.2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          >span{
            width: 4rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
            font-size: 0.3rem;
            line-height: 0.34rem;
            font-weight: 300;
            color: #444444;
            &:last-of-type{
              font-size: 0.24rem;
              line-height: 0.28rem;
              color: #666666;
            }
          }
          p{
            display: flex;
            align-items: center;
            >span{
              font-size: 0.24rem;
              line-height: 0.28rem;
              font-weight: 300;
              color: #777777;
              margin-right: 0.2rem;
            }
          }
        }
      }
    }
  }
</style>

