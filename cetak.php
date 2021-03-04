<?php
require('fpdf182/fpdf.php');
require_once 'database/database.php';

$pdf = new FPDF('P','mm',array(75,65));
$pdf->SetTopMargin(3);
$pdf->AddPage();
$pdf->SetFont('Arial','B',7);
$pdf->Cell(0,4,'Apotek Kasia Farma Martapura',0,2,'C',false);
$pdf->SetFont('Arial','',5);
$pdf->Cell(0,2,'JL. Veteran, RT. 18 RW. 11 No. 17, Sungai Sipai, Cindai Alus',0,2,'C',false);
$pdf->Cell(0,2,'Kec. Martapura, Banjar, Kalimantan Selatan 70714',0,2,'C',false);
$pdf->Ln();

$full_month = [
				"Januari",
				"Februari",
				"Maret",
				"April",
				"Mai",
				"Juni",
				"July",
				"Agustus",
				"September",
				"Oktober",
				"November",
				"Desember"
			];
$date = date("d");
$month = date("m");
$year = date("Y");

$today = $date." ".$full_month[$month-1]." ".$year;

$pdf->Cell(10,2,'Tanggal',0,0,'L',false);
$pdf->Cell(1,2,':',0,0,'L',false);
$pdf->Cell(1,2,$today,0,0,'L',false);
$pdf->Ln();

$query = "SELECT * FROM t_users WHERE id=".$_GET['user_id'];
$pdf->Cell(10,2,'Operator',0,0,'L',false);
$pdf->Cell(1,2,':',0,0,'L',false);
$pdf->Cell(1,2,mysqli_fetch_assoc(mysqli_query($conn,$query))['username'],0,0,'L',false);
$pdf->Ln();
$pdf->Line(1,18,64,18);
$pdf->Ln();

$id = explode(",",$_GET['id']);
$query = "SELECT 
			t_drugs.drug_name, 
			t_selling.quantity, 
			t_selling.price, 
			t_selling.total_price 
		   FROM 
		    t_selling 
		   INNER JOIN 
		    t_drugs 
		   ON 
		    (t_drugs.id=t_selling.drug_id) 
		   WHERE 
		    (t_selling.id>=".$id[0]." AND t_selling.id<=".end($id).")";
$result = mysqli_query($conn,$query);
$total = 0;
while ($row = mysqli_fetch_assoc($result)){
	$pdf->Cell(0,2,$row['drug_name'],0,1,'L',false);
	$pdf->Cell(0,2,($row['quantity'].' X '.$row['price']),0,0,'L',false);
	$pdf->Cell(0,2,number_format($row['total_price'],0,",","."),0,0,'R',false);
	$pdf->Ln();
	$total += $row['total_price'];
}

$pdf->SetXY(40, 52);
$pdf->Cell(0,2,'TOTAL : '.number_format($total,0,",","."),0,0,'R',false);
$pdf->Line(1,51,64,51);

$pdf->Line(1,56,64,56);
$pdf->Text(22, 65, 'Barang Yang Sudah Dibeli');
$pdf->Text(15, 68, 'Tidak Bisa DITUKAR atau DIKEMBALIAKAN');

$pdf->Output("I","Data Supplier");