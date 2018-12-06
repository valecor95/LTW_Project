<html>
    <head></head>
    <body>
        <?php
            $dbconn = pg_connect("host=localhost port=5432 dbname=postgres user=postgres password=postgres") or die('Could not connect: ' . pg_last_error());
            if(!(isset($_POST['showRec']))){
                header("Location: recensioni.html");
            }
            else{
                $query = 'SELECT * FROM recensioni';
                $result = pg_query($query) or die ('Query failed: '.pg_last_error());
                //Printing result
                echo "<table>";
                while($line = pg_fetch_array($result, null, PGSQL_ASSOC)){
                    echo "<tr>";
                    foreach($line as $col_value){
                        echo "<td>$col_value</td>";
                    }
                    echo"</tr>";
                }
                echo "</table>";
                pg_free_result($result);
                pg_close($dbconn);
            }
        ?>
    </body>
</html>