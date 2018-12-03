var APIkey = 'AIzaSyDGIo6ylsqkLqOt1skx2gjOeLI57DPaFz8';

$(document).ready(function(){
    
    $.get("../objects/barra.html", (data) => {
        $("#barra").append(data);
    });
    
    $("#myModal").on("hide.bs.modal", () => {
        
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
});

function ResearchAudios(){
    
    let endpoint = 'https://itunes.apple.com/search?term=' + $('#search').val();
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = GestisciItems;
	xhr.open('get', endpoint, true);
	xhr.send();
		
	function GestisciItems(e){
		if (e.target.readyState == 4 && e.target.status == 200){
				var data = JSON.parse(e.target.responseText);
                console.log(data);
                for (var i=0; i<data.resultCount; i++){
                    $("<li class='list-group-item'><img src=" + data.results[i].artworkUrl100
                                + "> <a href='#' id='' onclick=''>"
                                + "<font color = 'black'>"
                                + data.results[i].artistName + "</font>" +"</a>").appendTo("#results");
                }
        }
        else{
            console.log(e.target.statusText)
        }
	};
};

  
function RefreshSearch(){
    $(".list-group").empty();
    $('#search').val('');
}



