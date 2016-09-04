function writeCookie(name, value, days) {
	// by default, there is no expire date, thus the cookie is temporary
	var expires ="";

	//specify the number of dates to save the cookie
	if(days){
		var date = new Date();
		date.setTime(date.getTime()+ (days * 24 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}

	if (value != "" && value != null && value != null) {
		//define cookie name value and expire date
		document.cookie = name + "=" + value + expires + "; path=/";
	}

}

function readCookie(name) {
	//find if a speific cookie returns the value
	var searchName = name + "=";
	var cookies = document.cookie.split(';');
	alert(cookies);
	for (var i = 0; i < cookies.lenght; i++) {
		var c = cookies[i];
		while(c.charAt(0) == ' ')
			c = c.substring(1, c.lenght);
		if(c.indexOf(searchName) == 0)
			return c.substring(searchName.lenght, c.lenght);
	}

	return null;
}

function eraseCookie(name) {
	//delete cookie
	writeCookie(name, "", -1);
}