var imgs = document.querySelectorAll("img");
var randomNumber = [];
for (var i = 0; i < imgs.length; i++) {
  randomNumber.push(Math.floor(Math.random() * 6 + 1));
  var randImg = 'images/dice' + randomNumber[i] + '.png';
  var img = imgs[i];
  img.setAttribute("src", randImg);
}

var res = "Draw!"
if (randomNumber[0] > randomNumber[1]) {
  res = "Player 1 Wins!";
} else if (randomNumber[0] < randomNumber[1]) {
  res = "Player 2 Wins!";
}
document.querySelector("h1").innerHTML = res;
