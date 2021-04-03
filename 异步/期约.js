/**
 * 期约
 * 期约是有三种状态的对象
 * 待定 pending
 * 兑现 解决 fulfilled resolved
 * 拒绝 rejected
 *
 * 状态时私有的 无法直接读取 修改
 */

//控制期约状态
//① 用执行函数实例化期约
let p1 = new Promise((resolve, reject) => resolve());
console.log(p1, "p1"); //fulfilled (和resolve是一个东西)
//② 用静态方法立刻实例化一个指定方法的期约
let p2 = Promise.reject(233); //233是拒绝的原因
console.log(p2, "p2"); //{rejected 233} Uncaught (in promise) 233

//实例化一个等待1秒后自动拒绝的期约
let p3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject();
	}, 1000);
});
setTimeout(console.log, 0, p3, "p3"); //pending 立刻调用
setTimeout(console.log, 1100, p3, "p3"); //fulfilled 等待一秒后调用

/**
 * then(onResolved,onRejected)方法
 * 在期约属性变为指定值时执行对应函数
 * catch(onRejected) 相当于 then(null,onRejected) 能用来捕获rejected中的错误
 * finally(onFinally) 在resolved或者rejected时都会执行
 */
function onResolved() {
	console.log("already resolved");
}
function onRejected(name) {
	console.log(`${name} already rejected`);
}
let p4 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject("p4");
	}, 1000);
});
p4.then(onResolved, () => onRejected("p4"));

//then方法返回一个新的期约
//返回的值会被包装为新的期约
//resolved和rejected都会返回resolved期约
let p5 = p4.then(
	() => "return resolved",
	() => "return rejected"
);
console.log(p5, "p5"); //resolved "return rejected"
//如果不放入函数 将p4传递给p6
let p6 = p4.then(); //rejected "p4" 和p4值一样 但不等

//finally返回的期约和原来的相同
let p7 = p4.finally(() => {
	"p7";
}); //rejected p4
//但是如果函数中返回一个待定或拒绝的新期约 将会和返回的新期约相同
let p8 = p4.finally(() => {
	return Promise.reject("p8");
}); //rejected p8

//all(iterable) 不止数组 能迭代就行
//输出的是包含其中期约值的数组
//只有当其中的所有期约完成时才会完成 如果其中有个rejected 则只返回第一个rejected
let all_test = Promise.all([1, 2, 3]);
console.log(all_test, "all_test"); //valu是数组[1,2,3]

let all = Promise.all([
	Promise.resolve("1st not need wait"),
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("2nd need wait 1s");
		}, 1000);
	}),
]);
console.log(all, "all"); //pendding
setTimeout(() => {
	console.log(all, "all some wait");
}, 1100);

//race(iterable)
//返回第一个落定的期约 （无论resolved还是rejected）
let race_test = Promise.race([2, 3, 4]);
console.log(race_test, "race_test"); //2

//返回第一个落定的2nd
let race = Promise.race([
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("1st need wait 1s");
		}, 1000);
	}),
	Promise.resolve("2nd not need wait"),
]);
