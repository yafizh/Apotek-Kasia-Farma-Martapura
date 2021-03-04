data = {};
search_date = 1840;
function generate_table_show_drug_deleting_data() {
	let tr, td, restore;
	$('tbody').html('');
	data.forEach((value,index) => {
		restore 	= $("<button/>");
		tr 				= $('<tr/>');
		td 				= $("<td/>");

		restore.attr("data-drug-deleting-id",value.drug_deleting_id);
		restore.attr("data-drug-id",value.drug_id);
		restore.html("<i class='fas fa-trash-restore'></i>");
		restore.addClass("btn btn-success btn-sm");
		restore.on("click", function() {
			$("#restoreModal .modal-body").html("Pulihkan data <b>" + value.drug_name + "</b> ?");
			$("#restoreModal").modal("show");
			$("button#restore").attr("drug-deleting-id",$(this).attr("data-drug-deleting-id"));
			$("button#restore").attr("drug-id",$(this).attr("data-drug-id"));
		});

		td.append(restore);

	    tr.append("<td>" + value.day + " " + month_in_indonesia[value.month] + " " +  value.year + "</td>");
	    tr.append("<td>" + value.time + "</td>");
	    tr.append("<td>" + capitalize(value.supplier_name) + "</td>");
	    tr.append("<td>" + capitalize(value.drug_name) + "</td>");
	    tr.append("<td>" + capitalize(value.purchase_price) + "</td>");
	    tr.append("<td>" + capitalize(value.selling_price) + "</td>");
	    tr.append("<td>" + capitalize(value.username) + "</td>");
	    tr.append(td);
	    $('tbody').append(tr);
	});
}

function show_drug_deleting_data(code,subcode=1840) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 1820) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 1830) {
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
				bubble_sort("drug_deleting_id","INT","DESC");
				generate_table_show_drug_deleting_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

function search_drug_deleting_data(code, subcode=1840) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 1820) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 1830) {
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
			supplier_name 				: $("input#supplier-name-keyword-drug-deleting").val(),
			drug_name 					: $("input#drug-name-keyword-drug-deleting").val()
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				bubble_sort("drug_deleting_id","INT","DESC");
				generate_table_show_drug_deleting_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

$("button#restore").on("click",function() {
	$.ajax({
		url     : "database/request.php",
		method  : 'POST',
		data    : {
			CODE 				: 1860,
			drug_deleting_id 	: $(this).attr("drug-deleting-id"),
			drug_id 			: $(this).attr("drug-id"),
			user_id 			: user_id
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				bubble_sort("drug_deleting_id","INT","DESC");
				show_drug_deleting_data(1800,1840);
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
})


$("input#supplier-name-keyword-drug-deleting").on("keyup", function() {
	search_drug_deleting_data(1801,search_date);
});
$("input#drug-name-keyword-drug-deleting").on("keyup", function() {
	search_drug_deleting_data(1801,search_date);
});
$("input#supplier-name-keyword-drug-deleting").val("");
$("input#drug-name-keyword-drug-deleting").val("");


$("button#search").click(function() {
	if ($("#radio-date").hasClass("active")) 
		show_drug_deleting_data(1800,1820);
	else if ($("#radio-month").hasClass("active")) 
		show_drug_deleting_data(1800,1830);
	$("input#supplier-name-keyword-drug-deleting").val("");
	$("input#drug-name-keyword-drug-deleting").val("");
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

show_drug_deleting_data(1800,1840);