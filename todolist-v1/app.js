const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
var items = ["Buy car food", "Cook Italian food", "Go camping"];

app.get("/", function(req, res){

  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);
  res.render("list", {kindOfDay: day, newListItems: items});
  //res.send("haooy");

});


app.post("/", function(req, res) {
  var newItem = req.body.newItem;
  items.push(newItem);
  res.redirect("/");

})


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
