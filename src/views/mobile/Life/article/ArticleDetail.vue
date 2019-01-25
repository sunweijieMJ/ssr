
<template>
  <div class="article-detail">
    <life-style></life-style>
    <div class="article-content" v-if="article_detail_info">
      <div class="content-banner">
        <img v-lazy="imageSize(article_detail_info.img_url, '750x422')" alt="">
      </div>
      <div class="content-detail">
        <h3>{{article_detail_info.title}}</h3>
        <div class="publish">
          <div class="header-author">
            <div class="author-icon">
              <img v-lazy="imageSize(article_detail_info.user_photo, '80x80')" alt="" @click="assign('profile',article_detail_info.user_id)">
              <img v-if="article_detail_info.user_type == 2" class="img_svg" src="../../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
              <img v-else-if="article_detail_info.user_type == 3" class="img_svg" src="../../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
            </div>
            <div class="author-name">
              <h4>
                <span>{{article_detail_info.user_name}}</span>
                <a href="javascript:;" v-if="article_detail_info.member_grade === 2 || article_detail_info.member_grade === 3" :class="{grade: article_detail_info.member_grade === 3}">
                  <i class="iconfont icon-members_ic_privilege"></i>
                  <span v-if="article_detail_info.member_grade === 2">悦蓝</span>
                  <span v-if="article_detail_info.member_grade === 3">臻蓝</span>
                </a>
              </h4>
              <p>{{article_detail_info.publish_at | timeFilter}}</p>
            </div>
          </div>
          <focus-btn></focus-btn>
        </div>
        <article-desc :response="article_detail_info.content"></article-desc>
        <div class="content-footer">
          <p>
            <i class="iconfont icon-login_ic_hide"></i>
            <span class="article_pv">{{article_detail_info.article_pv}}</span>
          </p>
          <p @click="intercept">
            <span class="num">
              <i class="iconfont icon-content_praise_Co"></i>
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
  import imageSize from '../../../../utils/filters/imageSize.js';
  import article_detail from '../../../../store/life/article_detail.js';
  import ArticleDesc from '../../../../components/app/ArticleDesc.vue';
  import {FocusBtn, IssueBtn, OpenApp} from '../../../../components/mobile/button';
  import {LifeStyle, CommentTitle, CommentList, CommentNull, Loading} from '../../../../components/mobile/business';

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
      const article_id = route.params.id;
      const preview = route.params.preview;
      return Promise.all([
        store.dispatch('article_detail/getArticleDetail', {article_id, preview}),
        store.dispatch('article_detail/getCommentsTitle', {entity_id: article_id, entity_type: 1}),
        store.dispatch('article_detail/getCommentsList', article_id)
      ]);
    },
    components: {
      ArticleDesc, LifeStyle, FocusBtn, CommentTitle, CommentList, CommentNull, Loading, IssueBtn, OpenApp
    },
    mixins: [frequent, wechat],
    data() {
      return {
        imageSize,
        id: this.$route.params.id // ETC 文章id
      };
    },
    mounted() {
      let that = this;
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
        height: 4.22rem;
        img {
          width: 100%;
        }
      }
      .content-detail {
        padding: 0.4rem 0;
        background-color: #fff;
        h3 {
          padding: 0 0.3rem;
          font-size: 0.48rem;
          font-weight: 400;
          line-height: 0.7rem;
          color: #363636;
        }
        .publish {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.3rem;
          margin: 0.19rem 0 0.38rem;
          .header-author {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .author-icon {
              position: relative;
              width: 0.72rem;
              height: 0.72rem;
              border-radius: 50%;
              margin-right: 0.2rem;
              img {
                width: 0.72rem;
                height: 0.72rem;
                border-radius: 50%;
                &:nth-child(2) {
                  position: absolute;
                  right: 0; bottom: 0;
                  width: 0.3rem;
                  height: 0.3rem;
                }
              }
            }
            .author-name {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 0.68rem;
              padding: 0.02rem 0;
              h4 {
                display: flex;
                align-items: center;
                font-weight: 300;
                height: 0.3rem;
                >span {
                  font-size: 0.3rem;
                  line-height: 0.3rem;
                  color: $themeColor;
                }
                a {
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 0.86rem;
                  height: 0.3rem;
                  margin-left: 0.1rem;
                  color: $darkBlue;
                  &.grade {
                    color: #042C4F;
                    &:after {
                      border-color: #042C4F;
                    }
                  }
                  // 细边框
                  &:after{
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    box-sizing: border-box;
                    width: 200%;
                    height: 200%;
                    transform: scale(0.5);
                    transform-origin: left top;
                    border: 1px solid $darkBlue;
                    border-radius: 20px;
                  }
                  i {
                    font-size: 0.23rem;
                    line-height: 0.23rem;
                  }
                  span {
                    margin-left: 0.06rem;
                    font-size: 0.2rem;
                  }
                }
              }
              p {
                font-size: 0.24rem;
                line-height: 0.24rem;
                color: $subColor;
              }
            }
          }
        }
        .content-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.3rem;
          margin-top: 0.26rem;
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


