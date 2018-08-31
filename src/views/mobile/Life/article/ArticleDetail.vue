
<template>
  <div class="article-detail">
    <life-style></life-style>
    <div class="article-content">
      <div class="content-banner">
        <img :src="article_detail_info.img_url  | imageSize('750x422')" alt="">
      </div>
      <div class="content-detail">
        <h4>{{article_detail_info.title}}</h4>
        <div class="publish">
          <div class="author">
            <div class="author-name">
              <img :src="article_detail_info.user_photo" alt="">
              <i>
                <img v-if="article_detail_info.user_type == 2" class="img_svg" src="../../../../../static/mobile/svg/common/list_ic_v-36.svg" alt="">
                <img v-else-if="article_detail_info.user_type == 3" class="img_svg" src="../../../../../static/mobile/svg/common/list_ic_l-36.svg" alt="">
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
            <img src="../../../../../static/mobile/svg/common/login_ic_hide.svg" alt="">
            <span class="article_pv">{{article_detail_info.article_pv}}</span>
          </p>
          <p>
            <i>
              <img src="../../../../../static/mobile/svg/common/content_ic_discuss_44.svg" alt="">
              <span>{{article_detail_info.comment_num || ''}}</span>
            </i>
            <i>
              <img v-if="!article_detail_info.is_thumbs_up" src="../../../../../static/mobile/svg/common/content_praise_44.svg" alt="">
              <img v-else src="../../../../../static/mobile/svg/common/content_ic_praise_sel_44.svg" alt="">
              <span>{{article_detail_info.praise_num || ''}}</span>
            </i>
          </p>
        </div>
      </div>
    </div>
    <div class="article-comment"
    v-infinite-scroll="infinite"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
      <comment-title :titleList="comment_title"></comment-title>
      <comment-list v-if="comment_list ? comment_list.length : null" :commentList="comment_list"></comment-list>
      <comment-null v-if="comment_list ? !comment_list.length : null"></comment-null>
    </div>
    <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    <issue-btn></issue-btn>
  </div>
</template>
<script>
  import {LifeStyle, FocusBtn, CommentTitle, CommentList, CommentNull, Loading, IssueBtn} from '../../../../components/mobile/business';
  import article_detail from '../../../../store/life/article_detail.js';
  import {mapState} from 'vuex';
  import {loadScript} from '../../../../utils/business/tools.js';

  export default {
    title() {
      return '文章详情';
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
      LifeStyle, FocusBtn, CommentTitle, CommentList, CommentNull, Loading, IssueBtn
    },
    data() {
      return {
        id: this.$route.params.id // ETC 文章id
      };
    },
    mounted() {
      let that = this;
      that.loadSource();
      that.$store.registerModule('article_detail', article_detail, {preserveState: true});
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
        const container = document.body;
        loadScript(container, 'https://static03.lanehub.cn/js/video.js', () => {
          loadScript(container, 'https://static03.lanehub.cn/js/videoInit.js', () => {
            init();
          });
        });
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
    padding-bottom: 1rem;
    .article-content {
      .content-banner {
        img {
          width: 100%;
        }
      }
      .content-detail {
        padding: 0.4rem 0.3rem;
        background-color: #fff;
        margin-bottom: 0.2rem;
        h4 {
          font-size: 0.48rem;
          font-weight: 400;
          line-height: 0.48rem;
          color: $themeColor;
        }
        .publish {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0.3rem 0 0.4rem;
        }
        .author {
          display: flex;
          align-items: center;
          .author-name {
            position: relative;
            width: 0.72rem;
            border-radius: 50%;
            margin-right: 0.2rem;
            img {
              width: 100%;
            }
            i {
              position: absolute;
              right: -0.05rem;bottom: -0.05rem;
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
            color: $themeColor;
            &:last-of-type {
              font-size: 0.26rem;
              color: $subColor;
            }
          }
        }
        .content-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          p {
            display: flex;
            align-items: center;
            >img {
              width: 0.38rem;
              margin-right: 0.1rem;
            }
            span {
              font-size: 0.24rem;
              color: $subColor;
            }
            &:last-child {
              i {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-style: normal;
                margin-left: 0.3rem;
                img {
                  width: 0.38rem;
                }
                span {
                  margin-left: 0.1rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  @import url('https://static03.lanehub.cn/css/video.css');

  /**
  * 富文本自定义样式
  */
  .rich-text{
    margin-bottom: 0.1rem;
    overflow: hidden;
    .ql-align-center{
      text-align:center;
    }
    .ql-align-right{
      text-align: right;
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
    .customvideo {
      width: 100% !important;
      height: 100% !important;
      margin-bottom: 0.3rem;
    }
  }
  .tvp_overlay_poster {
    .tvp_poster_img {
      width: 6.9rem;
      background-size:100% 100%;
    }
  }
  iframe {
    html, body {
      width: 6.9rem !important;
    }
    width: 6.9rem !important;
    height: 3.88rem !important;
    .tvp_overlay_poster {
      width:6.9rem !important;
      height: 3.88rem !important;
      .tvp_poster_img{
        width:6.9rem !important;
        height: 3.88rem !important;
        background-size:6.9rem 3.88rem !important;
      }
    }
  }
  .tvp_container {
    width: 6.9rem !important;
  }
</style>

