/**
 * 对象属性的属性设置
 */
let obj_test_1 = { key1: "1st", key2: "2nd" };

//该方法改变对象的一些属性 每一项都可选
//调用该方法时每一项均默认为false 反之不调用该方法创建属性时默认为true
//调用时设置为false后无法再设置为true
Object.defineProperty(obj_test_1, "key3", {
	// configurable: false, //是否能删除 重定义 修改特性 修改为访问器属性（即能否使用get()set()）
	// enumerable: false, //能否for-in
	// writable: false, //能否修改值
	value: "3rd",
});

//修改
obj_test_1.key3 = "333"; //不能成功，但是非严格模式下不会报错
console.log(obj_test_1.key3); //3rd

//for-in
for (const i in obj_test_1) {
	console.log(i); //key1 key2
}

//该方法会将目标属性的属性以对象的形式读出
console.log("非defineProperty定义的属性", Object.getOwnPropertyDescriptor(obj_test_1, "key1"));
console.log("defineProperty定义的属性", Object.getOwnPropertyDescriptor(obj_test_1, "key3"));

/**
 * 对象的访问器
 * 访问器即get,set
 * 访问器仍然具有上面的属性（没有writable）
 * 所以访问器用defineProperty定义的话无法用for-in遍历出来 不能删除 也不能修改，重定义
 */
let obj_test_2 = {
	a: 1,
	b: 2,
};
Object.defineProperty(obj_test_2, "c", {
	//读取时进行的操作
	get() {
		//return "c的值";
		return this.a + 1;
	},
	//设置时进行的操作
	set(c_value) {
		if (c_value > 9) {
			this.a = c_value;
			this.b++;
		}
	},
});
console.log(obj_test_2.a); //1
console.log(obj_test_2.b); //2
console.log(obj_test_2.c); //2
obj_test_2.c = 100;
console.log(obj_test_2.a); //100
console.log(obj_test_2.b); //3
console.log(obj_test_2.c); //101

for (const i in obj_test_2) {
	console.log(i); //a b 没有c
}

//初始化时设置访问器
console.log("初始化时设置访问器及函数方法（简写）测试");
let obj_test_2_new = {
	a: 1,
	b: 2,
	get c() {
		return this.a;
	},
	set c(c_value) {
		if (c_value > 9) {
			this.a = c_value;
			this.b++;
		}
	},
	//这是简写方法
	//规则是前面写key，后面写函数 相当于把function换成了key
	haha(x) {
		return x;
	},
};
console.log(obj_test_2_new.haha(555)); //555
console.log(obj_test_2_new.a); //1
console.log(obj_test_2_new.b); //2
console.log(obj_test_2_new.c); //1
obj_test_2_new.c = 100;
console.log(obj_test_2_new.a); //100
console.log(obj_test_2_new.b); //3
console.log(obj_test_2_new.c); //100

for (const i in obj_test_2_new) {
	console.log(i); //a b c
}

/**
 * 对象合并
 * 第一个值是合并到的位置，第二个及以后是被合并的对象
 * 如果合并的对象有相同属性，则返回的对象用最后的属性的值
 * 该方法会返回合并结束后的对象
 * 这个对象与第一个值是一个内存里的东西
 */
let obj1, obj2, obj3;
obj1 = { obj1key: "1st" };
obj2 = { obj2key: "2nd" };
obj3 = Object.assign(obj1, obj2, { otherobjkey: "haha" }, { otherobjkey: "ha" });

console.log(obj3);
console.log(obj1);
console.log(obj3 === obj1);
obj1.obj1key = "111"; //obj1与obj3是指向同一个对象的指针
obj2.obj2key = "222"; //修改被复制对象的属性不会改变已经复制了的对象的属性
console.log(obj3); //111 2nd

//仍然只是复制指针
let objouter = { obj_out: { obj_in_objkey: "a obj in obj" } };
obj3 = Object.assign(obj3, objouter);
console.log(obj3);
console.log(obj3.obj_out === objouter.obj_out); //true
