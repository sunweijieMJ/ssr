import Official from './mobile/Official';
import Life from './mobile/Life';

export default [
  {
    path: '/',
    redirect: '/about/home'
  },
  Official,
  Life,
  {
    path: '*',
    redirect: '/about/home'
  }
];
