class A {
	constructor() {
		this.thing = "haha";
	}

	say(callback) {
		callback(this.thing, 123);
	}
}
let a = new A();

function sayme(thing) {
	console.log(thing);
}

a.say(sayme);
a.say((something, otherthing) => {
	console.log(something, otherthing);
});

console.log("finished");
