import ToolApi from '../../api/mobile/tools';
import storage from '../../utils/storage/StorageApi';

class UserActions {
  constructor() {
    this.last_time = Date.now();
  }

  // 进入页面
  entry(page_name, extra) {
    console.log(3);
    this.last_time = Date.now();
    ToolApi().sendUserAction({
      actions: [
        {
          action_type: 'entry',
          action: -9999,
          page_name,
          local_time: Date.now().toString().substr(0, 10),
          extra: {
            ...extra,
            userAgent: window.navigator.userAgent,
            uuid: storage('cookie').get('ssr_authinfo')
          }
        }
      ]
    });
  }

  // 离开页面
  leave(page_name, extra) {
    ToolApi().sendUserAction({
      actions: [
        {
          action_type: 'leave',
          action: -9998,
          page_name,
          extra: {
            ...extra,
            userAgent: window.navigator.userAgent,
            uuid: storage('cookie').get('ssr_authinfo'),
            during: (Date.now() - this.last_time).toString().substr(0, 10)
          }
        }
      ]
    });
  }

  // 点击事件
  action(action_type, action, page_name, extra) {
    ToolApi().sendUserAction({
      actions: [
        {
          action_type,
          action,
          page_name,
          local_time: Date.now().toString().substr(0, 10),
          extra: {
            ...extra,
            userAgent: window.navigator.userAgent,
            uuid: storage('cookie').get('ssr_authinfo')
          }
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
