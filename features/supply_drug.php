<div class="card-header bg-primary text-white">Suplai Obat</div>
<div class="card-body" id="supply-card-body">
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="supplier-name" class="col-sm-2 col-form-label text-left">Supplier</label>
		<div class="col-sm-4">
			<input type="text" class="form-control" id="supplier-name" autocomplete="off">
			<div class="dropdown-menu" style="width: 100%;"></div>
		</div>
	</div>
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="drug-name" class="col-sm-2 col-form-label text-left">Nama Obat</label>
		<div class="col-sm-4">
			<input type="text" class="form-control" id="drug-name" autocomplete="off">
			<div class="dropdown-menu" style="width: 100%;"></div>
		</div>
	</div>
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="price" class="col-sm-2 col-form-label text-left">Harga Beli</label>
		<div class="col-sm-4">
			<input type="text" class="form-control" id="purchase-price" autocomplete="off" readonly>
		</div>
	</div>
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="price" class="col-sm-2 col-form-label text-left">Harga Jual</label>
		<div class="col-sm-4">
			<input type="text" class="form-control" id="selling-price" autocomplete="off" readonly>
		</div>
	</div>
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="stock" class="col-sm-2 col-form-label text-left">Stok</label>
		<div class="col-sm-4">
			<input type="number" class="form-control" id="stock" autocomplete="off" readonly>
		</div>
	</div>
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="quantity" class="col-sm-2 col-form-label text-left">Suplai</label>
		<div class="col-sm-4">
			<input type="number" class="form-control" id="quantity" autocomplete="off" min="1">
		</div>
	</div>
	<div class="form-group row">
		<label class="col-sm-5 col-form-label"></label>
		<div class="col-sm-2">
			<button type="reset" id="supply-drug-reset" class="btn btn-secondary btn-block">Reset</button>
		</div>
		<div class="col-sm-2">
			<button type="submit" id="supply-drug" class="btn btn-primary btn-block">Suplai</button>
		</div>
	</div>
</div>

<!-- Modal -->
<div class="modal fade" id="supplyModal" tabindex="-1" aria-labelledby="supplyModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="supplyModalLabel">Supplai</h5>
			</div>
			<div class="modal-body">
        		...
    		</div>
    		<div class="modal-footer">
				<button type="submit" id="confirm-supply" class="btn btn-success" data-dismiss="modal">Supplai</button>
			</div>
		</div>
	</div>
</div>
<script src="scripts/script-supply-drug.js"></script>