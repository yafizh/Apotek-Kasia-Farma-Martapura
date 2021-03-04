<?php date_default_timezone_set("Asia/Kuala_Lumpur"); ?>
<div class="card-header bg-primary text-white">Laporan Stok Penjualan Barang</div>
<div class="card-body">
	<div class="table-container">
		<table class="table table-bordered table-sm">
			<thead>
				<tr>
					<th scope="col" class="btn-dark" style="width: 25%;" data-toggle="modal" data-target="#sellingReportModal">
						Tanggal
					</th>
					<th scope="col" style="width: 30%;">
						Supplier
					</th>
					<th scope="col" style="width: 30%;">
						Nama Obat
					</th>
					<th scope="col" style="width: 10%" id="stock-out-header-table" sort="NULL" class="btn-dark">
						Terjual <i class="fas"></i>
					</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>	
	</div>
</div>
<div class="card-footer text-muted"></div>

<!-- Modal -->
<div class="modal fade" id="sellingReportModal" tabindex="-1" aria-labelledby="sellingReportModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="sellingReportModalLabel">
					<div class="btn-group btn-group-toggle" data-toggle="buttons">
						<label id="radio-date" class="btn btn-primary active">
							<input type="radio" name="options" checked> Tanggal
						</label>
						<label id="radio-month" class="btn btn-primary">
							<input type="radio" name="options"> Bulan
						</label>
					</div>
				</h5>
			</div>
			<div class="modal-body">
				<div class="form-group row">
					<label for="start-date" class="col-sm-3 col-form-label">Tanggal</label>
					<div class="col-sm-9">
						<div class="input-daterange input-group" id="datepicker">
						    <input type="text" class="input-sm form-control" id="start-date" value="<?= "01/".date("m/Y") ?>">
						    <div class="input-group-append">
								<span class="input-group-text">-</span>
							</div>
						    <input type="text" class="input-sm form-control" id="end-date" value="<?= date("t/").date("m/Y") ?>">
						</div>
					</div>
				</div>
				<script>
					$('.input-daterange').datepicker({
					    format: "dd/mm/yyyy"
					});
				</script>
				<?php require_once "../../database/config.php"; ?>
				<div class="form-group row">
					<label for="month" class="col-sm-3 col-form-label">Bulan</label>
					<div class="col-sm-9">
						<div class="input-group date">
							<input type="text" class="form-control text-center" id="month" value="<?= MONTH_IN_INDONESIA[intval(date("m"))]." ".date("Y"); ?>" disabled>
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-th"></i>
							</span>
						</div>
					</div>
				</div>
				<div class="form-group row">
					<label for="" class="col-sm-3 col-form-label">Akumulasi</label>
					<div class="col-sm-9">
						<div class="btn-group btn-group-toggle w-100" data-toggle="buttons">
							<label class="btn btn-primary">
								<input type="radio" name="accumulation" value="1"> Ya
							</label>
							<label class="btn btn-primary active">
								<input type="radio" name="accumulation" value="0" checked> Tidak
							</label>
						</div>
					</div>
				</div>
				<script>
					$('.date').datepicker({
					    format: "m/yyyy",
					    startView: 1,
					    minViewMode: 1,
					    autoclose: true
					});

					$("#month").on("focusout change",function() {
						if ($(this).val().split("/").length == 2) {
							let month = $(this).val().split("/")[0];
							let year = $(this).val().split("/")[1];
							$('.date').datepicker("destroy");
							$("#month").val(month_in_indonesia[month] + " " + year);
							$('.date').datepicker({
								format: "m/yyyy",
							    todayBtn: true,
							    startView: 1,
							    minViewMode: 1,
							    autoclose: true
							});
						}
					})
				</script>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" id="search" data-dismiss="modal">Search</button>
			</div>
		</div>
	</div>
</div>
<script src="scripts/pharmacist/script-selling-report.js"></script>