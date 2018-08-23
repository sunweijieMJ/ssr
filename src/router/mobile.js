import Official from './mobile/Official';
import Life from './mobile/Life';

export default [
  {
    path: '/',
    redirect: '/home'
  },
  Official,
  Life,
  {
    path: '*',
    redirect: '/'
  }
];
