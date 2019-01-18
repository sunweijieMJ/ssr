import ToolApi from '../../api/mobile/tools';

class UserActions {
  constructor() {
    this.last_time = Date.now();
  }

  // 进入页面
  entry(page_name) {
    this.last_time = Date.now();
    ToolApi().sendUserAction({
      actions: [
        {
          action_type: 'entry',
          action: -9999,
          page_name,
          local_time: Date.now().toString().substr(0, 10)
        }
      ]
    });
  }

  // 离开页面
  leave(page_name) {
    ToolApi().sendUserAction({
      actions: [
        {
          action_type: 'leave',
          action: -9998,
          page_name,
          extra: {
            during: (Date.now() - this.last_time).toString().substr(0, 10)
          }
        }
      ]
    });
  }

  // 点击事件
  click(page_name) {
    ToolApi().sendUserAction({
      actions: [
        {
          action_type: 'click',
          action: 2,
          page_name,
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
