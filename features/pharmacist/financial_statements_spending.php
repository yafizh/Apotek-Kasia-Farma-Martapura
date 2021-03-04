<?php date_default_timezone_set("Asia/Kuala_Lumpur"); ?>
<?php require_once "../../database/config.php"; ?>
<div class="card-header bg-primary text-white">Pengeluaran Bulan <b id="spending"><?= MONTH_IN_INDONESIA[intval(date("m"))]." ".date("Y"); ?></b></div>
<div class="card-body">
	<div class="table-container">
		<table class="table table-bordered table-sm spending can-detail">
			<thead>
				<tr>
					<th scope="col" >Tanggal</th>
					<th scope="col" >Pengeluaran</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>
<div id="total-spending" class="card-footer" style="color: red; font-weight: bold;"></div>
<!-- Date Modal -->
<div style="position: absolute!important;" class="modal fade" id="monthModal2" tabindex="-1" aria-labelledby="monthModal2Label" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-body">
				<div class="form-group">
					<label for="monthly_spending" class="col-form-label">Bulan</label>
					<div class="input-group date">
						<input type="text" class="form-control text-center" id="monthly_spending" value="<?= MONTH_IN_INDONESIA[intval(date("m"))]." ".date("Y"); ?>">
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

					$("#monthly_spending").on("focusout change",function() {
						if ($(this).val().split("/").length == 2) {
							let month = $(this).val().split("/")[0];
							let year = $(this).val().split("/")[1];
							$('.date').datepicker("destroy");
							$("#monthly_spending").val(month_in_indonesia[month] + " " + year);
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
<div class="modal fade" id="detailSpendingModal" tabindex="-1" aria-labelledby="detailSpendingModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header text-center">
        <h5 class="modal-title" id="detailSpendingModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<table class="table table-bordered table-sm">
			<thead>
				<tr>
					<th scope="col" >Supplier</th>
					<th scope="col" >Nama Obat</th>
					<th scope="col" >Harga Beli</th>
					<th scope="col" >Jumlah</th>
				</tr>
			</thead>
			<tbody>

			</tbody>
		</table>
      </div>
    </div>
  </div>
</div>
<script src="scripts/pharmacist/script-financial-statements-spending.js"></script>