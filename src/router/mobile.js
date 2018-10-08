import Official from './mobile/Official';
import Life from './mobile/Life';
import Mall from './mobile/Mall';

export default [
  {
    path: '/',
    redirect: '/life/choiceness'
  },
  ...Official,
  Life,
  ...Mall,
  {
    path: '*',
    redirect: '/life/choiceness'
  }
];
