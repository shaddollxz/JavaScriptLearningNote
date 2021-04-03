//object对象没有初始迭代器
let objtest = {
	key1: "1st",
	key2: "2nd",
	key3: "3rd",
};
//无法迭代
// for (const i of objtest) {
// 	console.log(i);
// }
// let objtest2 = [...objtest];
// console.log(objtest2);

/**
 * 迭代器是每次迭代时return后重复执行next()函数
 * 返回一个对象：
 * done指当前是否结束循环（false：不结束循环；true：结束循环）
 * valu指迭代返回的值
 */
//自定义迭代器
//next放在迭代器外可以使用next()手动迭代
class Testobj_onlyone {
	constructor(numin) {
		this.numin = numin;
		this.count = 1;
	}

	next() {
		if (this.count <= this.numin) {
			return { done: false, value: this.count++ };
		} else {
			return { done: true, value: undefined };
		}
	}

	[Symbol.iterator]() {
		return this;
	}
}

let test_onlyone = new Testobj_onlyone(3);
for (let i of test_onlyone) {
	console.log(i);
}
for (let i of test_onlyone) {
	console.log(i);
}
console.log("上面是单迭代的，下面是多次迭代");
//next()闭包进迭代器，可以多次迭代，不能使用next()
class Testobj {
	constructor(objin) {
		this.objin = objin;
	}

	[Symbol.iterator]() {
		let obj = this.objin;
		let count = 1;
		return {
			//迭代规则
			next() {
				if (count <= obj) {
					return { done: false, value: count++ };
				} else {
					return { done: true, value: undefined };
				}
			},
			//在提前跳出迭代时使用return关闭迭代器 注意：默认的迭代器即使加上该方法也会从上次迭代处开始
			return() {
				console.log("跳出");
				return { done: true, value: undefined };
			},
		};
	}
}
//可重复迭代
const testobj = new Testobj(4);
for (let i of testobj) {
	console.log(i);
}
for (let i of testobj) {
	console.log(i);
}
//return（）
for (let i of testobj) {
	if (i > 2) {
		break;
	} //跳出
	console.log(i);
}

let [a, b] = new Testobj(5); //”跳出“
console.log(a, b); //1，2

//数组的迭代器无法关闭
console.log("如果不关闭迭代器，重新迭代时从上次位置开始");
let arr = [2, 6, 3, 4, 5];
let iter = arr[Symbol.iterator]();

for (const i of iter) {
	console.log(i);
	if (i > 2) {
		break;
	}
} //2 6
for (const i of iter) {
	console.log(i);
} //3 4 5
console.log("如果是直接迭代数组，则重新开始");
for (const i of arr) {
	console.log(i);
	if (i > 2) {
		break;
	}
} //2 6
for (const i of arr) {
	console.log(i);
} //2 6 3 4 5

console.log("可迭代对象测试");

/**所以可迭代的对象应该自己写再实例化
 * 但是这个方法实例化的对象中还有个对象，无法直接从这个对象中读取数据
 */
class Obj_can_iter {
	constructor(newobj) {
		this.newobj = newobj;
	}

	[Symbol.iterator]() {
		let keys = Object.keys(this.newobj),
			thisobj = this.newobj,
			count = 0;

		return {
			next() {
				if (count < keys.length) {
					return { done: false, value: thisobj[keys[count++]] };
				} else {
					return { done: true, value: undefined };
				}
			},
			//return()是个可选的方法，在迭代器提前跳出时会默认执行该方法
			return() {
				console.log("跳出");
				return { done: true };
			},
		};
		/**
		 * 此处return{}形成了一个闭包
		 * 要调用next()得先把迭代器赋值再调用：
		 * let aaa = obj_can_iter[Symbol.iterator]();
		 * console.log(aaa.next()); //是一个迭代器对象 调用value可以获得1st
		 * console.log(aaa.next()); //								  2nd
		 * console.log(aaa.next()); //同上
		 */
	}
}

let obj_can_iter = new Obj_can_iter({
	key1: "1st",
	key2: "2nd",
	key3: "3rd",
});
for (const i of obj_can_iter) {
	console.log(i);
}

//或者实例化obj后添加迭代接口 这个就解决了上面的问题
let obj_can_iter_new = new Object({
	key1: "1st",
	key2: "2nd",
	key3: "3rd",
});

obj_can_iter_new[Symbol.iterator] = function () {
	const keys = Object.keys(this),
		thisobj = this;
	let count = 0;

	return {
		next() {
			if (count < keys.length) {
				return { done: false, value: thisobj[keys[count++]] };
			} else {
				return { done: true, value: undefined };
			}
		},
		return() {
			console.log("跳出");
			return { done: true };
		},
	};
};

for (const i of obj_can_iter_new) {
	console.log(i);
}
