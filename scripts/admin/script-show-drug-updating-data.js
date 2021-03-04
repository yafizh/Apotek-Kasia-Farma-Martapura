data = {};
search_date = 1740;
function generate_table_show_drug_updating_data() {
	let tr, td;
	$('tbody').html('');
	data.forEach((value,index) => {
		tr 				= $('<tr/>');

	    tr.append("<td>" + value.day + " " + month_in_indonesia[value.month] + " " +  value.year + "</td>");
	    tr.append("<td>" + capitalize(value.supplier_name_previously) + "</td>");
	    tr.append("<td>" + capitalize(value.drug_name_previously) + "</td>");
	    tr.append("<td>" + formatRupiah(value.purchase_price_previously.toString()) + "</td>");
	    tr.append("<td>" + formatRupiah(value.selling_price_previously.toString()) + "</td>");
	    tr.append(td);
	    tr.on("click",function() {
	    	$("#sellModal #date").text(value.day + " " + month_in_indonesia[value.month] + " " +  value.year);
	    	$("#sellModal #time").text(value.time);
	    	$("#sellModal #edited").text("");
	    	if (value.supplier_name_previously != value.supplier_name_afterward) 
	    		$("#sellModal #edited").append("<p>Supplier: "+value.supplier_name_previously+" <i class='fas fa-long-arrow-alt-right'></i> "+value.supplier_name_afterward+"<p/> ");
	    	
	    	if (value.drug_name_previously != value.drug_name_afterward) 
	    		$("#sellModal #edited").append("<p>Nama Obat: "+value.drug_name_previously+" <i class='fas fa-long-arrow-alt-right'></i> "+value.drug_name_afterward+"<p/> ");
	    	

	    	if (value.purchase_price_previously != value.purchase_price_afterward) 
	    		$("#sellModal #edited").append("<p>Harga Beli: "+value.purchase_price_previously+" <i class='fas fa-long-arrow-alt-right'></i> "+value.purchase_price_afterward+"<p/> ");
	    	
	    	if (value.selling_price_previously != value.selling_price_afterward) 
	    		$("#sellModal #edited").append("<p>Harga Jual: "+value.selling_price_previously+" <i class='fas fa-long-arrow-alt-right'></i> "+value.selling_price_afterward+"<p/> ");
	    	

	    	$("#sellModal #recenly").text("");
	    	$("#sellModal #recenly").append("<p>Supplier: "+capitalize(value.supplier_name_currently)+"</p>")
	    	$("#sellModal #recenly").append("<p>Nama Obat: "+capitalize(value.drug_name_currently)+"</p>")
	    	$("#sellModal #recenly").append("<p>Harga Beli: "+value.purchase_price_currently+"</p>")
	    	$("#sellModal #recenly").append("<p>Harga Jual: "+value.selling_price_currently+"</p>")
	    	$("#sellModal").modal();
	    });
	    $('tbody').append(tr);
	});
}

function show_drug_updating_data(code,subcode=1740) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 1720) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 1730) {
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
				bubble_sort("drug_updating_id","INT","DESC");
				generate_table_show_drug_updating_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}

function search_drug_updating_data(code, subcode=1740) {
	let start_date 	= "";
	let end_date 	= "";
	let month 		= "";
	let temp_day, temp_month, temp_year;
	if (subcode == 1720) {
		temp_day   = $("input#start-date").val().split("/")[0];
		temp_month = $("input#start-date").val().split("/")[1];
		temp_year  = $("input#start-date").val().split("/")[2];
		start_date = [temp_year,temp_month,temp_day].join("-");

		temp_day   = $("input#end-date").val().split("/")[0];
		temp_month = $("input#end-date").val().split("/")[1];
		temp_year  = $("input#end-date").val().split("/")[2];
		end_date   = [temp_year,temp_month,temp_day].join("-");
	} else if (subcode == 1730) {
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
			supplier_name 				: $("input#supplier-name-keyword-drug-updating").val(),
			drug_name 					: $("input#drug-name-keyword-drug-updating").val()
		},
		async   : true,
		dataType: 'json',
		success : function (result) {	
			console.log(result);
			if (result.CODE == 1) {
				data = result.DATA;
				bubble_sort("drug_updating_id","INT","DESC");
				generate_table_show_drug_updating_data();
			}
		},
		error   : function (result) {
			console.log(result);
		}
	});
}


$("input#supplier-name-keyword-drug-updating").on("keyup", function() {
	search_drug_updating_data(1701,search_date);
});
$("input#drug-name-keyword-drug-updating").on("keyup", function() {
	search_drug_updating_data(1701,search_date);
});
$("input#supplier-name-keyword-drug-updating").val("");
$("input#drug-name-keyword-drug-updating").val("");


$("button#search").click(function() {
	if ($("#radio-date").hasClass("active")) 
		show_drug_updating_data(1700,1720);
	else if ($("#radio-month").hasClass("active")) 
		show_drug_updating_data(1700,1730);
	$("input#supplier-name-keyword-drug-updating").val("");
	$("input#drug-name-keyword-drug-updating").val("");
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

show_drug_updating_data(1700,1740);