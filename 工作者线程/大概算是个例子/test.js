//计时器
//页面加载完成后初始化
window.onload = function () {
	//创建定时器线程
	var worker = new Worker("./worker.js");
	//获取dom对象
	var domMinute_p = document.getElementById("Minute_p");
	var domSecond_p = document.getElementById("Second_p");
	worker.postMessage(600);

	//这里可以接受worker线程的返回值
	worker.onmessage = function (event) {
		let totalSecond = event.data;
		console.log(totalSecond);
		//计算分钟数
		var minute_p = parseInt(totalSecond / 60);
		domMinute_p.innerText = minute_p;
		//计算秒数
		var second_p = parseInt(totalSecond % 60);
		domSecond_p.innerText = second_p;
	};
};

//这里是模拟的耗时操作
function businessOnWorker() {
	//定义一个操作
	function business() {
		for (var i = 1; i < 1000; i++) {
			for (var j = 1; j < 1000; j++) {
				for (var k = 1; k < 5000; k++) {
					var b = k * 100;
				}
			}
		}
		self.postMessage(`业务终于走完了！ 结果是：${b}`);
		self.close();
	}
	//将该操作的自调转为url
	let businessURL = URL.createObjectURL(
		new Blob([`(${business.toString()})()`])
	);
	//用该操作做出一个线程
	let otherworker = new Worker(businessURL);
	//接收该操作的传递消息
	otherworker.onmessage = (event) => {
		console.log(event.data);
	};
}

//如果用异步操作 还是会卡
/* async function businessOnWorker() {
	return new Promise((resolve) => {
		for (var i = 1; i < 1000; i++) {
			for (var j = 1; j < 1000; j++) {
				for (var k = 1; k < 5000; k++) {
					var b = k * 100;
				}
			}
		}
		resolve(`业务终于走完了！ 结果是：${b}`);
	});
} */

let btn = document.querySelector("button");
btn.addEventListener("click", businessOnWorker);
/* btn.addEventListener("click", async () => {
	await businessOnWorker().then(console.log);
}); */
