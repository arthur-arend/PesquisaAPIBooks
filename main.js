var favorites = new Array();
var pagination = 0;
var bookName;
var pagcontrol = 4;

$(document).ready(function() {
    $("#book-srch").click(function() {
        var bookName = $("#book-name").val();
        if (bookName) {
            pagination = 0;
            $("#init-msg").addClass("d-none");
            $("#book-results").empty();
            bookSearch(bookName);
        } else {
            $("#init-msg").removeClass("d-none");
            $("#book-results").empty();
        }
    });
    
    function bookSearch(bookName) {
        console.log("Pesquisando Livro: " + bookName)
        $.get('https://www.googleapis.com/books/v1/volumes?q='+bookName + "&startIndex=" + pagination +"&maxResults=4", handleResponse);
    }
    //Código de Favoritos
    $("#show-fav").click(function(){
        $("#book-results").empty();
        
        favorites.forEach(element => {
            document.getElementById("book-results").innerHTML += "" + element.innerHTML
        });
    });
    //Código de Paginação
    $("#next").click(function() {
        pagination = pagination + pagcontrol;
        $("#book-results").empty();
        bookName = $("#book-name").val();
        bookSearch(bookName);
      });
      $("#previous").click(function() {
          if(pagination > 0){
            pagination = pagination - pagcontrol;
            $("#book-results").empty();
            bookName = $("#book-name").val();
            bookSearch(bookName);
          }    
      });
    //Código de 
    function handleResponse(response) {
        if (response && response.items) {
            for (var i = 0; i < response.items.length; i++) {
                var item = response.items[i];
                document.getElementById("book-results").innerHTML += "" +
                    "<div class='col-sm-6 my-4 target'>" +
                    "<div class='card mb-3 h-100' style='max-width: 540px;'>" +
                    " <div class='row no-gutters'>" +
                    "<div class='col-md-4'>" +
                    "<img src='" + item.volumeInfo.imageLinks.smallThumbnail + "' class='card-img' alt='" + item.volumeInfo.title + "' Image>" +
                    "</div>" +
                    "<div class='col-md-8'>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" + item.volumeInfo.title + "</h5>" +
                    "<p class='card-text'>Autor: " + item.volumeInfo.authors +"</p>" +
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
                            favorites.push(target[i]);
                        })
                    });                                   
            }
        } else {
            console.log("Nenhum arquivo encontrado " + JSON.stringify(response));
            document.getElementById("book-results").innerHTML = "<h4>Nenhum Resultado!</h4>";
        }              
    }            
});