data = {};
function generate_table_financial_statements_spending_data() {
	let tr;
	let td;
	let total_spending = 0;
	$('.spending tbody').html('');
	data.forEach((value,index) => {
		total_spending += parseInt(value.total_purchase);
		tr 				= $('<tr/>');

	    tr.append("<td>" + value.day + " " + month_in_indonesia[value.month] + " " + value.year + "</td>");
	    tr.append("<td>" + formatRupiah(value.total_purchase.toString()) + "</td>");
	    tr.on("click", _ => {
			$.ajax({
					url: "database/request.php",
					method: 'POST',
					data: {
						CODE : 1300,
						SUBCODE : 1310,
						date: value.date,
					},
					async: true,
					dataType: 'json',
					success: function (result) {
						console.log(result);
						let detail_data = result.DATA;

						$("#detailSpendingModal tbody").html('');
						$("#detailSpendingModal .modal-title").html("Tanggal : " + value.day + " " + month_in_indonesia[value.month] + " " + value.year);
						detail_data.forEach((detail_value,detail_index) => {
							tr = $('<tr/>');
							tr.append("<td>" + capitalize(detail_value.supplier_name_currently) + "</td>");
							tr.append("<td>" + capitalize(detail_value.drug_name_currently) + "</td>");
							tr.append("<td>" + formatRupiah(detail_value.purchase_price_when_adding_or_supplying) + "</td>");
							tr.append("<td>" + detail_value.quantity + "</td>");
							$("#detailSpendingModal tbody").append(tr);
						});

						$("#detailSpendingModal").modal("show");
					},
					error   : function (result) {
						console.log(result);
					}
			});
	    });
	    $('.spending tbody').append(tr);
	});
	$("#total-spending").text("Rp " + formatRupiah(total_spending.toString()));
}

function show_financial_statements_spending(code) {
	$.ajax({
		url     : "database/request.php",
		method  : 'POST',
		data    : {
			CODE 		: code,
			SUBCODE		: 0,
			month 		: month_in_indonesia_in_number[$("#monthly_spending").val().split(" ")[0]],
			year  		: $("#monthly_spending").val().split(" ")[1]
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				generate_table_financial_statements_spending_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

show_financial_statements_spending(1300);

$("#spending").click(function() {
	$('#monthModal').modal("hide");
	$('#monthModal2').modal();
	//appending modal background inside the bigform-content
	$('.modal-backdrop').appendTo('#content2');
});

$("#monthly_spending").on("change", function() {
	$('#monthModal2').modal("hide");
	$("#spending").text($(this).val());
	show_financial_statements_spending(1300);
});