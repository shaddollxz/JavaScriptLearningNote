let outer = document.querySelector(".outer");
let thisele = outer;
for (let i = 0; i < 10000; i++) {
    div = document.createElement("div");
    div.className = `a${i}`;
    div.innerText = i;
    div.addEventListener("click", (e) => {
        console.log(i);
    });
    thisele.appendChild(div);
    thisele.appendChild(document.createElement("p"));
    thisele = div;
}

var inner = outer;
performance.mark("begin1");
for (let i = 0; i < 10000; i++) {
    inner = inner.firstElementChild;
}
console.log(inner);
performance.mark("end1");
performance.measure("1st", "begin1", "end1");

var inner = outer;
performance.mark("begin2");
for (let i = 0; i < 10000; i++) {
    inner = document.querySelector(`.a${i}`); //用inner.querySelector查找会比对象查找更快
}
console.log(inner);
performance.mark("end2");
performance.measure("2nd", "begin2", "end2");

console.log(performance.getEntriesByType("measure")[0]);
console.log(performance.getEntriesByType("measure")[1]);
