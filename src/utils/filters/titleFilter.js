// 标题过滤
let titleFilter = str => {
  return str.replace(/\[文章\]|\[话题\]|\[活动\]/g, '');
};

export default titleFilter;
