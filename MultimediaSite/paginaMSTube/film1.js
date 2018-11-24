
var APIkey = 'AIzaSyDGIo6ylsqkLqOt1skx2gjOeLI57DPaFz8';   //cambia con la tua api
var maxres = 8;

$(document).ready(function(){
    $.get("../objects/barra.html", function(data) {
        $("#barra").append(data);
    });
    $('#button1').click(function(){
        currentId = '';
        currentTime = 0;
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
                            console.log(data.items[i].snippet.thumbnails);
                            $("<li><img src=" + data.items[i].snippet.thumbnails.medium.url + "> " 
                                              + data.items[i].snippet.title + "" + "<input type='button' id=" 
                                              + data.items[i].id.videoId + " value='Play!' onclick='return PlayVideo(this.id);'>" 
                                              + "</li></br></br>").appendTo("#results");
                        }
                    },
                    error: function(error){
                        console.log('errore: ', error);
                    }
            });
    }); 
});

var currentId = '';
var currentTime = 0;
        
function PlayVideo(id){
    
    $('#myModal').modal("show");
    //$('#player').css('display','block');  non serve più perche lo abbiamo inserito nel modal

    var videoID=id;
    if (currentId != id){
        currentId = id;
        player.loadVideoById({videoId: videoID,
        startSeconds: 0,
        endSeconds: '',
        suggestedQuality: 'high'});
    }
    else{
        player.loadVideoById({videoId: videoID,
        startSeconds: currentTime,
        endSeconds: '',
        suggestedQuality: 'high'});
    }

    $("#myModal").on("hide.bs.modal", function () {
        currentTime = player.getCurrentTime();
        player.stopVideo();
    });
}

function RefreshSearch(){
    $(".list-group").empty();
}



