export { mainflag };
let mainflag = false;
import { flag } from "./a.js";
setInterval(() => {
    if (flag) {
        mainflag = true;
    }
}, 100);
