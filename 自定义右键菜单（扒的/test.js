window.onload = function () {
	// 获取节点
	var menu = document.getElementById("menu");

	//获取可视区宽度,高度
	var winWidth =
		document.documentElement.clientWidth || document.body.clientWidth;
	var winHeight =
		document.documentElement.clientHeight || document.body.clientHeight;

	// 点击空白区域 隐藏菜单
	document.addEventListener("click", function () {
		menu.style.display = "none";
		menu.style.left = 0 + "px";
		menu.style.top = 0 + "px";
	});

	// 点击菜单触发的事件
	menu.addEventListener("click", function (e) {
		var e = e || window.event;
		console.log(e.target.innerText);
	});

	//右键菜单
	document.oncontextmenu = function (e) {
		var e = e || window.event;
		menu.style.display = "block";
		// 获取鼠标坐标
		var mouseX = e.clientX;
		var mouseY = e.clientY;

		// 判断边界值，防止菜单栏溢出可视窗口
		if (mouseX >= winWidth - menu.offsetWidth) {
			mouseX = winWidth - menu.offsetWidth;
		} else {
			mouseX = mouseX;
		}
		if (mouseY > winHeight - menu.offsetHeight) {
			mouseY = winHeight - menu.offsetHeight;
		} else {
			mouseY = mouseY;
		}
		menu.style.left = mouseX + "px";
		menu.style.top = mouseY + "px";
		//隐藏默认的右键菜单
		e.preventDefault();
	};
};
