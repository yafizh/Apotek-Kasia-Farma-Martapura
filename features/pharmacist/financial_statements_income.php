<?php date_default_timezone_set("Asia/Kuala_Lumpur"); ?>
<?php require_once "../../database/config.php"; ?>
<div class="card-header bg-primary text-white">Pendapatan Bulan <b id="income"><?= MONTH_IN_INDONESIA[intval(date("m"))]." ".date("Y"); ?></b></div>

<div class="card-body">
	<div class="table-container">
		<table class="table table-bordered table-sm income can-detail">
			<thead>
				<tr>
					<th scope="col" >Tanggal</th>
					<th scope="col" >Pendapatan</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>
<div id="total-income" class="card-footer" style="color: green; font-weight: bold;"></div>

<!-- Date Modal -->
<div style="position: absolute!important;" class="modal fade" id="monthModal" tabindex="-1" aria-labelledby="monthModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-body">
				<div class="form-group">
					<label for="monthly_income" class="col-form-label">Bulan</label>
					<div class="input-group date">
						<input type="text" class="form-control text-center" id="monthly_income" value="<?= MONTH_IN_INDONESIA[intval(date("m"))]." ".date("Y"); ?>">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-th"></i>
						</span>
					</div>
				</div>
				<script>
					$('.date').datepicker({
					    format: "m/yyyy",
					    startView: 1,
					    minViewMode: 1,
					    autoclose: true
					});

					$("#monthly_income").on("focusout change",function() {
						if ($(this).val().split("/").length == 2) {
							let month = $(this).val().split("/")[0];
							let year = $(this).val().split("/")[1];
							$('.date').datepicker("destroy");
							$("#monthly_income").val(month_in_indonesia[month] + " " + year);
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
		</div>
	</div>
</div>

<!-- Modal -->
<div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header text-center">
        <h5 class="modal-title" id="detailModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<table class="table table-bordered table-sm">
			<thead>
				<tr>
					<th scope="col" >Waktu</th>
					<th scope="col" >Nomor Transaksi</th>
					<th scope="col" >Harga Total</th>
				</tr>
			</thead>
			<tbody>

			</tbody>
		</table>
      </div>
    </div>
  </div>
</div>
<script src="scripts/pharmacist/script-financial-statements-income.js"></script>