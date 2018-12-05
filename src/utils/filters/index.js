// 引入所有的过滤函数
import imageSize from './imageSize';
import titleFilter from './titleFilter';
import scientific from './scientific';
import timeFilter from './timeFilter';
import readMore from './readMore';
import {multiply, divide} from './number';

// 导出在一个对象上
export default {
  imageSize, titleFilter, scientific, timeFilter, readMore, multiply, divide
};
