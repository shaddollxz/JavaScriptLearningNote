/* 异步迭代器能在异步函数中用 for await of 遍历
 返回值是一个期约解决内容*/

//一个可迭代对象
var asyncIterable = {
	//默认异步迭代器
	[Symbol.asyncIterator]() {
		return {
			i: 0,
			next() {
				if (this.i < 3) {
					return Promise.resolve({ value: this.i++, done: false });
				}

				return Promise.resolve({ done: true });
			},
		};
	},
};

(async function () {
	for await (num of asyncIterable) {
		console.log(num);
	}
})();
