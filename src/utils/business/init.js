import Moment from './moment.js';
import MallApi from '../../api/mobile/mall';

async function getTicketInfo(ticket_id) {
  return await MallApi().getTicketInfo({ticket_id});
}
const couponInit = () => {
  const couponBox = document.getElementsByClassName('customcoupon');
  if (!couponBox.length) return;
  for (let i = 0, LEN = couponBox.length; i < LEN; i++) {
    const coupon_id = couponBox[i].getAttribute('data-id');
    getTicketInfo(coupon_id).then(res => {
      if (!res.status) return;
      const ticket_info = res.data;
      couponBox[i].innerHTML =
        `<div class="coupon-card-box">
                <div class="coupon-basic">
                  <p class="coupon-title">${ticket_info.sTitle}</p>
                  <p class="coupon-subtitle">${ticket_info.sSubTitle}</p>
                  <p class="coupon-valid">
                    ${ticket_info.iUseTimeLimitStart ? `有效期${Moment().format(ticket_info.iUseTimeLimitStart)}-${Moment().format(ticket_info.iUseTimeLimitEnd)}` : `领取后${ticket_info.iUseTimeLimitStart_timespan / 3600 / 24}天内有效`}
                  </p>
                </div>
                <div class="send-coupon">
                  <span class="receive">立即领取</span>
                  <span class="circle-top"></span>
                  <span class="circle-bottom"></span>
                </div>
              </div>`;
    });
  }
  const body = document.querySelector('body');
  const script = document.createElement('script');
  script.innerHTML =
   `class LaneHub {
      constructor() {
        this.query = this.parseUrl();
      }

      parseUrl() {
        const url = window.location.search;
        if (url.indexOf('?') !== -1) {
          const str = url.substr(1);
          const strs = str.split('&');
          const response = {};
          for (let i = 0, LEN = strs.length; i < LEN; i++) {
            response[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
          }
          return response;
        } else {
          return {};
        }
      }

      receiveCoupon(ele) {
        const coupon_id = ele.getAttribute('data-id');
        console.log(coupon_id)
        if (this.query.app === 'i-lanehub') {
          window.webkit.messageHandlers.LaneHub.receiveCoupon({ coupon_id });
        } else if (this.query.app === 'a-lanehub') {
          window.lanehub.receiveCoupon(coupon_id);
        }
      }
    }

    window.addEventListener('load', () => {
      window.LaneHub = new LaneHub();
      const couponBox = document.querySelectorAll('.customcoupon');
      if (!couponBox.length) return;
      for (let i = 0, LEN = couponBox.length; i < LEN; i++) {
        couponBox[i].addEventListener('click', () => {
          window.LaneHub.receiveCoupon(couponBox[i]);
        }, false);
      }
    }, false);`;
  body.appendChild(script);
};

export {
  couponInit
};