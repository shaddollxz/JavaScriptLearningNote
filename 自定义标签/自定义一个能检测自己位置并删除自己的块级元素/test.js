class BlockEle extends HTMLElement {
	constructor() {
		super();
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

	async beBlock_remove() {
		this.style.display = "block"; //将它设置为块级元素
		await this.isOutScream(this).then((result) => {
			document.body.removeChild(result);
		});
	}
}
customElements.define("block-ele", BlockEle);

let block = document.createElement("block-ele");
block.beBlock_remove();
block.innerText = "test1";
let block2 = document.createElement("block-ele");
block2.beBlock_remove();
block2.innerText = "test2";

document.body.appendChild(block);
document.body.appendChild(block2);
