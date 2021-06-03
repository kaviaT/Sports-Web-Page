var studentInfo = [
  { name: "Dinithi Perera", role: "Student 3", bio: "Level 4" },
  { name: "Kavindu Hettiarachchi", role: "student 2 ", bio: "Level 4" },
  { name: "Srimali Udayangani", role: "student 4", bio: "Level 4" },
  { name: "Valan", role: " student 1", bio: "Level 4" },
];

window.addEventListener("DOMContentLoaded", init);

var imageElements = [];
var nameElement = [];
var roleElement = [];
var bioElement = [];

function init() {
  // bind option click mouseover to all the images
  imageElements = document.getElementsByClassName("hover_image");
  for (let i = 0; i < imageElements.length; i++) {
    imageElements[i].addEventListener("mouseover", handleMouseOver);
  }

  nameElement = document.querySelector(".name");
  roleElement = document.querySelector(".role");
  bioElement = document.querySelector(".bio");
}

function handleMouseOver(e) {
  var student = parseInt(e.target.dataset.student);
  nameElement.innerHTML = studentInfo[student].name;
  roleElement.innerHTML = studentInfo[student].role;
  bioElement.innerHTML = studentInfo[student].bio;
}
