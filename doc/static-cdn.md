## 静态资源配置走cdn 域名

### 引入config/config.js 配置文件里面的resourceDomain变量

#### 1、 在webpack.base.config.js 引入config/confing

```
* process.argv[2] 读取的是外部配置, 如未配置，则读取src/config/config.js 配置
let envConfig = {};
if(process.argv[2] && fs.existsSync(process.argv[2])) {
  envConfig = require(process.argv[2]);
} else {
  envConfig = require('../config/config');
}
```

#### envConfig 变量调用 配置文件的变量

```
envConfig.resourceDomain
```

#### 配置图片使用CDN域名

```
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
          publicPath: isProd
            ? envConfig.resouceDomain + config.build.assetsPublicPath
            : config.dev.assetsPublicPath
        }
      },
```