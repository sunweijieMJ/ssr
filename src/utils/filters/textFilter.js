// 文字过滤
let textFilter = str => {
  return str.replace(/\r|\n/g, '<br>');
};

export default textFilter;
