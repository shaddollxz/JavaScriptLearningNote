//冒泡事件
let btn = document.querySelector("#mybtn");

function click_mybtn(event) {
	//console.log(this.dataset.mess);
	console.log(event.target.dataset.mess); //event.target指向调用该函数的实例
	//event.stopPropagation(); //阻止了冒泡 这样就不会继续触发下面的body和document的click事件
}
btn.addEvent("click", click_mybtn);

document.body.addEvent("click", (event) => {
	console.log("click body");
});

//阻止事件的默认行为
let baidu = document.querySelector("a");
baidu.addEvent("click", (event) => {
	window.open(baidu.href);
	console.log("click baidu");
	event.preventDefault(); //阻止事件的默认行为
	//return false;
});

//load事件
window.addEventListener("load", (event) => {
	let img = document.createElement("img");
	img.addEventListener("load", (event) => {
		console.log(event.target.src);
	});
	document.body.appendChild(img);
	//img.src = "./img/1.jpg";
});

//firefox中滚轮是DOMMouseScroll 其他浏览器是mousewheel
btn.addEvent("mousewheel", (event) => {
	console.log(event);
});

//检查键盘的输入
document.body.addEvent("keydown", (event) => {
	console.log(event);
	if (event.ctrlKey) {
		console.log("press ctrl");
		if (event.key == "c") {
			console.log("press ctrl+c");
		}
	}
});

//事件委托
//使用冒泡事件的特性 把大部分触发事件放到冒泡最顶层 document 然后判断点击的位置触发事件
document.addEventListener("click", (event) => {
	let ele = event.target; //获得点击时的目标

	switch (ele.id) {
		case "mybtn":
			console.log("click btn (from document)");
			event.stopPropagation(); //实际上是在document上触发的 这是冒泡的最高层 停止冒泡不会阻止body的事件触发
			break; //这样就能阻止了
		case "mybody":
			console.log("click body (from document)");
	}
});
