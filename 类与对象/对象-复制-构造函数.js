//如果只是把对象赋值给另一个对象，只会把指向对象的指针赋值给另一个值
//总之，原始数据修改，复制数据也会修改
let work = { person_work: "original" };
let person = { age: 11, sex: "女", name: "233", work };

let person_copy = person;
console.log(person, person_copy);
person.age = 12;
console.log(person, person_copy);

//如果将对象的属性直接赋值给新对象的属性，则不会出现修改
//但是如果该对象的属性是一个对象，则仍然是把这个属性中对象的指针赋给新值
let person_weekdeep_copy = {};
({ age: person_weekdeep_copy.age, sex: person_weekdeep_copy.sex, name: person_weekdeep_copy.name, work: person_weekdeep_copy.work } = person);
console.log(person, person_weekdeep_copy);
person.age = 13;
work.person_work = "changed_1";
console.log(person, person_weekdeep_copy);

//可以将该思路打包为函数 用来深度复制对象
function deep_copy_obj(oldobj) {
	let newobj = {};
	for (const key in oldobj) {
		if (typeof oldobj[key] == "object") {
			newobj[key] = deep_copy_obj(oldobj[key]);
		} else {
			({ [key]: newobj[key] } = oldobj);
		}
	}
	return newobj;
}
let person_deep_copy = deep_copy_obj(person);
work.person_work = "changed_2";
console.log(person_deep_copy); //changed_1

//用构造函数来写
//构造函数：用来创建对象的函数，任意函数只要使用new调用就是构造函数
//和类仍然有很大差别
function DEEP_COPY_OBJ(oldobj) {
	for (const key in oldobj) {
		if (typeof oldobj[key] == "object") {
			this[key] = deep_copy_obj(oldobj[key]);
		} else {
			({ [key]: this[key] } = oldobj);
		}
	}
}
let person_deep_copy_new = new DEEP_COPY_OBJ(person);
work.person_work = "changed_3";
console.log(person_deep_copy_new); //changed_2
//直接当作函数使用 将把对象作为window 属性作为window的属性
DEEP_COPY_OBJ(person);
console.log(window.work);
//调用call()/apply()来创建对象
let aclass = {};
DEEP_COPY_OBJ.call(aclass, person);
console.log(aclass.work);
