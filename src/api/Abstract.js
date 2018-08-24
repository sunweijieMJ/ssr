/**
 * API 基类
 */
// import axiosPlugin from '../utils/AxiosPlugin';
import axiosPlugin from './create.api.server';

class Abstract {
  constructor() {
    // 注入axios
    this.$api = axiosPlugin;
  }
}

export default Abstract;
