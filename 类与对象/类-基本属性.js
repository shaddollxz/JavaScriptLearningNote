class Aclass {
	constructor() {
		this.name = "haha";
		this.age_ = 233;
		this.conafunc = () => {
			console.log("cafunc");
		};
		this.conbfunc = () => {
			console.log("cbfunc");
		};
		this.showthis_constructor = () => {
			console.log(this.age_);
			return this;
		};
	}

	//这个函数不是定义在原型上而是实例上，相当是于在构造函数中定义
	//构造函数中定义的会覆盖这里定义的
	afunc = () => {
		console.log(this.name);
	};
	sex = "man";

	//必须这样定义原型上的方法
	protofunc() {
		console.log("this is a function in prototype");
	}
	protofunc_2() {
		console.log("this is other function in prototype");
	}
	showthis_prototype() {
		console.log(this.age_);
		return this; //在实例中指向实例 在原型中指向原型
	}

	//get/set 同样是在原型上
	get age() {
		return this.age_;
	}
	set age(newage) {
		this.age_ = newage;
	}

	//静态方法用static定义
	static safunc = () => {
		console.log("it`s a static function");
	};
	static sbfunc() {
		console.log("it`s a other static function");
	}
	static showthis_static() {
		console.log(this.name);
		return this; //this指向的是Aclass本身
	}
}
//要在原型上增加属性得在外面 方法在里面就行
Aclass.prototype.height = 233;

let aclass = new Aclass();
let bclass = new Aclass();

//虽然创建时调用Aclass中的constructor 但是该实例的构造函数是Aclass()
console.log(aclass.__proto__.constructor);
console.log(aclass.__proto__ === Aclass.prototype); //true

//在实例中原型方法的指针与构造函数方法的指针都指向实例本身
console.log(aclass.showthis_prototype() === aclass.showthis_constructor());
//在原型直接调用原型的方法时，指向原型
console.log(Aclass.prototype.showthis_prototype() === Aclass.prototype);

//迭代器设置
class Iterclass {
	constructor() {
		this.arr = ["1st", "2nd", "3rd", "4th"];
	}

	//用生成器和迭代器以及数组自带的迭代方式组合
	//每次调用迭代器返回arr.entrise().next()
	*[Symbol.iterator]() {
		yield* this.arr.entries();
	}

	// [Symbol.iterator]() {
	// 	let i = 0;
	// 	let arr = this.arr;
	// 	return {
	// 		next() {
	// 			if (i < arr.length) {
	// 				return { done: false, value: arr[i++] };
	// 			} else {
	// 				return { done: true };
	// 			}
	// 		},
	// 	};
	// }
}
let iterclass = new Iterclass();
for (const i of iterclass) {
	console.log(i);
}
