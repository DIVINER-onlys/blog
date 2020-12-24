// import '@babel/polyfill';
// import 'core-js';
// import 'core-js/features/promise';
// import 'core-js/stable'
// import 'regenerator-runtime/runtime';

const add = (x, y) => x + y;

console.log(add(5, 6));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了');
    resolve();
  }, 1000);
});

console.log(promise);
