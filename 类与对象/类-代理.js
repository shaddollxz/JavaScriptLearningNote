/**
 * 代理
 * 通过Proxy实例化一个对象的替身
 * Proxy()中必须放入两个对象 第一个是要代理的对象 第二个是设置捕获器的对象
 * 对代理的操作也是同时对指定对象的操作
 */
let obj = { first: "1st", second: "2nd" };
let obj_kong = {};
let obj_stand = new Proxy(obj, obj_kong);

console.log(obj.first, obj_stand.first); //1st 1st
obj_stand.third = "3rd";
console.log(obj.third, obj_stand.third); //3rd 3rd

console.log(obj_stand === obj); //false

//捕获器
let obj_target_arguments = {
	get(stander, property, stand) {
		console.log(stander); //被代理的对象
		console.log(property); //被捕获的对象
		console.log(stand); //代理的实例化
	},
};
let obj_stand_hastarget = new Proxy(obj, obj_target_arguments);
//使用了捕获器会使属性返回undefind
console.log(obj_stand_hastarget.first); //只有调用代理时会调用捕获器
console.log(obj.first); //1st

//
let obj_target = {
	get(stander, property, stand) {
		//当捕获的属性是first时，修改它在代理中的值（同时也会修改原对象的值
		if (property == "first") {
			stand[property] = "233";
		}
		//这句用来使捕获器重建原对象并返回，使代理可以返回出属性的值
		//简单来说就使返回代理对象
		return Reflect.get(...arguments);
	},
};
let obj_stand_target = new Proxy(obj, obj_target);
console.log(obj_stand_target.first, obj.first); //233 233

//捕获器必须返回一个与捕获属性相同属性的值（这里属性指能否改写等 用defineProperty()写入的属性的属性均为false

//可撤销代理，如下方法实例化的代理可以撤销代理与被代理对象的关联
//撤销后再调用代理会报错
let obj_target_canrevoke = {
	get() {
		return "haha";
	},
};
//这里的代理必须叫做proxy
let { proxy, revoke } = Proxy.revocable(obj, obj_target_canrevoke);
console.log(proxy.first, obj.first);
revoke(); //取消代理
//console.log(proxy.first); //报错

//
const userlist = [];
class User {
	constructor(newname) {
		this.name = newname;
	}
}
const proxy_user = new Proxy(User, {
	construct() {
		//console.log(arguments);
		const Newuser = Reflect.construct(...arguments);
		userlist.push(Newuser);
		return Newuser;
	},
});

new proxy_user("1st");
new proxy_user("2nd");
new proxy_user("3rd");
console.log(userlist);
