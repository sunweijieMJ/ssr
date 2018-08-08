/**
 * API 基类
 */
import fetch from 'create-api';

class Abstract {
  constructor() {
    // 注入axios
    this.$api = {
      fetch,
      abc: 123
    };
  }
}

export default Abstract;
