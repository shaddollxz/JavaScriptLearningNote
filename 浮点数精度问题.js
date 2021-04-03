// let a = 77;
// //tostring()转为字符串
// document.write(a.toString(2) + "<br>"); //转换为二进制数
// document.write(a.toString(8) + "<br>");
// document.write(0o77 + "<br>"); //八进制数开头用0o
// document.write(0xa9 + "<br>"); //十六进制数开头用0x
// document.write("<br>");

document.write("0.1的二进制数为： " + (0.1).toString(2) + "<br>");
document.write("0.1 + 0.2 = " + (0.1 + 0.2) + "<br>");
document.write("0.1 * 0.1 = " + 0.1 * 0.1 + "<br>");

document.write("最小值为：" + Number.MIN_VALUE + "<br>");
document.write("最大值为：" + Number.MAX_VALUE + "<br>");
console.log(isFinite(Number.MAX_VALUE + 1)); //超出范围 true

document.write("“这是123”转换为数字为：" + parseInt("这是123") + "<br>");
document.write("“123这是”转换为数字为：" + parseInt("123这是") + "<br>");
