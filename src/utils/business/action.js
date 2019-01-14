import ToolApi from '../../api/mobile/tools';

// 进入页面
const entry = (page_name, extra) => {
  ToolApi().sendUserAction({actions: [
    {
      action_type: 'entry',
      action: -9999,
      page_name,
      local_time: Date.now(),
      extra
    }
  ]});
};

// 离开页面
const leave = (page_name, last) => {
  ToolApi().sendUserAction({
    actions: [
      {
        action_type: 'leave',
        action: -9998,
        page_name,
        extra: {
          during: Date.now() - last
        }
      }
    ]
  });
};

// 点击事件
const click = (page_name, extra) => {
  ToolApi().sendUserAction({
    actions: [
      {
        action_type: 'click',
        action: 2,
        page_name,
        local_time: Date.now(),
        extra
      }
    ]
  });
};

export {
  entry, leave, click
};
