<template>
  <div class="rules">
    <div class="details">
      <div class="title">
        <h3>活动详情</h3>
        <p>查看全部<img src="../../../../../../static/mobile/svg/common/shopping_next.svg" alt=""></p>
      </div>
      <div class="content" v-if="activity_info">
        <p v-html="activity_info.entity_extra.activity_detail_brief.replace(/\r|\n/g, '<br>')"></p>
      </div>
    </div>
    <div class="prompt">
      <div class="title">
        <h3>温馨提示</h3>
        <p>查看全部<img src="../../../../../../static/mobile/svg/common/shopping_next.svg" alt=""></p>
      </div>
      <div class="content" v-if="activity_info">
        <li v-for="(val, index) in activity_info.entity_extra.reminder" :key="index">
          <span>{{index+1}}.&nbsp;</span>
          <p>{{val}}</p>
        </li>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    computed: mapState({
      activity_info: (store) => store.activity_detail.activity_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .rules{
    margin-bottom: 0.2rem;
    .details{
      padding: 0.3rem;
      background-color: #ffffff;
      margin-bottom: 0.2rem;
      .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.2rem;
        h3{
          font-size: 0.32rem;
          font-weight: 300;
          color: $themeColor;
        }
        p{
          display: flex;
          align-items: center;
          font-size: 0.24rem;
          font-weight: 300;
          color: $subColor;
        }
        img{
          width: 0.12rem;
          margin-left: 0.2rem;
        }
      }
      .content{
        max-height: 2.94rem;
        overflow: hidden;
        p{
          font-size: 0.28rem;
          line-height: 0.42rem;
          font-weight: 300;
          color: $subColor;
        }
      }
    }
    .prompt{
      padding: 0.3rem 0.3rem 0.4rem;
      background-color: #ffffff;
      margin-bottom: 0.2rem;
      .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.2rem;
        h3{
          font-size: 0.32rem;
          font-weight: 300;
          color: $themeColor;
        }
        p{
          display: flex;
          align-items: center;
          font-size: 0.24rem;
          font-weight: 300;
          color: $subColor;
        }
        img{
          width: 0.12rem;
          margin-left: 0.2rem;
        }
      }
      .content{
        max-height: 3.78rem;
        overflow: hidden;
        li{
          list-style: none;
          display: flex;
          span{
            font-size: 0.28rem;
            line-height: 0.42rem;
            font-weight: 300;
          }
          p{
            font-size: 0.28rem;
            line-height: 0.42rem;
            font-weight: 300;
            color: $subColor;
          }
        }
      }
    }
    .service{
      padding: 0 0.3rem;
      background-color: #fff;
      height: 1.32rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .author{
        display: flex;
        align-items: center;
        .author-icon{
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          position: relative;
          img{
            width: 100%;
            &:last-child{
              position: absolute;
              right: 0; bottom: -0.1rem;
              width: 0.3rem;
            }
          }
        }
        p{
          font-size: 0.3rem;
          font-weight: 300;
          color: $themeColor;
          margin-left: 0.2rem;
        }
      }
      >img{
        width: 0.12rem;
        margin-left: 0.2rem;
      }
    }
  }
</style>
