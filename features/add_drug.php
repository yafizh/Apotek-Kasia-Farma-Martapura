<div class="card-header bg-primary text-white">Tambah Data Obat</div>
<div class="card-body">
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="drug-name" class="col-sm-2 col-form-label text-left">Supplier</label>
		<div class="col-sm-4">
			<input type="text" class="form-control" id="supplier-name" autocomplete="off">
		</div>
	</div>	
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="drug-name" class="col-sm-2 col-form-label text-left">Nama Obat</label>
		<div class="col-sm-4">
			<input type="text" class="form-control" id="drug-name" autocomplete="off">
		</div>
	</div>
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="price" class="col-sm-2 col-form-label text-left">Harga Beli</label>
		<div class="col-sm-4">
			<input type="text" class="form-control" id="purchase-price">
		</div>
	</div>
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="price" class="col-sm-2 col-form-label text-left">Harga Jual</label>
		<div class="col-sm-4">
			<input type="text" class="form-control" id="selling-price">
		</div>
	</div>
	<div class="form-group row">
		<label class="col-sm-5 col-form-label"></label>
		<div class="col-sm-2">
			<button type="reset" id="add-drug-reset" class="btn btn-secondary btn-block">Reset</button>
		</div>
		<div class="col-sm-2">
			<button type="submit" id="add-drug" class="btn btn-primary btn-block">Tambah</button>
		</div>
	</div>
</div>
<script src="scripts/script-add-drug.js"></script>