import fillZero from './fillZero';

// 时间过滤
let timeFilter = (time, type = 1) => {
  // Safari只支持yyyy/mm/dd
  if (!time) return '';
  time = time.split('-').join('/');
  const old = new Date(time).getTime();
  const cur = new Date().getTime();
  const space = (cur - old);
  // 获取
  const cur_year = new Date().getFullYear();
  const cur_date = new Date().getDate();
  const year = new Date(old).getFullYear();
  const month = new Date(old).getMonth() + 1;
  const date = new Date(old).getDate();
  const hours = new Date(old).getHours();
  const minutes = new Date(old).getMinutes();
  // 时间分界点
  const JUST_NOW = 1000 * 60;
  const HOUR = 1000 * 60 * 60;
  const ONE = 1000 * 60 * 60 * 24;
  const TWO = 1000 * 60 * 60 * 24 * 2;
  const THREE = 1000 * 60 * 60 * 24 * 3;

  switch (true) {
    case type === 3 && cur_year === year:
      return `${fillZero(month)}-${fillZero(date)}`;
      break;
    case type === 3 && cur_year !== year:
      return `${year.toString().slice(2)}-${fillZero(month)}-${fillZero(date)}`;
      break;
    case space < JUST_NOW:
      return '刚刚';
      break;
    case space >= JUST_NOW && space < HOUR:
      return `${Math.floor(space / (60 * 1000))}分钟前`;
      break;
    case space >= HOUR && space < ONE:
      return `${Math.floor(space / (60 * 60 * 1000))}小时前`;
      break;
    case space < TWO && (date + 1 === cur_date):
      return `昨天 ${fillZero(hours)}:${fillZero(minutes)}`;
      break;
    case space < TWO && (date + 1 !== cur_date):
      return `前天 ${fillZero(hours)}:${fillZero(minutes)}`;
      break;
    case space < THREE && (date + 2 === cur_date):
      return `前天 ${fillZero(hours)}:${fillZero(minutes)}`;
      break;
    case space < THREE && (date + 2 !== cur_date) && type === 1:
      return `${fillZero(month)}-${fillZero(date)}`;
      break;
    case space < THREE && (date + 2 !== cur_date) && type === 2:
      return `${fillZero(month)}-${fillZero(date)} ${fillZero(hours)}:${fillZero(minutes)}`;
      break;
    case space >= THREE && cur_year === year && type === 1:
      return `${fillZero(month)}-${fillZero(date)}`;
      break;
    case space >= THREE && cur_year !== year && type === 1:
      return `${year}-${fillZero(month)}-${fillZero(date)}`;
      break;
    case space >= THREE && cur_year === year && type === 2:
      return `${fillZero(month)}-${fillZero(date)} ${fillZero(hours)}:${fillZero(minutes)}`;
      break;
    case space >= THREE && cur_year !== year && type === 2:
      return `${year}-${fillZero(month)}-${fillZero(date)} ${fillZero(hours)}:${fillZero(minutes)}`;
      break;
    default:
      break;
  }
};

export default timeFilter;
