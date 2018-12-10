<template>
  <div class="map">
    <!-- 引入高德地图 -->
    <link rel="stylesheet" href="//cache.amap.com/lbs/static/main1119.css" />
    <PublicTitle :pageTitle="address" v-if="!(response.__platform === 'app' || isTencent)"></PublicTitle>
    <!-- 地图容器 -->
    <div id="container" class="map"></div>
  </div>
</template>
<script>
  import hidetitle from '../../../mixins/hidetitle.js';
  import {loadScript} from '../../../utils/business/tools.js';
  import {PublicTitle} from '../../../components/mobile/business';

  export default {
    title() {
      return `${this.query.address}`;
    },
    meta() {
      return `<meta name="description" content="地图">
              <meta name="keywords" content="地图">`;
    },
    components: {PublicTitle},
    mixins: [hidetitle],
    data(){
      return {
        Amap: null,
        query: this.$route.query,
        address: '',
        lnglatXY: [121.402903, 31.201715]
      };
    },
    mounted(){
      let that = this;
      if(that.query.address) that.address = that.$route.query.address;
      if(that.query.longitude && that.query.latitude) {
        that.lnglatXY = [+that.query.longitude, +that.query.latitude];
      }
      loadScript(document.body, '//webapi.amap.com/maps?v=1.4.8&key=37ac6c6d7974636a6908d7daf90056fe', () => {
        that.init(that.lnglatXY);
      });
    },
    methods: {
      init(center) {
        let that = this;
        that.Amap = new AMap.Map('container', {
          center,
          resizeEnable: true,
          zoom: 13
        });
        that.getControl();
        that.addMarker();
      },
      // 获取工具条
      getControl() {
        // 使用地图控件
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation'], () => {
          // 工具条(集成了缩放、平移、定位等功能按钮在内的组合控件)
          this.Amap.addControl(new AMap.ToolBar());
          // 比例尺(展示地图在当前层级和纬度下的比例尺)
          this.Amap.addControl(new AMap.Scale());
          // 定位(用来获取和展示用户主机所在的经纬度位置)
          this.Amap.addControl(new AMap.Geolocation());
        });
      },
      // 添加标记物
      addMarker() {
        let that = this;
        const marker = new AMap.Marker({
          map: that.Amap,
          position: that.lnglatXY
        });

        marker.setMap(that.Amap);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .map #container {
    width: 7.5rem;
  }
</style>

