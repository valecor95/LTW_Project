<html>
<head>
    <title>MultimediaSite Recensioni</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="stylesheet" href="../js/bootstrap.min.ajax.js" />
    <link href="../css/bootstrap.min.css" rel="stylesheet"/>
    <link href="recensioni.css" rel="stylesheet"/>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <style type="text/css">
        #sfondo {position:fixed; top:0; left:0; width:100%; height:100%; z-index:-1;}
    </style>
    <script src="../js/bootstrap.bundle.min.js"></script>
    <script src="../js/bootstrap.min.jQuery.js"></script>
    <script src="recensioni.js"></script>
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
                <h3 class="font-weight-bold">Tutte le recensioni</h3>
                </font>
            </div>
        </div>
        <?php
            $dbconn = pg_connect("host=localhost port=5432 dbname=multimediasite user=postgres password=biar2018") or die('Could not connect: ' . pg_last_error());
            if(!(isset($_POST['showRec']))){
                header("Location: recensioni.html");
            }
            else{
                $query = 'SELECT * FROM recensioni';
                $result = pg_query($query) or die ('Query failed: '.pg_last_error());
                //Printing result
                echo "<table class='table table-striped' align='center'>\n";
                echo "\t\t<tr class='bg-info'><td align='center'><h5><span style='font-size: 1em;''><i class='fa fa-address-card'></i></span> User</h5></td>
                <td align='center'><h5><span style='font-size: 1em;''><i class='fa fa-star'></i></span> Voto</h5></td>
                <td align='center'><h5><span style='font-size: 1em;''><i class='fa fa-comment'></i></i></span> Recensione</h5></td></tr>";
                while($line = pg_fetch_array($result, null, PGSQL_ASSOC)){
                    echo "\t<tr>\n";
                    foreach($line as $col_value){
                        echo "\t\t<td><h6>$col_value</h6></td>";
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