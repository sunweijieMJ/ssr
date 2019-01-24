<template>
  <ul class="integral-guide">
    <li v-for="(witem, windex) in guide" :key="windex">
      <h3>{{witem.title}}</h3>
      <template v-if="witem.desc">
        <div class="desc">
          <p v-for="(vitem, vindex) in witem.desc" :key="vindex">{{vitem}}</p>
        </div>
      </template>
      <template v-else>
        <ul class="way">
          <li v-for="(vitem, vindex) in witem.way" :key="vindex">
            <i class="iconfont" :class="vitem.i"></i>
            <div class="msg">
              <h4>{{vitem.h}}</h4>
              <p>{{vitem.p}}</p>
            </div>
          </li>
        </ul>
      </template>
    </li>
  </ul>
</template>
<script>
  export default {
    title() {
      return '积分指南';
    },
    meta() {
      return `<meta name="description" content="积分指南">
              <meta name="keywords" content="积分指南">`;
    },
    data() {
      return {
        guide: [
          {
            title: '积分的作用',
            desc: [
              '1. 积分可以购买商品',
              '2. 1 积分 = 1 瓴里值，瓴里值可以提升会员等级',
              '3. 参加积分专享活动'
            ]
          },
          {
            title: '获得积分的途径',
            way: [
              {
                i: 'icon-Graphics_CustomIc9',
                h: '完善“我的资料”',
                p: '完善”我的资料"中头像、昵称、性别、生日将获得 100 积分 生日当天，将获得 100 积分 '
              },
              {
                i: 'icon-Graphics_CustomIc9',
                h: '签到',
                p: '连续签到第 1 天-第 5 天，每日获得 5 积分 连续签到第 6 天及以上，每日获得 10 积分 当连续签到中断后，重新累计签到天数'
              },
              {
                i: 'icon-Graphics_CustomIc9',
                h: '动态被选为精华',
                p: '动态加精，将获得50积分/条'
              },
              {
                i: 'icon-Graphics_CustomIc9',
                h: '建设性的反馈',
                p: '对于用户提供的意见反馈，瓴里会视情况给予积分奖励'
              }
            ]
          },
          {
            title: '积分的其他说明',
            desc: [
              '1. 积分是用户在瓴里平台产生有意义互动、贡献有价值内容等行为的奖励回馈。 10积分=1 RMB ',
              '2. 积分的有效期获取后有效期为1年，自积分入账起至次年入账前1天为止，逾期积分将自动失效；按照积分的入账先后顺序，优先消耗先入账的积分。'
            ]
          }
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .integral-guide {
    padding: 0.5rem 0.3rem;
    background-color: #fff;
    li {
      margin-bottom: 0.6rem;
      &:last-child {
        margin-bottom: 0;
      }
      h3 {
        font-size: 0.36rem;
        font-weight: 400;
        line-height: 0.5rem;
        color: $themeColor;
      }
      .desc {
        margin-top: 0.24rem;
        p {
          margin-bottom: 0.16rem;
          font-size: 0.32rem;
          line-height: 0.45rem;
          color: $themeColor;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      .way {
        margin-top: 0.5rem;
        li {
          display: flex;
          margin-bottom: 0.2rem;
          &:last-child {
            margin-bottom: 0;
          }
          i {
            margin-top: 0.16rem;
            font-size: 0.4rem;
            color: $linkBlue;
          }
          .msg {
            margin-left: 0.4rem;
            h4 {
              font-size: 0.3rem;
              font-weight: 400;
              line-height: 0.3rem;
              color: $themeColor;
            }
            p {
              margin-top: 0.2rem;
              font-size: 0.3rem;
              line-height: 0.45rem;
              color: $themeColor;
            }
          }
        }
      }
    }
  }
</style>

