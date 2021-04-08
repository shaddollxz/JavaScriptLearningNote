//在元素原型上添加一个跨浏览器的事件绑定方法
//addEventListener在button的原型HTMLButtonElementPrototype上
//这里添加到HTMLButtonElementPrototype的原型HTMLElementPrototype上 这样所有element控件都能调用该方法
//这个方法仍然只兼容IE8以上的浏览器 因为它没有HTMLElement对象
HTMLElement.prototype.addEvent = function (type, event) {
	if (type == "mousewheel") {
		if (getBrowser() == "Firefox") {
			type = "DOMMouseScroll";
		}
	}

	if (this.addEventListener) {
		return this.addEventListener(type, event, false);
	} else if (this.attachEvent) {
		this.attachEvent("on" + type, event);
	} else {
		this["on" + type] = event;
	}
};

HTMLElement.prototype.removeEvent = function (type, event) {
	if (type == "mousewheel") {
		if (getBrowser() == "Firefox") {
			type = "DOMMouseScroll";
		}
	}

	if (this.removeEventListener) {
		this.removeEventListener(type, event, false);
	} else if (this.detachEvent) {
		this.detachEvent("on" + type, event);
	} else {
		this["on" + type] = null;
	}
};

//获取当前浏览器
function getBrowser() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		return "IE";
	} else if (navigator.userAgent.indexOf("Edg") > 0) {
		return "Edge";
	} else if (navigator.userAgent.indexOf("Chrome") > 0) {
		return "Chrome";
	} else if (navigator.userAgent.indexOf("Firefox") > 0) {
		return "Firefox";
	} else if (navigator.userAgent.indexOf("Safari") > 0) {
		return "Safari";
	}
}
