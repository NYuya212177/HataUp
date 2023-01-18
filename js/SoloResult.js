
const Point = localStorage.getItem("Score");
console.log(Point);
document.getElementById("pointtext").innerHTML = "あなたのとくてん";

//ポイントを表示
document.getElementById("point").innerHTML = Point;

document.getElementById("again").addEventListener("click", function () {

    // SoloGame.htmlに画面遷移
    window.location.href = 'SoloGame.html';

});

document.getElementById("home").addEventListener("click", function () {

    // GameStart.htmlに画面遷移
    window.location.href = 'GameStart.html';

});

document.getElementById("stop").addEventListener("click", function () {

});