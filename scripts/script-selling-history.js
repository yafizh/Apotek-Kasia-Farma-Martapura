data = {};
search_date = 710;
function generate_table_selling_history_data() {
	let tr;
	let td;
	let print_button;
	$('tbody').html('');
	data.forEach((value,index) => {
		tr 				= $('<tr/>');
		td 				= $("<td/>")
		print_button	= $('<button/>');
	    
		print_button.addClass("btn btn-primary btn-sm mr-2");
		print_button.html("<i class='fas fa-print'></i>");
		print_button.on("click", function() {
			
		});

		td.append(print_button);
		
		tr.append("<td>" + value.day + " " + month_in_indonesia[parseInt(value.month)]  + " " + value.year + "</td>");
	    tr.append("<td>" + value.time + "</td>");
	    tr.append("<td>" + capitalize(value.username) + "</td>");
	    tr.append("<td>" + value.transaction_number + "</td>");
	    tr.append(td);
	    tr.on("click", _ => {
			$.ajax({
					url: "database/request.php",
					method: 'POST',
					data: {
						CODE : 800,
						sales_id : value.sales_id
					},
					async: true,
					dataType: 'json',
					success: function (result) {
						console.log(result);
						let detail_data = result.DATA;

						$("#detailModal tbody").html('');
						$("#detailModal .modal-title").html("Nomor Transaksi : " + value.transaction_number);
						detail_data.forEach((detail_value,detail_index) => {
							tr = $('<tr/>');
							tr.append("<td>" + capitalize(detail_value.drug_name) + "</td>");
							tr.append("<td>" + capitalize(detail_value.quantity) + "</td>");
							tr.append("<td>" + formatRupiah(detail_value.price) + "</td>");
							tr.append("<td>" + formatRupiah(detail_value.total_price) + "</td>");
							$("#detailModal tbody").append(tr);
						});

						$("#detailModal #total-price").text(formatRupiah(value.total_price.toString()));
						$("#detailModal #payment").text(formatRupiah(value.payment.toString()));
						$("#detailModal #back").text(formatRupiah(value.back_money.toString()));
						$("#detailModal").modal("show");
					}
			});
	    })
	    $('tbody').append(tr);
	});
}

function show_sales_history(code,subcode=710) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 720) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 730) {
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
				generate_table_selling_history_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

function search_selling_history_data(code, subcode=710) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 720) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 730) {
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
			seller_keyword 				: $("input#seller-keyword").val(),
			transaction_number_keyword 	: $("input#transaction-number-keyword").val()
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				generate_table_selling_history_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

$("button#search").click(function() {
	if ($("#radio-date").hasClass("active")) 
		show_sales_history(700,720);
	else if ($("#radio-month").hasClass("active")) 
		show_sales_history(700,730);
	$("input#seller-keyword").val("");
	$("input#transaction-number-keyword").val("");
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




$("input#seller-keyword").on("keyup", function() {
	search_selling_history_data(701,search_date);
});
$("input#transaction-number-keyword").on("keyup", function() {
	search_selling_history_data(701,search_date);
});
$("input#seller-keyword").val("");
$("input#transaction-number-keyword").val("");

show_sales_history(700,710);