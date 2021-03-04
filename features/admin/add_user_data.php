<div class="card-header bg-primary text-white">Tambah Pengguna</div>
<div class="card-body">
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="full-name" class="col-sm-2 col-form-label text-left">Nama</label>
		<div class="col-sm-4">
			<input type="text" class="form-control" id="full-name" autocomplete="off">
		</div>
	</div>	
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="username" class="col-sm-2 col-form-label text-left">Username</label>
		<div class="col-sm-4">
			<input type="text" class="form-control" id="username" autocomplete="off">
		</div>
	</div>
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="password" class="col-sm-2 col-form-label text-left">Password</label>
		<div class="input-group col-sm-4">
			<input type="password" class="form-control" id="password" autocomplete="off" aria-describedby="eye">
			<div class="input-group-append">
			    <span class="input-group-text" id="eye">
			    	<i class="fas fa-eye-slash" style="width: 20px;"></i>
			    </span>
			</div>
		</div>	
	</div>
	<div class="form-group row">
		<label class="col-sm-3 col-form-label"></label>
		<label for="status" class="col-sm-2 col-form-label text-left">Status</label>
		<div class="col-sm-4">
			<select class="form-control" id="status">
				<option value="SELLER">SELLER</option>
				<option value="APOTEKER">APOTEKER</option>
			</select>
		</div>
	</div>
	<div class="form-group row">
		<label class="col-sm-5 col-form-label"></label>
		<div class="col-sm-2">
			<button type="reset" id="add-user-reset" class="btn btn-secondary btn-block">Reset</button>
		</div>
		<div class="col-sm-2">
			<button type="submit" id="add-user" class="btn btn-primary btn-block">Tambah</button>
		</div>
	</div>
</div>
<script src="scripts/admin/script-add-user.js"></script>