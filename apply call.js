//apply 和 call 的区别
function Father(name, age) {
	this.name = name;
	this.age = age;
	console.log(`the arguments: ${[...arguments]} the name is: ${name}`);
}
function Son(arr) {
	Father.apply(this, arr); //apply传递的是一个数组给指定对象的arguments 所以要求顺序相同
	this.otherthing = arr[2];
}

let son = new Son([233, "haha", 233]);
console.log(son.age); //haha

function Grandson(age, name, otherthing) {
	Father.call(this, age, name); //call传递的是具体的属性 如果传入的值顺序与其不同，可以按顺序传入指定值
	this.otherthing = otherthing;
}
let grandson = new Grandson(233, "hahaha", 233);
console.log(grandson.age); //hahaha
