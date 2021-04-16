//ES6的模块导入
import { add, a, b } from "./Amod.js";
console.log(add(a, b));

//有多个导出内容也能用*来接收
import * as mod from "./Amod.js";
console.log(mod);

//这样导入的是默认导出内容
import mymod from "./Amod.js";
console.log(mymod);

//导入的模块是不允许修改的 只能通过模块自身暴露的方法修改
//mod.a = "a"; //read only

//一个模块接收另一个模块的导出内容
import { B } from "./Amod.js";
console.log(B);
