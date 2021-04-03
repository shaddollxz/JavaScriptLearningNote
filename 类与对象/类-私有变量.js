class Father {
	//构造函数
	constructor() {
		this.name = "father";
		let age = 22;

		this.sayage_constructor = () => {
			console.log(age);
		};
		this.setage_constructor = (newage) => {
			age = newage;
		};
	}
	//原型方法
	sayname_proto() {
		console.log(this.name);
	}
	//原型上无法读取构造函数中的私有变量
	//因为不在一个作用域内
	//但是class内不能定义数据，所以只能在class外定义 具体看下面的例子
	sayage_proto() {
		console.log(age);
	}
}

let father = new Father();
let father_new = new Father();

//不同的实例中私有变量是独立的
father.setage_constructor(33);
father.sayage_constructor();
father_new.sayage_constructor();

class Son extends Father {
	constructor() {
		super();
		let age = 233; //调用sayage时使用的是Father的构造函数中的age 和这个完全没关系
	}
}
let son = new Son();
let son_new = new Son();

//设置一个作用域 使原型能访问上一作用域的私有变量
//当然可以不用匿名函数自调形成一个作用域 直接定义也行
//但是这样age就使全局中的变量了 就显得没意义
(function () {
	//一个私有变量 实质上是个局部变量
	let age = "33 in private";
	//NEW_father前没有声明 如果有let声明就使局部变量了
	//是全局变量 放在window对象中
	NEW_father = class New_father {
		//构造函数
		constructor() {
			this.name = "newfather";
			let age_constructor = "22 in constructor";
		}
		//原型方法
		sayage_proto() {
			console.log(age);
		}
		setage_proto(newage) {
			age = newage;
		}
	};
})();
let NEO_father = class Neo_father extends NEW_father {};

let new_father = new NEW_father();
let neo_father = new NEO_father();

//在原型上设置私有变量的访问器 会使私有变量在所有实例中共享
new_father.setage_proto(33);
new_father.sayage_proto(); //33
neo_father.sayage_proto(); //33
