data = {};
date_search = 1110;
function generate_table_mutation_report_data() {
	let tr;

	$('tbody').html('');
	data.forEach((value,index) => {
		tr 				= $('<tr/>');

		tr.append("<td>" + value.day + " " + month_in_indonesia[parseInt(value.month)]  + " " + value.year + "</td>");
	    tr.append("<td>" + capitalize(value.supplier_name) + "</td>");
	    tr.append("<td>" + capitalize(value.drug_name) + "</td>");
	    tr.append("<td>" + value.stock_in + "</td>");
	    tr.append("<td>" + value.stock_out + "</td>");
	    tr.append("<td>" + value.stock + "</td>");
	    $('tbody').append(tr);
	});
}

function show_mutation_report(code,subcode) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 1120) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 1130) {
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
				generate_table_mutation_report_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

function search_mutation_report_data(code,subcode) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 1120) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 1130) {
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
			supplier_name_keyword 	: $("#supplier-name-keyword-mutation-report").val(),
			drug_name_keyword 		: $("#drug-name-keyword-mutation-report").val()
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				bubble_sort("date","STRING","DESC");
				generate_table_mutation_report_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

$("#supplier-name-header-table").click(function() {
	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
		$(this).attr("sort","ASC");
		bubble_sort("supplier_name","STRING","DESC");
	} else if ($(this).attr("sort") == "ASC"){
		bubble_sort("supplier_name","STRING","ASC");
		$(this).attr("sort","DESC");
	}
	generate_table_mutation_report_data();
});

$("#drug-name-header-table").click(function() {
	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
		$(this).attr("sort","ASC");
		bubble_sort("drug_name","STRING","DESC");
	} else if ($(this).attr("sort") == "ASC"){
		bubble_sort("drug_name","STRING","ASC");
		$(this).attr("sort","DESC");
	}
	generate_table_mutation_report_data();
});

$("#stock-in-header-table").click(function() {
	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
		$(this).attr("sort","ASC");
		bubble_sort("stock_in","INT","DESC");
	} else if ($(this).attr("sort") == "ASC"){
		bubble_sort("stock_in","INT","ASC");
		$(this).attr("sort","DESC");
	}
	generate_table_mutation_report_data();
});

$("#stock-out-header-table").click(function() {
	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
		$(this).attr("sort","ASC");
		bubble_sort("stock_out","INT","DESC");
	} else if ($(this).attr("sort") == "ASC"){
		bubble_sort("stock_out","INT","ASC");
		$(this).attr("sort","DESC");
	}
	generate_table_mutation_report_data();
});

$("#stock-header-table").click(function() {
	console.log("BELUM");
});


$("button#search").click( _ => {
	if ($("#radio-date").hasClass("active")) 
		show_mutation_report(1100,1120);
	else if ($("#radio-month").hasClass("active")) 
		show_mutation_report(1100,1130);
	$("#supplier-name-keyword-mutation-report").val("");
	$("#drug-name-keyword-mutation-report").val("");
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

$("#supplier-name-keyword-mutation-report").on("keyup", _ => {
	search_mutation_report_data(1101,search_date);
});
$("#drug-name-keyword-mutation-report").on("keyup", _ => {
	search_mutation_report_data(1101,search_date);
});
$("#supplier-name-keyword-mutation-report").val("");
$("#drug-name-keyword-mutation-report").val("");
show_mutation_report(1100,1110);