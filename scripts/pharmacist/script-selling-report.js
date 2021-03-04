data = {};
date_search = 1010;


function generate_table_selling_report_data() {
	let tr;

	$('tbody').html('');
	if ($('input[name="accumulation"]:checked').val() == 1) {
		if (($('#start-date').attr("disabled") === undefined && $('#end-date').attr("disabled") === undefined)) {
			data.forEach((value,index) => {
				tr 				= $('<tr/>');

				if (index === 0)
					tr.append("<td rowspan='"+data.length+"'>" + 
						$("input#start-date").val().split("/")[0] + " " + 
						month_in_indonesia[parseInt($("input#start-date").val().split("/")[1])]  + " " +
						$("input#start-date").val().split("/")[2] + "<br>" +
						"Sampai" + "<br>" + 
						$("input#end-date").val().split("/")[0] + " " + 
						month_in_indonesia[parseInt($("input#end-date").val().split("/")[1])]  + " " +
						$("input#end-date").val().split("/")[2] + "<br>" +
						 "</td>");

			    tr.append("<td>" + capitalize(value.supplier_name) + "</td>");
			    tr.append("<td>" + capitalize(value.drug_name) + "</td>");
			    tr.append("<td>" + value.stock_out + "</td>");
			    $('tbody').append(tr);
			});
		} else if (($('#month').attr("disabled") === undefined)) {
			data.forEach((value,index) => {
				tr 				= $('<tr/>');

				if (index === 0) {
					tr.append("<td rowspan='"+data.length+"'>" + 
					$("input#month").val().split(" ")[0] + " " +
					$("input#start-date").val().split("/")[2] +
					"</td>");
				}
			    tr.append("<td>" + capitalize(value.supplier_name) + "</td>");
			    tr.append("<td>" + capitalize(value.drug_name) + "</td>");
			    tr.append("<td>" + value.stock_out + "</td>");
			    $('tbody').append(tr);
			});
		}
	} else {
		data.forEach((value,index) => {
			tr 				= $('<tr/>');

			tr.append("<td>" + value.day + " " + month_in_indonesia[parseInt(value.month)]  + " " + value.year + "</td>");
		    tr.append("<td>" + capitalize(value.supplier_name) + "</td>");
		    tr.append("<td>" + capitalize(value.drug_name) + "</td>");
		    tr.append("<td>" + value.stock_out + "</td>");
		    $('tbody').append(tr);
		});
	}
}

function show_selling_report(code,subcode) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 1020) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 1030) {
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
			ACCUMULATION: $('input[name="accumulation"]:checked').val(),
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
				generate_table_selling_report_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

function search_selling_report_data(code,subcode) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 1020) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 1030) {
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
			ACCUMULATION 			: $('input[name="accumulation"]:checked').val(),
			start_date 				: start_date,
			end_date				: end_date,
			month 					: month,
			supplier_name_keyword 	: $("#supplier-name-keyword-selling-report").val(),
			drug_name_keyword 		: $("#drug-name-keyword-selling-report").val() 
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				bubble_sort("date","STRING","DESC");
				generate_table_selling_report_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

$("#stock-out-header-table").click(function() {
	$("#stock-out-header-table i").removeClass("fa-sort-numeric-up");
	$("#stock-out-header-table i").removeClass("fa-sort-numeric-down-alt");
	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
		$(this).attr("sort","ASC");
		bubble_sort("stock_out","INT","DESC");
		$("#stock-out-header-table i").addClass("fa-sort-numeric-up");
	} else if ($(this).attr("sort") == "ASC"){
		bubble_sort("stock_out","INT","ASC");
		$(this).attr("sort","DESC");
		$("#stock-out-header-table i").addClass("fa-sort-numeric-down-alt");
	}
	generate_table_selling_report_data();
});

$("button#search").click( _ => {
	if ($("#radio-date").hasClass("active")) 
		show_selling_report(1000,1020);
	else if ($("#radio-month").hasClass("active")) 
		show_selling_report(1000,1030);
	$("#supplier-name-keyword-selling-report").val("");
	$("#drug-name-keyword-selling-report").val("");
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

$("#supplier-name-keyword-selling-report").on("keyup", _ => {
	search_selling_report_data(1001,search_date);
});
$("#drug-name-keyword-selling-report").on("keyup", _ => {
	search_selling_report_data(1001,search_date);
});
$("#stock-out-keyword-selling-report").on("keyup", function() {
	$(this).val(formatRupiah($(this).val()));
	search_selling_report_data(1001,search_date);
});

$("#supplier-name-keyword-selling-report").val("");
$("#drug-name-keyword-selling-report").val("");

show_selling_report(1000,1010);