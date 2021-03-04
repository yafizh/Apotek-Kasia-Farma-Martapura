
$("div#confirm").on("click", function() {
	if ($(".drug-in-basket").length == 0) {
		$("#alertModal .modal-title").text("Warning");
		$("#alertModal .modal-header").removeClass("bg-success");
		$("#alertModal .modal-header").addClass("bg-warning");
		$("#alertModal .modal-body").text("Clipboard Kosong!");
		$("#alertModal").modal("show");
	} else {
		$('#sellModal tbody').html('');
		let tr;
		let total = 0;
		JSON.parse(sessionStorage.getItem("basket")).data.forEach((value,index) => {
			tr = $('<tr/>');
		    tr.append("<td>" + value.drug_name + "</td>");
		    tr.append("<td>" + formatRupiah(value.price) + "</td>");
		    tr.append("<td>" + value.quantity + "</td>");
			tr.append("<td>" + formatRupiah(value.total_price) + "</td>");
			$('#sellModal tbody').append(tr);
			total += parseInt(value.total_price);
		});
		
		$("input#total").attr("data-total",total);
		$("input#total").val(formatRupiah(total.toString()));
		$("#sellModal").modal("show");
		$('#sellModal').on('shown.bs.modal', _ => {$("input#pay").focus();});
	}
	
});

$("input#pay").on("keyup", function() {
	let pay = parseInt($(this).val().split(".").join(""));
	$(this).val(formatRupiah($(this).val()));
	if ($(this).val() != "") {
		let back = parseInt(pay - $("input#total").attr("data-total"));
		if (back >= 0) $("input#back").val(formatRupiah(back.toString()));
		else $("input#back").val("");
	}
	$("input#pay").removeClass("is-invalid");
});

$("button#sell").on("click", _ => {
	if ($("input#back").val() == "") {
		$("input#pay").addClass("is-invalid");
		$("input#pay").focus();
	} else {
		$.ajax({
			url		: "database/request.php",
			method	: 'POST',
			data 	: {
				CODE		: 650,
				user_id		: user_id,
				basket 		: basket,
				total_price	: $("input#total").val(),
				payment		: $("input#pay").val(),
				back_money	: $("input#back").val()
			},
			async	: true,
			dataType: 'json',
			success : function (result) {
				console.log(result);
				if (result.CODE == 1) {
			    	$("#sellModal").modal("hide");
					$("#alertModal .modal-title").text("Success");
					$("#alertModal .modal-header").removeClass("bg-warning");
					$("#alertModal .modal-header").removeClass("bg-danger");
					$("#alertModal .modal-header").addClass("bg-success");
					$("#alertModal .modal-body").text("Penjualan Berhasil!");
					$("#alertModal").modal("show");

					$(".drug-in-basket").remove();
					$("#sellModal tbody").html("");
					$("input#pay").val("");
					$("input#back").val("");
					basket = [];
			    } else if (result.CODE == 0) {
			    	$("#sellModal").modal("hide");
					$("#alertModal .modal-title").text("Failed");
					$("#alertModal .modal-header").removeClass("bg-warning");
					$("#alertModal .modal-header").removeClass("bg-success");
					$("#alertModal .modal-header").addClass("bg-danger");
					$("#alertModal .modal-body").text("Penjualan Gagal!");
					$("#alertModal").modal("show");
			    } else {
			    	$("#alertModal .modal-title").text("Error")
					$("#alertModal .modal-body").text("Error, Hubungi Pembuat Program!");
					$("#alertModal .modal-header").addClass("bg-danger");
			    	$("#alertModal").modal("show");
			    }
			},
			error   : function (result) {
				console.log(result);
			}
		});	
	}
	
})