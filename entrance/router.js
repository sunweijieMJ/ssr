/* eslint-disable consistent-return */
const router = require('koa-router')();
const LRU = require('lru-cache');
const View = require('./render');

const isProd = process.env.NODE_ENV === 'production';

const useMicroCache = process.env.MICRO_CACHE !== 'false';
const cacheUrls = ['/'];

const isCacheable = ctx => cacheUrls.indexOf(ctx.url) >= 0 && useMicroCache;

const microCache = LRU({
  max: 100,
  maxAge: 1200
});

module.exports = (app) => {
  // create vue renderer instance
  const view = new View(app);

  async function render(ctx, next) {
    // render middleware
    ctx.type = 'html';

    const {PassThrough} = require('stream');
    ctx.body = new PassThrough();

    if (!view.renderer) {
      ctx.body.end('waiting for compilation... refresh in a moment.');
      return;
    }

    // hit micro cache
    const cacheable = isCacheable(ctx);
    if (cacheable) {
      const html = microCache.get(ctx.url);
      if (html) {
        ctx.set('X-Cache-Hit', '1');
        ctx.body.end(html);
        return;
      }
    }

    function handleError(error) {
      // console.error('RENDER ERROR', error)
      if (error.url) {
        // fixed stream.push after EOF
        return ctx.redirect(error.url);
      } else if (error.code === 404) {
        ctx.status = 404;
        ctx.body.end('404 | Page Not Found');
      } else {
        // Render Error Page or Redirect
        ctx.status = 500;
        ctx.body.end('500 | Internal Server Error');
        console.error(`error during render : ${ctx.url}`);
        if(process.env.NODE_ENV === 'development') {
          console.error(error.stack);
        }
      }
    }

    function handleEnd(content) {
      if (cacheable) {
        // set micro cache
        microCache.set(ctx.url, content);
      }
      ctx.body.end(content);
    }

    try {
      const context = {
        title: 'LaneHub',
        meta: '',
        url: ctx.url,
        // 根据网站类型，切换路由，map : intercepter => ctx.siteType => render.js => router/index.js
        siteType: ctx.siteType,
        initConfig: JSON.stringify(global.initConfig)
      };
      const content = await view.render(context);
      handleEnd(content);
    } catch (error) {
      handleError(error);
    }
  }

  router.get(/^(?!\/dist)(?:\/|$)/, isProd ? render : (ctx, next) => {
    view.ready.then(() => render(ctx, next));
  });

  return router;
};
