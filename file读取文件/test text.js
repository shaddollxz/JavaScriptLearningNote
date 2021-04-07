//部分读取
//只有text类型能分别读取再组合
let binary_chose = document.querySelector("#binaryfile");
let binary_put = document.querySelector("#binary");

binary_chose.addEventListener("change", (event) => {
	let binaryfile = event.target.files[0];
	let reader = new FileReader();
	let type = "";
	let begin = 0,
		end = 10,
		lenght = 10;

	let blob = binaryfile.slice(begin, end); //将选择的文件分割为Blob对象（一个二进制文件）

	if (blob) {
		reader.readAsText(blob);
		//读取失败时触发
		reader.onerror = function () {
			console.log(`error:${reader.error.code}`);
		};
		//读取进度 每50毫秒触发一次
		reader.onprogress = function (event) {
			if (event.lengthComputable) {
				console.log(`${event.loaded}/${event.total}`);
			}
		};
		//读取成功后触发
		reader.onload = async function () {
			binary_put.innerHTML += reader.result;
		};
		//读取结束后重新分割出blob再次读取
		reader.onloadend = function () {
			if (begin < binaryfile.size) {
				blob = binaryfile.slice((begin += lenght), (end += lenght));
				reader.readAsText(blob);
			}
		};
	}
});
