 let form = document.forms[0];

 function addEvent(element, eventType, eventHandler) {
 	if (element.addEventListener) {
 		element.addEventListener(eventType, eventHandler, false);
 	} else {
 		element.attachEvent("on" + eventType, eventHandler);
 	}
 }

 for (let i = 0; i < form.elements.length; i++) {
 	el = form.elements[i];
 	addEvent(el, 'change', valid);
 }


 addEvent(form, 'submit', clickValid);

 function clickValid(event) {
 	if (form.elements.name.value === '' || form.elements.surname.value === '' || form.elements.email.value === '') {
 		let div = document.getElementById('mPostQ');
 		div.className = "btn btn-danger";
 	} else {
 		let div = document.getElementById('mPostQ');
 		div.className = "btn btn-success";
 		postValid();
 	}
 	event.preventDefault();
 }

 function valid(el) {
 	let warning = document.getElementById('warning-' + el.currentTarget.name);
 	if (!!warning) {
 		let type = el.currentTarget.type;
 		let fieldName = el.currentTarget.name;
 		let messageName = el.currentTarget.name;
 		let ind = 1;
 		let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
 		for (let i = 0; i < form.elements.length; i++) {
 			if (form.elements[i].name === fieldName) {
 				ind = i;
 			}
 		}
 		warning.style.display = 'block';
 		let createValid = document.createElement('div');
 		createValid.id = 'test' + ind;
 		if (isInPage(createValid.id)) {
 			form[fieldName].parentNode.append(createValid);
 		}
 		if (
 			(type === 'email' && reg.test(form[fieldName].value) === false) ||
 			(type === 'text' && form[fieldName].value === '')) {
 			warning.classList.remove('glyphicon-ok');
 			warning.classList.add('glyphicon-remove');
 			form[fieldName].parentNode.classList.remove('has-success');
 			form[fieldName].parentNode.classList.add('has-error');
 			document.getElementById(createValid.id).innerHTML = "<label class='control-label' for='inputSuccess1'>Incorrectly entered " + messageName + "</label>";
 		} else {
 			warning.classList.remove('glyphicon-remove');
 			warning.classList.add('glyphicon-ok');
 			form[fieldName].parentNode.classList.remove('has-error');
 			form[fieldName].parentNode.classList.add('has-success');
 			document.getElementById(createValid.id).innerHTML = "<label class='control-label' for='inputSuccess1'>Successful input</label>";
 		}
 	}
 }

 function isInPage(node) {
 	if (document.getElementById(node)) {
 		return false;
 	} else {
 		return true;
 	}
 }


 function getXmlHttp() {
 	let xmlhttp;
 	try {
 		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
 	} catch (e) {
 		try {
 			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
 		} catch (E) {
 			xmlhttp = false;
 		}
 	}
 	if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
 		xmlhttp = new XMLHttpRequest();
 	}
 	return xmlhttp;
 }

 function postValid() {
 	let data = new FormData(form);
 	let xmlhttp = getXmlHttp();
 	xmlhttp.open('POST', 'https://actum-form-ulcrunoxba.now.sh/api/submit', true);
 	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 	xmlhttp.send(data);
 	xmlhttp.onreadystatechange = function () {
 		if (xmlhttp.readyState == 4) {
 			if (xmlhttp.status == 200) {
 				let result = JSON.parse(xmlhttp.responseText);
 				if (result.success) {
 					//	alert(result.message)
 					let div = document.getElementById('mPostQ');
 					let text = document.getElementById('result');
 					text.innerHTML = '<p class="text-success lead"><b>All is well:)</b></p>';
 					div.innerHTML = result.message;
 				}
 			}
 		}
 	};
 }