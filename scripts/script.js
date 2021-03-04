// Initialization for pagination
// let totalRecords = 0;
// let records = [];
// let displayRecords = [];
// const recPerPage = 12;
// let page = 1;
// let totalPages = 0;

// Initialization for script-sell-drug.js
let date_search = 701;

// Initialization for script-sell-drug.js
let basket = [];
let item = 0;

// Index.php
let user_id = "";
let status = "";

let data = {};

const month_in_indonesia = {
	 1 : "Januari",
	 2 : "Februari",
	 3 : "Maret",
	 4 : "April",
	 5 : "Mei",
	 6 : "Juni",
	 7 : "Juli",
	 8 : "Agustus",
	 9 : "September",
	10 : "Oktober",
	11 : "November",
	12 : "Desember"
};

const month_in_indonesia_in_number = {
	"Januari" 	:  1,
	"Februari" 	:  2,
	"Maret" 	:  3,
	"April" 	:  4,
	"Mei" 		:  5,
	"Juni" 		:  6,
	"Juli" 		:  7,
	"Agustus" 	:  8,
	"September" :  9,
	"Oktober" 	: 10,
	"November" 	: 11,
	"Desember" 	: 12
};

function init() {
	$.ajax({
		url: "database/request.php",
		method: 'POST',
		data: {
			CODE: 100,
			username: $("#username").val(),
			password: $("#password").val()
		},
		async: true,
		dataType: 'json',
		success: function (result) {
			console.log(result);
			if (result.CODE == 1) {
				user_id = result.DATA[0].user_id;
				status = result.DATA[0].status;

				$("#sidebar .card-header").text(status);

				$("li#show-drugs-data").addClass("active");
				$("#content").load("features/show_drugs_data.php", function() {
					if ($(window).width() >= 576) $(this).height('88vh');
					else $(this).height($(window).height()-70);
					$(this).fadeIn(250);
				});

				$("li#show-drugs-data").click(function() {
					$("li").removeClass("active");
					$(this).addClass("active");
					$("#search-sidebar").fadeOut(250);
					$(".search-sidebar").fadeOut(250);
					$("#content2").fadeOut(250);
					$("#content").fadeOut(250, function() {
						$("#content").load("features/show_drugs_data.php", function() {
							if ($(window).width() >= 576) $(this).height('88vh');
							else $(this).height($(window).height()-70);
							$("#drug-data-search").fadeIn(250);
							$("#search-sidebar").fadeIn(250);
							$(this).fadeIn(250);
						});
					});
				});

				$("li#add-drug-data").click(function() {
					$("li").removeClass("active");
					$(this).addClass("active");
					$("#search-sidebar").fadeOut(250);
					$(".search-sidebar").fadeOut(250);
					$("#content2").fadeOut(250);
					$("#content").fadeOut(250, function() {
						$("#content").load("features/add_drug.php", function() {
							$(this).fadeIn(250);
							$(this).height('auto');
						});
					});

				});

				$("li#supply-drugs").click(function() {
					$("li").removeClass("active");
					$(this).addClass("active");
					$("#search-sidebar").fadeOut(250);
					$(".search-sidebar").fadeOut(250);
					$("#content2").fadeOut(250);
					$("#content").fadeOut(250, function() {
						$("#content").load("features/supply_drug.php", function() {
							$(this).fadeIn(250);
							$(this).height('auto');
						});
					});

				});

				$("li#show-selling-history").click(function() {
					$(".form-inline").removeClass("d-none");
					$("li").removeClass("active");
					$(this).addClass("active");
					$("#search-sidebar").fadeOut(250);
					$(".search-sidebar").fadeOut(250);
					$("#content2").fadeOut(250);
					$("#content").fadeOut(250, function() {
						$("#content").load("features/selling_history.php", function() {
							if ($(window).width() >= 576) $(this).height('88vh');
							else $(this).height($(window).height()-70);
							$("#selling-history-search").fadeIn(250);
							$("#search-sidebar").fadeIn(250);
							$(this).fadeIn(250);
						});
					});

				});

				if (status === 'SELLER') {
					$("#content2").fadeOut(250);
					$(".admin").remove();
					$(".apoteker").remove();
					$("#content").height('auto');
					$("#content2").height('auto');
					$("#search-sidebar").css("top","370px");
					

					$("li#sell-drugs").click(function() {
						$("li").removeClass("active");
						$(this).addClass("active");
						$("#search-sidebar").fadeOut(250);
						$(".search-sidebar").fadeOut(250);
						$("#content2").fadeOut(250);
						$("#content").fadeOut(250, function() {
							$("#content").load("features/employee/sell_drug.php", function() {
								$(this).fadeIn(250);
								$(this).height('auto');
								$("#content2").load("features/employee/basket_sell_drug.php", function() {
									$(this).fadeIn(250);
									$(this).height('auto');
								});
							});
						});
					});

					$("li#upload-data").click(function() {
						$.ajax({
							url: "database/employees.php",
							method: 'POST',
							data: {key: 'upload_data'},
							async: true,
							success: function (data) {
								$.ajax({
									url: "https://water-repellent-too.000webhostapp.com/database/upload.php",
									method: 'POST',
									data: {upload: data},
									async: true,
									success: function (data) {
										if (data == 1) {
											alert('berhasil!');
										}else{
											alert('gagal!');
											console.log(data);
										}
									}
								});
							}
						});
					})

				} else if (status == 'APOTEKER') {
					$("#content2").fadeOut(250);
					$(".admin").remove();
					$(".seller").remove();
					$("#search-sidebar").css("top","420px");

					$("li#stock_report").click(function() {
						$("li").removeClass("active");
						$(this).addClass("active");
						$("#search-sidebar").fadeOut(250);
						$(".search-sidebar").fadeOut(250);
						$("#content2").fadeOut(250);
						$("#content").fadeOut(250, function() {
							$("#content").load("features/pharmacist/stock_report.php", function() {
								if ($(window).width() >= 576) $(this).height('88vh');
								else $(this).height($(window).height()-70);
								$("#stock-report-search").fadeIn(250);
								$("#search-sidebar").fadeIn(250);
								$(this).fadeIn(250);
							});
						});	
					});
					$("li#selling_report").click(function() {
						$("li").removeClass("active");
						$(this).addClass("active");
						$("#search-sidebar").fadeOut(250);
						$(".search-sidebar").fadeOut(250);
						$("#content2").fadeOut(250);
						$("#content").fadeOut(250, function() {
							$("#content").load("features/pharmacist/selling_report.php", function() {
								if ($(window).width() >= 576) $(this).height('88vh');
								else $(this).height($(window).height()-70);
								$("#selling-report-search").fadeIn(250);
								$("#search-sidebar").fadeIn(250);
								$(this).fadeIn(250);
							});
						});	
					});
					$("li#mutation_report").click(function() {
						$("li").removeClass("active");
						$(this).addClass("active");
						$("#search-sidebar").fadeOut(250);
						$(".search-sidebar").fadeOut(250);
						$("#content2").fadeOut(250);
						$("#content").fadeOut(250, function() {
							$("#content").load("features/pharmacist/mutation_report.php", function() {
								if ($(window).width() >= 576) $(this).height('88vh');
								else $(this).height($(window).height()-70);
								$("#mutation-report-search").fadeIn(250);
								$("#search-sidebar").fadeIn(250);
								$(this).fadeIn(250);
							});
						});	
					});
					$("li#financial_statements").click(function() {
						$("li").removeClass("active");
						$(this).addClass("active");
						$("#search-sidebar").fadeOut(250);
						$(".search-sidebar").fadeOut(250);
						$("#content2").fadeOut(250);
						$("#content").fadeOut(250, function() {
							$("#content").load("features/pharmacist/financial_statements_income.php", function() {
								if ($(window).width() >= 576) {
									$(this).height('88vh');
									$("#content2").height("88vh");
								}
								else {
									$(this).height($(window).height()-70);
									$("#content2").height($(window).height()-70);
								}
								$(this).fadeIn(250);
								$("#content2").load("features/pharmacist/financial_statements_spending.php", function() {
									$(this).fadeIn(250);
								});
							});
						});
					});
				} else if (status == 'ADMIN') {
					$(".both").remove();
					$(".seller").remove();
					$(".apoteker").remove();
					$("#content2").remove();
					$("#search-sidebar").fadeOut(250);
					$("#search-sidebar").css("top","420px");

					$("li#show-user-data").addClass("active");
					$("#content").fadeOut(250, function() {
						$("#content").load("features/admin/show_user_data.php", function() {
							$(this).height('auto');
							$(this).fadeIn(250);
						});
					});	

					$("li#show-user-data").click(function() {
						$("li").removeClass("active");
						$(this).addClass("active");
						$("#search-sidebar").fadeOut(250);
						$(".search-sidebar").fadeOut(250);
						$("#content").fadeOut(250, function() {
							$("#content").load("features/admin/show_user_data.php", function() {
								$(this).fadeIn(250);
								if ($(window).width() >= 576) $(this).height('88vh');
								else $(this).height($(window).height()-70);
							});
						});
					});

					$("li#add-user-data").click(function() {
						$("li").removeClass("active");
						$(this).addClass("active");
						$("#search-sidebar").fadeOut(250);
						$(".search-sidebar").fadeOut(250);
						$("#content").fadeOut(250, function() {
							$("#content").load("features/admin/add_user_data.php", function() {
								$(this).height('auto');
								$(this).fadeIn(250);
							});
						});
					});

					$("li#show-drug-adding-data").click(function() {
						$("li").removeClass("active");
						$(this).addClass("active");
						$("#search-sidebar").fadeOut(250);
						$(".search-sidebar").fadeOut(250);
						$("#content").fadeOut(250, function() {
							$("#content").load("features/admin/show_drug_adding_data.php", function() {
								if ($(window).width() >= 576) $(this).height('88vh');
								else $(this).height($(window).height()-70);
								$("#drug-adding-search").fadeIn(250);
								$("#search-sidebar").fadeIn(250);
								$(this).fadeIn(250);
							});
						});
					});

					$("li#show-drug-supplying-data").click(function() {
						$("li").removeClass("active");
						$(this).addClass("active");
						$("#search-sidebar").fadeOut(250);
						$(".search-sidebar").fadeOut(250);
						$("#content").fadeOut(250, function() {
							$("#content").load("features/admin/show_drug_supplying_data.php", function() {
								if ($(window).width() >= 576) $(this).height('88vh');
								else $(this).height($(window).height()-70);
								$("#drug-supplying-search").fadeIn(250);
								$("#search-sidebar").fadeIn(250);
								$(this).fadeIn(250);
							});
						});
					});

					$("li#show-drug-updating-data").click(function() {
						$("li").removeClass("active");
						$(this).addClass("active");
						$("#search-sidebar").fadeOut(250);
						$(".search-sidebar").fadeOut(250);
						$("#content").fadeOut(250, function() {
							$("#content").load("features/admin/show_drug_updating_data.php", function() {
								if ($(window).width() >= 576) $(this).height('88vh');
								else $(this).height($(window).height()-70);
								$("#drug-updating-search").fadeIn(250);
								$("#search-sidebar").fadeIn(250);
								$(this).fadeIn(250);
							});
						});
					});

					$("li#show-drug-deleting-data").click(function() {
						$("li").removeClass("active");
						$(this).addClass("active");
						$("#search-sidebar").fadeOut(250);
						$(".search-sidebar").fadeOut(250);
						$("#content").fadeOut(250, function() {
							$("#content").load("features/admin/show_drug_deleting_data.php", function() {
								if ($(window).width() >= 576) $(this).height('88vh');
								else $(this).height($(window).height()-70);
								$("#drug-deleting-search").fadeIn(250);
								$("#search-sidebar").fadeIn(250);
								$(this).fadeIn(250);
							});
						});
					});

					$("li#change-password").click(function() {
						$("li").removeClass("active");
						$(this).addClass("active");
						$("#search-sidebar").fadeOut(250);
						$(".search-sidebar").fadeOut(250);
						$("#content").fadeOut(250, function() {
							$("#content").load("features/admin/change_password.php", function() {
								// $("#drug-adding-search").fadeIn(250);
								// $("#search-sidebar").fadeIn(250);
								$(this).fadeIn(250);
								$(this).height('auto');
							});
						});
					});

				}
				$('#loginModal').modal('hide');
				$(".container-fluid").fadeIn(1000);
			} else {
				const danger = "<div class='alert alert-danger alert-dismissible show' role='alert'> " +
								"Username atau Password salah!" +
									"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
										"<span aria-hidden='true'>&times;</span>" +
									"</button>" +
							 	"</div>";
				$("#loginModal .modal-body").prepend(danger);
				setTimeout( _ => {$(".alert").fadeOut(300);},3000);
			}
		}
	});
}

$('#loginModal').modal('show');
$("button[type=submit]").on("click", function() {
	$(this).attr("disabled","");
	init();
});
$('#loginModal').on('shown.bs.modal', function () {
	$("#username").focus(function() {
		$(this).on('keypress', function(e) {
			// 13 is enter key
			if (e.which == 13) $("button[type=submit]").trigger("click");
		})
	})

	$("#password").focus(function() {
		$(this).on('keypress', function(e) {
			if (e.which == 13) $("button[type=submit]").trigger("click");
		})
	})
	$('#username').trigger('focus');
});
$('#loginModal').on('hide.bs.modal', _ => {
	if ($(window).width() < 576)
		$(".navbar").hide().css({
							    "display": "block",
							    "visibility": "visible"
							    }).fadeIn(1000);
	$('#loginModal').remove();
});