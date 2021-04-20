//通过其他脚本使用工作者线程
let worker = new Worker("./worker.js");
console.log("in main");
//设置onmessage接收数据
worker.onmessage = (event) => {
	console.log(event.data);
};
//给worker传递数据
worker.postMessage("there is main");
console.log("after post message");
//在主线程中关闭线程 这里的关闭会立刻关闭 传递接收数据是异步的 会阻止这些操作
//worker.terminate();

//使用url加载本部脚本
function fibonacci(n) {
	return n < 0 ? 1 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}
//函数调用tostring()返回函数定义的字符串
const workerScript = `self.postMessage((${fibonacci.toString()})(9))`;
const workerScriptBlob = new Blob([workerScript]);
const workerScriptBlobUrl = URL.createObjectURL(workerScriptBlob);
const workerInThere = new Worker(workerScriptBlobUrl);
workerInThere.onmessage = (event) => {
	console.log(event.data);
};
worker.postMessage("there is main");
