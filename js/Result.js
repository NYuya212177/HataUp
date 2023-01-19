// firebaseのコンソールとアプリをつないでいる部分
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

// RoomCreate Or RoomInで設定したplayernumberをplayernumberとする
playernumber = localStorage.getItem("playernumber");
console.log(playernumber);

// RoomCreate Or RoomInで設定したnameをsetnameとする
setname = localStorage.getItem("name");
console.log(setname);

// RoomCreate Or RoomInで設定したcraftpasswordをcraftpasswordとする
const craftpassword = localStorage.getItem("craftpassword");
console.log(craftpassword);

// GameStartで設定したlevelをlevelとする
level = localStorage.getItem("level");
console.log(level);

var point1 = null;
var point2 = null;
var point3 = null;
var point4 = null;

const docRef = firestore.collection("Craft" + level).doc(craftpassword);

document.getElementById("pointtext").innerHTML = setname + "さん";

var Point = 0;

docRef.update({
    GameStart: "false",
    player1: null,
    player2: null,
    player3: null,
    player4: null
})

docRef.get().then((doc) => {

    point1 = doc.data().Score1;
    point2 = doc.data().Score2;
    point3 = doc.data().Score3;
    point4 = doc.data().Score4;

    // 指定したfirebaseから値を取得してこれた際の処理
    if (doc.exists) {

        Point = point1 + point2 + point3 + point4;
        //残り残機を表示
        document.getElementById("point").innerHTML = Point;
    }
}).catch((error) => {
    console.error("Error removing document: ", error);
});


document.getElementById("again").addEventListener("click", function () {
    docRef.update({
        life1: 0,
        life2: 0,
        life3: 0,
        life4: 0,
        Score1: 0,
        Score2: 0,
        Score3: 0,
        Score4: 0
    }).then(() => {
        if (playernumber === "player1") {

            docRef.update({
                player1: setname
            })// 値の格納が成功した際の処理
                .then(() => {

                    // に画面遷移
                    window.location.href = 'StandPage.html';

                    // 指定したfirebaseのDelete失敗(エラー)
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                })

        } else if (playernumber === "player2") {

            docRef.update({
                player2: setname
            })// 値の格納が成功した際の処理
                .then(() => {

                    // に画面遷移
                    window.location.href = 'StandPage.html';

                    // 指定したfirebaseのDelete失敗(エラー)
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                })

        } else if (playernumber === "player3") {

            docRef.update({
                player3: setname
            })// 値の格納が成功した際の処理
                .then(() => {

                    // に画面遷移
                    window.location.href = 'StandPage.html';

                    // 指定したfirebaseのDelete失敗(エラー)
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                })

        } else if (playernumber === "player4") {

            docRef.update({
                player4: setname
            })// 値の格納が成功した際の処理
                .then(() => {

                    // に画面遷移
                    window.location.href = 'StandPage.html';

                    // 指定したfirebaseのDelete失敗(エラー)
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                })

        }
    })
});

document.getElementById("home").addEventListener("click", function () {
    // に画面遷移

    docRef.update({
        GameStart: "end"
    })// 値の格納が成功した際の処理
        .then(() => {

            // に画面遷移
            window.location.href = 'GameStart.html';

            // 指定したfirebaseのDelete失敗(エラー)
        }).catch((error) => {
            console.error("Error removing document: ", error);
        })

});

document.getElementById("stop").addEventListener("click", function () {

});