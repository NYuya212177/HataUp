localStorage.clear();

document.getElementById("Hard").addEventListener("click", function () {
    // localStorage.removeItem("nanido");
    var level = "hard";
    localStorage.setItem('level', level);
    console.log(localStorage);

})

document.getElementById("Normal").addEventListener("click", function () {
    // localStorage.removeItem("nanido");
    var level = "normal";
    localStorage.setItem('level', level);
    console.log(localStorage);

})

document.getElementById("Easy").addEventListener("click", function () {
    // localStorage.removeItem("nanido");
    var level = "easy";
    localStorage.setItem('level', level);
    console.log(localStorage);

})