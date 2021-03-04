// Remove is-invalid class
$("input#full-name").on("keyup",function() {$(this).removeClass("is-invalid");});
$("input#username").on("keyup",function() {$(this).removeClass("is-invalid");});
$("input#password").on("keyup", function() {$(this).removeClass("is-invalid");});


$("button#add-user-reset").on("click", _ => {
	$("input#full-name").val("");
	$("input#username").val("");
	$("input#password").val("");
	$("select#status").val("SELLER");
	$("input#full-name").focus();
});

$("button#add-user").on("click", _ => {
	if ((!$("input#full-name").val()) && (!$("input#full-name").val().trim())) {
		$("input#full-name").addClass("is-invalid");
		$("input#full-name").focus();
	} else if ((!$("input#username").val()) && (!$("input#username").val().trim())) {
		$("input#username").addClass("is-invalid");
		$("input#username").focus();
	} else if ((!$("input#password").val()) && (!$("input#password").val())) {
		$("input#password").addClass("is-invalid");
		$("input#password").focus();
	} else {
		$.ajax({
			url		: "database/request.php",
			method	: 'POST',
			data    : {
				CODE		: 1410,
				full_name	: $("input#full-name").val(),
				username	: $("input#username").val(),
				password	: $("input#password").val(),
				status		: $("select#status").val()
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
			    	$("#alertModal").on("hide.bs.modal", _ => {$("button#add-user-reset").trigger("click");});
			    } else if (result == 'dupplicate username') {
			    	$("#alertModal .modal-title").text("Gagal")
					$("#alertModal .modal-body").text("Username sudah ada!");
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

$("#eye").on("click", _ => {
	if ($("#eye i").hasClass("fa-eye-slash")) {
		$("#eye i").removeClass("fa-eye-slash");
		$("#eye i").addClass("fa-eye");
		$("input#password").attr("type","text");
	}else{
		$("#eye i").removeClass("fa-eye");
		$("#eye i").addClass("fa-eye-slash");
		$("input#password").attr("type","password");
	}
});