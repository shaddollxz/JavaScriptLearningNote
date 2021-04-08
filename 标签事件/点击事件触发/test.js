// function load() {
// 	var tags = document.getElementsByTagName("*"); //将所有标签放入
// 	for (var i = 0; i < tags.length; i++) {
// 		if (tags[i].getAttribute("class") == "clicktest") {
// 			tags[i].onclick = function () {
// 				opennew(this);
// 				return false;
// 			};
// 		}
// 		if (tags[i].getAttribute("class") == "showpic") {
// 			tags[i].onclick = function () {
// 				opennew(this);
// 				return false;
// 			};
// 		}
// 	}
// }

(function load() {
	var tags = document.getElementsByTagName("*"); //将所有标签放入
	for (var i = 0; i < tags.length; i++) {
		//遍历
		switch (tags[i].getAttribute("class")) {
			case "clicktest":
				tags[i].onclick = function () {
					opennew(this);
					return false;
				};
				break;

			case "showpic":
				tags[i].onclick = function () {
					opennew(this);
					return false;
				};
				break;
		}
	}
	var a = document.getElementsByTagName("a");
	a[0].onclick = function () {
		opennew(this);
		return false;
	};
})();
//addLoad(load);

function opennew(element) {
	var url = element.getAttribute("href");
	window.open(url, "wind", "width=300,height=300");
}

function openwind(url) {
	window.open(url, "wind", "width=300,height=300");
}

function open_new(obj) {
	window.open(
		obj.href,
		"search",
		"width=400,height=300,left=500,top=500,scrollbars,resizable"
	);
}

function showpic(element) {
	var canvas = document.getElementsByClassName("showpiccanvas");
}
