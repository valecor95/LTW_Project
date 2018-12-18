/*********************************************************************************************/
/*                      FUNZIONI PER LA GESTIONE DELLE RECENSIONI                            */
/*********************************************************************************************/


$(document).ready(function(){
    $.get("../objects/barra.html", (data) => {
        $("#barra").append(data);
    });

    //Animazione delle stelle
    $("#s1").click(() => {
        for(i=1; i<=5; i++){
            if(i <= 1) document.getElementById('s'+i).style.color="#FFD700";
            else document.getElementById('s'+i).style.color="";
        }
        document.submitRecForm.voto.value = 1;
    });
    $("#s2").click(() => {
        for(i=1; i<=5; i++){
            if(i <= 2) document.getElementById('s'+i).style.color="#FFD700";
            else document.getElementById('s'+i).style.color="";
        }
        document.submitRecForm.voto.value = 2;
    });
    $("#s3").click(() => {
        for(i=1; i<=5; i++){
            if(i <= 3) document.getElementById('s'+i).style.color="#FFD700";
            else document.getElementById('s'+i).style.color="";
        }
        document.submitRecForm.voto.value = 3;
    });
    $("#s4").click(() => {
        for(i=1; i<=5; i++){
            if(i <= 4) document.getElementById('s'+i).style.color="#FFD700";
            else document.getElementById('s'+i).style.color="";
        }
        document.submitRecForm.voto.value = 4;
    });
    $("#s5").click(() => {
        for(i=1; i<=5; i++){
            if(i <= 5) document.getElementById('s'+i).style.color="#FFD700";
        }
        document.submitRecForm.voto.value = 5;
    });
});


/** Controlla che l'utente sia effettivamente registrato **/
function checkUsername(){
    var u = JSON.parse(localStorage.utenti);
    var l = u.length;
    var user = document.submitRecForm.name.value;
    for (i=0;i<l;i++){
        if(u[i].nickname == user && u[i].nickname == localStorage.utentecorrente) {
            return true;
        }
    }
    alert("Username non corrispondente all'utente corrente");
    return false;
}

/** Controlla se l'utente ha già votato**/
function checkRecensione(){
    var u = JSON.parse(localStorage.utenti);
    var l = u.length;
    var user = document.submitRecForm.name.value;
    for (i=0;i<l;i++){
        if((u[i].nickname == user && u[i].recensioni == 0)) {
            return true;
        }
    }
    alert("Hai già votato, grazie!");
    return false;
}

/** Esegue tutti i controlli e se sono tutti superati allora setta a 1 la var recensione dell'utente **/
function checkRecForm(){
    var u = JSON.parse(localStorage.utenti);
    var l = u.length;
    var user = document.submitRecForm.name.value;
    if(checkUsername() && checkRecensione()){
        for (i=0;i<l;i++){
            if(u[i].nickname == user) {
                var s= { nickname: u[i].nickname,
                        email: u[i].email,
                        password: u[i].password,
                        recensioni: 1 };

                u[i]=s;
                localStorage.utenti=JSON.stringify(u);
                return true; 
            }
        }
    }
    return false;
}