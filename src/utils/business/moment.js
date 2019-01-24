
class Moment {

  constructor() {
  }

  format(time, type) {
    if (!isNaN(+time)) time = +time;
    if (typeof time === 'string') time = time.split('-').join('/');

    const year = new Date(time).getFullYear();
    const month = new Date(time).getMonth() + 1;
    const date = new Date(time).getDate();
    switch (type) {
      case 'YYYY/MM/DD':
        return `${year}/${month}/${date}`;
        break;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${date}`;
        break;
      default:
        return `${year}/${month}/${date}`;
        break;
    }
  }

}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Moment();
  return instance;
};
