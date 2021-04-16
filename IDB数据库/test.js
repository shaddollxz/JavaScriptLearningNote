//删除数据库 方便下面代码运行
let delmyDB = window.indexedDB.deleteDatabase("myDB");

//请求打开indexedDB
//第一个参数是数据库名 第二个是版本
//如果没有该数据库会新建 没有放入版本会默认为当前版本
let openmyDB = window.indexedDB.open("myDB", 1);

//设置请求的处理 成功或升级将把数据库实例放入db
//处理都是异步操作
let db;
openmyDB.onerror = (event) => {
	console.log("open error");
};
//该事件在数据库创建或者升级版本时触发
openmyDB.onupgradeneeded = (event) => {
	console.log("database upgrade");
	db = event.target.result;
	//创建叫做users的表 主键是id
	//如果没有合适的主键 可以将第二个参数放为{ autoIncrement: true } 会自动生成一个主键
	let table = db.createObjectStore("users", { keyPath: "id" });

	//设置索引 如果没有索引 该表只能从主键上读取数据
	//第一个参数是索引名称 第二个参数是索引对应的key 第三个参数代表是否有重复值
	table.createIndex("age", "age", { unique: true });
};
//数据库打开成功 触发比upgraden晚
openmyDB.onsuccess = (event) => {
	console.log("open success");
	db = event.target.result;
};

//数据库存储
//设置放入数据
let user1 = {
		id: 1,
		name: "user1",
		age: 23,
	},
	user2 = {
		id: 2,
		name: "user2",
		age: 23,
	};

//添加新数据
//该方法不能重复调用 因为db不会在该方法中更新 第二次调用时会覆盖第一次添加的结果
//最佳选择是监听onupgradeneeded在其中更新数据

function addtodb(data) {
	//创建请求
	let request = db
		.transaction(["users"], "readwrite") //第二个参数指定读取权限 不指定参数会对数据库内所有表有只读权限
		.objectStore("users") //获得该表的ObjectStore
		.put(data); //使用put方法添加数据（如果已经有相同主键会更新，没有会新加）
	//监听请求 是异步操作
	request.onsuccess = function (event) {
		console.log("数据写入成功");
	};
	request.onerror = function (event) {
		console.log("数据写入失败");
		console.log(event);
	};
}

//使用主键或索引检索数据
function readfromdb(key, index) {
	let request = !index
		? //没有用索引会使用主键查找
		  db.transaction(["users"], "readonly").objectStore("users").get(key)
		: //使用索引查找
		  db.transaction(["users"]).objectStore("users").index(index).get(key);

	request.onsuccess = (event) => {
		console.log(event.target.result);
	};
	request.onerror = (event) => {
		console.log("search error");
	};
}

//使用游标查询
function readall() {
	let mycursor = db
		.transaction(["users"], "readwrite")
		.objectStore("users")
		.openCursor(); //其中传入参数来改变游标查阅方法 见书 P768

	mycursor.onsuccess = (event) => {
		let cursor = event.target.result;
		if (cursor) {
			console.log(cursor.value);
			//游标更新部分数据
			if (cursor.key == 1) {
				cursor.value.age = 233; //修改key为1的age
				let updateRequest = cursor.update(cursor.value); //设置更新请求
				//let deleteRequest = cursor.delete(); 删除当前游标所指的数据 也要设置监听
				updateRequest.onsuccess = () => {
					console.log("update success");
				};
				updateRequest.onerror = () => {
					console.log("update error");
				};
			}
			console.log(cursor.value);
			cursor.continue(); //将游标移到下一项 如果放入参数则移动到指定的主键位置
			//cursor.advance() //移到上一项
		} else {
			console.log("done");
		}
	};
	cursor.onerror = () => {
		console.log("cursor open error");
	};
}
