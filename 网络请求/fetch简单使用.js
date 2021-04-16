//使用前开jsonserver

//向服务器发送请求
function getmess() {
	let r = fetch("http://localhost:3000/users?id=2");

	r.then(
		//该期约解决是一个请求是否成功等属性
		(response) => {
			console.log(response);

			//直接读取json
			//用文本方式读取内容将json改为text
			response.json().then(
				(data) => {
					console.log(data);
				},
				//这里的rejected解决是无法读取 或者404
				(err) => {
					console.log("err inner");
				}
			);
		},
		//这里的解决是浏览器超时
		(err) => {
			console.log("err outer");
		}
	);
}

//和上面一样
/* fetch("http://localhost")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
	}); */

//读取服务器上图片或者媒体
let img = document.createElement("img");

function getpng() {
	const url = "http://127.0.0.1:5500/JSON%20Server/test.png";
	fetch(url)
		.then((source) => {
			return source.blob(); //用二进制读取图像
		})
		.then((data) => {
			/* let reader = new FileReader(); //创建文件读取器
			reader.readAsDataURL(data); //读取二进制图像
			reader.onerror = () => {
				console.log("load png error");
			};
			reader.onload = () => {
				img.src = reader.result;
			}; */

			//使用创建URL的方法读取blob对象
			img.src = URL.createObjectURL(data);
			document.body.appendChild(img);
		});
}

//向服务器发送数据
function sendmess() {
	let payload = JSON.stringify({ new: "1st" });
	let jsonHeader = new Headers({ "Content-Type": "application/json" });

	fetch("http://localhost:3000/xxx", {
		//../JSON Server/db.json 不能发送给它
		method: "POST", //发送的方法
		body: payload, //要发送的数据
		headers: jsonHeader,
	});
}
