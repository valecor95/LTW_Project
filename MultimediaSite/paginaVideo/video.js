/*********************************************************************************************/
/*                          FUNZIONI PER LA GESTIONE DEI VIDEO                               */
/*********************************************************************************************/

var APIkey = 'AIzaSyDGIo6ylsqkLqOt1skx2gjOeLI57DPaFz8';
var maxres = 8;

var arraybuts = '';//gestisco un array coppia (id, tempo del video) in questo modo tengo traccia di ogni riproduzione
                   //in modo che i video non ricominciano sempre da capo

$(document).ready(function(){

    $.get("../objects/barra.html", (data) => {
        $("#barra").append(data);
    });
    
    $("#myModal").on("hide.bs.modal", () => {    //salvo il tempo del player prima di stoppare il video e nascondere il modal
        arraybuts[videoID] = player.getCurrentTime();
        player.stopVideo();
    });
    
    $('#button1').click(ResearchItems);

    $('#search').keypress( (e) => {
        if (e.which == 13){
            ResearchItems();
        };
        if (e.which == 0){
            RefreshSearch();
        };
   
    });
});

/** Ricerca i video cercati sfruttando le api di youtube e mette i risultati in una lista **/
function ResearchItems(){
    arraybuts = new Array();
    jQuery.ajax({
                type: 'GET',
                url: "https://www.googleapis.com/youtube/v3/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1",
                dataType: 'jsonp',
                data: jQuery.extend({
                    q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"), 
                    maxResults: maxres, 
                    part: 'snippet', 
                    key: APIkey,
                    type: "video"
                    }, { }),
                success: function(data){
                    $(".list-group").empty();
                    console.log(data);
                    if(data.items.length == 0){
                        $("<li class='list-group-item'><font color = 'black'>NOT FOUND, TRY SOMETHING ELSE</font>").appendTo("#results");
                        return;
                    }
                    for(var i = 0; i < maxres; i++){
                        $("<li class='list-group-item'><img src=" + data.items[i].snippet.thumbnails.medium.url 
                                        + "> <a href='#' id=" + data.items[i].id.videoId +" onclick='return PlayVideo(this.id);'>"
                                        + "<font color = 'black'>"
                                        + data.items[i].snippet.title + "</font>" +"</a>").appendTo("#results");
                        arraybuts[data.items[i].id.videoId] = 0;
                    }
                },
                error: function(error){
                    console.log('errore: ', error);
                }
        });
};

var videoID = '';  

/** Fa partire la riproduzione del video sul modal **/
function PlayVideo(id){
    $('#myModal').modal("show");
    videoID = id;                           //attraverso l'array associativo arraybuts semplifico il codice
    player.loadVideoById({videoId: videoID,
        startSeconds: arraybuts[videoID],
        endSeconds: '',
        suggestedQuality: 'high'});
}

/** Resetta la ricerca dei video **/
function RefreshSearch(){
    $(".list-group").empty();
    $('#search').val('');
}

var _OBJECT_URL;

function DownloadVideo(){
    window.alert("Attendere...");
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            console.log(JSON.stringify(this.response));
            window.alert("la risorsa è arrivata, attendere l' apertura del link");
            var blob = new Blob([this.response], {type: 'video/mp4'});
            let a = document.createElement("a");
            a.style = "display: none";
            document.body.appendChild(a);
            //Create a DOMString representing the blob and point the link element towards it
            let url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = videoID;
            //programatically click the link to trigger the download
            a.click();
            //release the reference to the file by revoking the Object URL
            window.URL.revokeObjectURL(url);
        }
    } 

    xhr.responseType = 'blob';
    xhr.open('post', 'http://127.0.0.1:1337/youtube', true);
    xhr.send('http://www.youtube.com/watch?v=' + videoID);
}
