console.info('API created by Eloazy')
//-- API settings
const link=['https://api.torn.com/', /*type*/'/?selections=',/*subLocal*/ '&key='];
//--verify
function verifyKey() {
	if(sessionStorage.getItem("API")==null || sessionStorage.getItem("API")==" " || sessionStorage.getItem("API")=="") {
		console.error('invalid key [main]')
		alert("invalid key")
		return -1
	}
	else {console.log('verified key [main]')}
}
// -- Non API block
function refreshSettings(type) {
	//refresh system [manual]
	if(verifyKey()!= -1) {
		console.log(`${type} refresh requested [main]`)
		linkBuilder("user", 29) //re-call LOCKED IN USER INFORMATION
	}
}
//-- API block
async function main(API) {
	sessionStorage.setItem("API", API) //save API in local (temporaly) 
	console.log('api storaged [main]')
	if(verifyKey()!= 1) {
		linkBuilder("user", 29) //call link builder in user
	}
}
async function linkBuilder(type, LocalJSON) { //build links requests
	console.log('linkBuilder started [main]')
	var thirtConcatVar;	
	//
	var jsonLink=["./meta/data/main.json", "../data/main.json"]
	var chose=0
	var url=window.location.href;
	var urlsplitted=url.split("/")
	if(urlsplitted[urlsplitted.length-1]=="main.html") {chose=0}
	else {chose=1}
	//
	fetch(jsonLink[chose]).then((response)=>response.json()).then((responseJSON)=> {//push data from JSON in OBJDATA and convert OBJData to JSONDATA
		//link localJSON = array in commandList (JSON)
		if(type=="user") {thirtConcatVar=responseJSON.RequestDataFrom.user.commandList[LocalJSON]}
		else if (type=="faction") {thirtConcatVar=responseJSON.RequestDataFrom.faction.commandList[LocalJSON]}
		else if (type=="company") {thirtConcatVar=responseJSON.RequestDataFrom.company.commandList[LocalJSON]}
		else if (type=="market") {thirtConcatVar=responseJSON.RequestDataFrom.market.commandList[LocalJSON]}
		else if (type=="torn") {thirtConcatVar=responseJSON.RequestDataFrom.torn.commandList[LocalJSON]}
		else if (type=="key") {thirtConcatVar=responseJSON.RequestDataFrom.key.commandList[LocalJSON]}
		else {console.error("LinkerBuilder(type) invalid")}
		//                                    first         second            thirt                four                   five concats
		var pushDataLinkCreated=link[0].concat(type).concat(link[1]).concat(thirtConcatVar).concat(link[2]).concat(sessionStorage.getItem("API")) //concat request link	
		console.log(`DataLinkCreated to ${type} in code: [${LocalJSON}] - [main]`)
		compulsoryDataRequest(pushDataLinkCreated, type, LocalJSON) // active compulsory data request (mainfrontpage)
	})
}
function compulsoryDataRequest(link, type, LocalJSON) {fetch(link).then((response) => response.json()).then((responseJSON) => {
 	var data=JSON.stringify(responseJSON) //transform obj in string
 	var dataJSON=JSON.parse(data) //transform string in JSON
 	if(type !="user") {
 		if(type=="company") {
 			if(LocalJSON!=5) {
 				alert(`Right click, click inspect and click console, the company info will be in the yellow box`)
 				console.log('-----/----------/---------------/----------- [main]')
 				console.warn(dataJSON)
				console.log('Data info [main]')
 			}
 			else {
 				document.getElementById('headerCompany').innerHTML=`${dataJSON.company.name} | Employers: ${dataJSON.company.employees_hired}/${dataJSON.company.employees_capacity} | Daily income $${dataJSON.company.daily_income} | daily customers ${dataJSON.company.daily_customers}`
 				console.log('HTML eddited [main]')
 			}
 		}
 	}
 	else {
 		sessionStorage.setItem("ID", dataJSON.player_id)
 		document.getElementById("ID").src="https://www.torn.com/sigs/4_"+sessionStorage.getItem("ID")+".png"
	 	// display informations from JSON requested {
	 	document.getElementById('name').innerHTML="Name: "+dataJSON.name; 
	 	document.getElementById('life').innerHTML="Life: "+dataJSON.life.current;
	 	document.getElementById('stats').innerHTML="Status: "+dataJSON.status.state+" | "+dataJSON.status.description;
	 	document.getElementById('faction').innerHTML="Faction: "+dataJSON.faction.faction_name+" | rank: "+ dataJSON.faction.position;
	 	document.getElementById('status').innerHTML="Status: "+dataJSON.last_action.status;
	 	console.log('HTML eddited [main]')
	 	// }
 	}
})}