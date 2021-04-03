var add = function (x) {
	var sum = 1;
	var tmp = function (x) {
		sum = sum + x;
		return tmp;
	};
	tmp.toString = function () {
		return sum;
	};
	return tmp;
};
console.log(add(1)(2)(3).toString()); //6
var tmp1 = add(1);
console.log(tmp1.toString()); //1
var tmp2 = tmp1(2);
console.log(tmp2.toString()); //3
var tmp3 = tmp2(3);
console.log(tmp3.toString()); //6
var tmp11 = tmp1(4);
console.log(tmp11.toString()); //10
var tmp_new1 = add(1);
console.log(tmp_new1.toString()); //1
var tmp_new2 = tmp_new1(3);
console.log(tmp_new2.toString()); //4
//alert(add(1)(2)(3)); //可以不用tostring 因为alert会隐式调用tostring
/**
 * 1.add(1)没有执行tmp
 * 2.add(1)(2) ==> tmp(2) ==> sum = 3 ; return tmp
 * 3.add(1)(2)(3) ==> tmp(3);sum = 3 ==> sum = 6 ;return tmp
 * 4.add(1)(2)(3).toString() ==> return 6
 * 闭包的意义就在这体现出来了
 * sum虽然是add的局部变量 但是因为tmp中调用了sum
 * 在add执行结束后返回了tmp 所以sum没有被垃圾清除 它仍然在内存中
 * 所以以后调用tmp时 sum是计算以后的值
 */
///////////////////////////////////////////////////////////////////////
function love1() {
	var num = 223;
	var me1 = function () {
		console.log(num);
	};
	num++;
	return me1;
}
var loveme1 = love1(); //只在这里调用了num++
loveme1(); //224 只调用了me1,没有调用num++
loveme1(); //224 同上
///////////////////////////////////////////////////////////////////////
function fun(n, o) {
	console.log(o);
	return {
		fun: function (m) {
			return fun(m, n);
		},
	};
}
var c = fun(0).fun(1); //undefind 0
c.fun(2); //1
c.fun(3); //1
///////////////////////////////////////////////////////////////////////
function fun(n, o) {
	console.log(o);
	return {
		fun: function (m) {
			return fun(m, n);
		},
	};
}
var a = fun(0); //undefined
a.fun(1); //0
a.fun(2); //0
a.fun(3); //0
var b = fun(0).fun(1).fun(2).fun(3); //undefined  0  1  2
var c = fun(0).fun(1);
c.fun(2);
c.fun(3); //undefined  0  1  1
///////////////////////////////////////////////////////////////////////
function fn() {
	var arr = [];
	for (var i = 0; i < 5; i++) {
		arr[i] = function () {
			return i; //这里return的i是for循环里的i，循环完后i是5
		};
	}
	return arr;
}
var list = fn(); //此时for里的i是5
for (var i = 0, len = list.length; i < len; i++) {
	console.log(list[i]());
} //5 5 5 5 5
///////////////////////////////////////////////////////////////////////
function fn() {
	var arr = [];
	for (var i = 0; i < 5; i++) {
		arr[i] = (function (i) {
			return function () {
				return i; //return出的i是自调时放入的i 即(function (i))，与for循环中的i不同
			};
		})(i); //自调 此时i是该函数的局部变量
	}
	return arr;
}
var list = fn();
console.log(list);
for (var i = 0, len = list.length; i < len; i++) {
	console.log(list[i]());
} //0 1 2 3 4
