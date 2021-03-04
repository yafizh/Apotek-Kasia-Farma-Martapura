data = {};
search_date = 1540;
function generate_table_show_drug_adding_data() {
	let tr;

	$('tbody').html('');
	data.forEach((value,index) => {
		tr 				= $('<tr/>');

	    tr.append("<td>" + value.day + " " + month_in_indonesia[value.month] + " " +  value.year + "</td>");
	    tr.append("<td>" + value.time + "</td>");
	    tr.append("<td>" + capitalize(value.supplier_name_when_adding) + "</td>");
	    tr.append("<td>" + capitalize(value.drug_name_when_adding) + "</td>");
	    tr.append("<td>" + formatRupiah(value.purchase_price_when_adding.toString()) + "</td>");
	    tr.append("<td>" + formatRupiah(value.selling_price_when_adding.toString()) + "</td>");
	    tr.append("<td>" + capitalize(value.username) + "</td>");
	    $('tbody').append(tr);
	});
}

function show_drug_adding_data(code,subcode=1540) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 1520) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 1530) {
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
				bubble_sort("drug_adding_id","INT","DESC");
				generate_table_show_drug_adding_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}


function search_drug_adding_data(code, subcode=1540) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 1520) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 1530) {
		temp_month = month_in_indonesia_in_number[$("input#month").val().split(" ")[0]];
		temp_year  = $("input#month").val().split(" ")[1];
		month 	   = [temp_year,temp_month].join("-");
	}
	
	$.ajax({
		url     : "database/request.php",
		method  : 'POST',
		data    : {
			CODE 						: code,
			SUBCODE 					: subcode,
			start_date 					: start_date,
			end_date					: end_date,
			month 						: month,
			supplier_name 				: $("input#supplier-name-keyword-drug-adding").val(),
			drug_name 					: $("input#drug-name-keyword-drug-adding").val()
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				bubble_sort("drug_adding_id","INT","DESC");
				generate_table_show_drug_adding_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}


$("input#supplier-name-keyword-drug-adding").on("keyup", function() {
	search_drug_adding_data(1501,search_date);
});
$("input#drug-name-keyword-drug-adding").on("keyup", function() {
	search_drug_adding_data(1501,search_date);
});
$("input#supplier-name-keyword-drug-adding").val("");
$("input#drug-name-keyword-drug-adding").val("");


$("button#search").click(function() {
	if ($("#radio-date").hasClass("active")) 
		show_drug_adding_data(1500,1520);
	else if ($("#radio-month").hasClass("active")) 
		show_drug_adding_data(1500,1530);
	$("input#supplier-name-keyword-drug-adding").val("");
	$("input#drug-name-keyword-drug-adding").val("");
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

show_drug_adding_data(1500,1540);