/**
 * extends 继承
 * 即可继承class 也可继承构造函数
 * super 引用原型 只能在子类中的构造函数和静态方法中使用
 */

class Father {
	constructor() {
		this.name = "father";
		this.childs = ["1st", "2nd", "3rd"];
	}
	sayme() {
		console.log(`i am ${this.name} , my childs are ${this.childs}`);
	}
	static sayname() {
		console.log(`my name is ${this.name}`);
	}
}
class Child_1st extends Father {
	constructor() {
		super(); //在子类里使用constructor必须先调用super()
		this.name = "child 1"; //this指向super()实例化出的Father对象
	}
	/**
	 * 调用Father的sayname() 重新在内存中创建了一个静态方法
	 * Father,sayname === Child_1st.sayname //false
	 * 如果不进行这个操作，Child_1st仍然能调用sayname
	 * 此时 Father,sayname === Child_1st.sayname //true
	 */
	// static sayname() {
	// 	super.sayname();
	// }
}

let father = new Father();
let child_1st = new Child_1st();

/**
 * 抽象基类
 * 是其他类的继承对象 但是自己本身不能被实例化
 * es6没有语法实现，但能手动实现
 * new.target 返回使用new时选择的类
 */
class Class_base {
	constructor() {
		console.log(new.target);
		if (new.target === Class_base) {
			throw new Error("this class can`t be directly instantiated");
		}

		//原型的实现在构造函数之前
		//还能在构造函数中判断子类是否在原型中定义了指定方法
		if (!this.sayname) {
			throw new Error("this class must define sayname()");
		}
	}
}
//let a = new Class_base(); //this class can`t be directly instantiated
class Class_next extends Class_base {
	sayname() {}
}
let class_next = new Class_next(); //this class must be define name

//可以使用函数调用实现类的多次继承
//定义一个基础类
class Base_class {
	constructor() {
		this.key_first = "1st";
	}
	say_base() {
		console.log("this is base");
	}
}
//该函数返回一个继承了输入类并在原型上添加了新方法的类
let First_extend = (Class) => {
	return class extends Class {
		say_first() {
			console.log("this is first");
		}
	};
};
let Second_extend = (Class) => {
	return class extends Class {
		say_second() {
			console.log("this is second");
		}
	};
};
let Third_extend = (Class) => {
	return class extends Class {
		say_third() {
			console.log("this is third");
		}
	};
};

class New_class extends Third_extend(Second_extend(First_extend(Base_class))) {}
let new_class = new New_class();
//new_class.__proto__								//			 constructor指向New_class
//new_class.__proto__.__proto__ 					//say_third  constructor指向third返回的类
//new_class.__proto__.__proto__.__proto__ 			//say_second constructor指向second返回的类
//new_class.__proto__.__proto__.__proto__.__protp__ //say_first  constructor指向first返回的类
//													//say_base	 constructor指向base_class

function mix_extrnd(baseclass, ...mixers) {
	return mixers.reduce((a, b) => b(a), baseclass);
	//遍历时执行的函数
	//a是上一次调用函数时返回的值，b是调用时指向的值
	//第一次调用时a指向reduce的第二个值 b指向数组的第0个值
}
class Mixer extends mix_extrnd(Base_class, First_extend, Second_extend, Third_extend) {}
class Mixer_2 extends mix_extrnd(Base_class, Third_extend, Second_extend, First_extend) {}
let new_class_bymix = new Mixer(); //__proto__.__proto__ //saythird
let new_class_bymix_2 = new Mixer_2(); //__proto__.__proto__ //sayfirst
