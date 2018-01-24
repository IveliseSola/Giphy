
$(document).ready(function(){

    var topics = ["dog","cat","rabbit","frog","chicken","bear","lyon"];
    var animal = $(this).attr("data-name");
    // var api = "https://api.giphy.com/v1/gifs/search";
    // var apiKey = "&api_key=BSKbY27I2DDqNG8En9sUBfFGTTKuCTzV";
    // var query = "&q=" + animal; 
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BSKbY27I2DDqNG8En9sUBfFGTTKuCTzV&q=" + animal + "&limit=10&offset=0&rating=G&lang=en";

    for (var i = 0; i < topics.length; i++){
        var button = $("<button>");
        button.attr("data-name",topics[i]);
        //console.log(topics[i]);
        button.addClass("animal-btn");
        button.text(topics[i]);
        $(".buttons-list").append(button);
    }

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response){

        $(".animal-btn").on("click",function(){
            console.log(response);
            for (var i = 0; i < 10; i++){
                var newImg = $("<img>");
                newImg.attr("src", response.data[i].images.fixed_height.url);
                $(".buttons-list").append(newImg);
                var rating = $("<p>");
                var p = response.data[0].rating;
                rating.text(p);
                $("buttons-list").append(rating);
            }
           
        })
    })

   
});