//用期约判断是否把函数运行完的例子

//一个需要时间执行完的函数
function Sometime(callback) {
	//需要大量时间计算的for循环 仍然是逐步执行 然后返回true
	//这是同步执行的函数 所以用if仍然能判断出时候结束
	//for (let timer_time = 1245140000; timer_time >= 0; timer_time--) {}
	//return "for end";

	//settimeout 则是在执行到该函数时挂起 等等待时间过了后再执行函数中内容
	//所以后面紧跟着的for循环接手不到return
	// setTimeout(() => {
	// 	callback("after 1s");
	// 	return "after 1s";
	// }, 1000);

	//这样用settimeout包装一下就能异步执行for循环了
	//这里期约实例化等待的时间是for循环需要的时间
	setTimeout(() => {
		for (let timer_time = 1145140000; timer_time >= 0; timer_time--) {}
		callback("for end");
		return "for end";
	}, 0);
}

//不使用期约时
//返回的是undefined 此时sometime中的函数仍然在挂起 没有执行
if (Sometime(console.log)) {
	console.log("if : all run out");
} else {
	console.log("if : not run out");
}
console.log("if end");

//使用期约时
console.log("this time timer is not setting");
let timer = new Promise((resoled, rejected) => {
	Sometime(resoled);
});
timer.then(
	() => {
		console.log("promise : all run out");
	},
	() => {
		console.log("promise : not run out");
	}
);
