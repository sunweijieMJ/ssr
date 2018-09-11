<template>
  <ul class="comment-list">
    <li v-for="(item, index) in commentList" :key="index">
      <div class="list-author" @click="paramsSkip('Profile', {id: item.entity_user_info.id})">
        <img v-lazy="imageSize(item.entity_user_info ? item.entity_user_info.user_photo_url : '', '80x80')" alt="">
        <img v-if="item.entity_user_info.user_type == 2" src="../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
        <img v-if="item.entity_user_info.user_type == 3" src="../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
      </div>
      <div class="list-reply">
        <span @click="paramsSkip('Profile', {id: item.entity_user_info.id})">{{item.entity_user_info?item.entity_user_info.user_name:''}}</span>
        <Paragraph :text="item.entity_brief"></Paragraph>
        <div class="reply-time">
          <p>
            <span>{{item.publish_time | timeFilter(2)}}</span>
          </p>
          <p @click="intercept">
            <span class="num">
              <i class="iconfont icon-content_ic_discuss_"></i>
            </span>
            <span class="num">
              <i class="iconfont icon-content_praise_"></i>
              <i>{{item.entity_statistic.thumb_up || ' ' | scientific}}</i>
            </span>
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  import imageSize from '../../../utils/filters/imageSize';
  import frequent from '../../../mixins/frequent.js';
  import ToolApi from '../../../api/mobile/tool.js';
  import emojs from '../../../utils/rules/emojs.js';

  export default {
    mixins: [frequent],
    props: ['commentList'],
    components: {
      // render组件
      Paragraph: {
        render(createElement) {
          let that = this;
          if(!that.text) return;
          return createElement(
            'p',
            that.text.split(/(@[-_0-9a-zA-Z\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00]{1,26})|(\r|\n)|(\[.+?\])/g).map((item) => {
              if(!item) return;
              if(item.match(/@[-_0-9a-zA-Z\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00]{1,26}/g)){
                return createElement(
                  'a',
                  {
                    style: {
                      color: '#1970ce',
                      fontSize: '0.28rem',
                      fontFamily: 'PingFang SC'
                    },
                    domProps: {
                      innerHTML: item
                    },
                    on: {
                      click: (e) => {
                        let user_name = e.target.innerText.split('');
                        user_name.shift() && (user_name = user_name.join(''));
                        ToolApi().getUserId(user_name).then((res) => {
                          if(res.status) {
                            const id = res.data.id || -1;
                            window.location.assign(`/profile/${id}`);
                          }
                        });
                        e.stopPropagation();
                      }
                    }
                  },
                  {
                    attrs: {
                      href: 'javascript:;'
                    }
                  }
                );
              } else if(item.match(/\r|\n/g)){
                return createElement('br');
              } else if(item.match(/\[.+?\]/g)){
                if(!emojs.get(item)) {
                  return createElement(
                    'span',
                    {
                      style: {
                        color: '#444444',
                        fontSize: '0.28rem',
                        fontFamily: 'PingFang SC'
                      },
                      domProps: {
                        innerHTML: item
                      }
                    }
                  );
                } else {
                  return createElement(
                    'img',
                    {
                      style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '0.36rem'
                      },
                      attrs: {
                        'src': emojs.get(item)
                      }
                    }
                  );
                }
              } else {
                return createElement(
                  'span',
                  {
                    style: {
                      color: '#444444',
                      fontSize: '0.28rem',
                      fontFamily: 'PingFang SC'
                    },
                    domProps: {
                      innerHTML: item
                    }
                  }
                );
              }
            })
          );
        },
        props: {
          text: {
            type: String,
            required: false
          }
        }
      }
    },
    data(){
      return {
        emojs,
        icon: [],
        imageSize
      };
    },
    methods: {
      // 初始化
      initialize() {
        let that = this;
        for(let i = 0, LEN = that.commentList.length; i < LEN; i++){
          if(that.commentList[i].is_thumbed){
            this.icon.push(true);
          } else {
            this.icon.push(false);
          }
        }
      }
    },
    watch: {
      commentList: 'initialize'
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .comment-list {
    padding: 0 0.3rem;
    background-color: #fff;
    border-top: 0.01rem solid $borderColor;;
    li {
      display: flex;
      justify-content: space-between;
      padding: 0.3rem 0;
      border-bottom: 0.01rem solid $borderColor;;
      &:last-of-type {
        border-bottom: none;
      }
      .list-author {
        width: 0.64rem;
        height: 0.64rem;
        position: relative;
        img{
          &:first-child {
            width: 100%;
            border-radius: 50%;
          }
          &:nth-child(2) {
            width: 0.28rem;
            position: absolute;
            right: -0.05rem;
            bottom: -0.05rem;
          }
        }
      }
      .list-reply {
        >span {
          font-size: 0.28rem;
          line-height: 0.28rem;
          color: $subColor;
        }
        >p {
          width: 6.06rem;
          margin: 0.14rem 0 0.3rem;
          font-size: 0.28rem;
          line-height: 0.42rem;
          letter-spacing: 0.2px;
          color: $themeColor;
        }
        .reply-time {
          width: 6.1rem;
          height: 0.3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          p {
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 0.3rem;
            span {
              display: flex;
              align-items: center;
              font-size: 0.24rem;
              letter-spacing: 0.2px;
              color: $subColor;
              &.num {
                margin-left: 0.24rem;
              }
              i {
                margin-right: 0.1rem;
                font-size: 0.3rem;
                font-style: normal;
                &:nth-child(2) {
                  width: 0.3rem;
                  margin-right: 0;
                  font-size: 0.24rem;
                  line-height: 0.3rem;
                  letter-spacing: 0.2px;
                  color: $subColor;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
