//这里的全局是self，main里的全局是window
console.log("in worker");
//向主线程发送数据
self.postMessage("there is worker message");
self.postMessage("there is other worker message");
//设置worker接收数据后的操作
self.onmessage = (event) => {
	console.log(event);
};
//关闭线程 这里关闭只能阻止异步的执行 如果下面还有同步操作，那些操作仍然能执行
self.close();
postMessage("after close in worker");
setTimeout(self.postMessage, 0, "after close in worker by async");
