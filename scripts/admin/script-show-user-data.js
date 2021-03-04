data = {};

function generate_table_show_user_data() {
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

		edit_button.attr("data-user-id",value.user_id);
		edit_button.attr("data-full-name",value.full_name);
		edit_button.attr("data-username",value.username);
		edit_button.attr("data-status",value.status);
		edit_button.html("<i class='far fa-edit'></i>");
		edit_button.addClass("btn btn-primary btn-sm mr-2");
		edit_button.on("click", function() {
			$('#editModal').modal('show');
			$("#full-name").val("");
			$("#username").val("");
			$("#password").val(value.password);
			$("#status").val(value.status);
			$("#full-name").attr("placeholder",$(this).attr("data-full-name"));
			$("#username").attr("placeholder",$(this).attr("data-username"));
			$("#edit-user").attr("user-id",$(this).attr("data-user-id"));
		});

		delete_button.attr("data-user-id",value.user_id);
		delete_button.attr("data-full-name",value.full_name);
		delete_button.attr("data-username",value.username);
		delete_button.attr("data-password",value.password);
		delete_button.attr("data-status",value.status);
		delete_button.html("<i class='far fa-trash-alt'></i>");
		delete_button.addClass("btn btn-danger btn-sm mr-2");
		delete_button.on("click", function() {
			$("#deleteModal .modal-body").html("Hapus <b>" + $(this).attr("data-username") + "<b> ?");
			$('#deleteModal').modal('show');
			$("#delete").attr("user-id",$(this).attr("data-user-id"));
		});

		td.append(edit_button);
		td.append(delete_button);

	    tr.append("<td>" + capitalize(value.full_name) + "</td>");
	    tr.append("<td>" + capitalize(value.username) + "</td>");
	    tr.append("<td>" + capitalize(value.status) + "</td>");
	    tr.append(td);
	    $('tbody').append(tr);
	});
}

function show_user_data() {
	$.ajax({
		url     : "database/request.php",
		method  : 'POST',
		data    : {CODE: 1400},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				generate_table_show_user_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}


$("button#edit-user").click(function() {	
	let user_id = $(this).attr("user-id");
	let full_name, 
		username, 
		password  = $("input#password").val(), 
		status 	  = $("select#status").val();

	if ($("input#full-name").val() == "") 
		full_name = $("input#full-name").attr("placeholder");
	else 
		full_name = $("input#full-name").val();	

	if ($("input#username").val() == "") 
		username = $("input#username").attr("placeholder");
	else 
		username = $("input#username").val();	

	$.ajax({
		url		: "database/request.php",
		method	: 'POST',
		data 	: {
			CODE		: 1420,
			user_id		: user_id,
			full_name   : full_name,
			username	: username,
			password 	: password,
			status 	 	: status
		},
		async	: true,
		dataType: 'json',
		success	: function (result) {
			console.log(result);
			if (result.CODE == 1) 
				show_user_data();
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

$("button#delete").on("click",function() {
	$.ajax({
		url		: "database/request.php",
		method	: 'POST',
		data 	: {
			CODE		: 1430,
			user_id 	: $(this).attr("user-id"),
			full_name 	: $(this).attr("full-name"),
			username 	: $(this).attr("username"),
			password 	: $(this).attr("password"),
			status 		: $(this).attr("status")
		},
		async	: true,
		dataType: 'json',
		success	: function (result) {
			console.log(result);
			if (result.CODE == 1) 
				show_user_data();
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

show_user_data();