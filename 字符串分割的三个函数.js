let astr = "hello world!"; //astr.length=12

document.write(astr.slice(3) + "<br>"); //lo world! 从第三开始到结束
document.write(astr.substr(3) + "<br>"); //lo world!
document.write(astr.substring(3) + "<br>"); //lo world!

document.write(astr.slice(-2) + "<br>"); //d! 从负一开始到结束
document.write(astr.substr(-2) + "<br>"); //d!
document.write(astr.substring(-2) + "<br>"); //hello world! 将负数转换为0

document.write(astr.slice(3, 7) + "<br>"); //lo w 从第三开始到第七，不含第七
document.write(astr.substr(3, 7) + "<br>"); //lo worl 从第三开始数七个
document.write(astr.substring(3, 7) + "<br>"); //lo w 从第三开始到第七，不含第七

document.write(astr.slice(-2, 7) + "<br>"); //  <empty string>
document.write(astr.substr(-2, 7) + "<br>"); //d!
document.write(astr.substring(-2, 7) + "<br>"); //hello w （0，7）

document.write(astr.slice(3, -7) + "<br>"); //lo （3，12-7）
document.write(astr.substr(3, -7) + "<br>"); //<empty string> （3，0）
document.write(astr.substring(3, -7) + "<br>"); //hel （3，0）==（0，3）

let astrarr = astr[Symbol.iterator]();
console.log(astrarr.next());
