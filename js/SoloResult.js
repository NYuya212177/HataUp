//ローカルストレージの"Score"から正解数を取得する
const Point = localStorage.getItem("Score");
console.log(Point);
//GameStartで設定した難易度をlevelとする
level = localStorage.getItem("level");
console.log(level);
//htmlに"あなたのとくてん"と表示
document.getElementById("pointtext").innerHTML = "あなたのとくてん";
//ポイントを表示
document.getElementById("point").innerHTML = Point;

//もう一回が押されたときの処理
document.getElementById("again").addEventListener("click", function () {
    if (level == "easy") {
       //SoloGameEasy.htmlに画面遷移
       window.location.href = 'SoloGameEasy.html';
    } else if (level == "normal") {
        //SoloGameNormal.htmlに画面遷移
        window.location.href = 'SoloGameNormal.html';
    } else if (level == "hard") {
       //SoloGameHard.htmlに画面遷移
       window.location.href = 'SoloGameHard.html';
    }
});

//ホームに戻るボタンが押されたときの処理
document.getElementById("home").addEventListener("click", function () {
    //GameStart.htmlに画面遷移
    location.href = 'GameStart.html';
});
