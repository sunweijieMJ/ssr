import emojs from '../../../utils/rules/emojs';
import ToolApi from '../../../api/mobile/tool';

export default {
  render(createElement) {
    let that = this;
    if (!that.text) return;
    return createElement(
      'p',
      {
        style: {
          fontSize: '0.32rem',
          lineHeight: '0.48rem',
          letterSpacing: '0.1px',
          color: '#444'
        }
      },
      [
        that.text.split(/(@[-_0-9a-zA-Z\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00]{1,26})|(#[^@#]+#)|(\r|\n)|(\[.+?\])/g).map((item) => {
          if (!item) return;
          if (item.match(/@[-_0-9a-zA-Z\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00]{1,26}/g)) {
            return createElement(
              'a',
              {
                style: {
                  fontSize: '0.32rem',
                  color: '#197bec'
                },
                domProps: {
                  innerHTML: item
                },
                on: {
                  click: (e) => {
                    if (that.forbid) return;
                    let user_name = e.target.innerText.split('');
                    user_name.shift() && (user_name = user_name.join(''));
                    ToolApi().getUserId(user_name).then(res => {
                      if(res.status) {
                        const id = res.data.id || -1;
                        window.location.assign(`/profile/${id}`);
                      }
                    });
                    e.stopPropagation();
                  }
                }
              }
            );
          } else if (item.match(/#[^@#]+#/g)) {
            if (item.match(/\[[^\\[]+[活动 | 商品 | 话题]\|\d+\]#/g)) {
              item = item.replace(/#/g, '').trim();
              let path = 'topic_detail';
              let icon = 'icon-search_lb_topic';
              let id = item.match(/\[[^\\[]+[活动 | 商品 | 话题]\|\d+\]/g)[0].replace(/\D+/g, '');

              that.topic && that.topic.forEach((val) => {
                let topic = val.entity_title.replace(/\[话题\]/g, '').trim();
                if (topic === item.split(/\[[^\\[]+[活动 | 商品 | 话题]\|\d+\]/g)[0].trim()) id = val.entity_id;
              });

              if (/\[[^\\[]+[商品]\|\d+\]/.test(item)) {
                path = 'product_detail';
                icon = 'icon-push_lb_product';
              } else if (/\[[^\\[]+[活动]\|\d+\]/.test(item)) {
                path = 'activity_detail';
                icon = 'icon-activity_lb_blue';
              }
              return createElement(
                'a',
                {
                  style: {
                    marginRight: '0.06rem',
                    fontSize: '0.32rem',
                    color: '#197bec'
                  },
                  on: {
                    click: (e) => {
                      if (that.forbid) return;
                      window.location.assign(`/${path}/${id}`);
                      e.stopPropagation();
                    }
                  }
                },
                [
                  item.split(/\[[^\\[]+[活动 | 商品 | 话题]\|\d+\]/g).reverse().map((item) => {
                    if (!item) {
                      return createElement(
                        'i',
                        {
                          style: {
                            fontSize: '0.32rem',
                            color: '#197bec',
                            marginRight: '0.05rem'
                          },
                          attrs: {
                            class: 'iconfont ' + icon
                          }
                        }
                      );
                    } else {
                      return createElement(
                        'span',
                        {
                          domProps: {
                            innerHTML: item
                          }
                        }
                      );
                    }
                  })
                ]
              );
            } else {
              return createElement(
                'a',
                {
                  style: {
                    marginRight: '0.05rem',
                    fontSize: '0.32rem',
                    color: '#197bec'
                  },
                  on: {
                    click: (e) => {
                      if (that.forbid) return;
                      that.topic.forEach((val) => {
                        let topic = val.entity_title.replace(/\[话题\]/g, '').trim();
                        if (topic === item.slice(1, -1).trim()) window.location.assign(`/topic_detail/${val.entity_id}`);
                      });
                      e.stopPropagation();
                    }
                  }
                },
                [
                  item.split(/^#/g).map((item) => {
                    if (!item) {
                      return createElement(
                        'i',
                        {
                          style: {
                            marginRight: '0.05rem',
                            fontSize: '0.32rem',
                            color: '#197bec'
                          },
                          attrs: {
                            class: 'iconfont icon-search_lb_topic'
                          }
                        }
                      );
                    } else {
                      return createElement(
                        'span',
                        {
                          domProps: {
                            innerHTML: item.replace(/#/g, '').trim()
                          }
                        }
                      );
                    }
                  })
                ]
              );
            }
          } else if (item.match(/\r|\n/g)) {
            return createElement('br');
          } else if (item.match(/\[.+?\]/g)) {
            if (!emojs.get(item)) {
              return createElement(
                'span',
                {
                  style: {
                    fontSize: '0.32rem',
                    color: '#444'
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
                    width: '0.4rem'
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
                  fontSize: '0.32rem',
                  color: '#444'
                },
                domProps: {
                  innerHTML: item
                }
              }
            );
          }
        })
      ]
    );
  },
  props: {
    text: {
      type: String,
      required: false
    },
    topic: {
      type: Array,
      required: false
    },
    forbid: {
      type: Boolean,
      required: false
    }
  }
};
