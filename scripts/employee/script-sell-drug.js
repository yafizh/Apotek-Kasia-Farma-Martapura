data = {};
basket = [];

$("button#add-to-basket").on("click", _ => {
	if ((!$("input#supplier-name").val()) && (!$("input#supplier-name").val().trim())) {
		$("input#supplier-name").addClass("is-invalid");
		$("input#supplier-name").focus();
	} else if ((!$("input#drug-name").val()) && (!$("input#drug-name").val().trim())) {
		$("input#drug-name").addClass("is-invalid");
		$("input#drug-name").focus();
	} else if (!$("input#quantity").val()) {
		$("input#quantity").addClass("is-invalid");
		$("input#quantity").focus();
	} else if (parseInt($("input#quantity").val()) > parseInt($("input#quantity").attr("max"))) $("input#quantity").focus();
	else {		
		let includes = false;
		basket.forEach((value,index) => {
			if (value.drug_id == $("input#drug-name").attr("data-drug-id")) 
				includes = true;
		});
		if (!includes) {
			let card,card_body,card_title,card_subtitle1,card_subtitle2,card_subtitle3,delete_button;

			card_title = $("<h5/>");
			card_title.addClass("card-title");
			card_title.text($("#drug-name").val());

			card_subtitle1 = $("<h6/>");
			card_subtitle1.addClass("card-subtitle mb-2 text-muted");
			card_subtitle1.text("Jumlah: " + $("#quantity").val());

			card_subtitle2 = $("<h6/>");
			card_subtitle2.addClass("card-subtitle mb-2 text-muted");
			card_subtitle2.text("Harga Satuan: " + $("#price").val());

			card_subtitle3 = $("<h6/>");
			card_subtitle3.addClass("card-subtitle mb-2 text-muted");
			card_subtitle3.text("Harga Total: " + $("#total-price").val());

			delete_button = $("<button/>");
			delete_button.attr("type","button");
			delete_button.addClass("delete btn btn-danger btn-block");
			delete_button.text("Hapus");

			card_body = $("<div/>");
			card_body.addClass("card-body text-left");
			card_body.append(card_title);
			card_body.append(card_subtitle1);
			card_body.append(card_subtitle2);
			card_body.append(card_subtitle3);
			card_body.append(delete_button);

			card = $("<div/>")
			card.addClass("drug-in-basket card mb-3");
			card.css("width","15rem");
			card.append(card_body);
			$('#basket').append(card);
			basket.push({
				'drug_id'			:$("input#drug-name").attr("data-drug-id"),
				'user_id'			:user_id,
				'supplier_name'		:$("input#supplier-name").val(),
				'drug_name'			:$("input#drug-name").val(),
				'quantity'			:$("input#quantity").val(),
				'stock_previously'	:$("input#quantity").attr("max"),
				'stock_afterward'	:parseInt($("input#quantity").attr("max")) - parseInt($("input#quantity").val()),
				'price'				:$("input#price").attr("data-price"),
				'total_price'		:$("input#total-price").attr("data-total-price")
			});

			if (typeof(Storage) !== "undefined") {
				sessionStorage.setItem('basket', '{"data":'+JSON.stringify(basket)+'}');
				$("button.delete").each(function(index,value) {
					$(this).unbind("click").bind("click",function() {
						$(this).parent().parent().remove();
						basket = remove(basket,index);
					});
				});
			}
		} else {
			$("#alertModal .modal-header").addClass("bg-warning");
			$("#alertModal .modal-title").text("Warning");
			$("#alertModal .modal-body").text("Obat sudah ada di keranjang");
			$("#alertModal").modal("show");
		}
		
		$("button[type=reset]").trigger("click");
	}
});

$("button[type=reset]").on("click", _ => {
	$("input#supplier-name").val("");
	$("input#drug-name").val("");
	$("input#quantity").val("");
	$("input#price").val("");
	$("input#total-price").val("");
	$("input#drug-name").removeAttr("data-drug-id");
	$("input#quantity").removeAttr("max");
	$("input#price").removeAttr("data-price");
	$("input#total-price").removeAttr("data-total-price");
	$("input#supplier-name").focus();
});

$("input#quantity").on("keyup change", function() {
	$(this).removeClass("is-invalid");
	if (parseInt($(this).val()) > parseInt($(this).attr("max"))) {
		$("input#total-price").val("");
		$(this).val("");
		$("input#quantity").focus();
		$("#alertModal .modal-header").addClass("bg-warning");
		$("#alertModal .modal-title").text("Warning");
		$("#alertModal .modal-body").text("Stok tersisa " + $("input#quantity").attr("max"));
		$("#alertModal").modal("show");
	} else if ($(this).val()) {
		let price 		= $("input#price").attr("data-price");
		let quantity 	= $("input#quantity").val();
		let total_price = (price*quantity).toString();
		$("input#total-price").attr("data-total-price",total_price);
		$("input#total-price").val(formatRupiah(total_price));
	} else $("#total-price").val("");
});

$("input#supplier-name").on("keyup",function() {
	$(this).removeClass("is-invalid");
	if ($(this).val()) {
		$.ajax({
			url: "database/request.php",
			method: 'POST',
			data: {
				CODE: 601,
				keyword: $(this).val()
			},
			dataType: 'json',
			success: function (result) {
				console.log(result)
			    if (result.CODE == 1) {
			    	data = result.DATA;
					
					$("input#supplier-name").siblings(".dropdown-menu").text("");
					let label;
					data.forEach((value,index) => {
						label = $("<label/>");
						label.addClass("dropdown-item");
						label.append(capitalize(value.supplier_name));
						label.on("click", function() {
							$("input#supplier-name").val(capitalize(value.supplier_name));
							$(".dropdown-menu").hide();
						});
						$("input#supplier-name").siblings(".dropdown-menu").append(label);
					});
			    }
			},
			error: function (result) {
				console.log(result);
			}
		});
		$(this).siblings(".dropdown-menu").show();
	} else $(this).siblings(".dropdown-menu").hide();
	$("input#drug-name").val("");
	$("input#quantity").val("");
	$("input#price").val("");
	$("input#total-price").val("");
});

$("input#drug-name").on("keyup", function() {
	$(this).removeClass("is-invalid");
	if ($("input#supplier-name").val()) {
		if ($(this).val()) {
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
							if (value.stock == 0) 
								label.addClass("disabled");
							else {
								label.on("click", function() {
									$("input#drug-name").attr("data-drug-id",value.drug_id);
									$("input#drug-name").val(capitalize(value.drug_name));
									$("input#price").val(formatRupiah(value.selling_price));
									$("input#price").attr("data-price",value.selling_price);
									$("input#quantity").attr("max",value.stock);
									$(".dropdown-menu").hide();
								});
							}
							$("input#drug-name").siblings(".dropdown-menu").append(label);
						});
				    }
				},
				error   : function (result) {
					console.log(result);
				}
			});
			$(this).siblings(".dropdown-menu").show();
		} else $(this).siblings(".dropdown-menu").hide();
	}
	$("input#quantity").val("");
	$("input#price").val("");
	$("input#total-price").val("");
});

$(document).click( _ => {
	$("input#supplier-name").siblings(".dropdown-menu").hide();
	$("input#drug-name").siblings(".dropdown-menu").hide();
});
