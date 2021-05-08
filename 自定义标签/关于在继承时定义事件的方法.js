class New_div extends HTMLDivElement {
	constructor() {
		super();
		//会实现
		this.onclick = () => {
			console.log("onclick");
		};
	}
	haha() {
		console.log("haha");
	}
	//不会实现
	onmousedown() {
		console.log("onmousedown");
	}
}
customElements.define("new-div", New_div, { extends: "div" });

let haha = document.createElement("div", { is: "new-div" });
haha.innerHTML = "hahahhahahaha";
document.body.appendChild(haha);
console.log(haha);
