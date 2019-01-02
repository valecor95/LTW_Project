# LTW_Project
Progetto per l'esame di Linguaggi e Tecnologie per il web.

## Istruzioni d'uso: 
1) Aprire Visual Studio Code e lanciare il server di php;
2) Aprire un browser; 
3) Inserire nel browser appena aperto "http://localhost:3000/MultimediaSite/index.html";
4) Fare il login;
5) Utilizzare tutte le funzionalità che trovate
(ATTENZIONE: per usare la funzionalità di download dei video e delle recensioni seguire le istruzioni qui sotto).

#### Istruzioni d'uso per provare il download dei video:
1) Aprire Visual Studio Code e lanciare il server di php;
2) Aprire un terminale e digitare 'google-chrome --user-data-dir="C:/Chrome dev session" --disable- web- security'(presuppone l'installazione di google chrome) per lanciare un'istanza di google chrome;
3) Inserire nel browser appena aperto "http://localhost:3000/MultimediaSite/index.html" o "http://localhost:3000/index.html";
4) Avviare il server tramite "node server.js" navigando nel terminale nella cartella ServYoutube.


#### Istruzioni d'uso per la pagina delle recensioni: 

1) È necessario avere installato postgresql e php;
2) Creare un database chiamato "multimediasite" su postgres e che abbia una tabella chiamata "recensioni" con i seguenti parametri: username varchar 255, voto integer, recensione varchar 255; 
3) Cambiare i parametri username e password nel codice delle pagine php all'interno della cartella "paginaRecensioni"; 
4) Se avete seguito le istruzioni adesso dovreste aver connesso il vostro database postgres alla pagina delle recensioni quindi potete iniziare ad usarla. 
