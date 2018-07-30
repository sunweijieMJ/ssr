# SSR

## entrance

### server
* global.config  全局配置文件方法： 比如getApiClientHost()
* global.initConfig 全局初始配置对象，client使用 ex: initConfig.apiClientHost

### router
* 设置context 值，跟reader 使用，客户端直接加入到`<script>` 里面提供client使用

### render

## build

## src

### api
* client-api
    * 客户端axios直接调用
    * @todo 加入签名等封装 
* server-api
    * 服务器调用，内部域名，忽略签名验证
    * 对后端API调用性能捕获输出log

### assets

### config
* client.config
* server.config
* config
### components
* common
* app
* mobile
* web

### interceptor
* 检查设备
    * 1、cookie
    * 2、域名
    * 3、User Agent
    * cookie值的设置，以及context上下文关联变量

### mixins
* meta
* title

### router
* index.js
    * 根据global.siteType 切换路由 app,
 web , mobile

### store
* module模块化提供业务使用

### utils
* axios
* device

### views
* common
* app
* mobile
* web

### app.js

### App.vue

### client.entry.js

### server.entry.js
* global 全局变量

### index.template.html
* siteType for Client

## testunit
