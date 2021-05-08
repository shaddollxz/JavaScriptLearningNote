class Div_RemoveSelf extends HTMLDivElement {
	constructor() {
		super();
		this.autoRemove();
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

	async autoRemove() {
		await this.isOutScream(this).then((result) => {
			document.body.removeChild(result);
		});
	}

	//不是人看的写法
	/* async autoRemove() {
		await (async function (obj) {
			return new Promise((resolve) => {
				setInterval(() => {
					if (obj.offsetLeft < -300) {
						resolve(obj);
					}
				}, 5000);
			});
		})(this).then((value) => {
			document.body.removeChild(value);
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

let ele = document.querySelector("div");
function outScream(ele) {
	ele.style.position = "absolute";
	ele.style.left = "-500px";
}
