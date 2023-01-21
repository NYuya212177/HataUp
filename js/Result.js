//firebaseのコンソールとアプリをつないでいる部分
const firebaseConfig = {
    apiKey: "AIzaSyAJG9nKDU14PwHYSGGzV2EI8hVNDPePgsg",
    authDomain: "hataup-dc173.firebaseapp.com",
    projectId: "hataup-dc173",
    storageBucket: "hataup-dc173.appspot.com",
    messagingSenderId: "819131453401",
    appId: "1:819131453401:web:45f88cf4fa35b4580593c8",
    measurementId: "G-BG0VK3RC6V"
};
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
//RoomCreateかRoomInで設定したplayernumberをplayernumberとする
playernumber = localStorage.getItem("playernumber");
console.log(playernumber);
//RoomCreateかRoomInで設定したnameをsetnameとする
setname = localStorage.getItem("name");
console.log(setname);
//RoomCreateかRoomInで設定したcraftpasswordをcraftpasswordとする
const craftpassword = localStorage.getItem("craftpassword");
console.log(craftpassword);
//GameStartで設定したlevelをlevelとする
level = localStorage.getItem("level");
console.log(level);
var point1 = null;
var point2 = null;
var point3 = null;
var point4 = null;

const docRef = firestore.collection("Craft" + level).doc(craftpassword);
//ユーザー名を表示
document.getElementById("pointtext").innerHTML = setname + "さん";
var Point = 0;
docRef.update({//firebaseの初期化
    GameStart: "false",
    player1: null,
    player2: null,
    player3: null,
    player4: null
})
//firebaseから正解数を取得
docRef.get().then((doc) => {
    point1 = doc.data().Score1;
    point2 = doc.data().Score2;
    point3 = doc.data().Score3;
    point4 = doc.data().Score4;
    //指定したfirebaseから値を取得してこれた際の処理
    if (doc.exists) {
        Point = point1 + point2 + point3 + point4;
        //残り残機を表示
        document.getElementById("point").innerHTML = Point;
    }
}).catch((error) => {
    console.error("Error removing document: ", error);
});

//もう一回が押されたときの処理
document.getElementById("again").addEventListener("click", function () {
    docRef.update({//残機と正解数を初期化
        life1: 0,
        life2: 0,
        life3: 0,
        life4: 0,
        Score1: 0,
        Score2: 0,
        Score3: 0,
        Score4: 0
    }).then(() => {
        if (playernumber === "player1") {//player1の処理
            docRef.update({
                player1: setname
            })
                .then(() => {//値の格納が成功した際の処理
                    //StandPage.htmlに画面遷移
                    window.location.href = 'StandPage.html';
                }).catch((error) => {//指定したfirebaseのDelete失敗(エラー)
                    console.error("Error removing document: ", error);
                })
        } else if (playernumber === "player2") {//player2の処理
            docRef.update({
                player2: setname
            })
                .then(() => {//値の格納が成功した際の処理
                    //StandPage.htmlに画面遷移
                    window.location.href = 'StandPage.html';
                }).catch((error) => {//指定したfirebaseのDelete失敗(エラー)
                    console.error("Error removing document: ", error);
                })
        } else if (playernumber === "player3") {//player3の処理
            docRef.update({
                player3: setname
            })
                .then(() => {//値の格納が成功した際の処理
                    //StandPage.htmlに画面遷移
                    window.location.href = 'StandPage.html';
                }).catch((error) => {//指定したfirebaseのDelete失敗(エラー)
                    console.error("Error removing document: ", error);
                })
        } else if (playernumber === "player4") {//player4の処理
            docRef.update({
                player4: setname
            })
                .then(() => {//値の格納が成功した際の処理
                    //StandPage.htmlに画面遷移
                    window.location.href = 'StandPage.html';
                }).catch((error) => {//指定したfirebaseのDelete失敗(エラー)
                    console.error("Error removing document: ", error);
                })
        }
    })
});

//ホームに戻るボタンが押されたときの処理
document.getElementById("home").addEventListener("click", function () {
    docRef.update({
        GameStart: "end"//GameStartに"end"を入れる
    })
        .then(() => {//値の格納が成功した際の処理
            //GameStart.htmlに画面遷移
            window.location.href = 'GameStart.html';
        }).catch((error) => {//指定したfirebaseのDelete失敗(エラー)
            console.error("Error removing document: ", error);
        })

});