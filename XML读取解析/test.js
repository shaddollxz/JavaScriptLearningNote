//创建xml文档
let creatbtn = document.querySelector("#creat");
creatbtn.addEventListener("click", (event) => {
	//创建一个xml文档
	let xmldom = document.implementation.createDocument(
		"xml", //命名空间 用得少
		"root", //相当于html中的html标签
		null //文档类型 一般都不会用
	);
	let child = xmldom.createElement("child");
	child.innerText = "child";
	let root = xmldom.documentElement;
	root.appendChild(child);
	console.log(xmldom.documentElement.firstChild.innerText); //输出文档中第一个节点的文本内容
	console.log(xmldom);
});

//配合input:file将xml字符串读取为DOM文档
//获取xml
let xmlfile; //以字符串接受获取的xml文件内容
let readxml = document.querySelector("#xmlfile");
readxml.addEventListener("change", (event) => {
	let file = event.target.files[0];
	let reader = new FileReader();
	//判断是否为xml
	if (file.type == "text/xml") {
		reader.readAsText(file); //xml不能读为二进制文件
	}

	reader.onload = function () {
		xmlfile = reader.result; //设为全局变量
	};
});

//读取xml
let readbtn = document.querySelector("#read");
readbtn.addEventListener("click", (event) => {
	let parser = new DOMParser();
	let file = xmlfile || `<root><child></child></root>`;
	let xmldom = parser.parseFromString(file, "text/xml"); //将读取到的xml字符串转为xml文档，使其拥有DOM的特性

	//这里不能用innerTEXT可以用textContent
	console.log(xmldom.querySelector("title").innerHTML);
});

//将xml的DOM文档转换为字符串
let push = document.querySelector("#push");
push.addEventListener("change", (event) => {
	let file = document.implementation.createDocument(
		"xml", //命名空间 用得少
		"root", //相当于html中的html标签
		null //文档类型 一般都不会用
	);
	let child = file.createElement("child");
	child.innerText = "child";
	let root = file.documentElement;
	root.appendChild(child);

	/* let parser = new DOMParser();
	let file = parser.parseFromString(xmlfile, "text/xml"); */

	//let file = event.target.files[0]; //只有基本信息

	let serializer = new XMLSerializer();
	let xml = serializer.serializeToString(file);
	console.log(xml);
});

/* XPath: 
用来读取xml文件的方法 */
let XPtest = document.querySelector("#XPathtest");
XPtest.addEventListener("click", (event) => {
	//创建一个xml文档
	let parser = new DOMParser();
	let xmldom = parser.parseFromString(xmlfile, "text/xml");

	//创建一个查找到的节点集合 该集合只能用iterateNext()迭代读取
	let result = xmldom.evaluate(
		"/bookstore/*", //XPath表达式 设置查找内容 具体见https://www.w3school.com.cn/xpath/xpath_operators.asp
		xmldom.documentElement, //上下文节点
		null, //命名空间 没有的话放null 具体参考P700
		XPathResult.ORDERED_NODE_ITERATOR_TYPE, //输出方式
		null //XPathResult对象 一般是null
	);
	//读取
	if (result != null) {
		let element = result.iterateNext();
		while (element) {
			console.log(element.innerHTML);
			element = result.iterateNext();
		}
	}
});
