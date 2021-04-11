//下载内存中的文件
let dowload = document.querySelector("#dowload");
dowload.addEventListener("click", downFlie);
function downFlie() {
	//要下载的文件内容
	var jsonObj = {
		name: "Leon WuV",
		age: 23,
	};

	// 创建a标签
	var elementA = document.createElement("a");

	//文件的名称为时间戳加文件名后缀
	elementA.download = new Date() + ".tpl";
	elementA.style.display = "none";

	//生成一个blob二进制数据，内容为json数据
	var blob = new Blob([JSON.stringify(jsonObj)]);

	//生成一个指向blob的URL地址，并赋值给a标签的href属性
	elementA.href = URL.createObjectURL(blob);
	debugger;
	document.body.appendChild(elementA);
	elementA.click(); //模拟一次标签的点击
	document.body.removeChild(elementA);
}
