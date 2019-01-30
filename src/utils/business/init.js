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

      let secret = '';
      MallApi().encryptCoupon({id: coupon_id}).then(res => {
        secret = res.data;
      });
      couponBox[i].querySelector('.send-coupon').addEventListener('click', () => {
        window.LaneHub.receiveCoupon(coupon_id, secret);
      }, false);
    });
  }
  const body = document.querySelector('body');
  const script = document.createElement('script');
  script.innerHTML = '"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor){descriptor.writable=true}Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps){defineProperties(Constructor.prototype,protoProps)}if(staticProps){defineProperties(Constructor,staticProps)}return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var LaneHub=function(){function LaneHub(){_classCallCheck(this,LaneHub);this.query=this.parseUrl()}_createClass(LaneHub,[{key:"parseUrl",value:function parseUrl(){var url=window.location.search;if(url.indexOf("?")!==-1){var str=url.substr(1);var strs=str.split("&");var response={};for(var i=0,LEN=strs.length;i<LEN;i++){response[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1])}return response}else{return{}}}},{key:"receiveCoupon",value:function receiveCoupon(coupon_id,secret){if(this.query.app==="i-lanehub"){window.webkit.messageHandlers.receiveCoupon.postMessage({coupon_id:coupon_id})}else{if(this.query.app==="a-lanehub"){window.lanehub.receiveCoupon(coupon_id)}else{window.location.href="/receive_coupon?ticket="+secret}}}}]);return LaneHub}();function receiveCouponSuccess(coupon_id){var couponBox=document.querySelectorAll(".customcoupon");if(!couponBox.length){return}for(var i=0,LEN=couponBox.length;i<LEN;i++){if(couponBox[i].getAttribute("data-id")==coupon_id){couponBox[i].querySelector(".send-coupon .receive").innerHTML="已领取"}}}window.addEventListener("load",function(){window.LaneHub=new LaneHub()},false);';
  body.appendChild(script);
};

export {
  couponInit
};
