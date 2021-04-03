let form = document.querySelector("form");
let sub_btn = document.querySelector(".submit_button");
let textbox = document.querySelector("input");
let copy_btn = document.querySelector("#copybtn");

sub_btn.addEventListener("click", (event) => {
	form.submit();
});
form.addEventListener("submit", (event) => {
	let btn = event.target.elements[0];
	btn.disabled = true;
});
//在选中文本框时自动全选
textbox.addEventListener("focus", (event) => {
	let target = event.target;
	target.select();
});
textbox.addEventListener("select", (event) => {
	//console.log(`select \"${event.target.value}\"`); //文本框内内容只能用.value查看
	let textbox_in = event.target;
	console.log(
		`select \"${textbox_in.value.substring(
			textbox_in.selectionStart,
			textbox_in.selectionEnd
		)}\"`
	);
});

textbox.addEventListener("copy", (event) => {
	console.log("cant do this");
	event.preventDefault(); //阻止复制
});
textbox.addEventListener("paste", (event) => {
	//event.clipboardData.setData("text/plain", "haha"); //不支持改写剪切板内容 用下面的方法
	console.log(event.clipboardData.getData("text")); //从event中读取剪切板中的内容
});
copy_btn.addEventListener("click", async (e) => {
	await navigator.clipboard.writeText("Yo");

	//读取剪切板内内容 要权限不支持
	// const text = await navigator.clipboard.readText();
	// console.log(text);
});

//option
let selectbox = document.querySelector("select");

//用创建元素的方法
let option = document.createElement("option");
option.setAttribute("value", "1st");
option.text = "1st";
selectbox.appendChild(option);
//实例化出对象放入
//也能用appendchild 但是这里更建议用add
//第二个值是一个元素 将要插到该元素之前 如果在最后就放undefined 相当于insertbefore()
let option2 = new Option("text", "value");
selectbox.add(option2, undefined);
