let A;
let B;
{
    //! 这里设置的属性不会暴露给实例 但是能通过特权函数暴露给继承类
    //! 同时如果提供特权函数修改这里的属性 全部实例的属性都会改变
    let _Private = "Private";
    A = class {
        constructor() {
            this.a = "a";

            //! 通过在构造函数里定义的属性也不会暴露给实例和原型方法
            //! 每个实例都有独立的该属性
            let Private = "test";
            this.sayPrivate = () => {
                console.log(Private);
            };
            this.changePrivate = () => {
                Private = "new";
            };

            //! 下面设置的属性无法被继承 即使使用特权函数也无法暴露
            //! 同理 还能设置哪些继承类能获得下面的属性
            if (new.target.name == "A") {
                this.Protected = "Protected";
            }
        }
        say_priv() {
            console.log(_Private);
        }
        change_priv() {
            _Private = "new";
        }

        say_prot() {
            console.log(this.Protected);
        }
    };
}
B = class BB extends A {
    constructor() {
        super();
    }
};
let aa = new A();
let bb = new B();
console.log(aa);
console.log(bb);
