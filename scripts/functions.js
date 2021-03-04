$("#alertModal").on("hidden.bs.modal", _ => {
	$("#alertModal .modal-header").removeClass(["bg-success","bg-warning","bg-danger"]);
	$("#alertModal .modal-header h5").text("Modal title");
	$("#alertModal .modal-body").text("...");
});

function capitalize(string) {
	let space = true;
	let result = "";
	for (let i = 0; i < string.length; i++) {	
		if (space) result += string.charAt(i).toUpperCase();
		else result += string.charAt(i).toLowerCase();
		if (string.charAt(i) == " ") space = true;
		else space = false;
	}
	return result;
}

const bubble_sort = (field,dataType,sort) => {
	let buffer;
	let index;
	if (dataType == "INT") {
		if (sort == "ASC") {
			for (let i=0; i < data.length; i++){
				index = i;
				buffer = data[i][field];
				for (let j=i+1; j < data.length; j++){
					if (parseInt(buffer) > parseInt(data[j][field])) {
						buffer = data[j][field];
						index = j;
					}
				}
				if (index != i) {
					let temp = data[i];
					data[i] = data[index];
					data[index] = temp;
				}
			}
		} else if (sort == "DESC"){
			for (let i=0; i < data.length; i++){
				index = i;
				buffer = data[i][field];
				for (let j=i+1; j < data.length; j++){
					if (parseInt(buffer) < parseInt(data[j][field])) {
						buffer = data[j][field];
						index = j;
					}
				}
				if (index != i) {
					let temp = data[i];
					data[i] = data[index];
					data[index] = temp;
				}
			}
		}
	} else if (dataType == "STRING") {
		if (sort == "ASC") {
			for (let i=0; i < data.length; i++){
				index = i;
				buffer = data[i][field];
				for (let j=i+1; j < data.length; j++){
					if (buffer > data[j][field]) {
						buffer = data[j][field];
						index = j;
					}
				}
				if (index != i) {
					let temp = data[i];
					data[i] = data[index];
					data[index] = temp;
				}
			}
		} else if (sort == "DESC"){
			for (let i=0; i < data.length; i++){
				index = i;
				buffer = data[i][field];
				for (let j=i+1; j < data.length; j++){
					if (buffer < data[j][field]) {
						buffer = data[j][field];
						index = j;
					}
				}
				if (index != i) {
					let temp = data[i];
					data[i] = data[index];
					data[index] = temp;
				}
			}
		}
	}
}

function formatRupiah(angka, prefix){
	let number_string = angka.replace(/[^,\d]/g, '').toString(),
	split       = number_string.split(','),
	sisa        = split[0].length % 3,
	rupiah        = split[0].substr(0, sisa),
	ribuan        = split[0].substr(sisa).match(/\d{3}/gi);

	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if(ribuan){
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

function remove(array,index) {
	let new_array = [];
	if (array.length > 1) {
		for (let i = 0; i < array.length; i++) {
			if (!(i == index)) new_array.push(array[i]);
		}
		return new_array;
	} else 
		return new_array;
}