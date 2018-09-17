import Official from './mobile/Official';
import Life from './mobile/Life';
import Mall from './mobile/Mall';

export default [
  {
    path: '/',
    redirect: '/about/home'
  },
  ...Official,
  Life,
  ...Mall,
  {
    path: '*',
    redirect: '/about/home'
  }
];
