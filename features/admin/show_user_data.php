<div class="card-header bg-primary text-white">Data Pengguna</div>
<div class="card-body">
	<div class="table-container">
		<table class="table table-bordered table-sm">
			<thead>
				<tr>
					<th scope="col">
						Nama
					</th>
					<th scope="col">
						Username
					</th>
					<th scope="col">
						Status
					</th>
					<th scope="col"></th>
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
					<label for="full-name" class="col-sm-3 col-form-label text-left">Nama</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="full-name" autocomplete="off">
					</div>
				</div>
				<div class="form-group row">
					<label for="username" class="col-sm-3 col-form-label text-left">Username</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="username" autocomplete="off">
					</div>
				</div>
				<div class="form-group row">
					<label for="password" class="col-sm-3 col-form-label text-left">Password</label>
					<div class="input-group col-sm-9">
						<input type="password" class="form-control" id="password" autocomplete="off" aria-describedby="eye">
						<div class="input-group-append">
						    <span class="input-group-text" id="eye">
						    	<i class="fas fa-eye-slash" style="width: 20px;"></i>
						    </span>
						</div>
					</div>
				</div>
				<div class="form-group row">
					<label for="status" class="col-sm-3 col-form-label text-left">Status</label>
					<div class="col-sm-9">
						<select class="form-control" id="status">
							<option value="ADMIN">ADMIN</option>
							<option value="APOTEKER">APOTEKER</option>
							<option value="SELLER">SELLER</option>
						</select>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
				<button type="submit" id="edit-user" class="btn btn-success" data-dismiss="modal">Simpan</button>
			</div>
		</div>
	</div>
</div>

<!-- Modal -->
<div class="modal fade" id="deleteModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header bg-danger">
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

<script src="scripts/admin/script-show-user-data.js"></script>