<!DOCTYPE html>
<html lang="en">
<head>
	<!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Apotek Kasia Farma</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="assets/bootstrap-4.5.3-dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/fontawesome-free-5.15.1-web/css/all.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/style.css">

</head>
<body>

	<nav class="navbar navbar-expand-lg navbar-light bg-primary" style="display: none;">
		<div class="d-flex justify-content-end">
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
			</button>			
		</div>

		<div class="collapse navbar-collapse mt-3" id="navbarSupportedContent">
			<div class="card-header text-center bg-light text-dark">SELLER</div>
			<ul class="list-group list-group-flush">
				<li id="show-drugs-data" class="list-group-item both">
					<i class="fas fa-tablets fa-lg mr-4"></i>Data Obat 
				</li>
				<li id="show-selling-history" class="list-group-item seller">
					<i class="fas fa-history fa-lg mr-4"></i>Riwayat Penjualan
				</li>

				<li id="stock_report" class="list-group-item apoteker">
					<i class="fas fa-clipboard fa-lg mr-4"></i>Laporan Sisa Stok
				</li>
				<li id="selling_report" class="list-group-item apoteker">
					<i class="fas fa-file-invoice-dollar fa-lg mr-4"></i>Laporan Penjualan
				</li>
				<li id="mutation_report" class="list-group-item apoteker">
					<i style="margin-left: -4px;" class="fas fa-file-import fa-lg mr-4"></i>Laporan Mutasi Stok
				</li>
				<li id="financial_statements" class="list-group-item apoteker">
					<i class="fas fa-chart-line fa-lg mr-4"></i>Laporan Keuangan
				</li>

				<li id="show-user-data" class="list-group-item admin">
					<i class="fas fa-users fa-lg mr-3"></i>Data User
				</li>
				<li id="show-drug-adding-data" class="list-group-item admin">
					<i class="fas fa-history fa-lg mr-3"></i></i>Riwayat Penginputan
				</li>
				<li id="show-drug-supplying-data" class="list-group-item admin">
					<i class="fas fa-history fa-lg mr-3"></i></i>Riwayat Penyuplain
				</li>
				<li id="show-drug-updating-data" class="list-group-item admin">
					<i class="fas fa-history fa-lg mr-3"></i></i>Riwayat Pengeditan
				</li>
				<li id="show-drug-deleting-data" class="list-group-item admin">
					<i class="fas fa-history fa-lg mr-3"></i>Riwayat Penghapusan
				</li>
			</ul>
		</div>
	</nav>

	<div class="container-fluid mt-2" style="display: none;">
		<div id="flex" class="d-flex">
			<div id="sidebar" class="card mr-3 shadow align-self-start" style="width: 16rem;">
				<div class="card-header text-center bg-primary text-white"></div>
				<ul class="list-group list-group-flush">
					<li id="show-drugs-data" class="list-group-item both">
						<i class="fas fa-tablets fa-lg mr-4"></i>Data Obat 
					</li>
					<li id="add-drug-data" class="list-group-item both">
						<i class="fas fa-plus fa-lg mr-4"></i>Tambah Data Obat
					</li>
					<li id="supply-drugs" class="list-group-item both">
						<i class="fas fa-cubes fa-lg mr-4"></i>Suplai Obat
					</li>
					<li id="sell-drugs" class="list-group-item seller">
						<i class="fas fa-cash-register fa-lg mr-4"></i>Penjualan
					</li>
					<li id="show-selling-history" class="list-group-item seller">
						<i class="fas fa-history fa-lg mr-4"></i>Riwayat Penjualan
					</li>
					<li id="upload-data" class="list-group-item seller">
						<i class="fas fa-upload fa-lg mr-4"></i>Upload Data
					</li>

					<li id="stock_report" class="list-group-item apoteker">
						<i class="fas fa-clipboard fa-lg mr-4"></i>Laporan Sisa Stok
					</li>
					<li id="selling_report" class="list-group-item apoteker">
						<i class="fas fa-file-invoice-dollar fa-lg mr-4"></i>Laporan Penjualan
					</li>
					<li id="mutation_report" class="list-group-item apoteker">
						<i style="margin-left: -4px;" class="fas fa-file-import fa-lg mr-4"></i>Laporan Mutasi Stok
					</li>
					<li id="financial_statements" class="list-group-item apoteker">
						<i class="fas fa-chart-line fa-lg mr-4"></i>Laporan Keuangan
					</li>

					<li id="show-user-data" class="list-group-item admin">
						<i class="fas fa-users fa-lg mr-3"></i>Data User
					</li>
					<li id="add-user-data" class="list-group-item admin">
						<i class="fas fa-user-plus fa-lg mr-3"></i>Tambah Data User
					</li>
					<li id="show-drug-adding-data" class="list-group-item admin">
						<i class="fas fa-history fa-lg mr-3"></i></i>Riwayat Penginputan
					</li>
					<li id="show-drug-supplying-data" class="list-group-item admin">
						<i class="fas fa-history fa-lg mr-3"></i></i>Riwayat Penyuplain
					</li>
					<li id="show-drug-updating-data" class="list-group-item admin">
						<i class="fas fa-history fa-lg mr-3"></i></i>Riwayat Pengeditan
					</li>
					<li id="show-drug-deleting-data" class="list-group-item admin">
						<i class="fas fa-history fa-lg mr-3"></i>Riwayat Penghapusan
					</li>
					<li id="change-password" class="list-group-item admin">
						<i class="fas fa-lock fa-lg mr-3"></i>Ganti Password
					</li>
				</ul>
			</div>
			<div id="content" class="card text-center shadow" style="flex: 1;">
			</div>
			<div id="content2" class="card text-center shadow" style="flex: 1; margin-left: 5px;">
			</div>
		</div>
		<div id="search-sidebar" class="card mr-3 shadow align-self-start" style="width: 16rem; position: absolute;">
			<div class="card-header text-center bg-primary text-white">Pencarian</div>
			<ul class="list-group list-group-flush">
				<div id="drug-data-search" class="search-sidebar">
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Supplier" id="supplier-name-keyword" autocomplete="off">
					</li>
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Nama Obat" id="drug-name-keyword" autocomplete="off">
					</li>
				</div>
				<div id="selling-history-search" class="search-sidebar" style="display: none;">
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Seller" id="seller-keyword" autocomplete="off">
					</li>
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Nomor Transaksi" id="transaction-number-keyword" autocomplete="off">
					</li>
				</div>
				<div id="stock-report-search" class="search-sidebar" style="display: none;">
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Supplier" id="supplier-name-keyword-stock-report" autocomplete="off">
					</li>
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Nama Obat" id="drug-name-keyword-stock-report" autocomplete="off">
					</li>
				</div>
				<div id="selling-report-search" class="search-sidebar" style="display: none;">
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Supplier" id="supplier-name-keyword-selling-report" autocomplete="off">
					</li>
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Nama Obat" id="drug-name-keyword-selling-report" autocomplete="off">
					</li>
				</div>
				<div id="mutation-report-search" class="search-sidebar" style="display: none;">
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Supplier" id="supplier-name-keyword-mutation-report" autocomplete="off">
					</li>
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Nama Obat" id="drug-name-keyword-mutation-report" autocomplete="off">
					</li>
				</div>
				<div id="drug-adding-search" class="search-sidebar" style="display: none;">
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Supplier" id="supplier-name-keyword-drug-adding" autocomplete="off">
					</li>
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Nama Obat" id="drug-name-keyword-drug-adding" autocomplete="off">
					</li>
				</div>
				<div id="drug-supplying-search" class="search-sidebar" style="display: none;">
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Supplier" id="supplier-name-keyword-drug-supplying" autocomplete="off">
					</li>
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Nama Obat" id="drug-name-keyword-drug-supplying" autocomplete="off">
					</li>
				</div>
				<div id="drug-updating-search" class="search-sidebar" style="display: none;">
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Supplier" id="supplier-name-keyword-drug-updating" autocomplete="off">
					</li>
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Nama Obat" id="drug-name-keyword-drug-updating" autocomplete="off">
					</li>
				</div>
				<div id="drug-deleting-search" class="search-sidebar" style="display: none;">
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Supplier" id="supplier-name-keyword-drug-deleting" autocomplete="off">
					</li>
					<li class="list-group-item">
						<input type="text" class="form-control" placeholder="Nama Obat" id="drug-name-keyword-drug-deleting" autocomplete="off">
					</li>
				</div>
			</ul>
		</div>
	</div>

	<?php require_once 'features/login.html'; ?>
	<?php require_once 'features/alert.html'; ?>

    <script src="scripts/jquery-3.5.1.min.js"></script>
    <script src="assets/bootstrap-4.5.3-dist/js/bootstrap.min.js"></script>
    <script src="scripts/jquery.twbsPagination.min.js"></script>
    <script src="scripts/script.js"></script>
    <script src="scripts/functions.js"></script>

    <!-- Depedencies for bootstrap datepicker -->
    <link rel="stylesheet" href="bootstrap-datepicker-1.9.0-dist/css/bootstrap-datepicker3.css">
    <link rel="stylesheet" href="bootstrap-datepicker-1.9.0-dist/css/bootstrap-datepicker3.standalone.css">
    <script src="bootstrap-datepicker-1.9.0-dist/js/bootstrap-datepicker.js"></script>
    <script src="bootstrap-datepicker-1.9.0-dist/locales/bootstrap-datepicker.id.min.js"></script>
</body>
</html>