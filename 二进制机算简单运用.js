//求奇偶
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
if (numbers[9] & 1) {
	console.log("奇数");
} else {
	console.log("偶数");
}

//交换数字
let a = numbers[2],
	b = numbers[8];
console.log(a, b);
a = a ^ b;
b = a ^ b;
a = a ^ b;
console.log(a, b);

//求2的n次方
console.log(`2的${numbers[5]}次方为：` + (1 << numbers[5]));

/**
 * 不咋实用例子
 */

//计算二进制数中有多少个1
function NumberOf1(n) {
	let va = 0;
	//int最多32位
	//用2的i次方（1，10，100...）对该数求与（&） 如果不为0则代表该位为1
	for (let i = 0; i < 32; i++) {
		if ((n & (1 << i)) != 0) {
			va++;
		}
	}
	return va;
}
let numberof1 = 99;
console.log(numberof1.toString("2"), `${numberof1}转为二进制含有` + NumberOf1(`${numberof1}`) + "个1");

//找出数组中只出现了一次的数
//两个相同的数^后得0，所有数进行^后化简得到唯一一个不是偶数个的数
let numberss = [1, 5, 4, 6, 6, 4, 5, 5, 5];
function findonly(numberss) {
	let only = 0;
	for (const i of numberss) {
		only ^= i;
	}
	return only;
}
console.log(`${numberss}中【${findonly(numberss)}】只出现了一次`);
