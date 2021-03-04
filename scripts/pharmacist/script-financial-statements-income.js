data = {};
function generate_table_financial_statements_income_data() {
	let tr;
	let td;
	let total_income = 0;
	$('.income tbody').html('');
	data.forEach((value,index) => {
		total_income += parseInt(value.total_price);
		tr 				= $('<tr/>');

	    tr.append("<td>" + value.day + " " + month_in_indonesia[value.month] + " " + value.year + "</td>");
	    tr.append("<td>" + formatRupiah(value.total_price.toString()) + "</td>");
	    tr.on("click", _ => {
			$.ajax({
					url: "database/request.php",
					method: 'POST',
					data: {
						CODE : 700,
						SUBCODE : 720,
						start_date : value.date,
						end_date : value.date
					},
					async: true,
					dataType: 'json',
					success: function (result) {
						console.log(result);
						let detail_data = result.DATA;

						$("#detailModal tbody").html('');
						$("#detailModal .modal-title").html("Tanggal : " + value.day + " " + month_in_indonesia[value.month] + " " + value.year);
						detail_data.forEach((detail_value,detail_index) => {
							tr = $('<tr/>');
							tr.append("<td>" + detail_value.time + "</td>");
							tr.append("<td>" + detail_value.transaction_number + "</td>");
							tr.append("<td>" + formatRupiah(detail_value.total_price) + "</td>");
							$("#detailModal tbody").append(tr);
						});

						$("#detailModal").modal("show");
					},
					error   : function (result) {
						console.log(result);
					}
			});
	    });
	    $('.income tbody').append(tr);
	});
	$("#total-income").text("Rp " + formatRupiah(total_income.toString()));
}

function show_financial_statements_income(code) {
	$.ajax({
		url     : "database/request.php",
		method  : 'POST',
		data    : {
			CODE 		: code,
			month 		: month_in_indonesia_in_number[$("#monthly_income").val().split(" ")[0]],
			year  		: $("#monthly_income").val().split(" ")[1]
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				generate_table_financial_statements_income_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

show_financial_statements_income(1200);

$("#income").click(function() {
	$('#monthModal2').modal("hide");
	$('#monthModal').modal();
	//appending modal background inside the bigform-content
	$('.modal-backdrop').appendTo('#content');
});

$("#monthly_income").on("change", function() {
	$('#monthModal').modal("hide");
	$("#income").text($(this).val());
	show_financial_statements_income(1200);
});