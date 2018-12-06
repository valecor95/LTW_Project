/*********************************************************************************************/
/*                          FUNZIONI PER LA GESTIONE DEGLI AUDIO                             */
/*********************************************************************************************/

$(document).ready(function(){
    
    $.get("../objects/barra.html", (data) => {
        $("#barra").append(data);
    });
    
    $("#myModal").on("hide.bs.modal", () => {
        document.getElementById('myAudio').pause();
        listaAudio[currentAudio][1] = document.getElementById('myAudio').currentTime;
    });
    
    $('#button1').click(ResearchAudios);
    
    $('#search').keypress( (e) => {
        if (e.which == 13){
            ResearchAudios();
        };
        if (e.which == 0){
            RefreshSearch();
        };
   
    });

    var audio = document.getElementById('myAudio');
    audio.addEventListener("ended", function(){
        listaAudio[currentAudio][1] = 0;
        this.play();
    }, true);
});

var listaAudio = '';
var urlItunes = 'https://itunes.apple.com/search?term=';
var urlGroove = 'http://groovesharks.org/?s=';

/** Ricerca gli auduo secondo i parametri di ricerca inseriti nella barra **/
function ResearchAudios(){
    //Settaggio della richiesta
    $(".list-group").empty();
    listaAudio = new Array();
    let endpoint = urlItunes + $('#search').val();
	var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = GestisciItems;
    xhr.open('get', endpoint, true);
    xhr.send();
    
    // Gestione della risposta
	function GestisciItems(e){
		if (e.target.readyState == 4 && e.target.status == 200){
				var data = JSON.parse(e.target.responseText);
                console.log(data);
                for (var i=0; i<data.resultCount; i++){
                    if (data.results[i].wrapperType != "track")
                        continue;
                    $("<li class='list-group-item'><img src=" + data.results[i].artworkUrl100
                                + "> <a href='#' id=" + i + " onclick='return playAudio(this.id);'>"
                                + "<font color = 'black'>"
                                + data.results[i].artistName + " - " + data.results[i].trackCensoredName 
                                + "</font>" +"</a>").appendTo("#results");
                    listaAudio[i] = [data.results[i].previewUrl, 0];
                }
        }
        else{
            console.log(e.target.statusText);
        }
	};
};

var currentAudio = 0;

/** Fa partire il file audio sul modal creato da noi **/
function playAudio(pos){
    currentAudio = parseInt(pos);
    $('#myModal').modal("show");
    document.getElementById('myAudio').setAttribute('src', listaAudio[pos][0] + '#t=' + listaAudio[pos][1]);
    var volume = document.getElementById('myAudio').volume;
    document.getElementById('myAudio').volume = volume/2;
    document.getElementById('myAudio').play();
}

/** Azzera la ricerca pulendo la lista degli audio precedenti e la barra di ricerca **/
function RefreshSearch(){
    $(".list-group").empty();
    $('#search').val('');
}