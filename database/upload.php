<?php
    require_once 'database.php';
    if(isset($_POST['upload'])){
        $query = json_decode($_POST['upload']);
        $succes = [];
        for ($i = 0; $i < count($query); $i++){
            if($result = mysqli_real_query($conn, $query[$i])){
                $succes[] = $result;    
            }else{
                $succes[] = [mysqli_error($conn),$query[$i]];
            }
            
        }
        if(!in_array(false,$succes)){
            echo 1;
        }else{
            echo 0;
        }
    }
?>