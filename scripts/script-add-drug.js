// Remove is-invalid class
$("input#drug-name").on("keyup",function() {
	$(this).removeClass("is-invalid");
});
$("input#supplier-name").on("keyup",function() {
	$(this).removeClass("is-invalid");
});
$("input#purchase-price").on("keyup", function() {
	$(this).removeClass("is-invalid");
	$(this).val(formatRupiah($(this).val()));
});
$("input#selling-price").on("keyup",function() {
	$(this).removeClass("is-invalid");
	$(this).val(formatRupiah($(this).val()));
});


$("button#add-drug-reset").on("click", _ => {
	$("input#supplier-name").val("");
	$("input#drug-name").val("");
	$("input#purchase-price").val("");
	$("input#selling-price").val("");
	$("input#supplier-name").focus();
});

$("button#add-drug").on("click", _ => {
	if ((!$("input#supplier-name").val()) && (!$("input#supplier-name").val().trim())) {
		$("input#supplier-name").addClass("is-invalid");
		$("input#supplier-name").focus();
	} else if ((!$("input#drug-name").val()) && (!$("input#drug-name").val().trim())) {
		$("input#drug-name").addClass("is-invalid");
		$("input#drug-name").focus();
	} else if ((!$("input#purchase-price").val()) && (!$("input#purchase-price").val())) {
		$("input#purchase-price").addClass("is-invalid");
		$("input#purchase-price").focus();
	} else if ((!$("input#selling-price").val()) && (!$("input#selling-price").val().trim())) {
		$("input#selling-price").addClass("is-invalid");
		$("input#selling-price").focus();
	} else {
		$.ajax({
			url		: "database/request.php",
			method	: 'POST',
			data    : {
				CODE			: 610,
				user_id			: user_id,
				supplier_name	: $("input#supplier-name").val(),
				drug_name		: $("input#drug-name").val(),
				purchase_price	: $("input#purchase-price").val(),
				selling_price	: $("input#selling-price").val()
			},
			async	: true,
			dataType: 'json',
			success: function (result) {
				console.log(result)
			    if (result.CODE == 1) {
			    	$("#alertModal .modal-title").text("Berhasil")
					$("#alertModal .modal-body").text("Data Berhasil Ditambahkan!");
					$("#alertModal .modal-header").addClass("bg-success");
			    	$("#alertModal").modal("show");
			    	$("#alertModal").on("hide.bs.modal", _ => {$("button#add-drug-reset").trigger("click");});
			    } else if (result == 'dupplicate drug_name') {
			    	$("#alertModal .modal-title").text("Gagal")
					$("#alertModal .modal-body").text("Nama obat sudah ada!");
					$("#alertModal .modal-header").addClass("bg-danger");
			    	$("#alertModal").modal("show");
			    } else if (result.CODE == 0) {
			    	$("#alertModal .modal-title").text("Gagal")
					$("#alertModal .modal-body").text("Data Gagal Ditambahkan!");
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