function sum(strings, ...exp) {
    //strings:用$分割的字符串  exp:$中的字符
    //exp.lenght = 2
    var sums = 0;

    // for (let i = 0; i < exp.length; i++) {
    // 	sums += parseInt(exp[i]);
    // }

    for (const i in exp) {
        //i += 1; //	报错 i为const 不能改变
        sums += parseInt(exp[i]);
    }

    // for (const i of exp) {
    // 	sums += parseInt(i);
    // }

    // exp.forEach((value, index, arr) => {
    // 	//value为具体值,index为索引,arr为数组本身
    // 	sums += parseInt(value);
    // });

    return sums;
}
let a = 1;
let b = 2;
let end = sum`${a} + ${b}`;
alert(end);
