//ES6的模块导出
function add(x, y) {
	return x + y;
}
let a = 1;
let b = 2;
//可以分多次导出
export { add, a };
export { b };

//导出时可以使用别名
export { add as jia };

//默认导出
export default a;
//export { a as default }; //也能这样写

//也能一边定义一边导出
export function jian(x, y) {
	return x - y;
}

//将另一个模块的导出放入这个模块的导出里来 也能像导入一样按名字导入
export * from "./Bmod.js";
