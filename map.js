const map = new Map([
	["key1", "value1"],
	["key2", "value2"],
]);

map.set("newkey1", "newval1").set("newkey2", "newval2"); //用set添加新值
console.log(map.has("key1"), map.get("key1")); //has查询是否有，get查询键对应的值
console.log(map.size); //4

map.delete("key1"); //delete删除一个键及其对应的值
console.log(map.has("key1"), map.get("key1")); //undefined

map.clear(); //clear删除所有键及值
console.log(map.size); //0

//get查找的是内容，不是名字
let aa = 2;
map.set(aa, "aa");
console.log(map.get(2)); //aa
console.log(map.get(4 - 2)); //aa

//查找的时候是查找映射
// const map = new Map([[["aaa"], "aaa"]]);
// let bbb = ["bbb"];
// map.set(bbb, "bbb");
// console.log(map);
// console.log(map.get(["aaa"])); //undefind
// console.log(map.get(bbb)); //bbb

//map的键可以是函数等类型
function a3() {
	return 3;
}
let afunc = a3;

map.set(afunc, "a function");
console.log(map.get(afunc));
console.log(map.get(a3)); //两个均会输出a function
map.clear();

//修改外面的内容，map中的值也会跟着改变
let objkey = { objkey1: "objkey1" },
	objval = { objval1: "objval1" },
	arrkey = ["arrkey1"],
	arrval = ["arrval1"];

map.set(objkey, objval).set(arrkey, arrval);
console.log(map.get(objkey), map.get(arrkey)); //{objval1: "objval1"} Array(1) ["arrval1"]
objval.objval1 = "newobjval1"; //修改
objval.objval2 = "objval2"; //新增
arrval.push("arrval2"); //新增
console.log(map.get(objkey), map.get(arrkey)); //{objval1: "newobjval1", objval2: "objval2"} Array(2) ["arrval1", "arrval2"]
console.log(objval, arrval); //同上
map.clear();

//能用扩展运算符
map.set("key1", "val1").set("key2", "val2").set("key3", "val3");
console.log(map, [...map], ...map); //分别是一个map 一个含有三个数组的数组 三个数组

//能迭代
map.forEach((val, key, thismap) => {
	console.log(`${key}-->${val}`);
	console.log(thismap);
});

for (const key of map.keys()) {
	console.log(key);
}

for (const val of map.values()) {
	console.log(val);
}

for (const maps of map) {
	console.log(maps);
}

//在迭代中不能修改key的值，如果key是个对象，可以修改对象的属性
for (let key of map.keys()) {
	console.log("变化前的key1为：" + key);
	key = "newkey";
	console.log("变化后的key1为：" + key);
	console.log("变化后查找newkey得到的结果：" + map.get("newkey")); //undefined
	console.log("变化后查找key1得到的结果：" + map.get("key1")); //val1
	console.log(map); //其中没有newkey
	break;
}
let keyobj = { id: "key" };
map.set(keyobj, "val4");
for (let key of map.keys()) {
	if (key.id == "key") {
		console.log(map.get(key)); //val4
		key.id = "newkey";
		console.log(map.get(key)); //val4
		console.log(key.id); //newkey
	}
}
console.log(keyobj); //{id:"newkey"}
console.log(map.get(keyobj)); //val4

//初始化时能浅拷贝map(原来的改变，拷贝的也会跟着改变)
let copymap = new Map(map);
console.log(copymap);
map.set("555", "555");
console.log(copymap);
