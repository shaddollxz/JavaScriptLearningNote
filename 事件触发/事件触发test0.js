let ul = document.getElementById("test-ul");
let gragment = document.createDocumentFragment();

for (let i = 0; i < 3; i++) {
	let li = document.createElement("li");
	li.appendChild(document.createTextNode(`${i}`));
	gragment.appendChild(li);
}

ul.appendChild(gragment); //gragment中的节点放入文档 但是gragment没有放入

// //插入动态脚本 不能用innerHTML来创建脚本的文本
// let script = document.createElement("script");
// script.appendChild(document.createTextNode("alert(`hi`)"));
// document.body.appendChild(script);

//
let table = document.createElement("table");
table.id = "test-table";

let tbody = document.createElement("tbody");
table.appendChild(tbody);

function insert_totbody(row, ...text) {
	tbody.insertRow(row);
	for (const cell in text) {
		tbody.rows[row].insertCell(cell);
		tbody.rows[row].cells[cell].appendChild(
			document.createTextNode(text[cell])
		);
	}
}
document.body.appendChild(table);

//设置监听
//实例化一个监听
let observe = new MutationObserver((x) => {
	console.log(
		x.map((x) => {
			x.oldValue;
		})
	);
	alert("你刚才改了东西吧？");
});
//将实例化的监听绑定到body上
observe.observe(document.body, { attributes: true, attributeOldValue: true }); //第二个设置为true时第一个可以不设了
//具体其他方法见书 P432
