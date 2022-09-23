$("input").keypress(function(event) {
  var t = $("h1").text();
  $("h1").text(t + event.key);
})
