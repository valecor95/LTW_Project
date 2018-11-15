/*********************************************************************************************/
/*                          FUNZIONI PER LA GESTIONE DEL LOGIN                               */
/*********************************************************************************************/

/** Esegue tutti i controlli prima di validare la LOGIN form. Viene eseguita al submit **/
function validaLoginForm(){
    if(document.login.remember.checked)
        window.alert("Hai scelto di ricordarti per i prossimi accessi");
    else
        window.alert("Hai scelto di non ricordarti per i prossimi accessi");
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
    if(controllaCAP() && controllaPass()){
        document.signup.reset();
        return true; 
    }
    else 
        return false 
}

/** Controlla che effettivamente il CAP sia un numero di 5 cifre quando l'utente 
cambia il valore del campo CAP (in onChange)**/
function controllaCAP() {
    if (document.signup.cap.value.length!=5) {
        alert("Il CAP deve contenere 5 cifre");
        return false;
    }
    var v=parseInt(document.signup.cap.value);
    if (isNaN(v)) {
        alert("Il CAP deve essere un numero");
        return false;
    }
    return true;
}

/** Controlla che i campi password e confirm password abbiano lo stesso valore quando 
l'utente cambia il valore all'interno del campo Confirm Password (in onChange) **/
function controllaPass() {
    if (document.signup.inputConfPassword.value != document.signup.inputPassword.value) {
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