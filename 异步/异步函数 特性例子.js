let innerfunc;

function asyncfunc() {
	let promise = new Promise((resolve) => {
		console.log("before resolve");
		innerfunc = () => {
			resolve("OK");
		};
		console.log("after resolve");
	});
	return promise;
}

async function func() {
	console.log("before asyncfunc");
	await asyncfunc().then(console.log);
	console.log("after asyncfunc");
	return "there is func";
}

//首先调用func() 然后在调用innerfunc() func()才会全部执行完

//await到底在这里有什么用？？？
//await在等待后面的异步函数返回的promise的resolve
//如果promise是pendding中 那么会阻塞后面的操作 直到该函数的promise成为resolve
//await后的promise在pendding中 这时候返回值也是个pendding
