<template>
  <div class="module-desc rich-text">
    <div v-html="response"></div>
    <vue-video :noHaveDiv="1"></vue-video>
  </div>
</template>
<script>
  import {VueVideo} from '../mobile/public';
  import MallApi from '../../api/mobile/mall.js';
  import Moment from '../../utils/business/moment.js';

  export default {
    props: ['response'],
    components: {VueVideo},
    mounted() {
      // this.couponInit();
    },
    methods: {
      couponInit() {
        let that = this;
        const couponBox = document.getElementsByClassName('customcoupon');
        for (let i = 0, LEN = couponBox.length; i < LEN; i++) {
          const coupon_id = couponBox[i].getAttribute('data-id');
          that.getTicketInfo(coupon_id).then(res => {
            if(!res.status) return;
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
      },
      async getTicketInfo(ticket_id) {
        return await MallApi().getTicketInfo({ticket_id});
      }
    }
  };
</script>
<style lang="scss">
  @import '../../assets/scss/component/_richtext.scss';
</style>

