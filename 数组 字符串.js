//数组和字符串
let string = "123Hahaha456";
let array = ["1", 2, "ha", "ha", 4, true];

console.log(...string); //拆分字符串
console.log([...string]); //将字符串分拆进数组
console.log(string[5]); //获取指定的字符
console.log(parseInt(string)); //获取字符串开始的数字
console.log(string.search("h")); //查找指定字符的第一次出现位置

console.log(string.replace("h", "0")); //将第一次出现的第一个字符替换为第二个
console.log(string.substr(2, 3)); //截取字符串从第几共多少长
console.log(string.substring(2, 3)); //截取字符串从第几到第几[x,y)
console.log(string.slice(2, 3)); //同上 具体不同见另一个文件
console.log(string.split("h", 2)); //用指定字符分割字符串 第二个参数代表返回的数组长度

console.log(string.endsWith("6")); //判断是否由该字符结尾
console.log(string.startsWith("1")); //开头
console.log(string.repeat(3)); //将该字符复制n次

console.log(string.toUpperCase()); //英文转大写
console.log(string.toLocaleUpperCase()); //也是转大写 但是是使用本机的ASCII码转换 适用于跨地区
console.log(string.toLowerCase()); //转小写
console.log(string.sub()); //在文档中转下标 sup()转上标

console.log(array.toString()); //转为字符串会用逗号隔开
console.log(array.join("")); //用指定字符组合为字符串
console.log(parseInt(array)); //不指定下标会转换第零个
console.log(array.slice(1, 5)); //切割数组
console.log(array.shift()); //删除数组第一个元素
console.log(array.pop()); //删除数组最后个元素
console.log(array.push("1")); //把元素加入数组最后
console.log(
	array.reduce((returns, now, nowindex, arr) => {
		return returns + now;
	}, 1) //第二个参数指定初始returns，now是数组第零个，如果没有，初始returns是第零个，now是第一个
);
