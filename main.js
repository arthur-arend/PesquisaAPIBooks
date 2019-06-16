$(document).ready(function() {
    $("#pesquisaLivro").click(function() {
        var bookName = $("#nomeLivro").val();
        if (bookName) {
            $("#init-msg").addClass("d-none");
            $("#resultadoLivros").empty();
            bookSearch(bookName);
        } else {
            $("#init-msg").removeClass("d-none");
            $("#resultadoLivros").empty();
        }
    });
    var favoritos = new Array();
    function bookSearch(bookName) {
        console.log("Pesquisando Livro: " + bookName)
        $.get('https://www.googleapis.com/books/v1/volumes?q=' + bookName, handleResponse);
    }
    $(mostraFavorito).click(function(){
        $("#resultadoLivros").empty();
        
        favoritos.forEach(element => {
            document.getElementById("resultadoLivros").innerHTML += "" + element.innerHTML
            $(".fav btn btn-success btn-lg mt-4").css("display", "none");
        });
    });

    function handleResponse(response) {
        if (response && response.items) {
            for (var i = 0; i < response.items.length; i++) {
                var item = response.items[i];
                // in production code, item.text should have the HTML entities escaped.
                document.getElementById("resultadoLivros").innerHTML += "" +
                    "<div class='col-sm-6 my-4 target'>" +
                    "<div class='card mb-3 h-100' style='max-width: 540px;'>" +
                    " <div class='row no-gutters'>" +
                    "<div class='col-md-4'>" +
                    "<img src='" + item.volumeInfo.imageLinks.smallThumbnail + "' class='card-img' alt='" + item.volumeInfo.title + "' Image>" +
                    "</div>" +
                    "<div class='col-md-8'>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" + item.volumeInfo.title + "</h5>" +
                    "<p class='card-text'>Autor: " + item.volumeInfo.authors.join() + "<br/>Publicado Por: " + item.volumeInfo.publisher + "<br/>Data de Publicação: " + item.volumeInfo.publishedDate + "</p>" +
                    "<button class=' fav btn btn-success btn-lg mt-4' href='" + item.volumeInfo.previewLink + "' >Favoritos</button>" +
                    "<a class='btn btn-success btn-lg mt-4' href='" + item.volumeInfo.previewLink + "' target='_blank'>Detalhes</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                
                    let fav = document.querySelectorAll('.fav');
                    let target = document.querySelectorAll('.target');
                
                    fav.forEach(function(el, i, arr){
                        fav[i].addEventListener('click', function(){
                            favoritos.push(target[i]);
                        })
                    });                                   
            }
        } else {
            console.log("Nenhum arquivo encontrado " + JSON.stringify(response));
            document.getElementById("resultadoLivros").innerHTML = "<h4>Nenhum Resultado!</h4>";
        }              
    }            
});