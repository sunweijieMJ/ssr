<template>
  <div class="coupon" v-html="test">
  </div>
</template>
<script>
  export default {
    title() {
      return 'Lanehub - 领取优惠券';
    },
    meta() {
      return `<meta name="description" content="Lanehub 领取优惠券">
              <meta name="keywords" content="瓴里, 领取优惠券">`;
    },
    data() {
      return {
        test: `<h1>领取优惠券测试按钮</h1>
    <button class="custom-coupon" data-id="1">领取优惠券</button>`
      };
    },
    mounted() {
      class LaneHub {
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

        receiveCoupon() {
          const coupon = document.querySelector('.custom-coupon');
          const coupon_id = coupon.getAttribute('data-id');
          if (this.query.app === 'i-lanehub') {
            window.webkit.messageHandlers.receiveCoupon.postMessage({coupon_id});
          } else if(this.query.app === 'a-lanehub') {
            window.lanehub.receiveCoupon({coupon_id});
          }
          this.receiveCouponSuccess();
        }
        receiveCouponSuccess() {
          const coupon = document.querySelector('.custom-coupon');
          coupon.classList.add('received');
        }
      }

      window.addEventListener('load', () => {
        window.LaneHub = new LaneHub();
        const coupon = document.querySelector('.custom-coupon');
        coupon.addEventListener('click', () => {
          window.LaneHub.receiveCoupon();
        }, false);
      }, false);
    }
  };
</script>
<style lang="scss">
  .coupon {
    .received {
      background-color: red;
    }
  }
</style>


