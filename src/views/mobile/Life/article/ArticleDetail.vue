
<template>
  <div class="article-detail">
    <life-style></life-style>
    <!-- plyr.css -->
    <link rel="stylesheet" href="//static06.lanehub.cn/plyr/css/plyr-js.min.css">
    <link rel="stylesheet" href="//static06.lanehub.cn/plyr/css/plyr.css">
    <div class="article-content" v-if="article_detail_info">
      <div class="content-banner">
        <img :src="article_detail_info.img_url  | imageSize('750x422')" alt="">
      </div>
      <div class="content-detail">
        <h4>{{article_detail_info.title}}</h4>
        <div class="publish">
          <div class="author">
            <div class="author-name">
              <img :src="article_detail_info.user_photo" alt="" @click="assign('profile',article_detail_info.user_id)">
              <i>
                <img v-if="article_detail_info.user_type == 2" class="img_svg" src="../../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
                <img v-else-if="article_detail_info.user_type == 3" class="img_svg" src="../../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
              </i>
            </div>
            <span>{{article_detail_info.user_name}}</span>
            <b class="line"></b>
            <span>{{article_detail_info.publish_at | timeFilter}}</span>
          </div>
          <focus-btn></focus-btn>
        </div>
        <div class="rich-text" v-html="article_detail_info.content"></div>
        <div class="content-footer">
          <p>
            <i class="iconfont icon-login_ic_hide"></i>
            <span class="article_pv">{{article_detail_info.article_pv}}</span>
          </p>
          <p @click="intercept">
            <span class="num">
              <i class="iconfont icon-content_ic_discuss_"></i>
              {{article_detail_info.comment_num || ' ' | scientific}}
            </span>
            <span class="num">
              <i class="iconfont icon-content_praise_"></i>
              {{article_detail_info.praise_num || ' ' | scientific}}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <comment-title :titleList="comment_title" :id="id" :type="1"></comment-title>
      <comment-list v-if="comment_list ? comment_list.length : null" :commentList="comment_list"></comment-list>
      <comment-null v-if="comment_list ? !comment_list.length : null"></comment-null>
    </div>
    <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    <issue-btn></issue-btn>
    <open-app></open-app>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat.js';
  import frequent from '../../../../mixins/frequent.js';
  import {loadScript} from '../../../../utils/business/tools.js';
  import article_detail from '../../../../store/life/article_detail.js';
  import {LifeStyle, FocusBtn, CommentTitle, CommentList, CommentNull, Loading, IssueBtn, OpenApp} from '../../../../components/mobile/business';

  export default {
    title() {
      return `${this.article_detail_info ? this.article_detail_info.title : '文章详情'}`;
    },
    meta() {
      return `<meta name="description" content="文章详情">
      <meta name="keywords" content="文章详情">`;
    },
    asyncData({store, route}) {
      store.registerModule('article_detail', article_detail);
      const id = route.params.id;
      const preview = route.params.preview;
      return Promise.all([
        store.dispatch('article_detail/getArticleDetail', {id, preview}),
        store.dispatch('article_detail/getCommentsTitle', {entity_id: id, entity_type: 1}),
        store.dispatch('article_detail/getCommentsList', id)
      ]);
    },
    components: {
      LifeStyle, FocusBtn, CommentTitle, CommentList, CommentNull, Loading, IssueBtn, OpenApp
    },
    mixins: [frequent, wechat],
    data() {
      return {
        id: this.$route.params.id // ETC 文章id
      };
    },
    mounted() {
      let that = this;
      that.loadSource();
      that.$store.registerModule('article_detail', article_detail, {preserveState: true});
      // 微信分享
      if(!that.article_detail_info) return;
      const link = window.location.href;
      const title = that.article_detail_info.title;
      const desc = that.article_detail_info.description;
      const imgUrl = that.article_detail_info.img_url;
      that.wxInit(link, title, desc, imgUrl);
    },
    destroyed() {
      this.$store.unregisterModule('article_detail', article_detail);
    },
    methods: {
      // 触底刷新
      infinite() {
        let that = this;
        that.$store.dispatch('article_detail/getCommentsList', that.id);
      },
      loadSource() {
        try {
          plyrInit();
        } catch (err) {
          const container = document.body;
          loadScript(container, '//static06.lanehub.cn/plyr/js/plyr.min.js', () => {
            loadScript(container, '//static06.lanehub.cn/plyr/js/plyrInit.js', () => {
              plyrInit();
            });
          });
        }
      }
    },
    computed: {
      ...mapState({
        article_detail_info: (store) => store.article_detail.article_detail_info,
        comment_title: (store) => store.article_detail.comment_title,
        comment_list: (store) => store.article_detail.comment_list,
        loadInfo: (store) => store.article_detail.loadInfo
      }),
      loading() {
        return this.$store.state.article_detail.loadInfo.loading;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .article-detail {
    .article-content {
      .content-banner {
        img {
          width: 100%;
        }
      }
      .content-detail {
        padding: 0.4rem 0.3rem;
        background-color: #fff;
        h4 {
          font-size: 0.48rem;
          font-weight: 400;
          line-height: 0.7rem;
          color: #363636;
        }
        .publish {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0.19rem 0 0.38rem;
        }
        .author {
          display: flex;
          align-items: center;
          .author-name {
            position: relative;
            width: 0.72rem;
            margin-right: 0.2rem;
            img {
              width: 100%;
              border-radius: 50%;
            }
            i {
              position: absolute;
              right: 0;bottom: 0;
              img {
                width: 0.32rem;
              }
            }
          }
          .line {
            padding:0.2rem 0.2rem 0 0;
            margin-left: 0.2rem;
            border-left: 0.01rem solid $themeColor;
          }
          span {
            font-size: 0.3rem;
            font-weight: 400;
            color: $themeColor;
            &:last-of-type {
              font-size: 0.26rem;
              color: $subColor;
            }
          }
        }
        .content-footer {
          margin-top: 0.26rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          p {
            display: flex;
            align-items: center;
            span {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 0.24rem;
              color: $subColor;
              &.num {
                margin-left: 0.24rem;
              }
            }
            i {
              font-size: 0.38rem;
              margin-right: 0.1rem;
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  /**
  * 富文本自定义样式
  */
  .rich-text{
    margin-bottom: 0.1rem;
    overflow: hidden;
    // quill 居中 居右
    .ql-align-center{
      text-align:center;
    }
    .ql-align-right{
      text-align: right;
    }
    // quill 自定义字号
    .ql-size-small {
      font-size: 0.32rem;
      line-height: 70%;
    }
    .ql-size-large {
      font-size: 0.34rem;
      line-height: 195%;
    }
    .ql-size-huge {
      font-size: 0.34rem;
      line-height: 260%;
    }
    // 富文本自定义标题 正文
    h2, h3, h4 {
      font-weight: 300 !important;
    }
    h2 {
      font-size: 0.34rem;
      line-height: 170%;
      margin-bottom: 0.08rem;
    }
    h3 {
      padding: 0.1rem 0 0.08rem;
      font-size: 0.34rem;
      line-height: 170%;
    }
    h4 {
      font-size: 0.26rem;
      margin-bottom: 0.4rem;
      margin-top: -0.15rem;
      line-height:150%;
      color:#999;
    }
    p {
      font-size: 0.32rem;
      margin-bottom: 0.3rem;
      font-weight: 300;
      line-height: 170%;
      text-align: justify;
      img {
        width: 6.9rem;
      }
      a {
        font-size: 0.32rem;
      }
    }
    // 自定义播放器容器
    .customvideo {
      width: 100% !important;
      height: 100% !important;
      margin-bottom: 0.3rem;
      .plyr .plyr__controls [data-plyr="mute"]{
        display: none;
      }
    }
  }

  iframe {
    width: 6.9rem !important;
    html, body {
      width: 6.9rem !important;
    }
  }
</style>

