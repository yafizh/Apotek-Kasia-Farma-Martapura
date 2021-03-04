data = {};

$(document).click( _ => {
	$("input#supplier-name").siblings(".dropdown-menu").hide();
	$("input#drug-name").siblings(".dropdown-menu").hide();
});

$("input#supplier-name").on("keyup",function() {
	$(this).removeClass("is-invalid");
	if (($(this).val()) && ($(this).val().trim())) {
		$.ajax({
			url 	: "database/request.php",
			method	: 'POST',
			data 	: {
				CODE 	: 601,
				keyword : $(this).val()
			},
			dataType: 'json',
			success : function (result) {
				console.log(result)
			    if (result.CODE == 1) {
			    	data = result.DATA;
					
					$("input#supplier-name").siblings(".dropdown-menu").text("");
					let label;
					data.forEach((value,index) => {
						label = $("<label/>");
						label.addClass("dropdown-item");
						label.append(capitalize(value.supplier_name));
						$("input#supplier-name").siblings(".dropdown-menu").append(label);
						label.on("click", _ => {
							$("input#supplier-name").val(capitalize(value.supplier_name));
							$(".dropdown-menu").hide();
						});
					});
			    }
			},
			error 	: function (result) {
				console.log(result);
			}
		});
		$("input#supplier-name").siblings(".dropdown-menu").show();
		$("input#drug-name").val("");
		$("input#purchase-price").val("");
		$("input#selling-price").val("");
		$("input#stock").val("");
		$("input#quantity").val("");
	} else $("input#supplier-name").siblings(".dropdown-menu").hide();
});

$("input#drug-name").on("keyup",function() {
	$(this).removeClass("is-invalid");
	if (($(this).val()) && ($(this).val().trim())) {
		$.ajax({
			url     : "database/request.php",
			method  : 'POST',
			data    : {
				CODE			 : 602,
				supplier_keyword : $("input#supplier-name").val(),
				drug_keyword	 : $(this).val()
			},
			dataType: 'json',
			success : function (result) {
				console.log(result)
			    if (result.CODE == 1) {
			    	data = result.DATA;
					
					$("input#drug-name").siblings(".dropdown-menu").text("");
					let label;
					data.forEach((value,index) => {
						label = $("<label/>");
						label.addClass("dropdown-item");
						label.append(capitalize(value.drug_name));
						$("input#drug-name").siblings(".dropdown-menu").append(label);
						label.on("click", function() {
							$("input#drug-name").attr("data-drug-id",value.drug_id);
							$("input#drug-name").val(capitalize(value.drug_name));
							$("input#purchase-price").val(value.purchase_price);
							$("input#selling-price").val(value.selling_price);
							$("input#stock").val(value.stock);
							$("input#stock").attr("data-stock-id",value.stock_id);
							$(".dropdown-menu").hide();
						});
					});
			    }
			},
			error   : function (result) {
				console.log(result);
			}
		});
		$("input#drug-name").siblings(".dropdown-menu").show();
		$("input#purchase-price").val("");
		$("input#selling-price").val("");
		$("input#stock").val("");
		$("input#quantity").val("");
	} else $("input#drug-name").siblings(".dropdown-menu").hide();
});

$("input#quantity").on("keyup change", function() {
	if ($(this).val() <= 0) $(this).val("");
	else $(this).removeClass("is-invalid");
});

$("button#supply-drug-reset").on("click", _ => {
	$("input#supplier-name").val("");
	$("input#drug-name").val("");
	$("input#quantity").val("");
	$("input#stock").val("");
	$("input#purchase-price").val("");
	$("input#selling-price").val("");
	$("input#supplier-name").focus();
});


$("button#supply-drug").on("click", _ => {
	if ((!$("input#supplier-name").val()) && (!$("input#supplier-name").val().trim())) {
		$("input#supplier-name").addClass("is-invalid");
		$("input#supplier-name").focus();
	}else if ((!$("input#drug-name").val()) && (!$("input#drug-name").val().trim())) {
		$("input#drug-name").addClass("is-invalid");
		$("input#drug-name").focus();
	} else if (!$("input#quantity").val()) {
		$("input#quantity").addClass("is-invalid");
		$("input#quantity").focus();
	}
	else if (!$("input#purchase-price").val()) $("input#drug-name").focus();
	else if (!$("input#selling-price").val()) $("input#drug-name").focus();
	else if (!$("input#stock").val()) $("input#drug-name").focus();
	else {
		let text = "Suplai <b>"+$("input#quantity").val()+"</b> stok di <b>"+$("input#drug-name").val()+"</b> ?"
		$("#supplyModal .modal-body").html(text);
		$("#supplyModal").modal("show");
	}
});

$("button#confirm-supply").on("click",function() {
	$.ajax({
		url		: "database/request.php",
		method	: 'POST',
		data    : {
			CODE			: 640,
			user_id 		: user_id,
			drug_id 		: $("input#drug-name").attr("data-drug-id"),
			supplier_name 	: $("input#supplier-name").val(),
			drug_name 		: $("input#drug-name").val(),
			purchase_price 	: $("input#purchase-price").val(),
			selling_price 	: $("input#selling-price").val(),
			stock_id 		: $("input#stock").attr("data-stock-id"),
			stock 			: $("input#stock").val(),
			supply 			: $("input#quantity").val()
		},
		async	: true,
		dataType: 'json',
		success : function (result) {
			console.log(result);
			if (result.CODE == 1) {
			   	$("#alertModal .modal-title").text("Berhasil")
				$("#alertModal .modal-body").text("Data Berhasil Disuplai!");
				$("#alertModal .modal-header").addClass("bg-success");
			   	$("#alertModal").modal("show");
			   	$("#alertModal").on("hide.bs.modal", _ => {$("button[type=reset]").trigger("click");});
			} else if (result.CODE == 0) {
			   	$("#alertModal .modal-title").text("Gagal")
				$("#alertModal .modal-body").text("Data Gagal Disuplai!");
				$("#alertModal .modal-header").addClass("bg-danger");
			   	$("#alertModal").modal("show");
			} else {
				$("#alertModal .modal-title").text("Error")
				$("#alertModal .modal-body").text("Error, Terjadi Masalah Teknis!");
				$("#alertModal .modal-header").addClass("bg-danger");
		    	$("#alertModal").modal("show");
			}
		},
		error  : function (result) {
				console.log(result);
			}
	});
	
});