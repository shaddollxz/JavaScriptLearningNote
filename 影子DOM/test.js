/* 影子DOM：
将一个元素设置为影子DOM后，该元素叫做影子宿主
宿主内的元素（包括文本节点）均被隐藏
同时在宿主内新增一个DOM，其中的元素会被显示出来
在里面设置的css样式只影响里面 */

let maindiv = document.querySelector("#cup");
let beshadow_p = document.querySelector("#beshadow");

//let shadow_div = maindiv.attachShadow({ mode: "open" });
let shadow_p = beshadow_p.attachShadow({ mode: "open" }); //一般都设为open
console.log(beshadow_p.shadowRoot); //如果mode是closed 则为null
console.log(shadow_p == beshadow_p.shadowRoot); //true

//向影子DOM和原来DOM中分别添加新元素
shadow_p.appendChild(document.importNode(maindiv, true)); //显示
beshadow_p.appendChild(document.importNode(maindiv, true)); //不显示

//影子DOM同样能像DOM一样操作
console.log(shadow_p.querySelector("p"));

//向body中添加两个div
//其中都有style属性 但是这个属性只影响影子DOM中的元素
for (const color of ["red", "green"]) {
	const div = document.createElement("div");
	const shadowDiv = div.attachShadow({ mode: "open" });

	document.body.appendChild(div);
	shadowDiv.innerHTML = `
    <p>my color is ${color}</p>
    <style> p{color:${color}} </style>
    `;
}

/* 槽位 slot
在设定了影子DOM的元素中再添加新元素也不会显示
但是再影子DOM中添加了slot后，它会映射出没有显示的元素
同时还有命名槽位：
在原来元素的子元素上添加slot="xxx"后，
影子DOM中将solt的name设置相同 这个solt将会映射指定的元素 */

//设置影子DOM
let newdiv = document.querySelector("#slottest");
let newdiv_shadow = newdiv.attachShadow({ mode: "open" });
//向设置了影子DOM的元素中添加新元素
let newp = document.createElement("p");
newp.innerText = "i am a new p";
newdiv.appendChild(newp);
//在影子DOM中添加slot标签
newdiv_shadow.innerHTML = `<div> <slot></slot> </div>`;

//事件重定向
//在影子DOM中新加一个元素
let newP = document.createElement("p");
newP.innerText = "i am a new p in slotdiv";
newdiv_shadow.appendChild(newP);

//创建一个点击事件
function clickevent(event) {
	console.log(event.target);
}

//给新加元素，投射元素，影子宿主，body添加事件
newP.addEventListener("click", clickevent);
newp.addEventListener("click", clickevent);
newdiv.addEventListener("click", clickevent);
document.body.addEventListener("click", clickevent);
/* 点击后会发现：
点击的是用slot投影出的元素 会正常冒泡触发三次点击该元素的效果:
第一次是点击到具体的元素触发事件 第二次是冒泡到宿主触发的事件 第三次是冒泡到body触发 均是返回点击元素
如果点击的是影子DOM中存在的元素：
会先触发元素的click事件 然后事件重定向变成由宿主触发 同时后面也会冒泡到body由宿主触发*/
