/**
 * 原型链继承
 * 使用父构造函数的实例化作为子构造函数的原型
 * 所以子构造函数的原型的原型才是父构造函数的原型
 * 该方法对对象，数组等仍然传递指针
 */

function Father_obj() {
	this.name = "1st";
	this.color = ["green", "blue"];
}
Father_obj.prototype.age = "233";
Father_obj.prototype.newcolor = ["green_new", "blue_new"];
Father_obj.prototype.afun = function () {
	console.log("Father_Prototype");
};

function Son_obj() {}
Son_obj.prototype = new Father_obj();

//这里父构造函数的原型与子构造函数的原型的原型相同
//Father_obj.prototype === Son_obj.prototype.__proto__

let son_obj = new Son_obj();
let father_obj = new Father_obj();

console.log(son_obj.color === father_obj.color, son_obj.newcolor === father_obj.newcolor); //false true
father_obj.color = ["1"];
father_obj.newcolor = ["2"]; //实例上新增了newcolor属性，覆盖了原型的newcolor 具体参考{对象-构造函数，原型，实例}
//Father_obj.prototype.newcolor = ["2"]; //修改了原型的newcolor 两个都会改变
console.log(son_obj.color, father_obj.color); //不同
console.log(son_obj.newcolor, father_obj.newcolor); //不同
console.log(son_obj.newcolor === father_obj.newcolor); //false son调用的是原型，而father调用了自身的属性

//son的原型是father的实例化 即只有name和color属性
//son的原型的原型 才是father的原型
console.log(son_obj.__proto__.__proto__ === father_obj.__proto__); //true

/**
 * 盗用构造函数
 * 在构造函数中调用父构造函数
 * 这样父构造函数的原型不会被子构造函数继承
 * 无法继承原型属性
 */
function First() {
	this.color = ["green", "blue"];
}
First.prototype.newcolor = ["green_new", "blue_new"];
function Second() {
	First.call(this);
}
//这里first的原型中有newcolor second的原型中什么也没有
//即是说，second没有继承到first的原型
// First.prototype; //newcolor
// Second.prototype; //没有
let first = new First();
let second = new Second();
console.log(first.newcolor, second.newcolor); //second 是 undefind
console.log(first.color === second.color, first.newcolor === second.newcolor); //false false

first.color.push("red");
first.newcolor.push("red_new");
console.log(first.color, second.color); //first有red second没有
console.log(first.newcolor, second.newcolor); //second 是 undefind

//盗用构造函数的作用是能传递参数
//具体详见P243

/**
 * 组合继承
 * 结合了原型链和盗用构造函数的
 */
function Person(name) {
	this.name = name;
	this.sex = "man";
}
Person.prototype = {
	sayme: function () {
		console.log(`my name is ${this.name}, my sex is ${this.sex}`);
	},
};

function Person_Plush(name, age) {
	Person.call(this, name); //继承了Person的构造函数中的属性 即name sex
	//新建了属性
	this.age = age;
	this.colors = ["green", "blue"];
}
Person_Plush.prototype = new Person("ha"); //这里使Pers_Plush的原型里有了{name:"ha" sex:"man"}这个实例 这个实例的原型__proto__里有sayme()
//新建了一个新方法
Person_Plush.prototype.sayme_plush = function () {
	console.log(`my name is ${this.name}, my sex is ${this.sex}, my age is ${this.age}, i like ${this.colors}`);
};

let person_plush = new Person_Plush("haha", 233);
let person = new Person("ha");

person_plush.sayme();
//在 Person_Plush.prototype.__proto__ 中
//或者说在 person_plush.__proto__.__proto__ 中

//组合式继承会在实例的原型里出现重复且无用的name sex，在下面的寄生式组合继承得到了解决
//person_plush.__proto__.__proto__ : {sayme:function} (这个原型的原型就是Objec了)
//person_plush.__proto__:{name:"ha", sex:"man", sayme_plush:function}
//person_plush : {name:"haha", sex:"man", age:"233", colors:[""]}
//这个覆盖了原型所以调用person_plush.name显示的是haha

/**
 * 原型式继承
 * 被Objet.creat()代替了
 * 与Obje.assing()相似 都返回第一个输入对象以及以后输入对象的合并（可以没有后面的对象
 * 之后输入的对象与Object.defineProperty()相似，要指定value等属性
 * creat返回的对象其实是后面新加的对象，它的原型是输入的对象
 */
let obj_1 = { key: "val" };
let obj_2 = Object.create(obj_1, { name: { value: "233" } });
console.log(obj_2); //name
console.log(obj_2.__proto__); //key

/**
 * 寄生式组合继承
 * 解决了组合式继承中原型与实例各有相同key的属性的问题
 * 解决方法是把原来的(子构造函数原型中放入父构造函数实例化)改为(放入一个空实例，这个空实例的原型是父构造函数的原型)
 */
function inheritPrototype(aConstructor, bConstructor) {
	let prototype = Object.create(bConstructor.prototype); //将b的原型复制到prototype的原型上
	prototype.constructor = aConstructor; //把复制出来的原型的构造函数指向a
	aConstructor.prototype = prototype; //把a的原型指向prototype（prototype的原型才是b的原型，这里prototype里什么也没有
}

function Cat(name, child) {
	this.name = name;
	this.child = child;
}
Cat.prototype = {
	sayme: function () {
		console.log(`my name is ${this.name},i have child:${this.child},my color is ${this.colors}`);
	},
	colors: ["black"],
};

function Mycat(name, child, age) {
	Cat.call(this, name, child); //仍然是调用Cat 放入name,child
	this.age = age;
}
//组合式继承是在这里把Cat的实例放到MycCat的原型上 这样会把Cat的实例和原型都放上来
//Mycat.prototype = new Cat("name", ["green", "red"]);

//现在是将Cat的原型放到MyCat的原型的原型上
inheritPrototype(Mycat, Cat);
//在原型上添加新方法
Mycat.prototype.saymycat = function () {
	console.log(`my name is ${this.name},my age is ${this.age},i have child:${this.child},my color is ${this.colors}`);
};

let mycat = new Mycat("tom", ["black", "whilt"], 233);


let othercat = new Mycat("ttoomm", ["green"], 2333);
/**
 * mycat.__proto__.__proto__ : sayme colors
 * mycat.__proto__ : saymeycat
 * mycat : name age child
 */
