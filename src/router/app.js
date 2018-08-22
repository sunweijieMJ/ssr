import Life from './app/Life';

export default [
  {
    path: '/',
    redirect: '/moment_detail/37078'
  },
  Life,
  {
    path: '*',
    redirect: '/'
  }
];
