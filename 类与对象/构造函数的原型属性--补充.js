function A() {
	this.a = "1st";
	this.b = 1;
}
A.prototype.c = "2nd";
A.prototype.d = 2;

let a = new A();
let b = new A();
console.log(a);
console.log(b);

a.c = "3rd";
a.d++;
/* 这时a的原型上的值没有被修改 而是实际属性上多了定义的方法 */

console.log("end");
