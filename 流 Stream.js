//具体见书 P637
//每秒生成一个promise 具体使用见{异步 - 异步函数}
async function* stream() {
	for (let i = 1; i < 5; i++) {
		yield await new Promise((resove) => {
			setTimeout(resove, 1000, i);
		});
	}
}

/* //可读流
// const readableStream = new ReadableStream({
// 	async start(controller) {
// 		for await (let chunk of stream()) {
// 			controller.enqueue(chunk); //将数据放入流
// 		}
// 		controller.close(); //关闭流
// 	},
// });

// const readableStreamDefaultReader = readableStream.getReader(); //这里将readableStream的locked改为true

// //及时读取的 一旦流中放入它就读取
// (async function () {
// 	while (true) {
// 		const { done, value } = await readableStreamDefaultReader.read();
// 		if (done) {
// 			break;
// 		} else {
// 			console.log(value);
// 		}
// 	}
// })(); */

/* //转换流
//firefox不支持
const { writable, readable } = new TransformStream({
	transform(chunk, controller) {
		controller.enqueue(chunk * 2);
	},
});

const readableStreamDefaultReader = readable.getReader();
const writableStreamDefaultReader = writable.getWriter();

//读取流
(async function () {
	while (true) {
		const { done, value } = await readableStreamDefaultReader.read();
		if (done) {
			break;
		} else {
			console.log(value);
		}
	}
})();
//写入流
(async function () {
	for await (let chunk of stream()) {
		await writableStreamDefaultReader.ready;
		writableStreamDefaultReader.write(chunk);
	}
	writableStreamDefaultReader.close();
})(); */
