import Life from './app/Life';

export default [
  {
    path: '/',
    redirect: '/moment_detail/:id'
  },
  Life,
  {
    path: '*',
    redirect: '/'
  }
];
