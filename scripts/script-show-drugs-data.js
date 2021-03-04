data = {};

function search_show_drug_data() {
	$.ajax({
		url     : "database/request.php",
		method  : 'POST',
		data    : {
			CODE: 603,
			supplier_name_keyword 	: $("input#supplier-name-keyword").val(),
			drug_name_keyword 		: $("input#drug-name-keyword").val()
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				generate_table_show_drugs_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

function generate_table_show_drugs_data() {
	let tr;
	let td;
	let edit_button;
	let delete_button;
	$('tbody').html('');
	data.forEach((value,index) => {
		edit_button 	= $("<button/>");
		delete_button 	= $("<button/>");
		tr 				= $('<tr/>');
		td 				= $("<td/>");

		edit_button.attr("data-drug-id",value.drug_id);
		edit_button.attr("data-supplier-name",value.supplier_name);
		edit_button.attr("data-drug-name",value.drug_name);
		edit_button.attr("data-purchase-price",value.purchase_price);
		edit_button.attr("data-selling-price",value.selling_price);
		edit_button.attr("data-stock",value.stock);
		edit_button.html("<i class='far fa-edit'></i>");
		edit_button.addClass("btn btn-primary btn-sm mr-2");
		edit_button.on("click", function() {
			$('#editModal').modal('show');
			$("#supplier-name").val("");
			$("#drug-name").val("");
			$("#purchase-price").val("");
			$("#selling-price").val("");
			$("#stock").val("");
			$("#supplier-name").attr("placeholder",$(this).attr("data-supplier-name"));
			$("#drug-name").attr("placeholder",$(this).attr("data-drug-name"));
			$("#purchase-price").attr("placeholder",formatRupiah($(this).attr("data-purchase-price").toString()));
			$("#selling-price").attr("placeholder",formatRupiah($(this).attr("data-selling-price").toString()));
			$("#stock").attr("placeholder",$(this).attr("data-stock"));
			$("#edit-drug").attr("drug-id",$(this).attr("data-drug-id"));
		});

		delete_button.attr("data-drug-id",value.drug_id);
		delete_button.attr("data-supplier-name",value.supplier_name);
		delete_button.attr("data-drug-name",value.drug_name);
		delete_button.attr("data-purchase-price",value.purchase_price);
		delete_button.attr("data-selling-price",value.selling_price);
		delete_button.attr("data-stock",value.stock);
		delete_button.html("<i class='far fa-trash-alt'></i>");
		delete_button.addClass("btn btn-danger btn-sm mr-2");
		delete_button.on("click", function() {
			$("#deleteModal .modal-body").html("Hapus <b>" + $(this).attr("data-drug-name") + "</b> ?");
			$('#deleteModal').modal('show');
			$("#delete").attr("drug-id",$(this).attr("data-drug-id"));
			$("#delete").attr("supplier-name",$(this).attr("data-supplier-name"));
			$("#delete").attr("drug-name",$(this).attr("data-drug-name"));
			$("#delete").attr("purchase-price",$(this).attr("data-purchase-price"));
			$("#delete").attr("selling-price", $(this).attr("data-selling-price"));
			$("#delete").attr("stock", $(this).attr("data-stock"));
		});

		td.append(edit_button);
		td.append(delete_button);

	    tr.append("<td>" + capitalize(value.supplier_name) + "</td>");
	    tr.append("<td>" + capitalize(value.drug_name) + "</td>");
	    tr.append("<td>" + formatRupiah(value.purchase_price) + "</td>");
	    tr.append("<td>" + formatRupiah(value.selling_price) + "</td>");
	    tr.append("<td>" + value.stock + "</td>");
	    tr.append(td);
	    $('tbody').append(tr);
	});
}

function show_drug_data() {
	$.ajax({
		url     : "database/request.php",
		method  : 'POST',
		data    : {CODE: 600},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				generate_table_show_drugs_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

$("#selling-price-header-table").click(function() {
	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
		$(this).attr("sort","ASC");
		bubble_sort("selling_price","INT","DESC");
	} else if ($(this).attr("sort") == "ASC"){
		bubble_sort("selling_price","INT","ASC");
		$(this).attr("sort","DESC");
	}
	generate_table_show_drugs_data();
	
})

$("#purchase-price-header-table").click(function() {
	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
		$(this).attr("sort","ASC");
		bubble_sort("purchase_price","INT","DESC");
	} else if ($(this).attr("sort") == "ASC"){
		bubble_sort("purchase_price","INT","ASC");
		$(this).attr("sort","DESC");
	}
	generate_table_show_drugs_data();
});

$("#stock-header-table").click(function() {
	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
		$(this).attr("sort","ASC");
		bubble_sort("stock","INT","DESC");
	} else if ($(this).attr("sort") == "ASC"){
		bubble_sort("stock","INT","ASC");
		$(this).attr("sort","DESC");
	}
	generate_table_show_drugs_data();
});

$("#drug-name-header-table").click(function() {
	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
		$(this).attr("sort","ASC");
		bubble_sort("drug_name","STRING","DESC");
	} else if ($(this).attr("sort") == "ASC"){
		bubble_sort("drug_name","STRING","ASC");
		$(this).attr("sort","DESC");
	}
	generate_table_show_drugs_data();
});

$("#supplier-name-header-table").click(function() {
	if ($(this).attr("sort") == "NULL" || $(this).attr("sort") == "DESC") {
		$(this).attr("sort","ASC");
		bubble_sort("supplier_name","STRING","DESC");
	} else if ($(this).attr("sort") == "ASC"){
		bubble_sort("supplier_name","STRING","ASC");
		$(this).attr("sort","DESC");
	}
	generate_table_show_drugs_data();
});

$("input#purchase-price").keyup(function() {$(this).val(formatRupiah($(this).val()));});
$("input#selling-price").keyup(function() {$(this).val(formatRupiah($(this).val()));});

$("button#edit-drug").click(function() {	
	let drug_id = $(this).attr("drug-id");
	let supplier_name_afterward, drug_name_afterward, purchase_price_afterward, selling_price_afterward, stock_afterward;
	let supplier_name_previously = $("input#supplier-name").attr("placeholder"), 
		drug_name_previously = $("input#drug-name").attr("placeholder"), 
		purchase_price_previously = $("input#purchase-price").attr("placeholder"), 
		selling_price_previously = $("input#selling-price").attr("placeholder"), 
		stock_previously = $("input#stock").attr("placeholder");

	if ($("input#supplier-name").val() == "") 
		supplier_name_afterward = $("input#supplier-name").attr("placeholder");
	else 
		supplier_name_afterward = $("input#supplier-name").val();	

	if ($("input#drug-name").val() == "") 
		drug_name_afterward = $("input#drug-name").attr("placeholder");
	else 
		drug_name_afterward = $("input#drug-name").val();
	
	if ($("input#purchase-price").val() == "") 
		purchase_price_afterward =  $("input#purchase-price").attr("placeholder");
	else 
		purchase_price_afterward = $("input#purchase-price").val();	

	if ($("input#selling-price").val() == "") 
		selling_price_afterward = $("input#selling-price").attr("placeholder");
	else 
		selling_price_afterward = $("input#selling-price").val();

	if ($("input#stock").val() == "") 
		stock_afterward = $("input#stock").attr("placeholder");
	else 
		stock_afterward = $("input#stock").val();

	$.ajax({
		url		: "database/request.php",
		method	: 'POST',
		data 	: {
			CODE						: 620,
			user_id 					: user_id,
			drug_id 					: drug_id,
			supplier_name_previously 	: supplier_name_previously,
			drug_name_previously 		: drug_name_previously,
			purchase_price_previously 	: purchase_price_previously,
			selling_price_previously 	: selling_price_previously,
			stock_previously 			: stock_previously,
			supplier_name_afterward 	: supplier_name_afterward,
			drug_name_afterward			: drug_name_afterward,
			purchase_price_afterward 	: purchase_price_afterward,
			selling_price_afterward 	: selling_price_afterward,
			stock_afterward 			: stock_afterward
		},
		async	: true,
		dataType: 'json',
		success	: function (result) {
			console.log(result);
			if (result.CODE == 1) 
				show_drug_data();
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
});

$("button#delete").click(function() {
	$.ajax({
		url		: "database/request.php",
		method	: 'POST',
		data 	: {
			CODE			: 630,
			user_id 		: user_id,
			drug_id 		: $(this).attr("drug-id"),
			drug_name 		: $(this).attr("drug-name"),
			purchase_price 	: $(this).attr("purchase-price"),
			selling_price 	: $(this).attr("selling-price"),
			stock 			: $(this).attr("stock")
		},
		async	: true,
		dataType: 'json',
		success	: function (result) {
			console.log(result);
			if (result.CODE == 1) 
				show_drug_data();
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
});

$("#supplier-name-keyword").on("keyup", search_show_drug_data);
$("#drug-name-keyword").on("keyup", search_show_drug_data);
$("#purchase-price-keyword").on("keyup", function() {
	$(this).val(formatRupiah($(this).val()));
	search_show_drug_data();
});
$("#selling-price-keyword").on("keyup", function() {
	$(this).val(formatRupiah($(this).val()));
	search_show_drug_data();
});
$("#stock-keyword").on("keyup", function() {
	$(this).val(formatRupiah($(this).val()));
	search_show_drug_data();
});

$("#supplier-name-keyword").val("");
$("#drug-name-keyword").val("");
$("#purchase-price-keyword").val("");
$("#selling-price-keyword").val("");
$("#stock-keyword").val("");

show_drug_data();