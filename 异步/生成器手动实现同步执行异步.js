function aAsyncFunc(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x + "async finished ");
        }, 1000);
    });
}
function otherAsyncFunc(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x + "other async finished");
        }, 2000);
    });
}
//标准的async使用
/* (async function uesAsync() {
    console.log("begin in async");
    let rusult = await aAsyncFunc(123);
    console.log(rusult);
    let other = await otherAsyncFunc(123);
    console.log(other);
    console.log("end in async");
})(); */

//用生成器手动实现
//①这样的写法有问题 一共使用了两秒完成 实际期待的是三秒
/* function inner() {
    aAsyncFunc().then((fulfilled) => {
        it.next(fulfilled);
    });
    otherAsyncFunc().then((fulfilled) => {
        it.next(fulfilled);
    });
}
function* generator() {
    console.log("begin in generator");
    let result = yield inner();
    console.log(result);
    let other = yield inner();
    console.log(other);
    console.log("end in generator");
}
it = generator();
it.next(); */

//②可以实现await的功能 但是只有大概的概念没有封装
/* function* generator() {
    console.log("begin in generator");
    let result = yield aAsyncFunc().then((fulfilled) => {
        it.next(fulfilled);
    });
    console.log(result);
    let other = yield otherAsyncFunc().then((fulfilled) => {
        it.next(fulfilled);
    });
    console.log(other);
    console.log("end in generator");
}
it = generator();
it.next(); */

//③封装为函数的异步生成器 通过递归的方式访问生成器中调用的异步函数
function myAwait(genner, ...args) {
    let iter = genner.apply(this, args); //生成生成器的迭代器
    return new Promise((resolve, reject) => {
        let result; //iter每次暂停时的结果
        let inner = function (yield) {
            try {
                result = iter.next(yield); //开始迭代 将这里的yield当作yield传入生成器
            } catch (error) {
                reject(error);
            }
            //迭代结束：
            if (result.done) {
                resolve(result.value); //最终返回Promise
            } else {
                //如果没有结束 等到promise的结束继续递归
                return Promise.resolve(result.value).then(
                    (fulfilled) => {
                        inner(fulfilled);
                    },
                    (rejected) => {
                        throw rejected;
                    }
                );
            }
        };
        inner(); //迭代器第一次不应该传入参数
    });
}
function* generator(x) {
    console.log("begin in generator");
    let result = yield aAsyncFunc(x);
    console.log(result);
    let other = yield otherAsyncFunc(x);
    console.log(other);
    console.log("end in generator");
}
myAwait(generator, 123);
