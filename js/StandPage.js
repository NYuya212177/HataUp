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
const playernumber = localStorage.getItem("playernumber");
console.log(playernumber);

// RoomCreate Or RoomInで設定したnameをsetnameとする
const setname = localStorage.getItem("name");
console.log(setname);

// RoomCreate Or RoomInで設定したsetpasswordをsetpasswordとする
const setpassword = localStorage.getItem("setpassword");
console.log(setpassword);

// RoomCreate Or RoomInで設定したcraftpasswordをcraftpasswordとする
const craftpassword = localStorage.getItem("craftpassword");
console.log(craftpassword);

// GameStartで設定したlevelをlevelとする
const level = localStorage.getItem("level");
console.log(level);

// setnameを自分のプレイヤーナンバーのところに格納
document.getElementById(playernumber).textContent = setname;

// RoomCreate Or RoomInでそれぞれ設定した名前を格納する変数の初期化
var player1 = null;
var player2 = null;
var player3 = null;
var player4 = null;

// プレイヤーの待機画面に映す干支画像のパスワードの処理
for (var i = 1; i <= 4; i++) {

    // i番目の文字をpasswordとする
    var password = setpassword.charAt(i);

    // i番目のpathナンバーのIDの場所をimgとする
    let img = document.getElementById("path" + i);

    // i番目のパスワードがネズミ[0]の時
    if (password == 0) {

        // ネズミの画像をi番目のpathにセット
        img.src = "img/Nezumi.png";

        // i番目のパスワードがウシ[1]の時
    } else if (password == 1) {

        // ウシの画像をi番目のpathにセット
        img.src = "img/Ushi.png";

        // i番目のパスワードがトラ[2]の時
    } else if (password == 2) {

        // トラの画像をi番目のpathにセット
        img.src = "img/Tora.png";

        // i番目のパスワードがウサギ[3]の時
    } else if (password == 3) {

        // ウサギの画像をi番目のpathにセット
        img.src = "img/Usagi.png";

        // i番目のパスワードがタツ[4]の時
    } else if (password == 4) {

        // タツの画像をi番目のpathにセット
        img.src = "img/Tatu.png";

        // i番目のパスワードがヘビ[5]の時
    } else if (password == 5) {

        // ヘビの画像をi番目のpathにセット
        img.src = "img/Hebi.png";

        // i番目のパスワードがウマ[6]の時
    } else if (password == 6) {

        // ウマの画像をi番目のpathにセット
        img.src = "img/Uma.png";

        // i番目のパスワードがヒツジ[7]の時
    } else if (password == 7) {

        // ヒツジの画像をi番目のpathにセット
        img.src = "img/Hithuji.png";

        // i番目のパスワードがサル[8]の時
    } else if (password == 8) {

        // サルの画像をi番目のpathにセット
        img.src = "img/Saru.png";

        // i番目のパスワードがトリ[9]の時
    } else if (password == 9) {

        // トラの画像をi番目のpathにセット
        img.src = "img/Tori.png";

        // i番目のパスワードがイヌ[A]の時
    } else if (password == "A") {

        // イヌの画像をi番目のpathにセット
        img.src = "img/Inu.png";

        // i番目のパスワードがイノシシ[B]の時
    } else if (password == "B") {

        // イノシシの画像をi番目のpathにセット
        img.src = "img/Inoshishi.png";
    }
}

// GameStartボタンを存在しない状態とする
document.getElementById("GameStart").style.display = 'none'
console.log("非表示");

// GameStartで設定した難易度とRoomCreate Or RoomInで設定したsetpasswordでfirebaseのリファレンス指定
var docRef = firestore.collection(level).doc(setpassword);

// 指定したリファレンスのデータが更新される毎に処理する
docRef.onSnapshot((doc) => {

    // player1,2,3,4の名前を取得
    player1 = doc.data().player1;
    player2 = doc.data().player2;
    player3 = doc.data().player3;
    player4 = doc.data().player4;

    // player1のテキストにある値をsetplayer1とする。
    var setplayer1 = document.getElementById("player1").value;

    // player2のテキストにある値をsetplayer2とする。
    var setplayer2 = document.getElementById("player2").value;

    // player3のテキストにある値をsetplayer3とする。
    var setplayer3 = document.getElementById("player3").value;

    // player4のテキストにある値をsetplayer4とする。
    var setplayer4 = document.getElementById("player4").value;

    // player1テキストレイアウトがnullかつfirebaseのフィールドのplayer1がnull出ない場合の処理
    if (setplayer1 == null && player1 != null) {

        document.getElementById("player1").textContent = player1;

    }

    // player2テキストレイアウトがnullかつfirebaseのフィールドのplayer2がnull出ない場合の処理
    if (setplayer2 == null && player2 != null) {

        document.getElementById("player2").textContent = player2;

    }

    // player3テキストレイアウトがnullかつfirebaseのフィールドのplayer3がnull出ない場合の処理
    if (setplayer3 == null && player3 != null) {

        document.getElementById("player3").textContent = player3;

    }

    // player4テキストレイアウトがnullかつfirebaseのフィールドのplayer4がnull出ない場合の処理
    if (setplayer4 == null && player4 != null) {

        document.getElementById("player4").textContent = player4;

    }

    // player1(ホスト)がこの画面を操作する際の処理
    if (playernumber === "player1") {

        // player2(二人目)以降が入ってきた際
        if (player2 != null) {

            // GameStartボタンの表示
            document.getElementById("GameStart").style.display = 'inline'
            console.log("表示");
        }
    }
});

const db = firestore.collection("Craft" + level).doc(craftpassword);
// GameStartボタンを押した際の処理
document.getElementById("GameStart").addEventListener("click", function () {
            // 難易度の変数が格納されているlevelと12進数表記のsetpasswordでfirebaseを指定

            db.update({
                // ここのGameStartの値で他の画面がゲームをスタートするためにセットする
                GameStart:"true",
                player1:player1,
                player2:player2,
                player3:player3,
                player4:player4
                // それぞれのプレイヤー名をfirebaseのプレイヤーナンバーのところに格納
            })
                // 値の格納が成功した際の処理
                .then(() => {
                    
                    // //指定したfirebaseのドキュメント削除
                    docRef.delete().then(() => {

                        // 指定したfirebaseのDelete成功
                        console.log("Document successfully deleted!");

                        // 指定したfirebaseのDelete失敗(エラー)
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    })
                    // に画面遷移
                    window.location.href = 'Game.html';
                })
                // エラー処理
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
})

//難易度の変数が格納されているlevelとゲームをする際のルームID、craftpasswordでfirebaseを指定

if(playernumber === "player1"){

}else{
// 指定したfirebaseからリアルタイムでデータを取得したとき毎に処理をする
db.onSnapshot((doc) => {

    // firabaseのGamaStartから取得してきた値をGameStartとして格納
    var Start = doc.data().GameStart;
    console.log(Start);

    // 変数GameStartに"Start"という値が入った際に行う処理
    if (Start == "true") {
        // に画面遷移
        window.location.href = 'Game.html';
    }
});
}