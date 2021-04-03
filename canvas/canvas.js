//requestAnimationFrame
//之前摸鱼时用的settimeout来设置时间循环画图 在离开屏幕时也会占用内存来画图
//该方法根据系统每次刷新屏幕次数执行其中的函数 在离开该页面时会暂停执行
var progress = 0;
//回调函数
function render() {
	progress += 1; //修改图像的位置
	console.log(progress);
	if (progress < 100000) {
		//在动画没有结束前，递归渲染
		window.requestAnimationFrame(render);
	}
}
//第一帧渲染
//window.requestAnimationFrame(render);

const drawing = document.querySelector("canvas");
let pen = drawing.getContext("2d");

//
let gradient = pen.createLinearGradient(30, 30, 70, 70); //渐变的位置 超出这个大小后不会有渐变效果
gradient.addColorStop(0, "yellow"); //渐变的初始颜色
gradient.addColorStop(1, "black"); //渐变的结束颜色
pen.fillStyle = gradient; //指定填充色 渐变
pen.strokeStyle = "red"; //指定描边色

pen.fillRect(20, 20, 150, 150);

pen.moveTo(30, 30); //指定初始点
pen.lineTo(70, 70); //指定目标点 这条线就是渐变范围
pen.stroke(); //画出

//导出canvas上的图片
let imgURI = drawing.toDataURL("image/png");
let image = document.createElement("img");
image.src = imgURI;
document.body.appendChild(image);
