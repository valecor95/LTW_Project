var API_KEY = "AIzaSyDH_WfOaLLq0vE38h_WUVt5deu-R3IvENQ";

function tplawesome(e,t){
    res=e;
    for(var n=0;n<t.length;n++){
        res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){
            return t[n][r];
        })
    }
    return res;
}

$(function() {
    $("form").on("submit", function(e) {
        e.preventDefault();
        // Settaggio dei parametri della richiesta da fare a youtube
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 5,
            order: "viewCount",
            publishedAfter: "2000-01-01T00:00:00Z",
            videoType: "movie"
        }); 
        // Eseguo la richiesta 
        request.execute(function(response) {
              var results = response.result;
            $("#results").html("");
            $.each(results.items, function(index, item) {
                $.get("yt_item.html", function(data) {
                    $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                });
            });
            resetVideoHeight();
        });
    });
    
    //Chiamata alla funzione ausiliaria che rende la pagina responsive 
    $(window).on("resize", resetVideoHeight);
});

// Questa Funzione serve per i frame responsive
function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

// Questa funzione setta l'API di youtube secondo la nostra chiave API
function init() {
    gapi.client.setApiKey(API_KEY);
    gapi.client.load("youtube", "v3", function() {});
}