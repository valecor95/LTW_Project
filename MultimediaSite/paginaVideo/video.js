
var APIkey = 'AIzaSyDGIo6ylsqkLqOt1skx2gjOeLI57DPaFz8';
var maxres = 8;
var arraybuts = '';//gestisco un array coppia (id, tempo del video) in questo modo tengo traccia di ogni riproduzione
                   //in modo che i video non ricominciano sempre da capo

$(document).ready(function(){
    
    $.get("../objects/barra.html", function(data) {
        $("#barra").append(data);
    });
    
    $("#myModal").on("hide.bs.modal", function () {    //salvo il tempo del player prima di stoppare il video e nascondere il modal
        arraybuts[videoID] = player.getCurrentTime();
        player.stopVideo();
    });
    
    $('#button1').click(ResearchItems);
    
    $('#search').keypress(function(e){
        if (e.which == 13){
            ResearchItems();
        };
        if (e.which == 0){
            RefreshSearch();
        };
   
    });
});

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
                    key: APIkey
                    }, { }),
                success: function(data){
                    $(".list-group").empty();
                    for(var i = 0; i < maxres; i++){
                        $("<li><img src=" + data.items[i].snippet.thumbnails.medium.url + "> " 
                                          + data.items[i].snippet.title + "" + "<input type='button' id=" 
                                          + data.items[i].id.videoId + " value='Play!' onclick='return PlayVideo(this.id);'>" 
                                          + "</li></br></br>").appendTo("#results");
                        arraybuts[data.items[i].id.videoId] = 0;
                    }
                },
                error: function(error){
                    console.log('errore: ', error);
                }
        });
};

var videoID = '';  

function PlayVideo(id){
    $('#myModal').modal("show");
    videoID = id;                           //attraverso l'array associativo arraybuts semplifico il codice
    player.loadVideoById({videoId: videoID,
        startSeconds: arraybuts[videoID],
        endSeconds: '',
        suggestedQuality: 'high'});
}

function RefreshSearch(){
    $(".list-group").empty();
    $('#search').val('');
}



