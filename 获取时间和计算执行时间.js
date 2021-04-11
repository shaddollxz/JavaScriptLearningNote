//精确到毫秒
//使用国际时间
let time_a = Date.now();
(function () {
	console.log("a func");
})();
let time_b = Date.now();
console.log(time_b);
console.log(`pass ${time_b - time_a}`); //计算经过时间 按毫秒计算

//精确到微秒
//从网页打开时开始计时
let time_aa = performance.now();
let time_bb = performance.now();
console.log(`${time_bb},${time_aa}`); //firefox只读得到整数部分
//使用国际时间
let time_now = performance.timeOrigin;
console.log(`${time_now}`);

//设计标记查看程序执行需要时间
performance.mark("1st");
for (let i = 0; i < 1000000000; i++) {}
performance.mark("2nd");

//性能度量
performance.measure("during", "1st", "2nd");
const [differenceMark] = performance.getEntriesByType("measure");
console.log(differenceMark); //duration和下面的差一样  startTime和1st的starTime一样

const [first, secend] = performance.getEntriesByType("mark");
console.log(first);
console.log(`${secend.startTime - first.startTime}`);

//页面各方面加载时间
const [pagetime] = performance.getEntriesByType("navigation");
console.log(pagetime);

//页面加载时请求资源时间
const [sourcetime] = performance.getEntriesByType("resource");
console.log(sourcetime);
