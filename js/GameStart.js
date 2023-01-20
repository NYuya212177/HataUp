// localStorageにセットされているすべての値を削除
localStorage.clear();
var LevelOfDifficulty = document.getLevelOfDifficultyByName("LevelOfDifficulty");//htmlの難易度を取得
var LevelLength = LevelOfDifficulty.length;//htmlの難易度を取得
var checkValue = null;
var level = null;//選択された難易度を入れる変数
//へやをつくるボタンを押した時の処理
document.getElementById("RoomCreate").addEventListener("click", function () {
    //●ボタンを押されたときに選択されていたラジオボタンのvalueを取得する処理
    for (var i = 0; i < LevelLength; i++) {
        if (LevelOfDifficulty.item(i).checked) {
            checkValue = LevelOfDifficulty.item(i).value;
            if (checkValue === "easy") {
                level = "easy";
                localStorage.setItem('level', level);//ローカルストレージに選択した難易度を格納
                console.log(localStorage);
            } else if (checkValue === "normal") {
                level = "normal";
                localStorage.setItem('level', level);//ローカルストレージに選択した難易度を格納
                console.log(localStorage);
            } else if (checkValue === "hard") {
                level = "hard";
                localStorage.setItem('level', level);//ローカルストレージに選択した難易度を格納
                console.log(localStorage);
            }
        }
        //●を打っていた処理はここで終わり 
        //すみません●で指定しているラジオボタンの処理は詳しくはよくわかってないです
    }
    window.location.href = 'RoomCreate.html';//RoomCreate.html(へやをつくる)に画面遷移
})

//へやにはいるボタンを押した時の処理
document.getElementById("RoomIn").addEventListener("click", function () {
    //●ボタンを押されたときに選択されていたラジオボタンのvalueを取得する処理
    for (var i = 0; i < LevelLength; i++) {
        if (LevelOfDifficulty.item(i).checked) {
            checkValue = LevelOfDifficulty.item(i).value;
            if (checkValue === "easy") {
                level = "easy";
                localStorage.setItem('level', level);//ローカルストレージに選択した難易度を格納
                console.log(localStorage);
            } else if (checkValue === "normal") {
                level = "normal";
                localStorage.setItem('level', level);//ローカルストレージに選択した難易度を格納
                console.log(localStorage);
            } else if (checkValue === "hard") {
                level = "hard";
                localStorage.setItem('level', level);//ローカルストレージに選択した難易度を格納
                console.log(localStorage);
            }
        }
        //●を打っていた処理はここで終わり 
        //すみません●で指定しているラジオボタンの処理は詳しくはよくわかってないです
    }
    window.location.href = 'RoomIn.html';//RoomIn.html(へやにはいる)に画面遷移
})

// ボタンを押した時の処理
document.getElementById("SoloGame").addEventListener("click", function () {
    // RoomCreate.htmlに画面遷移
    window.location.href = 'SoloGameEasy.html';
});