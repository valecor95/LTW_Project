$(document).ready(function(){
    $.get("../objects/barra.html", (data) => {
        $("#barra").append(data);
    });
    $("#s1").click(() => {
        for(i=1; i<=5; i++){
            if(i <= 1) document.getElementById('s'+i).style.color="#FFD700";
            else document.getElementById('s'+i).style.color="";
        }
        document.submitRecForm.voto.value = 1;
    });
    $("#s2").click(() => {
        for(i=1; i<=5; i++){
            if(i <= 2) document.getElementById('s'+i).style.color="#FFD700";
            else document.getElementById('s'+i).style.color="";
        }
        document.submitRecForm.voto.value = 2;
    });
    $("#s3").click(() => {
        for(i=1; i<=5; i++){
            if(i <= 3) document.getElementById('s'+i).style.color="#FFD700";
            else document.getElementById('s'+i).style.color="";
        }
        document.submitRecForm.voto.value = 3;
    });
    $("#s4").click(() => {
        for(i=1; i<=5; i++){
            if(i <= 4) document.getElementById('s'+i).style.color="#FFD700";
            else document.getElementById('s'+i).style.color="";
        }
        document.submitRecForm.voto.value = 4;
    });
    $("#s5").click(() => {
        for(i=1; i<=5; i++){
            if(i <= 5) document.getElementById('s'+i).style.color="#FFD700";
        }
        document.submitRecForm.voto.value = 5;
    });
});