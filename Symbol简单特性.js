let a = Symbol("a");
let b = Symbol("a");
let c = Symbol.for("a");

let d = Symbol.for("b");
let e = Symbol.for("b");

(function () {
	if (a == b) {
		alert("a==b");
	} else {
		alert("a!=b"); //
	}

	if (a == c) {
		alert("a==c");
	} else {
		alert("a!=c"); //
	}

	if (d == e) {
		alert("d==e"); //
	} else {
		alert("d!=e");
	}

	a = "123";
	alert(a); //123 不赋值会报错：无法将符号转换为字符串
})();
