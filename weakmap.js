//weakmap的键只能是object
let key1 = { id: "1" },
	key2 = { id: "2" },
	key3 = { id: "3" };
const weakmap = new WeakMap([
	[key1, "val1"],
	[key2, "val2"],
	[key3, "val3"],
]);
console.log(weakmap); //顺序是乱的
//weakmap.delete(key1);

//不可迭代
// for (const key of weakmap) {
// 	console.log(key.id);
// }
weakmap.set({}, "it`s null");
console.log(weakmap);
console.log(weakmap.get({}));
