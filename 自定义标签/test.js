/* 自定义标签：
先创建一个类继承自标签 
然后用customElements.define(tag,self_class)创建
这样就可以创建一个自定义的标签了 */
//
let MyElement_count = 0; //每次MyElement实例化都会使count+1
//在每次使用innerHTML修改页面时会重新实例化元素 用appendChild不会
class MyElement extends HTMLElement {
	constructor() {
		super();
		console.log(`my elements is pushed:${MyElement_count++}`); //这样在每次实例化（包括向DOM中添加该标签，使用create创建标签）出该标签时都会输出
	}
}
customElements.define("my-ele", MyElement); //创建自定义元素 第二个值必须是一个类 并且它不能已经被用来创建了一个标签

let myele = document.createElement("my-ele");
myele.innerText = "this is my element";
document.body.appendChild(myele); //添加进body

//如果继承自某个标签的类 可以用is指定该元素是否用自定义的类
//safari不支持该方法
class MyDiv extends HTMLDivElement {
	constructor() {
		super();
		console.log("my div is pushed");
	}
}
customElements.define("my-div", MyDiv, { extends: "div" });

document.body.innerHTML += "<div is='my-div'>this is my div</div>";

/* 通过自定义标签的构造函数可以添加一个模板
配合影子DOM食用更佳 */
class MyUl extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" }); //创建影子DOM
		this.shadowRoot.innerHTML = "<ul><li>this li is belong MyUl</li></ul>"; //向影子DOM中添加标签

		//当然直接添加也是可以的
		/* let ul = document.createElement("ul");
		let li = document.createElement("li");
		li.innerText = "this li is belong MyUl";
		ul.appendChild(li);
		this.appendChild(ul); */
	}
}
customElements.define("my-ul", MyUl);
document.body.innerHTML += "<my-ul></my-ul>";

//为自定义标签设置属性
class MyEleWithAttr extends HTMLElement {
	constructor() {
		super();
		/**
		 * 在这里触发了set myattr() 如果预先设置my-ele-attr标签 则使用
		 * 但是如果启用，则不能新建这个标签
		 */
		//this.myattr = "233";
	}
	get myattr() {
		return this.getAttribute("myattr");
	}
	set myattr(value) {
		this.setAttribute("myattr", value);
	}
}
customElements.define("my-ele-attr", MyEleWithAttr);

let attrele = document.createElement("my-ele-attr");
attrele.id = "myelewithattr";
document.body.appendChild(attrele);
attrele.myattr = "233";
//这样就能直接设置属性并且即使html中标签的属性改变 也会即时读到改变的值
//如果有直接在html中设置的同类标签也能这样设置

//监听自定义标签属性的改变
class otherattrele extends HTMLElement {
	//设置两个属性 bar foo
	get bar() {
		return this.getAttribute("bar");
	}
	set bar(value) {
		this.setAttribute("bar", value);
	}
	get foo() {
		return this.getAttribute("foo");
	}
	set foo(value) {
		this.setAttribute("foo", value);
	}

	//设置监控标签属性列表
	//attributeChangedCallback的name只会从返回值里选择
	static get observedAttributes() {
		return ["bar", "foo"];
	}

	//在属性改变时会调用该函数
	//name只会是observedAttributes的返回值
	attributeChangedCallback(name, oldvalue, newvalue) {
		if (oldvalue !== newvalue) {
			console.log(`${oldvalue} -> ${newvalue}`);
			this[name] = newvalue; //这里会触发set 然后又触发一次该方法 所以要有前面的if判断
		}
	}
}
customElements.define("my-other-attr", otherattrele);

let barfoo = document.createElement("my-other-attr");
barfoo.bar = "123";
barfoo.foo = "321";
barfoo.innerText = "bar-foo";
document.body.appendChild(barfoo);
document.querySelector("my-other-attr").setAttribute("foo", "foo");
document.querySelector("my-other-attr").setAttribute("bar", "bar");

//
let promise_foo = customElements.whenDefined("x-foo"); //返回一个期约 如果x-foo定义了就用下面的解决
promise_foo.then((slove) => {
	console.log("x-foo is define");
});
class XFOO extends HTMLElement {
	constructor() {
		super();
	}
}
console.log(customElements.get("x-foo")); //还没有创建时返回undefined
customElements.define("x-foo", XFOO); //这里whenDefined的期约会解决(当然是异步解决的)
console.log(customElements.get("x-foo")); //返回该标签

//强制升级
//在定义自定义标签前创建了该标签 在定义后使用 customElements.upgrade(oldelement) 会使标签变成自定义标签
