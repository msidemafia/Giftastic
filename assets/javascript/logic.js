// api key = zOONXshj4RNQl3voUCdYKSFRyM7wyRWb

var topics = ["cat", "dog", "elephant", "emu", "rabbit", "fox", "bear"];

function buttonPopulate() {
    $("#buttonBox").empty();
    for (i=0; i<topics.length; i++) {
    var animalButton = $("<button>").text(topics[i]).val(topics[i])
    .addClass("animalBtn").attr("id", topics[i] + "Button").attr("data-name", topics[i]);
    $("#buttonBox").append(animalButton);
    }
};

buttonPopulate();

$(document).on("click", ".animalBtn", function() {
    $("#gifBox").empty();
    var animal = $(this).attr("data-name");
    event.preventDefault();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=zOONXshj4RNQl3voUCdYKSFRyM7wyRWb&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
    })

    .then(function(response) {
        console.log(response);


        for (var i = 0; i < response.data.length; i++) {
        var dataAnimate = response.data[0].images.original.url
          var gifDiv = $("<div>").addClass("giphyDiv");
          var rating = $("<p>").text("Rating: " + response.data[i].rating);
          var gif = $("<img>").attr("src", response.data[i].images.original_still.url)
          .attr("data-state", "still").attr("data-still", response.data[i].images.original_still.url)
          .attr("data-animate", response.data[i].images.original.url)
          .addClass("gif"); 

          gifDiv.append(rating);
          gifDiv.append(gif);

          $("#gifBox").prepend(gifDiv);
        };
    });
});

var animateGif = function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
}

$(document).on("click", ".gif", animateGif);


$("#submitBtn").on("click", function(){
    event.preventDefault();
    var animalValue = $("#animalForm").val().trim();
    topics.push(animalValue);

    buttonPopulate();
    console.log(topics);
});