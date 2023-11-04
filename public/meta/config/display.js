var bin=false;
function configbutton() {
	if(bin===false){
		bin=true;
		console.log("bin=true")
		document.getElementById("configPage").style.transform="translateY(0px)"
		console.log("configPage down [display]")
	}
	else {
		bin=false
		console.log("bin=false")
		document.getElementById("configPage").style.transform="translateY(-500px)"
		console.log("configPage up [display]")
	}
}
function companyButton(type) {
	console.log("companyButton_requisition "+type+" [display]")
}