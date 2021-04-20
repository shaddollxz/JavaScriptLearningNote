class Div_RemoveSelf extends HTMLDivElement {
	constructor() {
		super();
		this.outToRemove();
	}

	//监视是否离开屏幕
	async isOutScream(obj) {
		return new Promise((resolve) => {
			setInterval(() => {
				if (obj.offsetLeft < -300) {
					resolve(obj);
				}
			}, 5000);
		});
	}

	async outToRemove() {
		//this.style.display = "block"; //将它设置为块级元素
		await this.isOutScream(this).then((result) => {
			document.body.removeChild(result);
		});
	}

	//不是人看的写法
	/* async outToRemove() {
		this.style.display = "block";
		await (async function (obj) {
			return new Promise((resolve) => {
				setInterval(() => {
					if (obj.offsetLeft < -300) {
						resolve(obj);
					}
				}, 5000);
			});
		})(this).then((x) => {
			document.body.removeChild(x);
		});
	} */
}

customElements.define("div-remove", Div_RemoveSelf, { extends: "div" });

let block = document.createElement("div", { is: "div-remove" });
block.innerText = "test1";
let block2 = document.createElement("div", { is: "div-remove" });
block2.innerText = "test2";

document.body.appendChild(block);
document.body.appendChild(block2);
function outScream(ele) {
	ele.style.position = "absolute";
	ele.style.left = "-500px";
}
