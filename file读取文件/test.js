let file_chose = document.querySelector("#file");
let file_put = document.querySelector("#message");

file_chose.addEventListener("change", (event) => {
	let file = event.target.files[0];
	//获得选择文件的基本信息
	console.log(file.name, file.size, file.type);

	//使用filereader读取文件的详细内容
	//该对象均是异步方法 同步方法叫filereadersync
	let reader = new FileReader();
	let type = "";

	//判断文件类型并分别设置读取方法
	if (/image/.test(file.type)) {
		reader.readAsDataURL(file);
		type = "image";
	} else if (/video/.test(file.type)) {
		reader.readAsDataURL(file);
		type = "video";
	} else {
		reader.readAsText(file);
		type = "text";
	}

	//读取失败时触发
	reader.onerror = function () {
		console.log(`error:${reader.error.code}`);
	};
	//读取进度 每50毫秒触发一次
	reader.onprogress = function (event) {
		if (event.lengthComputable) {
			console.log(`${event.loaded}/${event.total}`);
		}
	};
	//读取成功后触发
	reader.onload = function () {
		switch (type) {
			case "image":
				file_put.innerHTML = `<img src="${reader.result}" >`;
				break;
			case "text":
				file_put.innerHTML = reader.result;
				break;
			//放视频会很慢
			case "video":
				file_put.innerHTML = `<video class="VideoWindow" controls><source src="${reader.result}" type="video/mp4" />！该浏览器不支持html5的video！</video>`;
				break;
		}
	};
});

//部分读取
let binary_chose = document.querySelector("#binaryfile");
let binary_put = document.querySelector("#binary");

binary_chose.addEventListener("change", (event) => {
	let binaryfile = event.target.files[0];
	let reader = new FileReader();
	let type = "";

	let blob = binaryfile.slice(0, 10000000); //将选择的文件分割为Blob对象（一个二进制文件）

	if (blob) {
		//判断文件类型并分别设置读取方法
		if (/image/.test(binaryfile.type)) {
			reader.readAsDataURL(blob);
			type = "image";
		} else if (/video/.test(binaryfile.type)) {
			reader.readAsDataURL(blob);
			type = "video";
		} else {
			reader.readAsText(blob);
			type = "text";
		}

		//读取失败时触发
		reader.onerror = function () {
			console.log(`error:${reader.error.code}`);
		};
		//读取进度 每50毫秒触发一次
		reader.onprogress = function (event) {
			if (event.lengthComputable) {
				console.log(`${event.loaded}/${event.total}`);
			}
		};
		//读取成功后触发
		reader.onload = function () {
			switch (type) {
				case "image":
					let img = document.createElement("img");
					img.src = `${reader.result}`;
					binary_put.appendChild(img);
					break;
				case "video":
					let video = document.createElement("video");
					video.src = `${reader.result}`;
					binary_put.appendChild(video);
					//binary_put.innerHTML = `<video class="VideoWindow" controls><source src="${reader.result}" type="video/mp4" />！该浏览器不支持html5的video！</video>`;
					break;
				case "text":
					binary_put.innerHTML = reader.result;
					break;
			}
		};
	}
});
