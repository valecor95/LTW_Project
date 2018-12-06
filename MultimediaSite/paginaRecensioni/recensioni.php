<html>
    <head>
    <title>MultimediaSite Home</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1,"/>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css"/>
    <link href="../css/bootstrap.min.css" rel="stylesheet"/>
    <link href="recensioni.css" rel="stylesheet"/>
    <style type="text/css">
        #sfondo {position:fixed; top:0; left:0; width:100%; height:100%; z-index:-1;}
    </style>
    <script type="text/javascript" lang="javascript" src="../js/bootstrap.min.js"></script>
    <script src="../js/bootstrap.min.jQuery.js"></script>
    <script src="../js/bootstrap.bundle.min.js"></script>
    <script>
        // Carica la barra di navigazione
        $(document).ready(function(){
            $.get("../objects/barra.html", function(data) {
                $("#barra").append(data);
            });
        });
    </script>
    </head>
    <body>
        <!--Codice per lo SFONDO-->
        <div id="sfondoarco">
            <img src="../immagini/index.jpeg" id = "sfondo">
        </div>

        <!--NAVBAR-->
        <div id="barra"></div>

        <!--LOGO E TESTO DI BENVENUTO-->
        <div id="testo-header" name="Index" class="row" align="center">
            <div class="col-md-12">
                <img src="../immagini/mslogo.png" width="100" height="100">
                <font color="white" size="7">
                <h1 class="font-weight-bold">MultimediaSite</h1>
                </font>
            </div>
        </div>

        <!--FORM PER LE RECENSIONI-->
        <div id="recensioni" class="row" align="center">
            <div class="col-md-12">
                <form action="recensioni.php" method="GET" name="recForm">
                    <button name="showRec" class="btn btn-primary" type="submit">Show</button>
                </form>
            </div>
        </div>
        <?php
            $dbconn = pg_connect("host=localhost port=5432 dbname=multimediasite user=postgres password=postgres") or die('Could not connect: ' . pg_last_error());
            if(!(isset($_GET['showRec']))){
                header("Location: recensioni.html");
            }
            else{
                $query = 'SELECT * FROM recensioni';
                $result = pg_query($query) or die ('Query failed: '.pg_last_error());
                //Printing result
                echo "<table align='center'>\n";
                while($line = pg_fetch_array($result, null, PGSQL_ASSOC)){
                    echo "\t<tr>\n";
                    foreach($line as $col_value){
                        echo "\t\t<td><h1>$col_value</h1></td>";
                    }
                    echo"\t</tr>\n";
                }
                echo "</table>\n";
                pg_free_result($result);
                pg_close($dbconn);
            }
        ?>
    </body>
</html>