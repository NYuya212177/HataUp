// localStorageにセットされているすべての値を削除
localStorage.clear();


var elements = document.getElementsByName("hoge");
var len = elements.length;
var checkValue = null;

// ボタンを押した時の処理
document.getElementById("RoomCreate").addEventListener("click", function () {
    // ●ボタンを押されたときに選択されていたラジオボタンのvalueを取得する処理
    for (var i = 0; i < len; i++) {
        if (elements.item(i).checked) {
            checkValue = elements.item(i).value;

            if (checkValue === "easy") {

                var level = "easy";
                localStorage.setItem('level', level);
                console.log(localStorage);

            } else if (checkValue === "normal") {

                var level = "normal";
                localStorage.setItem('level', level);
                console.log(localStorage);

            } else if (checkValue === "hard") {

                var level = "hard";
                localStorage.setItem('level', level);
                console.log(localStorage);

            }
        }
        
    // ●を打っていた処理はここで終わり 
    // すみません●で指定しているラジオボタンの処理は詳しくはよくわかってないです

    }
    // RoomCreate.htmlに画面遷移
    window.location.href = 'RoomCreate.html';
})

// ボタンを押した時の処理
document.getElementById("RoomIn").addEventListener("click", function () {
    // ●ボタンを押されたときに選択されていたラジオボタンのvalueを取得する処理
    for (var i = 0; i < len; i++) {
        if (elements.item(i).checked) {
            checkValue = elements.item(i).value;

            if (checkValue === "easy") {

                var level = "easy";
                localStorage.setItem('level', level);
                console.log(localStorage);

            } else if (checkValue === "normal") {

                var level = "normal";
                localStorage.setItem('level', level);
                console.log(localStorage);

            } else if (checkValue === "hard") {

                var level = "hard";
                localStorage.setItem('level', level);
                console.log(localStorage);

            }
        }
    // ●を打っていた処理はここで終わり 
    // すみません●で指定しているラジオボタンの処理は詳しくはよくわかってないです
    }
    // RoomCreate.htmlに画面遷移
    window.location.href = 'RoomIn.html';
})