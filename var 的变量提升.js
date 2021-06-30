//! 变量声明提升
//! 提升的只是声明 即 var a;
console.log(a); // undefend
a = 123;
console.log(a); // 123
var a = 456;
console.log(a); // 456
