// 价格过滤
let priceFilter = n => {
  if(!n) return 0;
  n = n / 100;

  // 小数
  let pattern = /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
  if (pattern.test(n)) {
    n = n + '';
    const integer = n.split('.')[0];
    const decimals = ('.' + n.split('.')[1]);
    let len = integer.length;
    if (len <= 3) return integer + decimals;
    let r = len % 3;
    return r > 0 ? integer.slice(0, r) + ',' + integer.slice(r, len).match(/\d{3}/g).join(',') + decimals : '' + integer.slice(r, len).match(/\d{3}/g).join(',') + decimals;
  }
  // 整数
  let b = parseInt(n, 10).toString();
  let len = b.length;
  if (len <= 3) return '' + b;
  let r = len % 3;
  return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : '' + b.slice(r, len).match(/\d{3}/g).join(',');
};

export default priceFilter;
