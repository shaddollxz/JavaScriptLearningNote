/**
 * Aobj() 构造函数
 * Aobj.prototype 原型
 * newobj_1 实例
 *
 * newobj_1.__proto__ 实例指向的原型    newobj_1.__proto__ === Aobj.prototype //true
 * Aobj.prototype.constructor 原型对应的构造函数    Aobj.prototype.constructor === Aobj //true
 *
 * Aobj.prototype.__proto__ 原型指向的原型 即Object 所有默认对象的原型（除了null)都指向Object
 *
 * 具体原型链可以参考：https://www.jianshu.com/p/be7c95714586
 *
 * 原型的出现在构造函数执行以前
 * 所以构造函数中的属性会覆盖原型中的属性
 *
 * 在调用 newobj_1.name 时 在实例中找不到name属性 于是js会向实例原型查找name属性
 * 所以sayname()是在实例化时创建的函数 两个不同实例的同一个方法所占的内存不同
 * 如果在实例原型上创建方法，调用时js会向实例原型中查找，两个不同实例的方法是同一个内存中存储的函数
 * 所以构造函数创建方法就没有原型创建方法合适
 */

//构造函数创建对象方法
function Aobj() {
	this.age = 11;
	this.sayname = () => {
		console.log(this.name);
	}; //newobj_2.sayname === newobj_1.sayname //false
}
//原型创建对象
//这样创建对象会使constructor指向Object（它应该指向构造函数Aobj的）
Aobj.prototype = {
	//constructor: Aobj, //但是这样恢复constructor的指向会使它能被for-in出来 更适合用下面的方法
	name: "aobj", //通过原型添加的属性不会被keys方法枚举出来 但能被for-in找到
	//这里不能用箭头函数 否则this会指向window 这涉及到箭头函数的this指向问题 具体参考后期学习内容（我还不会
	sayname_new: function () {
		console.log(this.name); //newobj_2.sayname_new === newobj_1.sayname_new //true
	},
};
//用该方法创建会使它的默认属性都为false 具体参考{对象-属性-合并}
Object.defineProperty(Aobj.prototype, "constructor", {
	value: Aobj,
});

console.log(Object.keys(Aobj.prototype)); //name sayname_new
console.log(Object.getOwnPropertyNames(Aobj.prototype)); //constructor name sayname_new

let newobj_1 = new Aobj();
let newobj_2 = new Aobj();

newobj_1.name = "bobj"; //newobj_1.__proto__.name //aobj 它的原型的name属性仍然是aobj
newobj_1.other = "other";
let obj_1_keys = Object.keys(newobj_1); //name other age sayname
console.log(obj_1_keys);

let obj_2_keys = Object.keys(newobj_2); //age sayname
console.log(obj_2_keys);

for (const key in newobj_1) {
	console.log(key + "_1"); //name other age sayname sayname_new
}
for (const key in newobj_2) {
	console.log(key + "_2"); //age sayname name sayname_new
}

newobj_2.sayname();
newobj_2.sayname_new();

/**
 * 可以使用Aobj.propertype.xxx来修改增加原型的属性
 * 但是不能用 Aobj.propertype = {xxx:xxx} 来修改
 * 这会被当做创建了新的原型，并且构造函数指向了该原型
 * 如果在修改前实例化了对象，该对象的__proto__仍然指向原来的原型
 * 这会使后续调用实例化对象的属性不会是修改后的属性
 */
let Bobj = function () {};
Bobj.prototype = {
	key: "1st",
	keykey: function () {
		console.log(this.key);
	},
};
let bobj = new Bobj();
bobj.keykey(); //1st
Bobj.prototype.key = "3rd";
bobj.keykey(); //3rd
Bobj.prototype = {
	constructor: Bobj,
	key: "4th",
	keykey: function () {
		console.log(this.key);
	},
};
bobj.keykey(); //3rd
let bobj_new = new Bobj();
bobj_new.keykey(); //4th

/**
 * 原型仍然存在问题
 * 用原型方法实例化的对象引用的对象是指针
 * 意思是实例化出的对象的属性如果是一个对象 这些属性实际上都是指向对象的指针
 * 如果在一个实例化对象上修改了属性对应的对象，另一个实例化对象也会受到影响
 */
function Cobj() {}
Cobj.prototype = {
	key: ["1st", "2nd"],
};
let cobj_1 = new Cobj();
let cobj_2 = new Cobj();
cobj_1.key.push("3rd"); //这里push是修改了原型中的key
//cobj_1.key = ["new"]; //如果用赋值的方式修改 将会认为在cobj_1上新增了属性key，从而覆盖原型的key
console.log(cobj_1.key, cobj_2.key, Cobj.prototype.key); //都是1 2 3
