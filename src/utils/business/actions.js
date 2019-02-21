import ToolApi from '../../api/mobile/tools';

class UserActions {
  constructor() {
    this.last_time = Date.now();
  }

  // 进入页面
  entry(ctx, route) {
    this.last_time = Date.now();
    ToolApi().sendUserAction({
      actions: [
        {
          action_type: 'entry',
          action: -9999,
          page_name: ctx.location.pathname,
          local_time: Date.now().toString().substr(0, 10),
          extra: {
            params: route.params,
            current_url: ctx.document.URL,
            last_url: ctx.document.referrer,
            userAgent: ctx.navigator.userAgent
          }
        }
      ]
    });
  }

  // 离开页面
  leave(ctx, route) {
    ToolApi().sendUserAction({
      actions: [
        {
          action_type: 'leave',
          action: -9998,
          page_name: ctx.location.pathname,
          extra: {
            params: route.params,
            current_url: ctx.document.URL,
            last_url: ctx.document.referrer,
            userAgent: ctx.navigator.userAgent,
            during: (Date.now() - this.last_time).toString().substr(0, 10)
          }
        }
      ]
    });
  }

  // 点击事件
  click(ctx) {
    ToolApi().sendUserAction({
      actions: [
        {
          action_type: 'click',
          action: 2,
          page_name: ctx.location.pathname,
          local_time: Date.now().toString().substr(0, 10)
        }
      ]
    });
  }
}

let instance;
export default () => {
  if (instance) return instance;
  instance = new UserActions();
  return instance;
};
