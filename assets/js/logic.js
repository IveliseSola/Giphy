
$(document).ready(function () {

    var topics = ["Rick and Morty", "F is for Family", "Bob's Burger", "Family Guy", "SpongeBob"];

    createButtons();

    $(document).on("click", ".show-btn",function(){
        $(".gifs-list").empty();
        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BSKbY27I2DDqNG8En9sUBfFGTTKuCTzV&q=" + show + "&limit=10&offset=0&rating=G&lang=en";
        displayGif(queryURL);
    });
    
    
    $("#addShow-btn").on("click", function(event){
        
        var getInput = $("#input-show").val().trim();
        // if(getInput){
        //    topics.push(getInput);
        //    createButtons();
        // }else {
        //     event.preventDefault();
        //     var message = $("<p style=color:red;> Please enter a Show Name </p>");
        //     $(".form-section").append(message);
        // }
        event.preventDefault();
        topics.push(getInput);
        createButtons();         
    })

    function createButtons() {
        $(".buttons-list").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.attr("data-name", topics[i]);
            button.addClass("show-btn");
            button.text(topics[i]);
            $(".buttons-list").append(button);
        }
    }

    function displayGif(parameter) {

        // var show = $(this).attr("data-name");
        // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BSKbY27I2DDqNG8En9sUBfFGTTKuCTzV&q=" + show + "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
            url: parameter,
            method: 'GET'
        }).done(function (response) {

            console.log(response);

            for (var i = 0; i < response.data.length; i++) {
                var newImg = $("<img>");
                newImg.attr("src", response.data[i].images.fixed_height.url);
                $(".gifs-list").append(newImg);
                var rating = $("<p>");
                var p = response.data[i].rating;
                rating.text("Rating:" + p);
                $(".gifs-list").append(rating);
            }
        });
    }





});