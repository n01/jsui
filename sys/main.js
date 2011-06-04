
function _main() {
	$.ajax({
		type: "GET",
		url: "apps.xml",
		dataType: "xml",		
		success: appsParser
	});
}
