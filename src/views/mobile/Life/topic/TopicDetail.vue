<template>
  <div class="topic-detail" v-if="topic_detail && topic_detail[0] && !cut_out">
    <life-style></life-style>
    <div class="detail-title">
      <div class="title-img" v-if="topic_detail[0].img_url" :style="[{backgroundImage: `url(${imageSize(topic_detail[0].img_url, '750x422')})`}]">
        <p>{{topic_detail[0].topic_title | readMore(15,'...')}}</p>
      </div>
      <div class="detail-thumb">
        <div class="thumb-reader" v-if="topic_detail[0].topic_pv">
          <i class="iconfont icon-login_ic_hide"></i>
          <span>{{topic_detail[0].topic_pv}}</span>
        </div>
        <div class="thumb-photo" v-if="topic_detail[0].join_user">
          <p :style="{width:0.41*(topic_detail[0].join_user.slice(0,5).length)+'rem'}">
            <img v-for="(item,i) in topic_detail[0].join_user.slice(0,5)" :key="i" :src="item.user_photo_url" alt="" :style="[{left:(0.4*i)+'rem'},{zIndex:100-i}]">
          </p>
          <p>
            <span>{{topic_detail[0].joined_num}}</span>
            <span> 条参与</span>
          </p>
        </div>
      </div>
      <div class="detail-desc" v-if="topic_detail[0].content_clean.trim()"
        @click="(topic_detail[0].content_clean.length > 60) ? $store.dispatch('topic_detail/cutToIntro', true) : ''">
        <p v-html="readMore(topic_detail[0].content_clean, 60, `...<font style='color:rgba(25,112,206,1);'>全文</font>`)"></p>
      </div>
    </div>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <public-list :listData="topic_dynamic"></public-list>
        <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    </div>
    <open-app></open-app>
  </div>
  <div v-else>
    <component :is="TopicIntro"></component>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat.js';
  import readMore from '../../../../utils/filters/readMore';
  import imageSize from '../../../../utils/filters/imageSize.js';
  import topic_detail from '../../../../store/life/topic_detail.js';
  import TopicIntro from './TopicIntro.vue';
  import {LifeStyle, PublicList, Loading, OpenApp} from '../../../../components/mobile/business';

  export default {
    title() {
      return `${this.topic_detail[0] ? '瓴里话题 - ' + this.topic_detail[0].topic_title : '话题详情'}`;
    },
    meta() {
      return `<meta name="description" content="话题详情">
      <meta name="keywords" content="话题详情">`;
    },
    components: {
      LifeStyle, PublicList, Loading, OpenApp
    },
    mixins: [wechat],
    data() {
      return{
        readMore,
        imageSize,
        TopicIntro,
        id: this.$route.params.id
      };
    },
    asyncData({store, route}) {
      store.registerModule('topic_detail', topic_detail);
      const id = route.params.id;
      const preview = route.params.preview;
      return Promise.all([
        store.dispatch('topic_detail/getTopicDetail', {topic_id: id, preview}),
        store.dispatch('topic_detail/getTopicDynamic', id)
      ]);
    },
    methods: {
      infinite(){
        let that = this;
        that.$store.dispatch('topic_detail/getTopicDynamic', that.id);
      }
    },
    mounted() {
      let that = this;
      this.$store.registerModule('topic_detail', topic_detail, {preserveState: true});
      // 微信分享
      if(!that.topic_detail) return;
      const link = window.location.href;
      const title = `瓴里话题 - ${that.topic_detail[0].topic_title}`;
      const desc = that.topic_detail[0].content_clean;
      const imgUrl = that.topic_detail[0].img_url;
      that.wxInit(link, title, desc, imgUrl);
    },
    computed: {
      ...mapState({
        topic_detail: (store) => store.topic_detail.topic_detail,
        topic_dynamic: (store) => store.topic_detail.topic_dynamic,
        cut_out: (store) => store.topic_detail.cut_out,
        loadInfo: (store) => store.topic_detail.loadInfo
      }),
      loading() {
        return this.$store.state.topic_detail.loadInfo.loading;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .topic-detail {
    background-color: $intervalColor;
    .detail-title {
      background-color:#ffffff;
      margin-bottom: 0.2rem;
      .title-img {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4.22rem;
        background-size: cover;
        >img {
          width: 100%;
        }
        >p {
          font-size: 0.44rem;
          color: #fff;
        }
      }
      .detail-thumb {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.94rem;
        padding: 0 0.3rem;
        .thumb-reader {
          display: flex;
          align-items: center;
          i {
            font-size: 0.32rem;
            margin-right: 0.1rem;
          }
          span {
            font-size: 0.26rem;
          }
        }
        .thumb-photo {
          display: flex;
          p{
            display: flex;
            align-items: center;
            position: relative;
            &:first-child{
              margin-right: 0.2rem;
            }
            img {
              position: absolute;
              width: 0.46rem;
              border-radius: 50%;
            }
            span {
              font-size: 0.24rem;
              &:first-child{
                margin-right: 0.1rem;
                color: $darkBlue;
              }
            }
          }
        }
      }
      .detail-desc {
        padding: 0.25rem 0.3rem;
        border-top: 0.01rem solid $borderColor;
        p {
          font-size: 0.30rem;
          line-height: 0.45rem;
          letter-spacing: 0.0198rem;
          color: $subColor;
        }
      }
    }
  }
</style>
