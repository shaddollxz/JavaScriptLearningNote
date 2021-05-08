let cc = {};
function outer() {
	let a = true;
	cc.aa = () => {
		if (a) {
			a = false;
			console.log("1st");
		} else {
			console.log("2nd");
		}
	};
	/* 	return {
		aa() {
			if (a) {
				a = false;
				console.log("1st");
			} else {
				console.log("2nd");
			}
		},
	}; */
}
outer();
console.log(cc);
cc.aa();
cc.aa();
