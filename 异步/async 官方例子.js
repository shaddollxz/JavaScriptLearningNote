var resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

var resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

var sequentialStart = async function () {
    console.log("==SEQUENTIAL START==");

    // 1. Execution gets here almost instantly
    const slow = await resolveAfter2Seconds();
    console.log(slow); // 2. this runs 2 seconds after 1.

    const fast = await resolveAfter1Second();
    console.log(fast); // 3. this runs 3 seconds after 1.
};

var concurrentStart = async function () {
    console.log("==CONCURRENT START with await==");
    const slow = resolveAfter2Seconds(); // starts timer immediately
    const fast = resolveAfter1Second(); // starts timer immediately

    // 1. Execution gets here almost instantly
    console.log(await slow); // 2. this runs 2 seconds after 1.
    console.log(await fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
};

var concurrentPromise = function () {
    console.log("==CONCURRENT START with Promise.all==");
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
        console.log(messages[0]); // slow
        console.log(messages[1]); // fast
    });
};

var parallel = async function () {
    console.log("==PARALLEL with await Promise.all==");

    // Start 2 "jobs" in parallel and wait for both of them to complete
    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))(), //这里的await只起到了解构作用
        (async () => console.log(await resolveAfter1Second()))(),
    ]);
};

// This function does not handle errors. See warning below!
var parallelPromise = function () {
    console.log("==PARALLEL with Promise.then==");
    resolveAfter2Seconds().then((message) => console.log(message));
    resolveAfter1Second().then((message) => console.log(message));
};

sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"

// wait above to finish
setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"

// wait again
setTimeout(concurrentPromise, 7000); // same as concurrentStart

// wait again
setTimeout(parallel, 10000); // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"

// wait again
setTimeout(parallelPromise, 13000); // same as parallel

// function aAsyncFunc() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject("noo");
//         }, 1000);
//     });
// }
// (async function () {
//     try {
//         //如果在await后用then或catch到error try-catch则不会捕获错误
//         let a = await aAsyncFunc(); /* .catch((rejected) => {
//             console.log(rejected);
//         }); */
//     } catch (error) {
//         console.log(error);
//     }
// })();

/* function wait1s() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("1s");
            console.log("resolve in 1s");
        }, 1000);
    });
}
function wait2s() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("2s");
            console.log("resolve in 2s");
        }, 2000);
    });
}
(async function () {
    performance.mark("begin1");
    await Promise.all([
        (async () => {
            console.log(await wait1s());
        })(),
        (async () => {
            console.log(await wait2s());
        })(),
    ]).then((fulfilled) => {
        console.log(fulfilled);
    });
    performance.mark("end1");
    performance.measure("1st", "begin1", "end1");
})();
(async function () {
    performance.mark("begin2");
    await Promise.all([wait1s(), wait2s()]).then((fulfilled) => {
        console.log(fulfilled);
    });
    performance.mark("end2");
    performance.measure("2nd", "begin2", "end2");
    console.log(...performance.getEntriesByType("measure"));
})(); */
