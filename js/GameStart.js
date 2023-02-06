//localStorageにセットされているすべての値を削除
localStorage.clear();
//htmlの難易度を取得
var Level = document.getElementsByName("hoge");
//htmlの難易度を取得
var LevelLength = Level.length;
var checkValue = null;
//選択された難易度を入れる変数
var level = null;

//へやをつくるボタンを押した時の処理
document.getElementById("RoomCreate").addEventListener("click", function () {
    //ボタンを押されたときに選択されていた難易度のvalueを取得する処理
    for (var i = 0; i < LevelLength; i++) {
        if (Level.item(i).checked) {
            checkValue = Level.item(i).value;
            if (checkValue === "easy") {
                level = "easy";
                //ローカルストレージに選択した難易度を格納
                localStorage.setItem('level', level);
                console.log(localStorage);
            } else if (checkValue === "normal") {
                level = "normal";
                //ローカルストレージに選択した難易度を格納
                localStorage.setItem('level', level);
                console.log(localStorage);
            } else if (checkValue === "hard") {
                level = "hard";
                //ローカルストレージに選択した難易度を格納
                localStorage.setItem('level', level);
                console.log(localStorage);
            }
        }
    }
    //RoomCreate.html(へやをつくる)に画面遷移
    window.location.href = 'RoomCreate.html';
});

//へやにはいるボタンを押した時の処理
document.getElementById("RoomIn").addEventListener("click", function () {
    //ボタンを押されたときに選択されていた難易度のvalueを取得する処理
    for (var i = 0; i < LevelLength; i++) {
        if (Level.item(i).checked) {
            checkValue = Level.item(i).value;
            if (checkValue === "easy") {
                level = "easy";
                //ローカルストレージに選択した難易度を格納
                localStorage.setItem('level', level);
                console.log(localStorage);
            } else if (checkValue === "normal") {
                level = "normal";
                //ローカルストレージに選択した難易度を格納
                localStorage.setItem('level', level);
                console.log(localStorage);
            } else if (checkValue === "hard") {
                level = "hard";
                //ローカルストレージに選択した難易度を格納
                localStorage.setItem('level', level);
                console.log(localStorage);
            }

        }
    }
    //RoomIn.html(へやにはいる)に画面遷移
    window.location.href = 'RoomIn.html';
});

//ボタンを押した時の処理
document.getElementById("SoloGame").addEventListener("click", function () {
    console.log("ぼたんおされてますかー");
    //ボタンを押されたときに選択されていた難易度のvalueを取得する処理
    for (var i = 0; i < LevelLength; i++) {
        if (Level.item(i).checked) {
            checkValue = Level.item(i).value;
            if (checkValue === "easy") {
                level = "easy";
                //ローカルストレージに選択した難易度を格納
                localStorage.setItem('level', level);
                console.log(localStorage);
            } else if (checkValue === "normal") {
                level = "normal";
                //ローカルストレージに選択した難易度を格納
                localStorage.setItem('level', level);
                console.log(localStorage);
            } else if (checkValue === "hard") {
                level = "hard";
                //ローカルストレージに選択した難易度を格納
                localStorage.setItem('level', level);
                console.log(localStorage);
            }
        }

        if (level === "easy") {//難易度がかんたんの時
            //SoloGameEasy.htmlに画面遷移
            window.location.href = 'SoloGameEasy.html';
        } else if (level === "normal") {//難易度がふつうの時
            //SoloGameNormal.htmlに画面遷移
            window.location.href = 'SoloGameNormal.html';
        } else if (level === "hard") {//難易度がむずかしいの時
            //SoloGameHard.htmlに画面遷移
            window.location.href = 'SoloGameHard.html';
        }
    }
});