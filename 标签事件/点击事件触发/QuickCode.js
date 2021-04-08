function addLoad(newload) {
	var oldload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = newload;
	} else {
		window.onload = function () {
			oldload();
			newload();
		};
	}
}
