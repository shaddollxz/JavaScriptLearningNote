//异步生成器写法
async function* streamGenerator(stream) {
	const reader = stream.getReader();
	try {
		while (true) {
			const { value, done } = await reader.read();
			if (done) {
				break;
			}
			yield value; //是Uint8Array格式
		}
	} catch (error) {
		console.log("error");
	} finally {
		reader.releaseLock();
	}
}

let decoder = new TextDecoder(); //解码器用来把迭代到的Uint8Array解码
let img = document.querySelector("img");

fetch("../JSON Server/db.json")
	.then((response) => {
		console.log(response);
		return response.body;
	})
	.then(async (body) => {
		for await (chunk of streamGenerator(body)) {
			document.write(decoder.decode(chunk, { stream: true }));
			//console.log(chunk);
		}
	});

//异步迭代器版写法
/* fetch("https://fetch.spec.whatwg.org/")
	.then((response) => {
		return response.body;
	})
	.then(async (body) => {
		let reader = body.getReader();

		let asyncIterable = {
			//每次调用该迭代器的next()都会返回一个reader.read()返回的期约
			[Symbol.asyncIterator]() {
				return {
					next() {
						return reader.read();
					},
				};
			},
		};

		//异步迭代器用for await of 迭代
		//如果迭代的是期约 会返回它的解决 如果不是 则直接返回
		for await (chunk of asyncIterable) {
			console.log(chunk);
		}
	}); */
