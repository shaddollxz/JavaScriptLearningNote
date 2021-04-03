let a = "1"; //为原始值
let b = new String("2"); //为引用值
b.something = "4";

console.log("a为：" + typeof a); //string
console.log("b为：" + typeof b); //object
console.log("b.something为：" + typeof b.something); //string

let c = a; //重新赋值，内存中多出了个c，值与a中的相同
let d = b; //赋值了一个指向b对象的指针，内存中没有多出对象

console.log(c); //1
console.log(d.something); //4
b.something = "3";
console.log(d.something); //3
d.something = "2";
console.log(d.something); //2

function add(etc, mod) {
	//js没有重载 用判断传入值的长度和类型进行手动重载
	if (arguments.length == 1) {
		switch (typeof etc) {
			case "string":
				etc = parseInt(etc) + 10;
				return etc;
			case "object":
				etc.something = parseInt(etc.something) + 10;
				return etc.something;
		}
	} else if (arguments.length == 2) {
		etc.something = parseInt(etc.something) + 10;
		etc = new Object(); //将改对象的指针指向新的一个对象
		etc.something = "5";
		return etc.something;
	}
}

let e = add(a); //放入一个原始值
console.log(a); //1 string
console.log(e); //11 number

add(d); //放入一个引用值
console.log(b.something); //12 number
console.log(d.something); //12 number

let end = add(b, 2); //接收到add中的etc.something
console.log(end); //5 string
console.log(b.something); //12+10=22  指向的对象中的something+10
console.log(d.something); //12+10=22

let z = new Object();
console.log(z.something); //undefined
z.something = 9;
console.log(z.something); //9
