<?php require_once 'Database.php';
function RupiahToInteger($param){
    $price = explode(".", $param);
    $price = implode("", $price);
    return $price;
}


function Export_Database($host,$user,$pass,$name,  $tables=false, $backup_name=false ){
    $mysqli = new mysqli($host,$user,$pass,$name); 
    $mysqli->select_db($name); 
    $mysqli->query("SET NAMES 'utf8'");
    $updateOnline = [];
    $buffer = "";



    // x for update online database
    // content for backup


    $queryTables    = $mysqli->query('SHOW TABLES'); 
    while($row = $queryTables->fetch_row()) 
    { 
        $target_tables[] = $row[0]; 
    }   
    if($tables !== false) 
    { 
        $target_tables = array_intersect( $target_tables, $tables); 
    }
    foreach($target_tables as $table)
    {
        $result         =   $mysqli->query('SELECT * FROM '.$table);  
        $fields_amount  =   $result->field_count;  
        $rows_num=$mysqli->affected_rows;     
        $res            =   $mysqli->query('SHOW CREATE TABLE '.$table); 
        $TableMLine     =   $res->fetch_row();
        $content        = (!isset($content) ?  '' : $content) . "\n\n"."DROP TABLE IF EXISTS `".$TableMLine[0]."`;".$TableMLine[1].";\n\n";
        $updateOnline[] = "DROP TABLE IF EXISTS `".$TableMLine[0]."`";
        $updateOnline[] = $TableMLine[1];
        for ($i = 0, $st_counter = 0; $i < $fields_amount;   $i++, $st_counter=0) 
        {
            while($row = $result->fetch_row())  
            { //when started (and every after 100 command cycle):
                if ($st_counter%100 == 0 || $st_counter == 0 )  
                {
                        $content .= "\nINSERT INTO ".$table." VALUES";
                        $buffer = "INSERT INTO ".$table." VALUES";

                }
                $content .= "\n(";
                $buffer .= "(";
                for($j=0; $j<$fields_amount; $j++)  
                { 
                    $row[$j] = str_replace("\n","\\n", addslashes($row[$j]) ); 
                    if (isset($row[$j]))
                    {
                        $content .= '\''.$row[$j].'\'' ;
                        if($row[$j] == ''){
                            $buffer .= '\'0\'';
                        }else{
                            $buffer .= '\''.$row[$j].'\'';
                        }
                        
                    }
                    else 
                    {   
                        $content .= '\'';
                        $buffer .= '\'';
                    }     
                    if ($j<($fields_amount-1))
                    {
                            $content.= ',';
                            $buffer .= ',';
                    }      
                }
                $content .=")";
                $buffer .= ")";
                //every after 100 command cycle [or at last line] ....p.s. but should be inserted 1 cycle eariler
                if ( (($st_counter+1)%100==0 && $st_counter!=0) || $st_counter+1==$rows_num) 
                {   
                    $content .= ";";
                    $buffer .= ";";
                } 
                else 
                {
                    $content .= ",";
                    $buffer .= ",";
                } 
                $st_counter=$st_counter+1;
            }
        } $content .="\n\n\n";
        $updateOnline[] = $buffer;
    }
    $backup_name = $backup_name ? $backup_name : $name."___(".date('H-i-s')."_".date('d-m-Y').").sql";
    $file = "..\\upload_database\\".$backup_name;
    file_put_contents($file, $content);
    return $updateOnline;
}

function UpdateStockAndMutationPerDate(){
    $conn = new Database();

    $conn->setTable("update_data_table");
    $date = $conn->select(["update_data_date" => date("Y-m-d")]);
    if ($date["CODE"] == 1) {
        if (empty($date["DATA"])) {
            $last_data_date = $conn->select();
            if ($last_data_date["CODE"] == 1) {
                if (!empty($last_data_date["DATA"])) {
                    $last_data_date = end($last_data_date["DATA"])['update_data_date'];

                    $date = date_create($last_data_date);
                    do {
                        $date = date_add($date, date_interval_create_from_date_string('1 day'));
                        $conn->insert(["update_data_date" => date_format($date,"Y-m-d")]);
                    } while(date_format($date,"Y-m-d") != date("Y-m-d"));

                    $conn->setTable("stock_table");
                    $date = date_create($last_data_date);
                    $data = $conn->select(["stock_date" => $last_data_date]);
                    do {
                        $date = date_add($date, date_interval_create_from_date_string('1 day'));
                        for ($i=0; $i < count($data["DATA"]); $i++) { 
                            unset($data["DATA"][$i]["stock_id"]);
                            $data["DATA"][$i]["stock_date"] = date_format($date,"Y-m-d");
                            $conn->insert($data["DATA"][$i]);
                        }
                    } while(date_format($date,"Y-m-d") != date("Y-m-d"));

                    $conn->setTable("mutation_table");
                    $date = date_create($last_data_date);
                    $data = $conn->select(["mutation_date" => $last_data_date]);
                    do {
                        $date = date_add($date, date_interval_create_from_date_string('1 day'));
                        for ($i=0; $i < count($data["DATA"]); $i++) { 
                            unset($data["DATA"][$i]["mutation_id"]);
                            $data["DATA"][$i]["mutation_date"] = date_format($date,"Y-m-d");
                            $conn->insert($data["DATA"][$i]);
                        }
                    } while(date_format($date,"Y-m-d") != date("Y-m-d"));
                }
            }
        } else {
            
        }
    }
}