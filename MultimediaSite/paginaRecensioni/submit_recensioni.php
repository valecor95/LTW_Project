<html>
<head>
    <title>MultimediaSite Recensioni</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="stylesheet" href="../js/bootstrap.min.ajax.js" />
    <link href="../css/bootstrap.min.css" rel="stylesheet"/>
    <link href="recensioni.css" rel="stylesheet"/>
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
                </font>
            </div>
        </div>

        <?php
            $dbconn = pg_connect("host=localhost port=5432 dbname=multimediasite user=postgres password=postgres") or die('Could not connect: ' . pg_last_error());
            if(!(isset($_POST['subRecForm']))){
                header("Location: ../index.html");
            }
            else{
                $nome=$_POST['name'];
                $voto=$_POST['voto'];
                $details = $_POST['details'];
                $q1="insert into recensioni values ($1,$2,$3)";
                $data=pg_query_params($dbconn,$q1,array($nome,$voto,$details));
                if($data){
                    //header("Location: registrationCompleted.html");
                    echo "<h1> Grazie per averci invito una recensione <br/></h1>";
                    echo "<a href=../paginaHome/home.html> Premi qui
                    </a>
                    per ritornare alla Home Page";
                }
            }

        ?>
    </body>
</html>