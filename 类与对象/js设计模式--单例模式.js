//! 单例模式
//! 通过将类实例缓存 实现一个类只会实例化出一个实例
let OnlyOne;
{
    let onlyone;
    OnlyOne = class {
        constructor() {
            //? 如果有缓存 直接把实例返回
            if (!!onlyone) {
                return onlyone;
            }
            this.proper = "test proper";
            onlyone = this; //? 实例化后缓存
        }
        changeProper(newval) {
            this.proper = newval;
        }
    };
}
const test1 = new OnlyOne();
const test2 = new OnlyOne();
console.log(test1, test2);
test1.changeProper("new proper");
console.log(test1, test2);
console.log(test1 === test2); // true
