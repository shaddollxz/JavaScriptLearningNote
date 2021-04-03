//执行顺序
//在遇到异步函数时 会先执行后面的操作，等同步函数执行结束再执行里面操作
let x = 0;
setTimeout(() => {
	x++;
	console.log(`after 1s x=${x}`); //1
}, 1000);
console.log(`before 1s x=${x}`); //0 先执行

function double(num) {
	setTimeout(() => {
		console.log("will console");
		setTimeout(() => {
			console.log(`${num * 2}`);
		}, 0);
		console.log("console finish"); //比结果先出现
	}, 1000);
}
//double(2); //控制台手动执行更容易看出来

//回调 callback
//在等待时间后计算的值要传给某函数时使用
//但是当传值变得复杂时很难看懂
function double_in(num) {
	console.log(num);
}
function double_out(num, callback) {
	setTimeout(() => {
		callback(num * 2);
	}, 1000);
}

double_out(3, double_in);
