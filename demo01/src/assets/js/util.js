/**
 * Created by Administrator on 2017/12/29 0029.
 */

const temp = require('./temp');

console.log('util.js');

let str = 'util.js str'

console.log(`my name is glen, ${str}`);

let arr = {glen: 'glen', selina: 'selina'};

console.log(Object.keys(arr));

let s1 = Symbol('foo');
let s2 = Symbol('bar');

console.log(s1);

console.log(temp());
console.log(__dirname);



