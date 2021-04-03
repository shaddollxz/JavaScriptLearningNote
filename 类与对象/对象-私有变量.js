//在构造函数中创建私有变量和私有属性
function Father(name, age) {
	//定义私有变量
	let sex = "man";
	function sayme() {
		console.log(`my name is ${name}`);
	}
	//定义公有变量
	this.age = age;
	//设置一个私有变量访问器（特权方法
	//实质上是形成一个闭包 用访问器返回构造函数中的局部变量（私有属性）
	//实例上调用访问器时会在构造函数的作用域中查找 所以访问器设置在哪里就在哪个作用域中查找指定变量
	this.public_sayme = function () {
		console.log(this.sex); //undefind
		console.log(`my sex is ${sex}`); //man
		return sayme();
	};
	this.public_setme = function (newsex) {
		sex = newsex;
	};
}
Father.prototype = {
	test: "test",
};

//私有变量无法直接访问
let father = new Father("father", 233);
console.log(father.name, father.sex, father.age); //undefind undefin 233
//father.sayme(); //error sayme not defind
father.public_sayme();

//在不同实例间私有变量不共享
let newfather = new Father("newfaher", 233);
father.public_setme("newtype");
father.public_sayme(); //newtype
newfather.public_sayme(); //man

//把father继承到son的prototype上地继承
//但实质上仍然是在Father构造函数中调用访问器 查找构造函数中的sex
console.log("Son:");

function Son() {}
Son.prototype = new Father("son", 2333);

let son = new Son();
console.log(son.name, son.sex, son.age); //undefind undefin 2333
son.public_sayme(); //私有变量不能被继承 但是继承的公有访问器能访问访问器定义时的上下文中的私有变量

//把fater用盗用构造函数继承
console.log("Grandson:");

function Grandson(name, age) {
	Father.apply(this, arguments);
	let sex = "woman";

	this.public_sayme_grandson = function () {
		console.log(this.sex); //undefind
		console.log(sex); //woman
	};

	//如果在继承的里面重写一次访问器 会导致找不到sex 也说明了继承的访问器实际上是访问的Father中的sex
	// this.public_sayme = function () {
	// 	console.log(this.sex); //undefind
	// 	console.log(sex); //undefined
	// 	return sayme();
	// };
}

let grandson = new Grandson("hahahaha", 23333);
console.log(grandson.name, grandson.sex, grandson.age); //undefined undefined 23333
grandson.public_sayme(); //undefined man hahahaha
grandson.public_sayme_grandson(); //undefined woman 这里调用的是Grandson中的

//静态私有变量
//该方法定义的私有变量在实例间会共享
/**
 * 原理：
 * 将私有变量 构造函数 原型 放在一个作用域内 将访问器放入原型中
 * 在调用访问器时会查找整个作用域 修改也会修改整个作用域中的私有变量
 * 所以该方法会使私有变量共享在所有实例中
 */

(function () {
	//定义私有变量 将私有变量放在构造函数外
	let sex_pri = "haha";
	function func_pri() {
		console.log("it`s pri");
	}

	//构造函数及其原型 将访问器放入原型
	Aobj = function (age) {
		this.age = age;
		//如果在构造函数中设置访问器 效果和原型中设置一样
		//当然每次实例化都会生成不同的函数占用内存
		this.show_constructor = function () {
			console.log(sex_pri);
			func_pri();
		};
		this.set_constructor = function (newsex) {
			sex_pri = newsex;
		};
	};
	Aobj.prototype.show_pub = function () {
		console.log(sex_pri);
		func_pri();
	};
	Aobj.prototype.set_pub = function (newsex) {
		sex_pri = newsex;
	};
})();

let aobj = new Aobj(233);
let bobj = new Aobj(2333);
aobj.show_pub(); //haha
bobj.show_pub(); //haha
aobj.set_pub("newtype");
aobj.show_pub(); //newtype
bobj.show_pub(); //newtype

//模块模式
//用函数定义私有属性并返回一个对象
//对象中设置访问器和公有属性
let obj_color = (function () {
	let color_pri = "red";
	let showgreen_pri = function () {
		console.log("green");
	};

	return {
		color_pub: "black",
		showpricolor_pub() {
			console.log(color_pri);
			showgreen_pri();
		},
	};
})();
obj_color.showpricolor_pub(); //red green
