//async 使同步函数有异步特性：
//具体是返回的值会成为一个期约
//在执行到return时 会将函数返回挂起 继续同步执行
//在同步操作结束后 按先进先出的顺序执行return
async function say() {
	console.log(2);
	return 3;
}
async function say_two() {
	return 4;
}
say().then(console.log);
console.log(1);
say_two().then(console.log);
//2 1 3 4

//await最佳使用地是连续调用返回期约的函数
//await 在async函数中表示后续操作是异步 要先挂起
//await 可以解包期约

async function say_new() {
	console.log("before let p");

	let p = new Promise((resolve) => {
		setTimeout(resolve, 0, "say_new");
	});
	//let p = Promise.resolve("useing p");

	console.log("after let p : ", p); //pending
	console.log("before use p");
	//这句以及以后的会等待同步执行完成后再执行
	console.log(await p); //无论p是否已经resolved 遇到await仍然会挂起
	console.log("after use p");
}
console.log("before say_new");
say_new();
console.log("after say_new");
//before say_new -- before let p -- before use p -- after say_new -- useing p -- after use p
//先按同步执行函数 直到遇到await 这时退出函数继续同步执行后面的函数
//等到同步执行结束 再从await处继续执行函数

//对于当个异步操作 async/await 与期约操作相差不多
//但在多重调用时会很方便
function say_neo() {
	let p = new Promise((resolve) => {
		setTimeout(resolve, 3000, "say_neo");
	});
	return p;
}
//
function say_next() {
	say_neo().then((x) => {
		console.log(x);
	});
}
//
async function say_next_async() {
	console.log(await say_neo());
}
