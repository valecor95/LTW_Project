/*********************************************************************************************/
/*                          FUNZIONI PER LA GESTIONE DEL LOGIN                               */
/*********************************************************************************************/

/** Funzione che gestisce lo storage degli utenti che effettuano il login. 
 *  1) Prende i dati dall'input
 *  2) Controlla che siano presenti nel localStorage
 *  3) Inserisce l'utente loggato nel sessionStorage **/
function signin(){
    var u = JSON.parse(localStorage.utenti);
    var l = u.length;
    var email = document.getElementById("login").inputEmail.value;
    var password = document.getElementById("login").inputPassword.value;
    for (i=0;i<l;i++){
        if((u[i].email == email) && (u[i].password == password)) {
            localStorage.utentecorrente = u[i].nickname;
            sessionStorage.setItem("email",u[i].email);
            return true;
        }
    }
    alert("Utente non registrato");
    return false;
}

/** Fa apparire dinamicamente la form di sign-up e scomparire quella di sign-in **/
function turnvisible(){
    var signUp_form=document.getElementById("registrazione");
    var signIn_form=document.getElementById("accesso");
    signIn_form.style.display="none";
    signUp_form.style.display="block";
}


/*********************************************************************************************/
/*                          FUNZIONI PER LA GESTIONE DEL SIGN UP                             */
/*********************************************************************************************/

/** Esegue tutti i controlli prima di validare la SIGN-UP form. Viene eseguita al submit **/
function validaSignUpForm(){
    if(controllaCAP() && controllaPass()) return true; 
    else return false; 
}

/** Controlla che effettivamente il CAP sia un numero di 5 cifre quando l'utente 
cambia il valore del campo CAP (in onChange)**/
function controllaCAP() {
    if (document.formsignup.cap.value.length!=5) {
        alert("Il CAP deve contenere 5 cifre");
        return false;
    }
    var v=parseInt(document.formsignup.cap.value);
    if (isNaN(v)) {
        alert("Il CAP deve essere un numero");
        return false;
    }
    return true;
}

/** Controlla che i campi password e confirm password abbiano lo stesso valore quando 
l'utente cambia il valore all'interno del campo Confirm Password (in onChange) **/
function controllaPass() {
    if (document.formsignup.inputConfPassword.value != document.formsignup.inputPassword.value) {
        alert("Password non corrispondenti");
        return false;
    }
    return true;
}

/** Fa riapparire dinamicamente la forma di sign-in e scomparire quella di sign-up **/
function turninvisible(){
    var signUp_form=document.getElementById("registrazione");
    var signIn_form=document.getElementById("accesso");
    signIn_form.style.display="block";
    signUp_form.style.display="none";
}

/** Funzione che gestisce lo storage degli utenti che si registrano. 
 *  1) Controlla che l'username inserito non sia già presente 
 *  2) Crea un nuovo oggetto JSON con i dati ricevuti dall'input
 *  3) Inserisce l'oggetto appena creto nel localStorage e nel sessionStorage **/
function signup(){
    if(validaSignUpForm()){
        var u = JSON.parse(localStorage.utenti);
        var l=u.length;
        for (i=0;i<l;i++){
            if(u[i].nickname == document.getElementById("signup").inputNickname.value){
                alert("Username già inserito");
                return false;
            }
        }

        var s= { nickname:document.getElementById("signup").inputNickname.value,
                 email:document.getElementById("signup").inputEmail.value,
                 password:document.getElementById("signup").inputPassword.value,
                 recensioni: 0
        };

        u[l]=s;
        localStorage.utenti=JSON.stringify(u);
        localStorage.utentecorrente = document.getElementById("signup").inputNickname.value;
        sessionStorage.setItem("email",s["email"]);
        return true;
    }
    else{ 
        alert('Ricompila form');
        return false;
    }
}

/** Inizializza il localStorage e il sessionStorage se non sono già stati creati**/
function inizializzaStorageUtenti(){
    if (typeof(localStorage.utenti) == "undefined") {
        localStorage.utenti="[]";
    }
    if (typeof(sessionStorage) == "undefined") {
        sessionStorage="[]";
    }
    if (typeof(localStorage.utentecorrente) == "undefined"){
        localStorage.utentecorrente = '';
    }
}