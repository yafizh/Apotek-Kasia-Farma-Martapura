data = {};
search_date = 1640;
function generate_table_show_drug_supplying_data() {
	let tr, td, edit_button, delete_button;
	$('tbody').html('');
	data.forEach((value,index) => {
		edit_button 	= $("<button/>");
		delete_button 	= $("<button/>");
		tr 				= $('<tr/>');
		td 				= $("<td/>");

		edit_button.attr("data-drug-supplying-id",value.drug_supplying_id);
		edit_button.attr("data-drug-id",value.drug_id);
		edit_button.attr("data-date",value.date);
		edit_button.attr("data-time",value.time);
		edit_button.attr("data-supply",value.supply);
		edit_button.html("<i class='far fa-edit'></i>");
		edit_button.addClass("btn btn-primary btn-sm mr-2");
		edit_button.on("click", function() {
			$('#editModal').modal('show');
			$("#supply").val(value.supply);
			$("#supply").attr("placeholder",$(this).attr("data-supply"));
			$("#edit-drug-supplying").attr("drug-supplying-id",$(this).attr("data-drug-supplying-id"));
			$("#edit-drug-supplying").attr("drug-id",$(this).attr("data-drug-id"));
			$("#edit-drug-supplying").attr("date",$(this).attr("data-date"));
			$("#edit-drug-supplying").attr("time",$(this).attr("data-time"));
		});

		delete_button.html("<i class='far fa-trash-alt'></i>");
		delete_button.addClass("btn btn-danger btn-sm");
		delete_button.attr("data-drug-supplying-id",value.drug_supplying_id);
		delete_button.attr("data-drug-id",value.drug_id);
		delete_button.attr("data-day",value.day);
		delete_button.attr("data-month",value.month);
		delete_button.attr("data-year",value.year);
		delete_button.attr("data-date",value.date);
		delete_button.attr("data-time",value.time);
		delete_button.attr("data-supply",value.supply);
		delete_button.on("click",function() {
			$("#deleteModal .modal-body").html(
				"Hapus data supply <b>" + value.drug_name_when_supplying + "</b> pada tanggal <b>" + value.day + " " + month_in_indonesia[value.month] + " " +  value.year + "</b> ?" +
				"<br>" +
				"<br>" +
				"<i class='text-danger' style='font-size:0.8rem;'>Catatan: Menghapus data suppy dapat menyebabkan pengurangan stok</i>"
				);
			$("#deleteModal").modal("show");
			$("button#delete").attr("drug-supplying-id",$(this).attr("data-drug-supplying-id"));
			$("button#delete").attr("drug-id",$(this).attr("data-drug-id"));
			$("button#delete").attr("date",$(this).attr("data-date"));
			$("button#delete").attr("time",$(this).attr("data-time"));
			$("button#delete").attr("supply",$(this).attr("data-supply"));
		});

		td.append(edit_button);
		td.append(delete_button);

	    tr.append("<td>" + value.day + " " + month_in_indonesia[value.month] + " " +  value.year + "</td>");
	    tr.append("<td>" + value.time + "</td>");
	    tr.append("<td>" + capitalize(value.supplier_name_when_supplying) + "</td>");
	    tr.append("<td>" + capitalize(value.drug_name_when_supplying) + "</td>");
	    tr.append("<td>" + value.supply + "</td>");
	    tr.append("<td>" + capitalize(value.username) + "</td>");
	    tr.append(td);
	    $('tbody').append(tr);
	});
}

function show_drug_supplying_data(code,subcode=1640) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 1620) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 1630) {
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
				bubble_sort("drug_supplying_id","INT","DESC");
				generate_table_show_drug_supplying_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

$("button#delete").on("click",function() {
	$.ajax({
		url		: "database/request.php",
		method	: 'POST',
		data 	: {
			CODE			 	: 1630,
			drug_supplying_id	: $(this).attr("drug-supplying-id"),
			drug_id	 		 	: $(this).attr("drug-id"),
			supply_previously 	: $(this).attr("supply"),
			supply_afterward  	: 0,
			date 			 	: $(this).attr("date"),
			time 			 	: $(this).attr("time")
		},
		async	: true,
		dataType: 'json',
		success	: function (result) {
			console.log(result);
			if (result.CODE == 1) 
				show_drug_supplying_data(1600,1640);
			else if (result.CODE == 0) {
				$("#alertModal .modal-title").text("Gagal")
				$("#alertModal .modal-body").text("Data Gagal Dihapus!");
				$("#alertModal .modal-header").addClass("bg-danger");
		    	$("#alertModal").modal("show");
			} else if (result.CODE == 999) {
				$("#alertModal .modal-title").text("Error")
				$("#alertModal .modal-body").text("Masalah Teknis, Hubungi Pembuat Program!");
				$("#alertModal .modal-header").addClass("bg-danger");
		    	$("#alertModal").modal("show");
			} else {
				$("#alertModal .modal-title").text("Error")
				$("#alertModal .modal-body").text("Error, Hubungi Pembuat Program!");
				$("#alertModal .modal-header").addClass("bg-danger");
		    	$("#alertModal").modal("show");
			}
		},
		error: function (result) {
			console.log(result);
		}
	});	
})


$("input#supply").on("keyup change", function() {
	if ($(this).val() <= 0) $(this).val("");
	else $(this).removeClass("is-invalid");
});

$("button#edit-drug-supplying").on("click",function() {	
	if (!$("input#supply").val()) {
		$("input#supply").addClass("is-invalid");
		$("input#supply").focus();
	} else {
		$("#editModal").modal("hide");
		let supply_previously, supply_afterward;

		supply_previously = $("input#supply").attr("placeholder");
		supply_afterward = $("input#supply").val();	

		$.ajax({
			url		: "database/request.php",
			method	: 'POST',
			data 	: {
				CODE			 	: 1620,
				drug_supplying_id	: $(this).attr("drug-supplying-id"),
				drug_id	 		 	: $(this).attr("drug-id"),
				supply_previously 	: supply_previously,
				supply_afterward  	: supply_afterward,
				date 			 	: $(this).attr("date"),
				time 			 	: $(this).attr("time")
			},
			async	: true,
			dataType: 'json',
			success	: function (result) {
				console.log(result);
				if (result.CODE == 1) 
					show_drug_supplying_data(1600,1640);
				else if (result.CODE == 0) {
					$("#alertModal .modal-title").text("Gagal")
					$("#alertModal .modal-body").text("Data Gagal Diedit!");
					$("#alertModal .modal-header").addClass("bg-danger");
			    	$("#alertModal").modal("show");
				} else if (result.CODE == 999) {
					$("#alertModal .modal-title").text("Error")
					$("#alertModal .modal-body").text("Masalah Teknis, Hubungi Pembuat Program!");
					$("#alertModal .modal-header").addClass("bg-danger");
			    	$("#alertModal").modal("show");
				} else {
					$("#alertModal .modal-title").text("Error")
					$("#alertModal .modal-body").text("Error, Hubungi Pembuat Program!");
					$("#alertModal .modal-header").addClass("bg-danger");
			    	$("#alertModal").modal("show");
				}
			},
			error: function (result) {
				console.log(result);
			}
		});	
	}
});

function search_drug_supplying_data(code, subcode=1640) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 1620) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 1630) {
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
			supplier_name 				: $("input#supplier-name-keyword-drug-supplying").val(),
			drug_name 					: $("input#drug-name-keyword-drug-supplying").val()
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				bubble_sort("drug_supplying_id","INT","DESC");
				generate_table_show_drug_supplying_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}


$("input#supplier-name-keyword-drug-supplying").on("keyup", function() {
	search_drug_supplying_data(1601,search_date);
});
$("input#drug-name-keyword-drug-supplying").on("keyup", function() {
	search_drug_supplying_data(1601,search_date);
});
$("input#supplier-name-keyword-drug-supplying").val("");
$("input#drug-name-keyword-drug-supplying").val("");


$("button#search").click(function() {
	if ($("#radio-date").hasClass("active")) 
		show_drug_supplying_data(1600,1620);
	else if ($("#radio-month").hasClass("active")) 
		show_drug_supplying_data(1600,1630);
	$("input#supplier-name-keyword-drug-supplying").val("");
	$("input#drug-name-keyword-drug-supplying").val("");
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

show_drug_supplying_data(1600,1640);