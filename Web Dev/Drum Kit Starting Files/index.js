var nOfDrums = document.querySelectorAll(".drum").length;
var drums = document.querySelectorAll(".drum");
for (var i = 0; i < nOfDrums; i++) {
  drums[i].addEventListener("click", function() {
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}

document.addEventListener("keypress", function(event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});


function makeSound(key) {
  switch (key) {
    case "w":
      var a1 = new Audio("sounds/tom-1.mp3");
      a1.play();

    case "a":
      var a2 = new Audio("sounds/tom-2.mp3");
      a2.play();

    case "s":
      var a3 = new Audio("sounds/tom-3.mp3");
      a3.play();

    case "d":
      var a4 = new Audio("sounds/tom-4.mp3");
      a4.play();

    case "j":
      var a5 = new Audio("sounds/snare.mp3");
      a5.play();

    case "k":
      var a6 = new Audio("sounds/crash.mp3");
      a6.play();

    case "l":
      var a7 = new Audio("sounds/kick-bass.mp3");
      a7.play();

    default:
      console.log("key");
  }
}

function buttonAnimation(key) {
  var activeButton = document.querySelector("." + key);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}
