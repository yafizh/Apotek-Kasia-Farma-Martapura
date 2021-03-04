<?php 
if (isset($_POST["CODE"])) {
	require_once 'Database.php';
	require_once 'functions.php';

	$conn = new Database();
	// $error = [];
	if ($_POST['CODE'] == 100) { // Login
		$conn->setTable("user_table");
		$data = $conn->select([
			"username" 		=> $conn->mysqli->real_escape_string($_POST['username']),
			"password" 		=> $conn->mysqli->real_escape_string($_POST['password']),
			"available" 	=> 1
		]);
		if ($data["CODE"] == 1) {
			if (!empty($data["DATA"])) { // Jika username dan password ditemukan
				if ($data["DATA"][0]["status"] != "ADMIN") // jika status selain "ADMIN", call UpdateStockAndMutationPerDate()
					UpdateStockAndMutationPerDate();
				echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			} else echo json_encode(["CODE" => 3]);  // Jika username dan password tidak ditemukan
		} else echo json_encode(["CODE" => 0,"ERROR" => $conn->mysqli->error]); // jika error
	} else if ($_POST['CODE'] == 600) { // Drug Data
		$conn->setTable("stock_view");
		$data = $conn->select(["date" => date("Y-m-d"),"available" => "1"]);
		if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
		else echo json_encode(["CODE" => 0]);
	} else if ($_POST['CODE'] == 601) { // Supplier Name Based Drug Data
		$keyword = strtoupper($conn->mysqli->real_escape_string($_POST['keyword']));
		$conn->setTable("drug_table");
		$data = $conn->selectLikeGroupBy(
			[
				"supplier_name" => ($keyword."%"),
				"available" => "1"
			],
			"supplier_name"
		);
		if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
		else echo json_encode(["CODE" => 0,"ERROR" => $conn->mysqli->error]);
	} else if ($_POST['CODE'] == 602) { // Supplier Name And Drug Name Based Drug Data
		$supplier_keyword = strtoupper($conn->mysqli->real_escape_string($_POST['supplier_keyword']));
		$drug_keyword = strtoupper($conn->mysqli->real_escape_string($_POST['drug_keyword']));
		$conn->setTable("stock_view");
		$data = $conn->selectLikeGroupBy(
			[
				"supplier_name" => ($supplier_keyword."%"),
				"drug_name" 	=> ($drug_keyword."%"),
				"date" 			=> date("Y-m-d"),
				"available" 	=> "1"
			],
			"drug_name"
		);
		if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
		else echo json_encode(["CODE" => 0,"ERROR" => $conn->mysqli->error]);
	} else if ($_POST['CODE'] == 610) { // Add Drug
		$error = false;
		$date_time = date("Y-m-d H:i:s");

		$conn->setTable("update_data_date");
		$data = $conn->select();
		if ($data["CODE"] == 1) {
			if (empty($data["DATA"])) {
				if (!($conn->insert(["update_data_date" => date("Y-m-d")])["CODE"] == 1)) {
				 	echo json_encode(["CODE" => 0]);
					die;
				}
			}
		}

		$drug_data = [
			'supplier_name'  => strtoupper($conn->mysqli->real_escape_string($_POST['supplier_name'])),
			'drug_name' 	 => strtoupper($conn->mysqli->real_escape_string($_POST['drug_name'])),
			'purchase_price' => RupiahToInteger($conn->mysqli->real_escape_string($_POST['purchase_price'])),
			'selling_price'  => RupiahToInteger($conn->mysqli->real_escape_string($_POST['selling_price'])),
			'available' 	 => '1'
		];
		$conn->setTable("drug_table");
		$result = $conn->insert($drug_data);	
		if ($result["CODE"] == 1){
			$drug_id = $result["INSERT_ID"];
			
			$conn->setTable("drug_adding_table");
			$drug_adding_Data = [
				'user_id' 				=> $conn->mysqli->real_escape_string($_POST['user_id']),
				'drug_id' 				=> $drug_id,
				'drug_adding_date_time' => $date_time,
				'supplier_name' 		=> strtoupper($conn->mysqli->real_escape_string($_POST['supplier_name'])),
				'drug_name' 			=> strtoupper($conn->mysqli->real_escape_string($_POST['drug_name'])),
				'purchase_price' 		=> RupiahToInteger($conn->mysqli->real_escape_string($_POST['purchase_price'])),
				'selling_price' 	 	=> RupiahToInteger($conn->mysqli->real_escape_string($_POST['selling_price']))
			];
			if (!($conn->insert($drug_adding_Data)["CODE"] == 1)) $error = true;

			$conn->setTable("stock_table");
			$stock_data = [
				'drug_id' 	 => $drug_id,
				'stock_date' => date("Y-m-d"),
				'stock'		 => 0
			];
			if (!($conn->insert($stock_data)["CODE"] == 1)) $error = true;

			$conn->setTable("mutation_table");
			$mutation_data = [
				'drug_id' 		=> $drug_id,
				'mutation_date' => date("Y-m-d")
			];
			if (!($conn->insert($mutation_data)["CODE"] == 1)) $error = true;

			if ($error) {
				$conn->setTable("drug_table");
				if ($conn->delete(["drug_id" => $drug_id])["CODE"] == 1) 
					echo json_encode(["CODE" => 0]);
				else
					echo json_encode(["CODE" => 999]);
			} else
				echo json_encode(["CODE" => 1]);

		} else
			echo json_encode(["CODE" => 0]);
	} else if ($_POST['CODE'] == 620) { // Edit Drug
		$drug_updating_data = [
			"user_id" 					=> $conn->mysqli->real_escape_string($_POST['user_id']),
			"drug_id" 					=> $conn->mysqli->real_escape_string($_POST['drug_id']),
			"drug_updating_date_time"	=> date("Y-m-d H:i:s"),
			"supplier_name_previously"	=> strtoupper($conn->mysqli->real_escape_string($_POST['supplier_name_previously'])),
			"supplier_name_afterward"	=> strtoupper($conn->mysqli->real_escape_string($_POST['supplier_name_afterward'])),
			"drug_name_previously" 		=> strtoupper($conn->mysqli->real_escape_string($_POST['drug_name_previously'])),
			"drug_name_afterward"  		=> strtoupper($conn->mysqli->real_escape_string($_POST['drug_name_afterward'])),
			"purchase_price_previously" => RupiahToInteger($conn->mysqli->real_escape_string($_POST['purchase_price_previously'])),
			"purchase_price_afterward"  => RupiahToInteger($conn->mysqli->real_escape_string($_POST['purchase_price_afterward'])),
			"selling_price_previously"	=> RupiahToInteger($conn->mysqli->real_escape_string($_POST['selling_price_previously'])),
			"selling_price_afterward"	=> RupiahToInteger($conn->mysqli->real_escape_string($_POST['selling_price_afterward']))
		];

		$conn->setTable("drug_updating_table");
		$result =$conn->insert($drug_updating_data);
		if ($result["CODE"] == 1) {
			$conn->setTable("drug_table");
			$drug_data = [
				"supplier_name"  => strtoupper($conn->mysqli->real_escape_string($_POST['supplier_name_afterward'])),
				"drug_name"      => strtoupper($conn->mysqli->real_escape_string($_POST['drug_name_afterward'])),
				"purchase_price" => RupiahToInteger($conn->mysqli->real_escape_string($_POST['purchase_price_afterward'])),
				"selling_price"  => RupiahToInteger($conn->mysqli->real_escape_string($_POST['selling_price_afterward']))	
			];
			if ($conn->update($drug_data,["drug_id" => $conn->mysqli->real_escape_string($_POST['drug_id'])])) 
				echo json_encode(["CODE" => 1]);
			else {
				$conn->setTable("drug_updating_table");
				if ($conn->delete(["drug_updating_id" => $result["INSERT_ID"]])) 
					echo json_encode(["CODE" => 0]);
				else 
					echo json_encode(["CODE" => 999]);
			}
		} else
			echo json_encode(["CODE" => 0]);
	} else if ($_POST['CODE'] == 630) { // Delete Drug
		$drug_id = $conn->mysqli->real_escape_string($_POST['drug_id']);
		$user_id = $conn->mysqli->real_escape_string($_POST['user_id']);
		$conn->setTable("drug_table");
		if ($conn->update(["available" => 0],["drug_id" => $drug_id])["CODE"] == 1) {
			$conn->setTable("drug_deleting_table");
			if ($conn->insert(["drug_id" => $drug_id,"user_id" => $user_id,"drug_deleting_date_time" => date("Y-m-d H:i:s")])["CODE"] == 1)
				echo json_encode(["CODE" => 1]);
			else {
				$conn->setTable("drug_table");
				if ($conn->update(["available" => 1],["drug_id" => $drug_id])["CODE"] == 1)
					echo json_encode(["CODE" => 0]);
				else 
					echo json_encode(["CODE" => 999]);
			}
		} else
			echo json_encode(["CODE" => 0]);
	} else if ($_POST['CODE'] == 640) { // Supply Drug
		$error = false;
		$date_time = date("Y-m-d H:i:s");
		$drug_id = $conn->mysqli->real_escape_string($_POST['drug_id']);
		$stock_id = $conn->mysqli->real_escape_string($_POST['stock_id']);
		$stock = $conn->mysqli->real_escape_string($_POST['stock']);
		$supply = $conn->mysqli->real_escape_string($_POST['supply']);

		$conn->setTable("drug_supplying_table");
		$drug_supplying_data = [
			'user_id' 					=> $conn->mysqli->real_escape_string($_POST['user_id']),
			'drug_id' 					=> $drug_id,
			'drug_supplying_date_time' 	=> $date_time,
			'supplier_name' 			=> $conn->mysqli->real_escape_string($_POST['supplier_name']),
			'drug_name'					=> $conn->mysqli->real_escape_string($_POST['drug_name']),
			'purchase_price' 			=> RupiahToInteger($conn->mysqli->real_escape_string($_POST['purchase_price'])),
			'selling_price'  			=> RupiahToInteger($conn->mysqli->real_escape_string($_POST['selling_price'])),
			'stock'						=> $stock,
			'supply'					=> $supply
		];

		$result = $conn->insert($drug_supplying_data);
		if ($result["CODE"] == 1) {
			$drug_supplying_id = $result["INSERT_ID"];

			$conn->setTable("mutation_view");
			$result = $conn->select(["drug_id" => $drug_id,"date" => date("Y-m-d"),"available" => "1"]);

			if ($result["CODE"] == 1) {
				if (!empty($result["DATA"])) {
					$mutation_id = $result["DATA"][0]["mutation_id"];
					$conn->setTable("mutation_in_table");
					$mutation_in_data = [
						'mutation_id'		 => $mutation_id,
						'mutation_date_time' => $date_time,
						'mutation_in' 		 => $conn->mysqli->real_escape_string($_POST['supply'])
					];
					$result = $conn->insert($mutation_in_data);
					if ($result['CODE'] == 1) {
						$conn->setTable("stock_table");
						if (!($conn->update(['stock' => ($stock + $supply)],['stock_id' => $stock_id])["CODE"] == 1)) 
							$error = true;
					} else $error = true;
				} else $error = true;
			} else $error = true;

			if ($error) {
				$conn->setTable("drug_supplying_table");
				$delete_drug_supplying = $conn->delete(["drug_supplying_id" => $drug_supplying_id])["CODE"];
				$conn->setTable("mutation_in_table");
				$delete_mutation_in = $conn->delete(["mutation_in_id" => $result["INSERT_ID"]])["CODE"];
				if (($delete_drug_supplying == 1) && ($delete_mutation_in == 1)) 
					echo json_encode(["CODE" => 0,"ERROR" => $conn->mysqli->error]);
				else 
					echo json_encode(["CODE" => 999,"ERROR" => $conn->mysqli->error]);
			} else
				echo json_encode(["CODE" => 1]);
		} else 
			echo json_encode(["CODE" => 0,"ERROR" => $conn->mysqli->error]);
	} else if ($_POST["CODE"] == 650) { // Sales Drug
		$error = false;
		$date_time = date("Y-m-d H:i:s");
		$date = date("Y-m-d");
		$conn->setTable("sales_table");
		$sales_data = [
			'user_id'		 	 => $conn->mysqli->real_escape_string($_POST['user_id']),
			'sales_date_time' 	 => $date_time,
			'payment' 		 	 => RupiahToInteger($conn->mysqli->real_escape_string($_POST['payment'])),
			'back_money' 		 => RupiahToInteger($conn->mysqli->real_escape_string($_POST['back_money'])),
			'total_price' 		 => RupiahToInteger($conn->mysqli->real_escape_string($_POST['total_price'])),
			'transaction_number' => date("YmdHis")
		];
		$result = $conn->insert($sales_data);
		if ($result["CODE"] == 1) {
			$sales_id = $result["INSERT_ID"];
			foreach ($_POST['basket'] as $value) {
				$conn->setTable("sales_detail_table");
				$sales_detail_data = [
					'sales_id' 		=> $sales_id,
					'drug_id' 		=> $value['drug_id'],
					'quantity' 		=> $value['quantity'],
					'price' 		=> $value['price'],
					'total_price' 	=> $value['total_price']
				];
				if (!($conn->insert($sales_detail_data)["CODE"] == 1)) {
					$error = true;
					break;
				}
			}

			$mutation_out_inserted = [];
			if (!$error) {
				foreach ($_POST['basket'] as $value) {
					$conn->setTable("mutation_view");
					$data = $conn->select(["date" => $date,"drug_id" => $value['drug_id'],"available" => "1"]);
					if ($data["CODE"] == 1) {
						if (!empty($data["DATA"])) {
							$conn->setTable("mutation_out_table");
							$mutation_out_data = [
								'mutation_id' 		 => $data["DATA"][0]["mutation_id"],
								'mutation_date_time' => $date_time,
								'mutation_out' 		 => $value['quantity']
							];
							$result = $conn->insert($mutation_out_data);
							if ($result["CODE"] == 1)
								$mutation_out_inserted = [$result["INSERT_ID"]];
							else {
								$error = true;
								break;
							}
						} else {
							$error = true;
							break;
						}
					} else {
						$error = true;
						break;
					}
				}

				if (!$error) {
					foreach ($_POST['basket'] as $value) {
						$conn->setTable("stock_table");
						$stock_data = ['stock' => $value['stock_afterward']];
						if (!($conn->update($stock_data,["drug_id" => $value['drug_id'],"stock_date" => $date])["CODE"] == 1)) {
							$error = true;
							break;
						}
					}
				}
			}

			if ($error) {
				$error_sales_deleted = false;
				$error_mutation_out_table_deleted = false;
				$error_stock_table_updated = false;

				$conn->setTable("sales_table");
				if (!($conn->delete(["sales_id" => $sales_id])["CODE"] == 1)) $error_sales_deleted = true;

				$conn->setTable("mutation_out_table");
				foreach ($mutation_out_inserted as $value) {
					if (!($conn->delete(["mutation_out_id" => $value])["CODE"] == 1)) $error_mutation_out_table_deleted = true;
				}

				$conn->setTable("stock_table");
				foreach ($_POST['basket'] as $value) {
					$stock_data = ['stock' => $value['stock_previously']];
					if (!($conn->update($stock_data,["drug_id" => $value['drug_id'],"stock_date" => $date])["CODE"] == 1))
						$error_stock_table_updated = true;
				}

				if ($error_sales_deleted || $error_stock_table_updated || $error_mutation_out_table_deleted)
					echo json_encode(["CODE" => 999]);
				else 
					echo json_encode(["CODE" => 0]);

			} else echo json_encode(["CODE" => 1]);
		} else 
			echo json_encode(["CODE" => 0]);
	} else if ($_POST['CODE'] == 700) {
		$data = [];
		$conn->setTable("sales_view");
		if ($_POST['SUBCODE'] == 710) 
			$data = $conn->select(["date" => date("Y-m-d")]);
		else if ($_POST['SUBCODE'] == 720)
			$data = $conn->selectFromTo(
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST['SUBCODE'] == 730)
			$data = $conn->select([
				"year" => explode("-", $_POST['month'])[0],
				"month" => explode("-", $_POST['month'])[1] 
			]);
		if (isset($data["CODE"])) {
			if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST['CODE'] == 701) {
		$data = [];
		$conn->setTable("sales_view");
		if ($_POST['SUBCODE'] == 710)
			$data = $conn->selectLike([
				"username" 				=> $conn->mysqli->real_escape_string($_POST['seller_keyword'])."%",
				"transaction_number"	=> $conn->mysqli->real_escape_string($_POST['transaction_number_keyword'])."%",
				"date" 					=> date("Y-m-d")
			]);
		else if ($_POST['SUBCODE'] == 720)
			$data = $conn->selectLikeFromTo(
				[
				"username" 				=> $conn->mysqli->real_escape_string($_POST['seller_keyword'])."%",
				"transaction_number"	=> $conn->mysqli->real_escape_string($_POST['transaction_number_keyword'])."%"
				],
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST['SUBCODE'] == 730)
			$data = $conn->selectLike([
				"username" 				=> $conn->mysqli->real_escape_string($_POST['seller_keyword'])."%",
				"transaction_number"	=> $conn->mysqli->real_escape_string($_POST['transaction_number_keyword'])."%",
				"month" 				=> $conn->mysqli->real_escape_string(explode("-", $_POST['month'])[1]), 
				"year"					=> $conn->mysqli->real_escape_string(explode("-", $_POST['month'])[0])
			]);
		if (isset($data["CODE"])) {
			if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST['CODE'] == 800) {
		$conn->setTable("sales_detail_view");
		$data = $conn->select(["sales_id" => $_POST["sales_id"]]);
		if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
		else echo json_encode(["CODE" => 0]);
	} else if ($_POST['CODE'] == 603) {
		$conn->setTable("stock_view");
		$data = $conn->selectLike([
			"supplier_name" 	=> $conn->mysqli->real_escape_string($_POST['supplier_name_keyword'])."%",
			"drug_name" 		=> $conn->mysqli->real_escape_string($_POST['drug_name_keyword'])."%",
			"available"			=> "1",
			"date"				=> date("Y-m-d")
		]);
		if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
		else echo json_encode(["CODE" => 0]);
	} else if ($_POST["CODE"] == 900) { // Stock Report
		$data = [];
		$conn->setTable("stock_view");
		if ($_POST["SUBCODE"] == 910)
			$data = $conn->select([
				"date"		=> date("Y-m-d"),
				"available"	=> "1"
			]);
		else if ($_POST["SUBCODE"] == 920)
			$data = $conn->selectLikeFromTo(
				[
					"available" => "1"
				],
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST["SUBCODE"] == 930)
			$data = $conn->select([
				"year" => explode("-", $_POST['month'])[0],
				"month" => explode("-", $_POST['month'])[1], 
				"available" => "1" 
			]);

		if (isset($data["CODE"])) {
			if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST['CODE'] == 901) {
		$data = [];
		$conn->setTable("stock_view");
		if ($_POST["SUBCODE"] == 910)
			$data = $conn->selectLike([
				"supplier_name" => $conn->mysqli->real_escape_string($_POST['supplier_name_keyword'])."%",
				"drug_name" 	=> $conn->mysqli->real_escape_string($_POST['drug_name_keyword'])."%",
				"date"			=> date("Y-m-d"),
				"available"		=> "1"
			]);
		else if ($_POST["SUBCODE"] == 920)
			$data = $conn->selectLikeFromTo( // selectFromTo perbaiki, menjadi 2 param, pertama where kedua from-to
				[
					"supplier_name" => $conn->mysqli->real_escape_string($_POST['supplier_name_keyword'])."%",
					"drug_name" 	=> $conn->mysqli->real_escape_string($_POST['drug_name_keyword'])."%",
					"stock" 		=> RupiahToInteger($conn->mysqli->real_escape_string($_POST['stock_keyword']))."%",
					"available" 	=> "1"
				],
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST["SUBCODE"] == 930)
			$data = $conn->selectLike([
				"supplier_name" => $conn->mysqli->real_escape_string($_POST['supplier_name_keyword'])."%",
				"drug_name" 	=> $conn->mysqli->real_escape_string($_POST['drug_name_keyword'])."%",
				"stock" 		=> RupiahToInteger($conn->mysqli->real_escape_string($_POST['stock_keyword']))."%",
				"year" 			=> explode("-", $_POST['month'])[0],
				"month" 		=> explode("-", $_POST['month'])[1], 
				"available" 	=> "1" 
			]);
		if (isset($data["CODE"])) {
			if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST["CODE"] == 1000) {
		$data = [];
		$conn->setTable("mutation_view");
		if ($_POST["SUBCODE"] == 1010) {
			$data = $conn->select([
				"date"		=> date("Y-m-d"),
				"available"	=> "1"
			]);
		} else if ($_POST["SUBCODE"] == 1020) {
			$data = $conn->selectLikeFromTo(
				[
					"available" => "1"
				],
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		} else if ($_POST["SUBCODE"] == 1030) {
			$data = $conn->select([
				"year" => explode("-", $_POST['month'])[0],
				"month" => explode("-", $_POST['month'])[1], 
				"available"	=> "1" 
			]);
		}

		if ($_POST["ACCUMULATION"] == 1) {
			$drug_id = [];
			$accumulation = [];
			foreach ($data["DATA"] as $datum) {
				if (in_array($datum["drug_id"], $drug_id)) {
					$accumulation[$datum["drug_id"]]["stock_out"] += (int)$datum["stock_out"];
				} else {
					$drug_id[] = $datum["drug_id"];
					$accumulation[$datum["drug_id"]] = [
						"date" 			=> $datum["date"], 
						"day" 			=> $datum["day"], 
						"month" 		=> $datum["month"], 
						"year"			=> $datum["year"], 
						"drug_name" 	=> $datum["drug_name"], 
						"supplier_name" => $datum["supplier_name"], 
						"stock_out"		=> (int)$datum["stock_out"]
					];
				}
			}
			$data["DATA"] = array_values($accumulation);
		}

		if (isset($data["CODE"])) {
			if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST["CODE"] == 1001) {
		$data = [];
		$conn->setTable("mutation_view");
		if ($_POST["SUBCODE"] == 1010) {
			$data = $conn->selectLike([
				"supplier_name" => $conn->mysqli->real_escape_string($_POST['supplier_name_keyword'])."%",
				"drug_name" 	=> $conn->mysqli->real_escape_string($_POST['drug_name_keyword'])."%",
				"date"			=> date("Y-m-d"),
				"available"		=> "1"
			]);
		} else if ($_POST["SUBCODE"] == 1020) {
			$data = $conn->selectLikeFromTo( // selectFromTo perbaiki, menjadi 2 param, pertama where kedua from-to
				[
					"supplier_name" => $conn->mysqli->real_escape_string($_POST['supplier_name_keyword'])."%",
					"drug_name" 	=> $conn->mysqli->real_escape_string($_POST['drug_name_keyword'])."%",
					"available" 	=> "1"
				],
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		} else if ($_POST["SUBCODE"] == 1030) {
			$data = $conn->selectLike([
				"supplier_name" => $conn->mysqli->real_escape_string($_POST['supplier_name_keyword'])."%",
				"drug_name" 	=> $conn->mysqli->real_escape_string($_POST['drug_name_keyword'])."%",
				"year" 			=> explode("-", $_POST['month'])[0],
				"month" 		=> explode("-", $_POST['month'])[1], 
				"available"		=> "1" 
			]);
		}

		if ($_POST["ACCUMULATION"] == 1) {
			$drug_id = [];
			$accumulation = [];
			foreach ($data["DATA"] as $datum) {
				if (in_array($datum["drug_id"], $drug_id)) {
					$accumulation[$datum["drug_id"]]["stock_out"] += (int)$datum["stock_out"];
				} else {
					$drug_id[] = $datum["drug_id"];
					$accumulation[$datum["drug_id"]] = [
						"day" 			=> $datum["day"], 
						"month" 		=> $datum["month"], 
						"year"			=> $datum["year"], 
						"drug_name" 	=> $datum["drug_name"], 
						"supplier_name" => $datum["supplier_name"], 
						"stock_out"		=> (int)$datum["stock_out"]
					];
				}
			}
			$data["DATA"] = array_values($accumulation);
		}
		
		if (isset($data["CODE"])) {
			if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST["CODE"] == 1100) {
		$data = [];
		$conn->setTable("mutation_view");
		if ($_POST["SUBCODE"] == 1110) {
			$data = $conn->select([
				"date"		=> date("Y-m-d"),
				"available"	=> "1"
			]);
		} else if ($_POST["SUBCODE"] == 1120) {
			$data = $conn->selectLikeFromTo(
				[
					"available" => "1"
				],
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		} else if ($_POST["SUBCODE"] == 1130) {
			$data = $conn->select([
				"year" 		=> explode("-", $_POST['month'])[0],
				"month" 	=> explode("-", $_POST['month'])[1], 
				"available" => "1" 
			]);
		}
		if (isset($data["CODE"])) {
			if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST["CODE"] == 1101) {
		$data = [];
		$conn->setTable("mutation_view");
		if ($_POST["SUBCODE"] == 1110)
			$data = $conn->selectLike([
				"supplier_name" => $conn->mysqli->real_escape_string($_POST['supplier_name_keyword'])."%",
				"drug_name" 	=> $conn->mysqli->real_escape_string($_POST['drug_name_keyword'])."%",
				"date"			=> date("Y-m-d"),
				"available"		=> "1"
			]);
		else if ($_POST["SUBCODE"] == 1120)
			$data = $conn->selectLikeFromTo( // selectFromTo perbaiki, menjadi 2 param, pertama where kedua from-to
				[
					"supplier_name" => $conn->mysqli->real_escape_string($_POST['supplier_name_keyword'])."%",
					"drug_name" 	=> $conn->mysqli->real_escape_string($_POST['drug_name_keyword'])."%",
					"available" 	=> "1"
				],
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST["SUBCODE"] == 1130)
			$data = $conn->selectLike([
				"supplier_name" => $conn->mysqli->real_escape_string($_POST['supplier_name_keyword'])."%",
				"drug_name" 	=> $conn->mysqli->real_escape_string($_POST['drug_name_keyword'])."%",
				"year" 			=> explode("-", $_POST['month'])[0],
				"month" 		=> explode("-", $_POST['month'])[1], 
				"available" 	=> "1"
			]);
		if (isset($data["CODE"])) {
			if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST["CODE"] == 1200) {
		$conn->setTable("sales_view");
		$data = $conn->select(["month" => $_POST["month"],"year" => $_POST["year"]]);
		if ($data["CODE"] == 1) {
			$income_date = [];
			$income_per_date = [];
			foreach ($data["DATA"] as $datum) {
				if (in_array($datum["date"], $income_date)) {
					$income_per_date[$datum["date"]]["total_price"] += (int)$datum["total_price"];
				} else {
					$income_date[] = $datum["date"];
					$income_per_date[$datum["date"]] = [
						"date" => $datum["date"], 
						"day" => $datum["day"], 
						"month" => $datum["month"], 
						"year" => $datum["year"], 
						"total_price" => (int)$datum["total_price"]
					];
				}
			}

			$data["DATA"] = [];
			foreach ($income_per_date as $value) {
				$data["DATA"][] = $value;
			}
			echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
		}
		else echo json_encode(["CODE" => 0]);
	} else if ($_POST["CODE"] == 1300) {
		if ($_POST["SUBCODE"] == 1310) {
			$conn->setTable("drug_supplying_view");
			$data = $conn->select(["date" => $_POST["date"]]);
			if ($data["CODE"] == 1) echo json_encode(["CODE" => 0, "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		} else {
			$conn->setTable("drug_supplying_view");
			$data = $conn->select(["month" => $_POST["month"],"year" => $_POST["year"]]);
			if ($data["CODE"] == 1) {
				$outcome_date = [];
				$outcome_per_date = [];
				foreach ($data["DATA"] as $datum) {
					if (in_array($datum["date"], $outcome_date)) {
						$outcome_per_date[$datum["date"]]["total_purchase"] += (int)$datum["purchase_price_when_supplying"] * $datum["supply"];
					} else {
						$outcome_date[] = $datum["date"];
						$outcome_per_date[$datum["date"]] = [
							"date" => $datum["date"], 
							"day" => $datum["day"], 
							"month" => $datum["month"], 
							"year" => $datum["year"], 
							"total_purchase" => (int)$datum["purchase_price_when_supplying"] * $datum["supply"]
						];
					}
				}

				$data["DATA"] = [];
				foreach ($outcome_per_date as $value) {
					$data["DATA"][] = $value;
				}
				echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			}
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST['CODE'] == 1400) { // User Data
		$conn->setTable("user_table");
		$data = $conn->select(["available" => "1"]);
		if ($data["CODE"] == 1) {
			$users = [];
			foreach ($data["DATA"] as $datum) {
				if (!($datum["status"] == "ADMIN")) 
					$users[] = $datum;
				
			}
			echo json_encode(["CODE" => $data["CODE"], "DATA" => $users]);
		}
		else echo json_encode(["CODE" => 0]);
	} else if ($_POST["CODE"] == 1410) {
		$user_data = [
			"full_name" => strtoupper($conn->mysqli->real_escape_string($_POST['full_name'])),
			"username"  => strtoupper($conn->mysqli->real_escape_string($_POST['username'])),
			"password" 	=> strtoupper($conn->mysqli->real_escape_string($_POST['password'])),
			"status"  	=> strtoupper($conn->mysqli->real_escape_string($_POST['status'])),
			"available"	=> "1"
		];
		$conn->setTable("user_table");
		if ($conn->insert($user_data)) echo json_encode(["CODE" => 1]);
		else echo json_encode(["CODE" => 0]);
	} else if ($_POST['CODE'] == 1420) { // Edit User
		$user_id = ["user_id" 	=> $conn->mysqli->real_escape_string($_POST['user_id'])];
		$user_data = [
			"full_name" => strtoupper($conn->mysqli->real_escape_string($_POST['full_name'])),
			"username"  => strtoupper($conn->mysqli->real_escape_string($_POST['username'])),
			"password" 	=> strtoupper($conn->mysqli->real_escape_string($_POST['password'])),
			"status"  	=> strtoupper($conn->mysqli->real_escape_string($_POST['status']))	
		];
		$conn->setTable("user_table");
		if ($conn->update($user_data,$user_id)) echo json_encode(["CODE" => 1]);
		else echo json_encode(["CODE" => 0]);
	} else if ($_POST["CODE"] == 1500) {
		$data = [];
		$conn->setTable("drug_adding_view");
		if ($_POST["SUBCODE"] == 1510) {
			
		} else if ($_POST["SUBCODE"] == 1520)
			$data = $conn->selectFromTo(
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST["SUBCODE"] == 1530) 
			$data = $conn->select([
				"year" 		=> explode("-", $_POST['month'])[0],
				"month" 	=> explode("-", $_POST['month'])[1]
			]);
		else if ($_POST["SUBCODE"] == 1540) 
			$data = $conn->select();
		

		if (isset($data["CODE"])) {
			if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST["CODE"] == 1501) {
		$data = [];
		$conn->setTable("drug_adding_view");
		if ($_POST["SUBCODE"] == 1510) {
			
		} else if ($_POST["SUBCODE"] == 1520)
			$data = $conn->selectLikeFromTo(
				[
					"supplier_name_when_adding" => $conn->mysqli->real_escape_string($_POST['supplier_name'])."%",
					"drug_name_when_adding" 	=> $conn->mysqli->real_escape_string($_POST['drug_name'])."%"
				],
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST["SUBCODE"] == 1530) 
			$data = $conn->selectLike([
				"year" 						=> explode("-", $_POST['month'])[0],
				"month" 					=> explode("-", $_POST['month'])[1],
				"supplier_name_when_adding" => $conn->mysqli->real_escape_string($_POST['supplier_name'])."%",
				"drug_name_when_adding" 	=> $conn->mysqli->real_escape_string($_POST['drug_name'])."%"
			]);
		else if ($_POST["SUBCODE"] == 1540) 
			$data = $conn->selectLike([
				"supplier_name_when_adding" => $conn->mysqli->real_escape_string($_POST['supplier_name'])."%",
				"drug_name_when_adding" 	=> $conn->mysqli->real_escape_string($_POST['drug_name'])."%"
			]);
		

		if (isset($data["CODE"])) {
			if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST["CODE"] == 1600) {
		$conn->setTable("drug_supplying_view");
		
		if ($_POST["SUBCODE"] == 1610) {
			
		} else if ($_POST["SUBCODE"] == 1620)
			$data = $conn->selectFromTo(
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST["SUBCODE"] == 1630) 
			$data = $conn->select([
				"year" 		=> explode("-", $_POST['month'])[0],
				"month" 	=> explode("-", $_POST['month'])[1]
			]);
		else if ($_POST["SUBCODE"] == 1640) 
			$data = $conn->select();
		

		if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
		else echo json_encode(["CODE" => 0]);
	} else if ($_POST["CODE"] == 1601) {
		$conn->setTable("drug_supplying_view");
		
		if ($_POST["SUBCODE"] == 1610) {
			
		} else if ($_POST["SUBCODE"] == 1620)
			$data = $conn->selectLikeFromTo(
				[
					"supplier_name_when_supplying" => $conn->mysqli->real_escape_string($_POST['supplier_name'])."%",
					"drug_name_when_supplying" 	=> $conn->mysqli->real_escape_string($_POST['drug_name'])."%"
				],
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST["SUBCODE"] == 1630) 
			$data = $conn->selectLike([
				"year" 						=> explode("-", $_POST['month'])[0],
				"month" 					=> explode("-", $_POST['month'])[1],
				"supplier_name_when_supplying" => $conn->mysqli->real_escape_string($_POST['supplier_name'])."%",
				"drug_name_when_supplying" 	=> $conn->mysqli->real_escape_string($_POST['drug_name'])."%"
			]);
		else if ($_POST["SUBCODE"] == 1640) 
			$data = $conn->selectLike([
				"supplier_name_when_supplying" => $conn->mysqli->real_escape_string($_POST['supplier_name'])."%",
				"drug_name_when_supplying" 	=> $conn->mysqli->real_escape_string($_POST['drug_name'])."%"
			]);
		

		if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
		else echo json_encode(["CODE" => 0]);
	} else if ($_POST["CODE"] == 1620) {
		$drug_supplying_id 	= $conn->mysqli->real_escape_string($_POST['drug_supplying_id']);
		$drug_id 			= $conn->mysqli->real_escape_string($_POST['drug_id']);
		$date 				= $conn->mysqli->real_escape_string($_POST['date']);
		$time 				= $conn->mysqli->real_escape_string($_POST['time']);
		$supply_previously 	= $conn->mysqli->real_escape_string($_POST['supply_previously']);
		$supply_afterward 	= $conn->mysqli->real_escape_string($_POST['supply_afterward']);

		$conn->setTable("drug_supplying_table");
		if ($conn->update(["supply" => $supply_afterward],["drug_supplying_id" => $drug_supplying_id])["CODE"] == 1) {
			
			$error = false;

			$stock_id = [];
			$backup_stock = [];

			$mutation_in_id = 0;
			$mutation_in = null;

			$conn->setTable("mutation_in_view");
			$result = $conn->select(["drug_id" => $drug_id,"date" => $date,"time" => $time]);
			if ($result["CODE"] == 1) {
				if (!empty($result["DATA"])) {
					$mutation_in_id = $result["DATA"][0]["mutation_in_id"];
					$mutation_in = $result["DATA"][0]["mutation_in"]; // mutation_in_now = supply_previously + another_supply + another_stock_when_adding
					$new_mutation_in = (int)$mutation_in + ((int)$supply_afterward - (int)$supply_previously);
					if ($new_mutation_in >= 0) {
						$conn->setTable("mutation_in_table");
						if (($conn->update(["mutation_in" => $new_mutation_in],["mutation_in_id" => $mutation_in_id])["CODE"] == 1)) {
							$conn->setTable("stock_table");
							$stock_date = date_create($date);
							$index = 0;
							do {
								$result = $conn->select(["drug_id" => $drug_id,"stock_date" => date_format($stock_date,"Y-m-d")]);
								$stock_date = date_add($stock_date, date_interval_create_from_date_string('1 day'));
								if ($result["CODE"] == 1) {
									if (!empty($result["DATA"])) {
										$stock_id[] = $result["DATA"][0]["stock_id"];
										$backup_stock[] = $result["DATA"][0]["stock"];
										$stock = $result["DATA"][0]["stock"]; // stock_now = stock_previously + another_supplying + another_stock_when_adding
										$new_stock = (int)$stock + ((int)$supply_afterward - (int)$supply_previously);
										if ($new_stock >= 0) {
											if (!($conn->update(["stock" => $new_stock],["stock_id" => $stock_id[$index]])["CODE"] == 1)) {
												$error = true;
												break;
											}
										} else {
											$error = true;
											break;
										}
									}
								} else {
									$error = true;
									break;
								}
								$index++;
							} while (!empty($result["DATA"]));
						} else $error = true;
					} else $error = true;
				} else $error = true;
			} else $error = true;


			if ($error) {
				$conn->setTable("drug_supplying_table");
				$conn->update(["supply" => $supply_previously],["drug_supplying_id" => $drug_supplying_id]);
				
				$conn->setTable("mutation_in_table");
				$conn->update(["mutation_in" => $mutation_in],["mutation_in_id" => $mutation_in_id]);

				$conn->setTable("stock_table");
				for ($i = 0; $i < count($stock_id); $i++) { 
					$conn->update(["stock" => $backup_stock[$i]],["stock_id" => $stock_id[$i]]);
				}

				echo json_encode(["CODE" => 0,"ERROR" => $conn->mysqli->error]);
			} else echo json_encode(["CODE" => 1]);
			
		} else echo json_encode(["CODE" => 0]);
	} else if ($_POST["CODE"] == 1630) {
		$drug_supplying_id 	= $conn->mysqli->real_escape_string($_POST['drug_supplying_id']);
		$drug_id 			= $conn->mysqli->real_escape_string($_POST['drug_id']);
		$date 				= $conn->mysqli->real_escape_string($_POST['date']);
		$time 				= $conn->mysqli->real_escape_string($_POST['time']);
		$supply_previously 	= $conn->mysqli->real_escape_string($_POST['supply_previously']);
		$supply_afterward 	= $conn->mysqli->real_escape_string($_POST['supply_afterward']);
			
		$error = false;

		$stock_id = [];
		$backup_stock = [];

		$conn->setTable("stock_table");
		$stock_date = date_create($date);
		$index = 0;
		do {
			$result = $conn->select(["drug_id" => $drug_id,"stock_date" => date_format($stock_date,"Y-m-d")]);
			$stock_date = date_add($stock_date, date_interval_create_from_date_string('1 day'));
			if ($result["CODE"] == 1) {
				if (!empty($result["DATA"])) {
					$stock_id[] = $result["DATA"][0]["stock_id"];
					$backup_stock[] = $result["DATA"][0]["stock"];
					$stock = $result["DATA"][0]["stock"]; // stock_now = stock_previously + another_supplying + another_stock_when_adding
					$new_stock = (int)$stock + ((int)$supply_afterward - (int)$supply_previously);
					if ($new_stock >= 0) {
						if (!($conn->update(["stock" => $new_stock],["stock_id" => $stock_id[$index]])["CODE"] == 1)) {
							$error = true;
							break;
						}
					} else {
						$error = true;
						break;
					}
				}
			} else {
				$error = true;
				break;
			}
			$index++;
		} while (!empty($result["DATA"]));


		if ($error) {
			$conn->setTable("stock_table");
			for ($i = 0; $i < count($stock_id); $i++) { 
				$conn->update(["stock" => $backup_stock[$i]],["stock_id" => $stock_id[$i]]);
			}

			echo json_encode(["CODE" => 0,"ERROR" => $conn->mysqli->error]);
		} else {
			$conn->setTable("mutation_in_view");
			$result = $conn->select(["drug_id" => $drug_id,"date" => $date,"time" => $time]);
			if ($result["CODE"] == 1) {
				if (!empty($result["DATA"])) {
					$mutation_in_id = $result["DATA"][0]["mutation_in_id"];
					$mutation_in = $result["DATA"][0]["mutation_in"]; // mutation_in_now = supply_previously + another_supply + another_stock_when_adding
					$new_mutation_in = (int)$mutation_in + ((int)$supply_afterward - (int)$supply_previously);
					if ($new_mutation_in >= 0) {
						$conn->setTable("mutation_in_table");
						if ($conn->delete(["mutation_in_id" => $mutation_in_id])["CODE"] == 1) {
							$conn->setTable("drug_supplying_table");
							if (!($conn->delete(["drug_supplying_id" => $drug_supplying_id])["CODE"] == 1)) {
								$conn->setTable("stock_table");
								for ($i = 0; $i < count($stock_id); $i++) { 
									$conn->update(["stock" => $backup_stock[$i]],["stock_id" => $stock_id[$i]]);
								}

								echo json_encode(["CODE" => 0,"ERROR" => $conn->mysqli->error]);
							}
						}
					}
				}
			}

			echo json_encode(["CODE" => 1]);
		}
	} else if ($_POST["CODE"] == 1700) {
		$conn->setTable("drug_updating_view");
		
		if ($_POST["SUBCODE"] == 1710) {
			
		} else if ($_POST["SUBCODE"] == 1720)
			$data = $conn->selectFromTo(
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST["SUBCODE"] == 1730) 
			$data = $conn->select([
				"year" 		=> explode("-", $_POST['month'])[0],
				"month" 	=> explode("-", $_POST['month'])[1]
			]);
		else if ($_POST["SUBCODE"] == 1740) 
			$data = $conn->select();
		

		if (isset($_POST["CODE"])) {
			if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST["CODE"] == 1701) {
		$conn->setTable("drug_updating_view");
		
		if ($_POST["SUBCODE"] == 1710) {
			
		} else if ($_POST["SUBCODE"] == 1720)
			$data = $conn->selectLikeFromTo(
				[
					"supplier_name_previously" => $conn->mysqli->real_escape_string($_POST['supplier_name'])."%",
					"drug_name_previously" 	=> $conn->mysqli->real_escape_string($_POST['drug_name'])."%"
				],
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST["SUBCODE"] == 1730) 
			$data = $conn->selectLike([
				"year" 						=> explode("-", $_POST['month'])[0],
				"month" 					=> explode("-", $_POST['month'])[1],
				"supplier_name_previously" => $conn->mysqli->real_escape_string($_POST['supplier_name'])."%",
				"drug_name_previously" 	=> $conn->mysqli->real_escape_string($_POST['drug_name'])."%"
			]);
		else if ($_POST["SUBCODE"] == 1740) 
			$data = $conn->selectLike([
				"supplier_name_previously" => $conn->mysqli->real_escape_string($_POST['supplier_name'])."%",
				"drug_name_previously" 	=> $conn->mysqli->real_escape_string($_POST['drug_name'])."%"
			]);
		

		if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
		else echo json_encode(["CODE" => 0]);
	} else if ($_POST["CODE"] == 1800) {
		$conn->setTable("drug_deleting_view");
		
		if ($_POST["SUBCODE"] == 1810) {
			
		} else if ($_POST["SUBCODE"] == 1820)
			$data = $conn->selectFromTo(
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST["SUBCODE"] == 1830) 
			$data = $conn->select([
				"year" 		=> explode("-", $_POST['month'])[0],
				"month" 	=> explode("-", $_POST['month'])[1]
			]);
		else if ($_POST["SUBCODE"] == 1840) 
			$data = $conn->select();
		

		if (isset($_POST["CODE"])) {
			if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
			else echo json_encode(["CODE" => 0]);
		}
	} else if ($_POST["CODE"] == 1801) {
		$conn->setTable("drug_deleting_view");
		
		if ($_POST["SUBCODE"] == 1810) {
			
		} else if ($_POST["SUBCODE"] == 1820)
			$data = $conn->selectLikeFromTo(
				[
					"supplier_name" => $conn->mysqli->real_escape_string($_POST['supplier_name'])."%",
					"drug_name" 	=> $conn->mysqli->real_escape_string($_POST['drug_name'])."%"
				],
				["date" => $_POST['start_date']],
				["date" => $_POST['end_date']]
			);
		else if ($_POST["SUBCODE"] == 1830) 
			$data = $conn->selectLike([
				"year" 						=> explode("-", $_POST['month'])[0],
				"month" 					=> explode("-", $_POST['month'])[1],
				"supplier_name" => $conn->mysqli->real_escape_string($_POST['supplier_name'])."%",
				"drug_name" 	=> $conn->mysqli->real_escape_string($_POST['drug_name'])."%"
			]);
		else if ($_POST["SUBCODE"] == 1840) 
			$data = $conn->selectLike([
				"supplier_name" => $conn->mysqli->real_escape_string($_POST['supplier_name'])."%",
				"drug_name" 	=> $conn->mysqli->real_escape_string($_POST['drug_name'])."%"
			]);
		

		if ($data["CODE"] == 1) echo json_encode(["CODE" => $data["CODE"], "DATA" => $data["DATA"]]);
		else echo json_encode(["CODE" => 0]);
	} else if ($_POST["CODE"] == 1860) {
		$error = false;
		$drug_deleting_id = $conn->mysqli->real_escape_string($_POST['drug_deleting_id']);
		$drug_id = $conn->mysqli->real_escape_string($_POST['drug_id']);
		$user_id = $conn->mysqli->real_escape_string($_POST['user_id']);
		$conn->setTable("drug_table");
		if ($conn->update(["available" => 1],["drug_id" => $drug_id])["CODE"] == 1) {

			$conn->setTable("drug_deleting_table");
			if (!($conn->delete(["drug_deleting_id" => $drug_deleting_id])["CODE"] == 1)) $error = true;

			if ($error) {
				$conn->setTable("drug_table");
				if ($conn->update(["available" => 0],["drug_id" => $drug_id])["CODE"] == 1)
					echo json_encode(["CODE" => 0]);
				else 
					echo json_encode(["CODE" => 999]);
			} else 
				echo json_encode(["CODE" => 1]);
		} else
			echo json_encode(["CODE" => 0]);
	}
} else { ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	<h1>API</h1>
</body>
</html>

<?php } ?>