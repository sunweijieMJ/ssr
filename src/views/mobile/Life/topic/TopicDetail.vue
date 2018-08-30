<template>
  <div class="dynamicdetail" v-if="topic_detail[0]">
    <LifeStyle></LifeStyle>
    <div class="title">
      <div class="t_img" v-if="topic_detail[0].img_url">
        <img :src="topic_detail[0].img_url | imageSize('750x422')" alt="">
        <p>{{topic_detail[0].topic_title | readMore(15,'...')}}</p>
      </div>
      <div class="reader">
        <div class="r_t">
          <div class="r_reader" v-if="topic_detail[0].topic_pv">
            <img src="../../../../../static/mobile/svg/private/login_ic_hide.svg" alt="">
            <span>{{topic_detail[0].topic_pv}}</span>
          </div>
          <div class="r_photo" v-if="topic_detail[0].join_user">
            <p :style="{width:0.41*(topic_detail[0].join_user.slice(0,8).length)+'rem'}">
              <img :style="[{left:(0.4*i)+'rem'},{zIndex:100-i}]" :src="item.user_photo_url" alt="" v-for="(item,i) in topic_detail[0].join_user.slice(0,8)" :key="i">
            </p>
            <p>
              <span>{{topic_detail[0].joined_num}}</span>
              <span> 条参与</span>
            </p>
          </div>
        </div>
        <div class="r_b" v-if="topic_detail[0].content_clean">
          <p v-html="readMore(topic_detail[0].content_clean, 66, `...<font style='color:rgba(25,112,206,1);'>全文</font>`)"></p>
        </div>
      </div>
    </div>
    <div
      v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <PublicList :listData="entity_list"></PublicList>
        <Loading :loading="loading" :noMore="no_more" :hide="false"></Loading>
    </div>
    <!-- <div class="topic_detail_footer">
        <div @click="intercept">参与话题</div>
    </div> -->
  </div>
</template>
<script>
import LifeStyle from '../../../../components/mobile/business/LifeStyle.vue';
import PublicList from '../../../../components/mobile/business/PublicList.vue';
import Loading from '../../../../components/mobile/business/Loading.vue';
import topic from '../../../../store/life/topic_detail.js';
import readMore from '../../../../utils/filters/readMore';
import imageSize from '../../../../utils/filters/imageSize';

import {mapState} from 'vuex';
export default {
  name: 'topicdetail',
  components: {
    LifeStyle, PublicList, Loading
  },
  data() {
    return{
      readMore,
      imageSize,
      id: this.$route.params.id
    };
  },
  title() {
    return '话题详情';
  },
  meta() {
    return `<meta name="description" content="话题详情">
    <meta name="keywords" content="话题详情">`;
  },
  methods: {
    infinite(){
      this.$store.dispatch('topic_detail/topicList', this.id);
    }
  },
  asyncData({store, route}) {
    store.registerModule('topic_detail', topic);
    const id = route.params.id;
    const preview = route.params.preview;
    return Promise.all([
      store.dispatch('topic_detail/topicDetail', {topic_id: id, preview}),
      store.dispatch('topic_detail/topicList', id)
    ]);
  },
  mounted() {
    this.$store.registerModule('topic_detail', topic, {preserveState: true});
  },
  computed: {
    ...mapState({
      topic_detail: (store) => store.topic_detail.topic_detail,
      entity_list: (store) => store.topic_detail.entity_list,
      loading: (store) => store.topic_detail.loading,
      no_more: (store) => store.topic_detail.no_more,
      current_page: (store) => store.topic_detail.current_page
    })
  }
};
</script>

<style lang="scss" scoped>
.dynamicdetail{
  background-color: #eee;
    .title{
      background-color:#ffffff;;
      margin-bottom: 0.2rem;
      .t_img{
        width: 7.5rem;
        height: 4.22rem;
        text-align: center;
        >img{
          width: 100%;
        }
        >p{
          margin-top: -2.3rem;
          text-align: center;
          font-size: 0.36rem;
          letter-spacing: 0.002rem;
          color: #ffffff;
        }
      }
      .reader{
        .r_t{
          width: 6.9rem;
          height: 0.94rem;
          padding: 0 0.3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1f1f1;
          .r_reader{
            display: flex;
            align-items: center;
            >img{
              width: 0.42rem;
              margin-right: 0.1rem;
            }
            span{
              font-size: 0.26rem;
              line-height: 0.26rem;
              font-weight: 300;
            }
          }
          .r_photo{
            display: flex;
            p{
              display: flex;
              align-items: center;
              height: 0.46rem;
              position: relative;
              &:first-child{
                margin-right: 0.2rem;
              }
              img{
                position: absolute;
                width: 0.46rem;
                border-radius: 50%;
              }
              span{
                font-size: 0.24rem;
                font-weight: 300;
                line-height: 0.24rem;
                &:first-child{
                  margin-right: 0.1rem;
                  color: #1970ce;
                }
              }
            }
          }
        }
        .r_b{
          padding: 0.3rem;
          width: 6.9rem;
          p{
            font-size: 0.28rem;
            font-weight: 300;
            line-height: 0.42rem;
            letter-spacing: 0.002rem;
            color: #777777;
          }
        }
      }
    }
    .topic_detail_footer{
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      z-index:2000;
      bottom: 0;
      width: 7.5rem;
      height: 0.98rem;
      background-color: #ffffff;
      border-top: 1px solid#f1f1f1;
      >div {
        width: 6.9rem;
        height: 0.76rem;
        border-radius: 0.04rem;
        background-color: #aa272d;
        text-align: center;
        font-size: 0.32rem;
        font-weight: 300;
        line-height: 0.76rem;
        color: #ffffff;
      }
    }
  }
</style>
