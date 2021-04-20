//接受事件参数
let totalSecond;
var onmessage = function (e) {
	console.log("worker get " + e.data);
	totalSecond = e.data;
};
var timeId = setInterval(function () {
	totalSecond--;

	if (totalSecond == 0) {
		self.close(); //计时结束关闭该线程
	}
	//console.log(totalSecond);
	postMessage(totalSecond); //每秒向主线程发送信息
}, 1000);
