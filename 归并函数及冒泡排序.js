//累加//
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/*从右往左累加*/
let sum1 = arr.reduce((first, second, index, array) => {
	console.log(`first is :${first}`);
	console.log(`second is :${second}`);
	console.log(`index is :${index}`); //second的下标
	return first + second;
});

/*从左往右累加*/
// let sum = arr.reduceRight((first, second, index, array) => {
// 	console.log(`first is :${first}`);
// 	console.log(`second is :${second}`);
// 	console.log(`index is :${index}`); //second的下标
// 	return first + second; //返回为first 并进入下一个循环
// });

//console.log(sum);

let looparr = [1, 8, 3, 6, 7, 9, 4, 2, 0, 5, 9];
//let looparr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
console.log(`排序开始：${looparr}`);

//冒泡排序 效果不如传统的冒泡排序//
let loop = 0;
for (let i = 0; i < looparr.length - 1; i++) {
	flag = false;
	looparr.reduce((first, second, index) => {
		loop++;
		if (first > second) {
			//console.log("交换");
			// let change = looparr[index - 1];
			// looparr[index - 1] = looparr[index];
			// looparr[index] = change;

			looparr[index - 1] = looparr[index - 1] ^ looparr[index];
			looparr[index] = looparr[index - 1] ^ looparr[index];
			looparr[index - 1] = looparr[index - 1] ^ looparr[index];
		}
		console.log(`loop${loop}时的数组：${looparr}`);
		return looparr[index]; //下一个first是现在的second的下标表示数
	});
}
console.log(`排序次数：${loop}`);
console.log(`排序结束：${looparr}`);

// //冒泡排序//
// let loop = 0;
// function BubbleSort(arr) {
// 	var i, j, temp;
// 	var flag = true; //flag进行标记
// 	for (i = 0; i < arr.length - 1 && flag; i++) {
// 		//若flag为false则退出循环
// 		flag = false; //初始化为false
// 		for (j = arr.length - 1; j > i; j--) {
// 			if (arr[j] < arr[j - 1]) {
// 				//j为从前往后循环
// 				temp = arr[j - 1];
// 				arr[j - 1] = arr[j];
// 				arr[j] = temp;
// 				flag = true; //如果有数据交换则为true
// 			}
// 			loop++;
// 		}
// 	}
// 	return arr;
// }
// BubbleSort(looparr);
// console.log(`排序次数：${loop}`);
// console.log(looparr);
