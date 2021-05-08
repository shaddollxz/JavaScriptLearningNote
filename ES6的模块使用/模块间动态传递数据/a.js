import { mainflag } from "./main.js";

let flag = false;
let haha = "haha";
let btnCallback = () => {
    flag = !flag;
    console.log("click");
};
let btn = document.querySelector(".btn");
btn.addEventListener("click", btnCallback);

export { flag, btnCallback };
while (true) {
    if (mainflag) {
        console.log("yes");
    }
}
