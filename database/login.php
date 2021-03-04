<?php
require_once 'Database.php';
require_once 'functions.php';
if($_POST['key'] == 'login'){
	$query = "SELECT * FROM user_table WHERE (username='".$_POST['username']."' AND password='".$_POST['password']."' AND available=1)";
	// $data = mysqli_fetch_assoc(mysqli_query($conn, $query));
	$conn = new Database;
	$data = $conn->mysqli->query($query)->fetch_assoc();
	if ($data != NULL) {
		if ($data['status'] == "SELLER") UpdateStockAndMutationPerDate();
		$data['success'] = 1;
		echo json_encode($data);
	} else echo json_encode(mysqli_error($conn));
}