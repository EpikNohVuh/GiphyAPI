$(document).ready(function () {
    //declaring variables

    var topics = ["PANGOLINS", "MINIONS", "CATS", "DOGS"];
    var APIKey = "fVtHb9wm3P4U8NBL4lJ2Y6x2OwlmwX0Q"


    console.log(topics);
    //The following function, accepts a text field, and pushes it to an array.

    $("#submitTopic").on("click", function (event) {

        event.preventDefault();

        var topic = $("#topic-input").val().trim().toUpperCase();

        // The following, makes sure that an empty field will not get pushed to the array.
        if (topic !== "") {

            topics.push(topic);
            $("#topic-input").val("")

            // This function, "makes" the buttons.
            renderButtons();
        }
    });

    // Following function will take the array[i], and create a button with the the name of the [i]array.
    function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // Adding classes
            a.addClass("topic m-1 px-2 btn btn-info");
            // Adding a data-attribute with a value of the topic at index i
            a.attr("data-name", topics[i]);
            // Providing the button's text with a value of the movie at index i
            a.text(topics[i]);
            // Adding the button to the HTML
            $("#buttons-view").append(a);
        };

    };

    //Making the buttons clickable, since they are dynamic.
    $(document).on("click", ".topic", function () {
        console.log($(this).attr("data-name"));
        var value = $(this).attr("data-name");
        displayGIFs(value)

    })
// This function, "makes" the buttons.
    renderButtons();

    // This function, will utilize API and and AJAX call, to get the information to make the gifs.
    function displayGIFs(value) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=" + APIKey + "&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // empty the <div> area, before gifs are appended to the div.
            $("#Display-Area").empty();
            //looping through each url pull via the ajax call, giving each one their own div,p,data attributes.
            for (let i = 0; i < response.data.length; i++) {
                var a = $("<div class='topicGIF m-2 float-left'>");
                var rating = response.data[i].rating;
                var pRating = $("<p>").text("RATED: " + rating);
                a.append(pRating);
                var animatedURL = response.data[i].images.fixed_height.url
                var stillURL = response.data[i].images.fixed_height_still.url
                var image = $("<img>");
                image.attr("src", stillURL);
                image.attr("data-still", stillURL);
                image.attr("data-animate", animatedURL);
                image.attr("data-state", "still");
                image.addClass("topicGIF float-left")
                a.append(image);
                $("#Display-Area").prepend(a);;

            }
        });

    };
  
    //The following function, will toggle the still/animate state, upon clicking the .GIF
    $(document).on("click", ".topicGIF", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            console.log($(this));
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});

// THE END