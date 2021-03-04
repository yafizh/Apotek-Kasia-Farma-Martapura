<?php require_once 'config.php';
	
class Database{
    public $mysqli;
    private $table;
    private $query;

    function __construct(){
        $this->mysqli = new mysqli(HOST,USER,PASSWORD,DATABASE);
        // Check connection
        if ($this->mysqli -> connect_errno) {
          echo "Failed to connect to MySQL: " . $this->mysqli -> connect_error;
          exit();
        }
    }

    public function setTable($table){
        $this->table = $table;
    }

    function insert($data){
        global $query;
        
        $len = count($data);
        $query = "INSERT INTO ".$this->table." ";
        
        if ($len == 1) $query .= "(".array_keys($data)[0].")";
        else{
            for ($i = 0; $i < $len; $i++) {
                if ($i==0) $query .= "(".array_keys($data)[$i].",";
                else if($i == $len-1) $query .= array_keys($data)[$i].")";
                else $query .= array_keys($data)[$i].",";
            }
        }
        
        $query .= " VALUES ";
        
        if ($len == 1) 
            $query .= "('".$data[array_keys($data)[0]]."')";
        else{
            for ($i = 0; $i < $len; $i++) {
                if ($i==0) $query .= "('".$data[array_keys($data)[$i]]."',";
                else if($i == $len-1) $query .= "'".$data[array_keys($data)[$i]]."')";
                else $query .= "'".$data[array_keys($data)[$i]]."',";
            }    
        }
        // echo '<script>console.log("'.$query.'")</script>';
        if ($this->mysqli->real_query($query)) 
            return ["CODE" => 1, "INSERT_ID" => $this->mysqli->insert_id];
        else
            return ["CODE" => 0, "ERROR" => $this->mysqli->error];
    }

    public function select($where = []){
        global $query;
        $len = count($where);
        $query = "SELECT * FROM ".$this->table;
        if ($len > 0) {
            $query .= " WHERE ";
            for ($i = 0; $i < $len; $i++) { 
                if($i == $len-1) $query .= array_keys($where)[$i]." = '".$where[array_keys($where)[$i]]."'";
                else $query .= array_keys($where)[$i]." = '".$where[array_keys($where)[$i]]."' AND ";
            }
        }
        if ($result = $this->mysqli->query($query)) 
            return ["CODE" => 1, "DATA" => $result->fetch_all(MYSQLI_ASSOC)];
        else
            return ["CODE" => 0];
    }

    public function selectOr($where = []){
        global $query;
        $len = count($where);
        $query = "SELECT * FROM ".$this->table;
        if ($len > 0) {
            $query .= " WHERE ";
            for ($i = 0; $i < $len; $i++) { 
                if($i == $len-1) $query .= array_keys($where)[$i]." = '".$where[array_keys($where)[$i]]."'";
                else $query .= array_keys($where)[$i]." = '".$where[array_keys($where)[$i]]."' OR ";
            }
        }
        if ($result = $this->mysqli->query($query)) 
            return ["CODE" => 1, "DATA" => $result->fetch_all(MYSQLI_ASSOC)];
        else
            return ["CODE" => 0];
    }

    public function selectFromTo($from = [],$to = []){
        global $query;
        $query = "SELECT * FROM ".$this->table." WHERE ";
        $query .= array_keys($from)[0]." >= '".$from[array_keys($from)[0]]."'";
        $query .= " AND ";
        $query .= array_keys($to)[count($to)-1]." <= '".$to[array_keys($to)[count($to)-1]]."'";
        if ($result = $this->mysqli->query($query)) 
            return ["CODE" => 1, "DATA" => $result->fetch_all(MYSQLI_ASSOC)];
        else
            return ["CODE" => 0];
    }

    public function selectLike($where){
        global $query;
        $len = count($where);
        $query = "SELECT * FROM ".$this->table." WHERE ";
        for ($i = 0; $i < $len; $i++) { 
            if($i == $len-1) $query .= array_keys($where)[$i]." LIKE '".$where[array_keys($where)[$i]]."'";
            else $query .= array_keys($where)[$i]." LIKE '".$where[array_keys($where)[$i]]."' AND ";
        }
        if ($result = $this->mysqli->query($query)) 
            return ["CODE" => 1, "DATA" => $result->fetch_all(MYSQLI_ASSOC)];
        else
            return ["CODE" => 0];
    }

    public function selectLikeFromTo($where,$from = [],$to = []){
        global $query;
        $len = count($where);
        $query = "SELECT * FROM ".$this->table." WHERE (";
        for ($i = 0; $i < $len; $i++) { 
            if($i == $len-1) $query .= array_keys($where)[$i]." LIKE '".$where[array_keys($where)[$i]]."')";
            else $query .= array_keys($where)[$i]." LIKE '".$where[array_keys($where)[$i]]."' AND ";
        }
        $query .= " AND ";
        $query .= "(".array_keys($from)[0]." >= '".$from[array_keys($from)[0]]."'";
        $query .= " AND ";
        $query .= array_keys($to)[0]." <= '".$to[array_keys($to)[0]]."')";
        
        if ($result = $this->mysqli->query($query)) 
            return ["CODE" => 1, "DATA" => $result->fetch_all(MYSQLI_ASSOC)];
        else
            return ["CODE" => 0];
    }

    public function selectLikeOr($where){
        global $query;
        $len = count($where);
        $query = "SELECT * FROM ".$this->table." WHERE ";
        for ($i = 0; $i < $len; $i++) { 
            if($i == $len-1) $query .= array_keys($where)[$i]." LIKE '".$where[array_keys($where)[$i]]."'";
            else $query .= array_keys($where)[$i]." LIKE '".$where[array_keys($where)[$i]]."' OR ";
        }
        if ($result = $this->mysqli->query($query)) 
            return ["CODE" => 1, "DATA" => $result->fetch_all(MYSQLI_ASSOC)];
        else
            return ["CODE" => 0];
    }

    public function selectLikeGroupBy($where,string $group){
        global $query;
        $len = count($where);
        $query = "SELECT * FROM ".$this->table." WHERE ";
        for ($i = 0; $i < $len; $i++) { 
            if($i == $len-1) $query .= array_keys($where)[$i]." LIKE '".$where[array_keys($where)[$i]]."'";
            else $query .= array_keys($where)[$i]." LIKE '".$where[array_keys($where)[$i]]."' AND ";
        }
        $query .= " GROUP BY " . $group;
        if ($result = $this->mysqli->query($query)) 
            return ["CODE" => 1, "DATA" => $result->fetch_all(MYSQLI_ASSOC)];
        else
            return ["CODE" => 0];
    }

    public function update($data, $where){
        global $query;
        
        $len = count($data);
        $query = "UPDATE ".$this->table." SET ";
        
        if ($len == 1) $query .= array_keys($data)[0]." = '".$data[array_keys($data)[0]]."'";
        else{
            for ($i = 0; $i < $len; $i++) {
                if ($i==0) $query .= array_keys($data)[$i]." = '".$data[array_keys($data)[$i]]."',";
                else if($i == $len-1) $query .= array_keys($data)[$i]." = '".$data[array_keys($data)[$i]]."'";
                else $query .= array_keys($data)[$i]." = '".$data[array_keys($data)[$i]]."',";
            }
        }

        $query .= " WHERE ";

        $len = count($where);
        for ($i = 0; $i < $len; $i++) { 
            if($i == $len-1) $query .= array_keys($where)[$i]." = '".$where[array_keys($where)[$i]]."'";
            else $query .= array_keys($where)[$i]." = '".$where[array_keys($where)[$i]]."' AND ";
        }
        // echo '<script>console.log("'.$query.'")</script>';
        if ($this->mysqli->real_query($query)) 
            return ["CODE" => 1];
        else
            return ["CODE" => 0];
    }

    public function delete($where = []){
        global $query;
        $len = count($where);
        $query = "DELETE FROM ".$this->table;
        if ($len > 0) {
            $query .= " WHERE ";
            for ($i = 0; $i < $len; $i++) { 
                if($i == $len-1) $query .= array_keys($where)[$i]." = '".$where[array_keys($where)[$i]]."'";
                else $query .= array_keys($where)[$i]." = '".$where[array_keys($where)[$i]]."' AND ";
            }
        }
        if ($result = $this->mysqli->real_query($query)) {
            return ["CODE" => 1];
        }else
            return ["CODE" => 0];
    }

    // Export_Database(HOST,USER,PASSWORD,DATABASE, $tables=false, $backup_name=false );
}