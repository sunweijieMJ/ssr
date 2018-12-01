import Official from './mobile/Official';
import Life from './mobile/Life';
import Mall from './mobile/Mall';
import Store from './mobile/Store';
import Personal from './mobile/personal';
import Tools from './mobile/Tools';

export default [
  {
    path: '/',
    redirect: '/life/choiceness'
  },
  ...Official,
  Life,
  Personal,
  ...Mall,
  ...Store,
  ...Tools,
  {
    path: '*',
    redirect: '/life/choiceness'
  }
];
