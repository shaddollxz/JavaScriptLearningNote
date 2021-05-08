//生成器函数定义时function后必须跟* 里面有yield
//生成器函数赋值的对象叫做生成器
//赋值时不会产生返回，必须调用next()才会开始执行函数
//yield相当于return 使用next将在yield的地方开始继续执行函数
//done是指是否结束遍历的标记
function* test() {
    yield "1st";
    yield "2nd";
    return "3rd"; //如果改为yield 第三个next会是false 第四个仍然为true
}
let testtest = test();
console.log(testtest.next()); //{ value: "1st", done: false }
console.log(testtest.next()); //{ value: "2nd", done: false }
console.log(testtest.next()); //{ value: "3rd", done: true }
console.log(testtest.next()); //{ value: undefind, done: true }

function* aaa() {
    console.log("aaa开始执行");
    let a = 3;
    while (a--) {
        yield 1;
        console.log("这里将在next后执行");
    }
    return 2;
}
let aaatest = aaa();
console.log(aaatest.next());
console.log(aaatest.next());
console.log(aaatest.next());
console.log(aaatest.next());
console.log(aaatest.next());

//yield还能作为函数的中间参数使用 在next中传入 第一次的值不会传入
function* bbb(something) {
    console.log(something);
    console.log(yield);
    console.log(yield);
}
let bbbtest = bbb("ha");
bbbtest.next("haha"); //第一次的值不会传入 这里是启动它其实不应该有输入
bbbtest.next("hahaha"); //这里执行第二行的 “console.log(yield);” 【hahaha】作为yield传入
bbbtest.next("hahahaha"); //同上
bbbtest.next("hahahahaha"); //函数已经结束，这里没有输出

//生成器可以迭代
function* ccc() {
    for (let i = 0; i < 3; i++) {
        yield i;
    }
}
for (const a of ccc()) {
    console.log(a); //0 1 2
}

//只迭代yield指向的值（done == false）的情况下才迭代出来
function* cccother() {
    yield 1;
    yield 2;
    return 3;
}
for (const i of cccother()) {
    console.log(i); //1 2 没有3
}

//yield后跟着函数 不仅会在函数执行后停止 而且下一次传入参数是在停止的那个yield上传入
function test() {
    return "i am test";
}
function* genner() {
    yield test();
    console.log(yield);
    let aa = yield test();
    console.log(aa);
    return "finished";
}
let hh = genner();
console.log(hh.next()); //开始执行 返回test()的结果
console.log(hh.next("1")); //undefind 这里传给了第一个yield
console.log("==========");
console.log(hh.next("2")); //2被传给第二个 然后继续执行到返回test()的结果
console.log("==========");
console.log(hh.next("3")); //3被传给第三个 然后又被传给aa 然后输出aa 最后返回最终值

//yield* 迭代后面跟着可迭代对象
let map = new Map([
    ["key1", "value1"],
    ["key2", "value2"],
]);

function* dtest() {
    yield "dtest 1";
    yield "dtest 2";
    return "dtest 3";
} //同上，只迭代出前两个yield

let newobj = new Object({ key1: "val2", key2: "val2" }); //不可迭代，要加上迭代器

function* ddd() {
    yield* [1, 2, 3];
    yield* map;
    yield* dtest();
    //yield* newobj;
}
let dddtest = ddd();
console.log(dddtest.next());
console.log(dddtest.next());
console.log(dddtest.next()); //数组
console.log(dddtest.next());
console.log(dddtest.next()); //map
console.log(dddtest.next());
console.log(dddtest.next()); //生成器
console.log(dddtest.next()); //不可迭代

//
function* eee() {
    console.log(yield* [1, 2, 3]); //undefind 返回的应该是done为true时对应的值
}

function* inner() {
    yield "foo";
    yield "foo1";
    return "bar";
}
function* outer() {
    console.log("iter value:", yield* inner()); //"bar" 此时done为true
}

for (const i of outer()) {
    console.log("value : ", i); //只迭代yield指向的值（done == false）的情况下才迭代出来
}

//
function* test2() {
    console.log("233");
    yield "haha";
    console.log(yield);
}
function printnum() {
    let test = test2();
    console.log(test.next()); //233 haha
    console.log("next");
    test.next(6); //第一次传值不会执行
    test.next(6);
}

/**所有生成器都带有默认的return()
 * 括号里放入这次返回的值，该值可以不在迭代对象中
 * 调用后将强制将done转为done且无法恢复
 *
 * for-of等循环会忽略done为true时的输出
 * 所以return的值不会出现在for-of等中
 */
console.log("return");
function* test_return() {
    for (const i of [1, 2, 3]) {
        yield i;
    }
}
const test_Retrun = test_return();
console.log(test_Retrun.next()); // 1 false
console.log(test_Retrun.return(5)); //5 true
console.log(test_Retrun.next()); //undefind true

const test_Retrun_2 = test_return();
for (const i of test_Retrun_2) {
    if (i > 1) {
        test_Retrun_2.return(4); //返回的结果不会被打印
        console.log(i); //2
    }
    console.log(i); //1 2
}

/**
 * throw()会抛出错误并关闭生成器，该错误能被try-catch捕获
 * 可以在生成器函数中设置try-catch捕获，这样生成器在获取错误时将会跳过
 */
console.log("throw");
function* test_throw() {
    for (const i of [1, 2, 3]) {
        yield i;
    }
}
const test_Throw = test_throw();
console.log(test_Throw.next()); //1 false
try {
    test_Throw.throw("error");
} catch (e) {
    console.log(e); //"error"
}
console.log(test_Throw.next()); //undefind true

function* test_throw_2() {
    for (const i of [1, 2, 3]) {
        try {
            yield i;
        } catch (e) {
            console.log("error_in");
        }
    }
}
const test_Throw_2 = test_throw_2();
console.log(test_Throw_2.next()); //1
try {
    test_Throw_2.throw(5); //"error_in"
} catch (e) {
    console.log("error_out");
}

console.log(test_Throw_2.next()); //3

// try {
// 	test_Throw_2.throw(5); //如果在第一次next前执行throw 则会在生成器外部被捕获错误
// } catch (e) {
// 	console.log("error_out"); //"error_out"
// }
