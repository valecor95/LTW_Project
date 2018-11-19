
var APIkey = 'AIzaSyDGIo6ylsqkLqOt1skx2gjOeLI57DPaFz8';   //cambia con la tua api
var maxres = 15;
var videos = null;

$(document).ready(function(){
    $('#button1').click(function(){
        jQuery.ajax({
                    type: 'GET',
                    url: "https://www.googleapis.com/youtube/v3/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1",
                    dataType: 'jsonp',
                    data: jQuery.extend({q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"), maxResults: maxres, part: 'snippet', key: APIkey}, { }),
                    success: function(data){
                        $(".list-group").empty();
                        for(var i = 0; i < maxres; i++){
                            $("<li>" + data.items[i].snippet.title + "" + "<input type='button' id=" + data.items[i].id.videoId + " value='Guarda!' onclick='return PlayVideo(this.id);'>"  + "</li>").appendTo("#results");
                        }
                    },
                    error: function(error){
                        console.log('errore: ', error);
                    }
            });
    }); 
});
        
function PlayVideo(id){
    $('#player').css('display','block');
    var videoID=id;
    player.loadVideoById({videoId: videoID,
            startSeconds:0,
            endSeconds: '',
            suggestedQuality: 'small'});
}

function RefreshSearch(){
    $(".list-group").empty();
}

