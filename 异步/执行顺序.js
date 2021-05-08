async function asyncfunction() {
	console.log("1"); //-2-
	await (async () => {
		console.log("2"); //-3-
		return "ok1";
	})().then((data) => {
		console.log(data); //-6-
	});
	console.log("3"); //-7-
	return "ok2";
}

console.log("0"); //-1-
asyncfunction().then((data) => {
	console.log(data); //-8-
});
console.log("4"); //-4-
console.log("end"); //-5-
