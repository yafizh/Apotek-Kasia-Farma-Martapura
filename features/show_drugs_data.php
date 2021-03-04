<div class="card-header bg-primary text-white">Data Obat</div>
<div class="card-body">
	<div class="table-container">
		<table class="table table-bordered table-sm">
			<thead>
				<tr>
					<th scope="col" style="width: 20%" id="supplier-name-header-table" sort="NULL" class="btn-dark">
						Supplier
					</th>
					<th scope="col" style="width: 20%" id="drug-name-header-table" sort="NULL" class="btn-dark">
						Nama Obat
					</th>
					<th scope="col" style="width: 20%" id="purchase-price-header-table" sort="NULL" class="btn-dark">
						Harga Beli
					</th>
					<th scope="col" style="width: 20%" id="selling-price-header-table" sort="NULL" class="btn-dark">
						Harga Jual
					</th>
					<th scope="col" style="width: 10%" id="stock-header-table" sort="NULL" class="btn-dark">
						Stok
					</th>
					<th scope="col" style="width: 10%" class="btn-dark"></th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>
<div class="card-footer text-muted"></div>

<!-- Modal -->
<div class="modal fade" id="editModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="editModalLabel">Edit</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="form-group row">
					<label for="supplier-name" class="col-sm-4 col-form-label text-left">Supplier</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="supplier-name" autocomplete="off">
					</div>
				</div>
				<div class="form-group row">
					<label for="drug-name" class="col-sm-4 col-form-label text-left">Nama Obat</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="drug-name" autocomplete="off">
					</div>
				</div>
				<div class="form-group row">
					<label for="purchase-price" class="col-sm-4 col-form-label text-left">Harga Beli</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="purchase-price" autocomplete="off">
					</div>
				</div>
				<div class="form-group row">
					<label for="selling-price" class="col-sm-4 col-form-label text-left">Harga Jual</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="selling-price" autocomplete="off">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
				<button type="submit" id="edit-drug" class="btn btn-success" data-dismiss="modal">Simpan</button>
			</div>
		</div>
	</div>
</div>

<!-- Modal -->
<div class="modal fade" id="deleteModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header bg-danger text-white">
				<h5 class="modal-title" id="deleteModalLabel">Hapus</h5>
			</div>
			<div class="modal-body">
				<h1></h1>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
				<button type="submit" id="delete" class="btn btn-danger" data-dismiss="modal">Hapus</button>
			</div>
		</div>
	</div>
</div>

<script src="scripts/script-show-drugs-data.js"></script>