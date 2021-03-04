<div class="card-header bg-primary text-white">Penjualan Obat</div>
<div class="card-body text-left">
	<div class="form-group row" id="container-drug-name">
		<label for="drug-name" class="col-sm-1 col-form-label"></label>
		<label for="drug-name" class="col-sm-3 col-form-label">Supplier</label>
		<div class="col-sm-7">
			<input type="text" class="form-control" id="supplier-name" autocomplete="off">
			<div class="dropdown-menu" style="width: 100%;"></div>
		</div>
	</div>
	<div class="form-group row" id="container-drug-name">
		<label for="drug-name" class="col-sm-1 col-form-label"></label>
		<label for="drug-name" class="col-sm-3 col-form-label">Nama Obat</label>
		<div class="col-sm-7">
			<input type="text" class="form-control" id="drug-name" autocomplete="off">
			<div class="dropdown-menu" style="width: 100%;"></div>
		</div>
	</div>
	<div class="form-group row">
		<label for="drug-name" class="col-sm-1 col-form-label"></label>
		<label for="quantity" class="col-sm-3 col-form-label">Jumlah</label>
		<div class="col-sm-7">
			<input type="number" class="form-control" id="quantity" min="1">
		</div>
	</div>
	<div class="form-group row">
		<label for="drug-name" class="col-sm-1 col-form-label"></label>
		<label for="price" class="col-sm-3 col-form-label">Harga Satuan</label>
		<div class="col-sm-7">
			<input type="text" class="form-control" id="price" readonly>
		</div>
	</div>
	<div class="form-group row">
		<label for="drug-name" class="col-sm-1 col-form-label"></label>
		<label for="total-price" class="col-sm-3 col-form-label">Harga Total</label>
		<div class="col-sm-7">
			<input type="text" class="form-control" id="total-price" readonly>
		</div>
	</div>
	<div class="form-group row">
		<label class="col-sm-4 col-form-label"></label>
		<div class="col-sm-3">
			<button type="reset" class="btn btn-secondary btn-block">Reset</button>
		</div>
		<div class="col-sm-4">
			<button type="submit" id="add-to-basket" class="btn btn-primary btn-block">Tambah</button>
		</div>
	</div>
</div>

<!-- Modal -->
<div class="modal fade" id="sellModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="sellModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="sellModalLabel">Konfrimasi</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<table class="w-100">
					<thead>
						<tr>
						<th>Nama Obat</th>
						<th>Harga</th>
						<th>Pembelian</th>
						<th>Total Harga</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
				<hr>
				<div class="form-group row text-left">
					<label class="col-sm-1 col-form-label"></label>
					<label for="total" class="col-sm-4 col-form-label">Jumlah</label>
					<div class="col-sm-7">
						<input type="text" class="form-control" id="total" readonly="">
					</div>
				</div>
				<div class="form-group row text-left">
					<label class="col-sm-1 col-form-label"></label>
					<label for="pay" class="col-sm-4 col-form-label">Pembayaran</label>
					<div class="col-sm-7">
						<input type="text" class="form-control" id="pay" autocomplete="off">
					</div>
				</div>
				<div class="form-group row text-left">
					<label class="col-sm-1 col-form-label"></label>
					<label for="back" class="col-sm-4 col-form-label">Kembalian</label>
					<div class="col-sm-7">
						<input type="text" class="form-control" id="back" readonly="">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="submit" id="sell" class="btn btn-success">Konfirmasi</button>
			</div>
		</div>
	</div>
</div>
<script src="scripts/employee/script-sell-drug.js"></script>