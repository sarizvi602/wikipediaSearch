$(document).ready(function() {
  //when search button is clicked
  $("#searchBtn").click(function() {
    //save value in searchbox to this variable
    var searchObj = $("#searchBox").val();
  //wikipedia api url
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchObj + "&format=json&callback=?";
    //get list of all possible items related to search from wikipedia url
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      success: function(data) {
        //empty out the list
        $("#outputList").html("");
        //prepend each item to search list and display the link with description
        for (var index = 0; index < data[1].length; index++) {
          $("#outputList").prepend("<li><a href=" + data[3][index] + " target=\"_blank\">" + data[1][index] + "</a><p>" + data[2][index] + "</p></li>");
          //styling the list with css
          $("#outputList>li").css("background-color", "#f8f8f8");
          $("#outputList>li").css("margin-left", "-40px");
          $("#outputList>li").css("font-family", "Georgia");
        }
        //empty out the search box
        $("#searchBox").val("");
      },//if fails
      error: function(errorMsg) {
        alert("Failure to connect to API.");
      }
    });
  });
  //autocomplete the search term in box using jquery ui's autocomplete
  $("#searchBox").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&search=&callback=?",
        data: {
          search: request.term
        },
        dataType: "jsonp",
        success: function(data) {
          response(data[1]);
        }
      });
    }
  });
  //enter keypress for searching
  $("#searchBox").keypress(function(event) {
    if (event.which == 13) {//enter key
      $("#searchBtn").click();//run click search button command
    }
  });
});