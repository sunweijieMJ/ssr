<template>
  <section class="menu-list">
    <ul class="kind-list">
      <li v-for="(item, index) in food" :key="index">
        <h4>{{item.title}}</h4>
        <ul class="food-list">
          <li v-for="(val, i) in item.content" :key="i">
            <img src="https://pic2.lanehub.cn/production/8b9d11d4547937b53fceb7810dafadef.jpg?x-oss-process=style/app-00011" alt="">
            <div class="food-info">
              <h5>{{val}}</h5>
              <div class="info-price">
                <p>
                  <i>¥</i>
                  <span>36</span>
                </p>
                <span>
                  <i class="iconfont icon-shopping_ic_number_a"></i>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        food: [
          {
            title: '咖啡',
            content: ['冰拿铁', '冰香草拿铁', '冷萃咖啡', '热巧克力', '焦糖玛奇朵', '卡布奇诺', '摩卡']
          },
          {
            title: '鲜榨果蔬汁',
            content: ['冰拿铁', '冰香草拿铁', '冷萃咖啡']
          },
          {
            title: '健康轻食',
            content: ['意大利烤鸡卷(单卷)', '夏威夷菠萝火腿卷(单卷)', '火腿鲜蔬卷(单卷)', '经典海鲜意面']
          }
        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .menu-list {
    height: 100%;
    .kind-list {
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      h4 {
        padding-left: 0.2rem;
        height: 0.92rem;
        font-size: 0.28rem;
        font-weight: 500;
        line-height: 0.92rem;
        color: $themeColor;
        border-bottom: 0.01rem solid $borderColor;
      }
      .food-list {
        li {
          display: flex;
          height: 1.34rem;
          padding: 0.2rem 0.3rem 0.2rem 0.2rem;
          border-bottom: 0.01rem solid $borderColor;
          img {
            width: 1.3rem;
            height: 1.3rem;
            border-radius: 0.04rem;
            margin-right: 0.2rem;
          }
          .food-info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
            h5 {
              font-size: 0.32rem;
              line-height: 150%;
              font-weight: 500;
              color: $themeColor;
            }
            .info-price {
              display: flex;
              justify-content: space-between;
              p {
                color: $mallRed;
                i {
                  font-style: normal;
                  font-size: 0.3rem;
                }
                >span {
                  font-size: 0.3rem;
                }
              }
              >span {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 0.44rem;
                height: 0.44rem;
                border-radius: 50%;
                background-color: $darkBlue;
                i {
                  font-size: 0.24rem;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

