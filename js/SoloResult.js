//ローカルストレージの"Score"から正解数を取得する
const Point = localStorage.getItem("Score");
console.log(Point);
//htmlに"あなたのとくてん"と表示
document.getElementById("pointtext").innerHTML = "あなたのとくてん";
//ポイントを表示
document.getElementById("point").innerHTML = Point;

//もう一回が押されたときの処理
document.getElementById("again").addEventListener("click", function () {
    //SoloGame.htmlに画面遷移
    location.href = 'SoloGame.html';
});

//ホームに戻るボタンが押されたときの処理
document.getElementById("home").addEventListener("click", function () {
    //GameStart.htmlに画面遷移
    location.href = 'GameStart.html';
});
