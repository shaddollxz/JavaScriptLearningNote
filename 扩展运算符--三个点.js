// 数组
var number = [1, 2, 3, 4, 5, 6];
console.log(...number); //1 2 3 4 5 6
//对象
var man = { name: "chuichui", height: 176 };
console.log({ ...man }); //{ name: "chuichui", height: 176 };
//字符串转数组
let astring = "string";
let bstring = [...astring];
console.log(bstring); //["s", "t", "r", "i", "n", …]
console.log(...bstring); //s t r i n g string拆分

//数组的复制
var arr1 = ["hello"];
var arr2 = [...arr1];
let arr3 = arr1;
console.log(arr1 === arr2, arr1 === arr3, arr2 === arr3); //f t f
console.log(arr1 == arr2, arr1 == arr3, arr2 == arr3); //f t f
console.log(arr1, arr2, arr3); // ['hello']

//数组的合并
var arr1 = ["hello"];
var arr2 = ["chuichui"];
var mergeArr = [...arr1, ...arr2]; // ['hello','chuichui']
let mergearr = [arr1, arr2]; //[[arr1],[arr2]]
console.log(mergeArr, mergearr);
//对象的合并
var obj1 = { name: "chuichui" };
var obj2 = { height: 176 };
var mergeObj = { ...obj1, ...obj2 };
console.log(mergeObj); // {name: "chuichui", height: 176}

//函数传参
function spliteString(a, b, c, d, e, f) {
	console.log(a + b + c + "分开" + d + e + f); //前三如果为数字，直接相加，出现“分开”后，后面的全部自动转为字符串
}
spliteString(...astring); //str分开ing
spliteString(..."one"); //one分开undefinedundefinedundefined
spliteString(..."onetwothree"); //one分开two
let numberarr = [1, 2, 3];
let stringarr = ["1", "2", "3"];
spliteString(...numberarr, 4, ..."56"); //6分开456
spliteString(...stringarr, 4, ..."56"); //123分开456
spliteString(...stringarr, 4, ...[5, 6]); //123分开456

spliteString(...[5, 6], 4, ...stringarr); //15分开123
console.log(...[5, 6]); //5 6
console.log([5, 6]); //[ 5, 6 ] 数组
console.log([5, 6] + "ccc"); //5,6ccc 字符串
console.log(...([5, 6] + "ccc")); //5 , 6 c c c 字符串拆分

spliteString(...[5, 6].toString(), 4, ...stringarr); //5,6分开412
spliteString([...[5, 6]].toString(), 4, ...stringarr); //5,641分开23undefined
console.log(...[5, 6].toString()); //5 , 6 字符串拆分 效果同line11 首先[5,6].tostring()得到"5,6"，再...拆分得到5 , 6
console.log(...[[5, 6].toString()]); //5,6 将数组以字符串输出 等同于合并["5,6"]

spliteString(...[[5, 6].map(String)], 4, ...stringarr); //5,641分开23undefined a是(5,6)
console.log(...[[5, 6].map(String)]); //[ "5", "6" ] 数组 首先[5,6].map(string)得["5","6"] 再...[["5","6"]]得结果

spliteString([5, 6].join(""), 4, ...stringarr); //5641分开23undefined
spliteString(...[5, 6].join(""), 4, ...stringarr); //564分开123
spliteString(...[[5, 6].join("")], 4, ...stringarr); //5641分开23undefined a是(56)
console.log([5, 6].join("")); //56
console.log(...[5, 6].join("")); //5 6 拆分line61
console.log(...[[5, 6].join("")]); //56 组合line62 等同于line61

function sum(...num) {
	//输入都会放入num这个数组中，传入数组会嵌套
	let sumer = 0;
	for (const i of num) {
		sumer += i;
	}
	return sumer;
}
console.log(sum(1, 2, 3));
console.log(sum([1, 2, 3]));
console.log(sum(...[1, 2, 3]));
