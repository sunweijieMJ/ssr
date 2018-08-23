import ProductSvg from '../../../../static/app/svg/customer/push_lb_product.svg';
import ActivitySvg from '../../../../static/app/svg/customer/activity_lb_blue.svg';
import TopicSvg from '../../../../static/app/svg/customer/topic_lb_blue.svg';
import emojs from '../../../utils/rules/emojs';
import LifeApi from '../../../api/life/Life';

export default {
  render(createElement) {
    let that = this;
    if (!that.text) return;
    return createElement(
      'p',
      {
        style: {
          float: 'left',
          fontSize: '0.32rem',
          fontWeight: 300,
          letterSpacing: '0.1px',
          color: '#444444',
          lineHeight: '0.48rem'
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
                  color: '#197BCE',
                  fontSize: '0.32rem',
                  fontFamily: 'PingFang SC'
                },
                domProps: {
                  innerHTML: item
                },
                on: {
                  click: (e) => {
                    let user_name = e.target.innerText.split('');
                    user_name.shift() && (user_name = user_name.join(''));
                    LifeApi().getUserId(user_name).then(res => {
                      if(!res.state) {
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
              let id = item.replace(/[^\d]/g, '');
              let path = 'topic_detail';
              let svg = TopicSvg;

              if (/\[[^\\[]+[商品]\|\d+\]/.test(item)) {
                path = 'product_detail';
                svg = ProductSvg;
              } else if (/\[[^\\[]+[活动]\|\d+\]/.test(item)) {
                path = 'activity_detail';
                svg = ActivitySvg;
              }
              return createElement(
                'a',
                {
                  style: {
                    fontSize: '0.32rem',
                    fontFamily: 'PingFang SC',
                    color: '#197BCE'
                  },
                  on: {
                    click: (e) => {
                      window.location.assign(`/${path}/${id}`);
                      e.stopPropagation();
                    }
                  }
                },
                [
                  item.split(/\[[^\\[]+[活动 | 商品 | 话题]\|\d+\]/g).reverse().map((item) => {
                    if (!item) {
                      return createElement(
                        'img',
                        {
                          style: {
                            display: 'inline-block',
                            width: '0.3rem',
                            transform: 'translateY(0.03rem)'
                          },
                          attrs: {
                            'src': svg
                          }
                        }
                      );
                    } else {
                      return createElement(
                        'span',
                        {
                          style: {
                            display: 'inline'
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
            } else {
              return createElement(
                'a',
                {
                  style: {
                    fontSize: '0.32rem',
                    fontFamily: 'PingFang SC',
                    color: '#197BCE'
                  },
                  on: {
                    click: (e) => {
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
                        'img',
                        {
                          style: {
                            display: 'inline-block',
                            height: '0.3rem',
                            transform: 'translateY(0.03rem)'
                          },
                          attrs: {
                            'src': TopicSvg
                          }
                        }
                      );
                    } else {
                      return createElement(
                        'span',
                        {
                          style: {
                            display: 'inline'
                          },
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
                    color: '#444444',
                    fontSize: '0.32rem',
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
                  color: '#444444',
                  fontSize: '0.32rem',
                  fontFamily: 'PingFang SC'
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
    }
  }
};
