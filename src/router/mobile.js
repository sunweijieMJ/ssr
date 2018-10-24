import Official from './mobile/Official';
import Life from './mobile/Life';
import Mall from './mobile/Mall';
import Store from './mobile/Store';

export default [
  {
    path: '/',
    redirect: '/life/choiceness'
  },
  ...Official,
  Life,
  ...Mall,
  // ...Store,
  {
    path: '*',
    redirect: '/life/choiceness'
  }
];
