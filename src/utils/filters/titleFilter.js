// 标题过滤
let titleFilter = str => {
  let title = str.replace(/\[文章\]|\[话题\]|\[活动\]/g, '');
  title = title.replace(/\[[^\\[]+[活动 | 商品 | 话题]\|\d+\]/g, '');
  return title;
};

export default titleFilter;
