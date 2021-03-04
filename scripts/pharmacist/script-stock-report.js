data = {};
date_search = 910;
function generate_table_stock_report_data() {
	let tr;

	$('tbody').html('');
	data.forEach((value,index) => {
		tr 				= $('<tr/>');

		tr.append("<td>" + value.day + " " + month_in_indonesia[parseInt(value.month)]  + " " + value.year + "</td>");
	    tr.append("<td>" + capitalize(value.supplier_name) + "</td>");
	    tr.append("<td>" + capitalize(value.drug_name) + "</td>");
	    tr.append("<td>" + value.stock + "</td>");
	    $('tbody').append(tr);
	});
}

function show_stock_report(code,subcode) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 920) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 930) {
		temp_month = month_in_indonesia_in_number[$("input#month").val().split(" ")[0]];
		temp_year  = $("input#month").val().split(" ")[1];
		month 	   = [temp_year,temp_month].join("-");
	}

	search_date = subcode;

	$.ajax({
		url     : "database/request.php",
		method  : 'POST',
		data    : {
			CODE 		: code,
			SUBCODE 	: subcode,
			start_date 	: start_date,
			end_date	: end_date,
			month 		: month
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				bubble_sort("date","STRING","DESC");
				generate_table_stock_report_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

function search_stock_report_data(code,subcode) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 920) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 930) {
		temp_month = month_in_indonesia_in_number[$("input#month").val().split(" ")[0]];
		temp_year  = $("input#month").val().split(" ")[1];
		month 	   = [temp_year,temp_month].join("-");
	}

	$.ajax({
		url     : "database/request.php",
		method  : 'POST',
		data    : {
			CODE 					: code,
			SUBCODE 				: subcode,
			start_date 				: start_date,
			end_date				: end_date,
			month 					: month,
			supplier_name_keyword 	: $("#supplier-name-keyword-stock-report").val(),
			drug_name_keyword 		: $("#drug-name-keyword-stock-report").val() 
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				bubble_sort("date","STRING","DESC");
				generate_table_stock_report_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

// $("#supplier-name-header-table").click(function() {
// 	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
// 		$(this).attr("sort","ASC");
// 		bubble_sort("supplier_name","STRING","DESC");
// 	} else if ($(this).attr("sort") == "ASC"){
// 		bubble_sort("supplier_name","STRING","ASC");
// 		$(this).attr("sort","DESC");
// 	}
// 	generate_table_stock_report_data();
// });

// $("#drug-name-header-table").click(function() {
// 	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
// 		$(this).attr("sort","ASC");
// 		bubble_sort("drug_name","STRING","DESC");
// 	} else if ($(this).attr("sort") == "ASC"){
// 		bubble_sort("drug_name","STRING","ASC");
// 		$(this).attr("sort","DESC");
// 	}
// 	generate_table_stock_report_data();
// });

$("#stock-header-table").click(function() {
	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
		$(this).attr("sort","ASC");
		bubble_sort("stock","INT","DESC");
	} else if ($(this).attr("sort") == "ASC"){
		bubble_sort("stock","INT","ASC");
		$(this).attr("sort","DESC");
	}
	generate_table_stock_report_data();
});

$("button#search").click( _ => {
	if ($("#radio-date").hasClass("active")) 
		show_stock_report(900,920);
	else if ($("#radio-month").hasClass("active")) 
		show_stock_report(900,930);
	$("input#supplier-name-keyword-stock-report").val("");
	$("input#drug-name-keyword-stock-report").val("");
});

$("#radio-date").on("click", _ => {
	$("input#start-date").removeAttr("disabled");
	$("input#end-date").removeAttr("disabled");
	$("input#month").attr("disabled","");
});

$("#radio-month").on("click", _ => {
	$("input#start-date").attr("disabled","");
	$("input#end-date").attr("disabled","");
	$("input#month").removeAttr("disabled");
});

$("input#supplier-name-keyword-stock-report").on("keyup", _ => {
	search_stock_report_data(901,search_date);
});
$("input#drug-name-keyword-stock-report").on("keyup", _ => {
	search_stock_report_data(901,search_date);
});

$("input#supplier-name-keyword-stock-report").val("");
$("input#drug-name-keyword-stock-report").val("");
show_stock_report(900,910);
