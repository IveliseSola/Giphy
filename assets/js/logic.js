
$(document).ready(function () {

    var topics = ["Rick and Morty", "BoJack Horseman", "Bob's Burger", "Family Guy", "SpongeBob"];

    createButtons();

    $(document.body).on("click", ".show-btn", function () {
        $(".gifs-list").empty();
        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BSKbY27I2DDqNG8En9sUBfFGTTKuCTzV&q=" + show + "&limit=10&offset=0&rating=G&lang=en";
        displayGif(queryURL);
    });

    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data_state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data_animate"));
            $(this).attr("data_state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data_still"));
            $(this).attr("data_state", "still");
        }
    });

    $("#addShow-btn").on("click", function(event) {
        event.preventDefault();
        var getInput = $("#input-show").val().trim();

        // if (getInput) {
        //     $(".message").empty();
        //     topics.push(getInput);
        //     createButtons();
        // } else {
        //     event.preventDefault();
        //     $(".message").html("<p> Please enter a Show Name </p>");
        // }
        topics.push(getInput);
        createButtons();
    });

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

        $.ajax({
            url: parameter,
            method: 'GET'
        }).done(function (response) {
            // console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var newImg = $("<img>");
                newImg.attr({ src: response.data[i].images.fixed_height_still.url, "data_still": response.data[i].images.fixed_height_still.url, "data_animate": response.data[i].images.fixed_height.url, "data_state": "still" });
                newImg.addClass("gif");
                $(".gifs-list").append(newImg);
                var rating = $("<p>");
                var p = response.data[i].rating;
                rating.text("Rating:" + p);
                $(".gifs-list").append(rating);
            }
        });
    }

});