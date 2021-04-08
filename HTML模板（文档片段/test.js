const div = document.querySelector("div");
//读取文档中文档片段里的内容
let pice = document.querySelector("#pice").content;
console.log(pice);
//该内容可以像DOM数一样读取
let ap = pice.querySelector("p");
console.log(ap);
//同样可以用appendChild移动其中的element
div.appendChild(pice);

//只通过一次布局重排向DOM中批量添加标签
const fragdocument = new DocumentFragment();

let p1 = document.createElement("p");
let p2 = document.createElement("p");
let p3 = document.createElement("p");

fragdocument.appendChild(p1);
fragdocument.appendChild(p2);
fragdocument.appendChild(p3);

div.appendChild(fragdocument);

//及时使用片段中的脚本
//创建一个脚本
let script = document.createElement("script");
script.innerText = `console.log("there is a script");`;
//放入文档中的文档片段
pice.appendChild(script);
//将片段中的脚本放入文档
console.log("before insert the script");
document.body.appendChild(pice.querySelector("script"));
console.log("after insert the script");
