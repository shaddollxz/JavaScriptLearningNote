let book = {
	name: "1",
	year: 2011,
	authors: ["一", "二"],
	isbook: true,
	//方法不会被转为JSON
	say: () => {
		console.log(this.name);
	},
};
//josn和对象的互相转换
let jsonbook = JSON.stringify(book);
console.log(jsonbook);
let otherbook = JSON.parse(jsonbook);
console.log(otherbook);

//对象转JSON时的过滤函数
//第三个参数接收一个最大或最长为10的数字或字符串 表示格式化后的缩进数或者缩进替代字符
//第二个参数接收一个数组时 转换的json只会有指定的属性
let newjson = JSON.stringify(book, ["name"], 4);
console.log(newjson);
let neojson = JSON.stringify(book, (key, value) => {
	//第一次调用key没有内容 value是输入的对象或数组
	switch (key) {
		case "year":
			value += 1000; //返回的是key对应的值
		default:
			//返回的value相当于把该值修改后赋给原来位置上的值
			//因为第一次key为空 这里把value返回 这样才会进入第二次调用
			return value;
	}
});
console.log(neojson);

//JSON转对象时的还原函数
//同上 最后一次调用函数时key为空
let reneojson = JSON.parse(neojson, (key, value) => {
	if (key == "year") {
		return (value -= 1000);
	}
	return value;
});
console.log(reneojson);

//对象中如果有toJSON方法 转为JSON时会调用该方法
book.toJSON = function () {
	return this.name;
};
console.log(JSON.stringify(book));

console.log("finished");
