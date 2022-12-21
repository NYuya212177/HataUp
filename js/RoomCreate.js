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

// localStorageに保存したsetpasswordの値をページが開いたときに削除
localStorage.removeItem("setpassword");

// localStorageに保存したcraftpasswordの値をページが開いたときに削除
localStorage.removeItem("craftpassword");

// localStorageに保存したplayernumberの値をページが開いたときに削除
localStorage.removeItem("playernumber");

// localStorageに保存したname"の値をページが開いたときに削除
localStorage.removeItem("name");

// 透明なパス画像のを指定している
var Path1 = document.getElementById("path1");
var Path2 = document.getElementById("path2");
var Path3 = document.getElementById("path3");
var Path4 = document.getElementById("path4");

// 透明なパス画像をあとで出てくるif文で使いたくて設定している変数
var Path = Path4.src;

// setpassword変数の初期化
var setpassword = null;

// craftpassword変数の初期化
var craftpassword = null;

// 最終のパスワードを入れるための変数の初期化
var pass1 = null;
var pass2 = null;
var pass3 = null;
var pass4 = null;

// 干支の画像を押したら透明なパス画像のところに左から順番に入れていくためのif文
document.getElementById("nezumi").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "./Path干支/Nezumi.png";
        pass1 = "0";
    } else if (Path2.src == Path) {
        Path2.src = "Path干支/Nezumi.png";
        pass2 = "0";
    } else if (Path3.src == Path) {
        Path3.src = "Path干支/Nezumi.png";
        pass3 = "0";
    } else if (Path4.src == Path) {
        Path4.src = "Path干支/Nezumi.png";
        pass4 = "0";
    }
})

document.getElementById("ushi").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "./Path干支/Ushi.png";
        pass1 = "1";
    } else if (Path2.src == Path) {
        Path2.src = "./Path干支/Ushi.png";
        pass2 = "1";
    } else if (Path3.src == Path) {
        Path3.src = "./Path干支/Ushi.png";
        pass3 = "1";
    } else if (Path4.src == Path) {
        Path4.src = "./Path干支/Ushi.png";
        pass4 = "1";
    }
})

document.getElementById("tora").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "./Path干支/Tora.png";
        pass1 = "2";
    } else if (Path2.src == Path) {
        Path2.src = "./Path干支/Tora.png";
        pass2 = "2";
    } else if (Path3.src == Path) {
        Path3.src = "./Path干支/Tora.png";
        pass3 = "2";
    } else if (Path4.src == Path) {
        Path4.src = "./Path干支/Tora.png";
        pass4 = "2";
    }
})

document.getElementById("usagi").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "./Path干支/Usagi.png";
        pass1 = "3";
    } else if (Path2.src == Path) {
        Path2.src = "./Path干支/Usagi.png";
        pass2 = "3";
    } else if (Path3.src == Path) {
        Path3.src = "./Path干支/Usagi.png";
        pass3 = "3";
    } else if (Path4.src == Path) {
        Path4.src = "./Path干支/Usagi.png";
        pass4 = "3";
    }
})

document.getElementById("tatu").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "./Path干支/Tatu.png";
        pass1 = "4";
    } else if (Path2.src == Path) {
        Path2.src = "./Path干支/Tatu.png";
        pass2 = "4";
    } else if (Path3.src == Path) {
        Path3.src = "./Path干支/Tatu.png";
        pass3 = "4";
    } else if (Path4.src == Path) {
        Path4.src = "./Path干支/Tatu.png";
        pass4 = "4";
    }
})

document.getElementById("hebi").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "./Path干支/Hebi.png";
        pass1 = "5";
    } else if (Path2.src == Path) {
        Path2.src = "./Path干支/Hebi.png";
        pass2 = "5";
    } else if (Path3.src == Path) {
        Path3.src = "./Path干支/Hebi.png";
        pass3 = "5";
    } else if (Path4.src == Path) {
        Path4.src = "./Path干支/Hebi.png";
        pass4 = "5";
    }
})

document.getElementById("uma").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "./Path干支/Uma.png";
        pass1 = "6";
    } else if (Path2.src == Path) {
        Path2.src = "./Path干支/Uma.png";
        pass2 = "2";
    } else if (Path3.src == Path) {
        Path3.src = "./Path干支/Uma.png";
        pass3 = "6";
    } else if (Path4.src == Path) {
        Path4.src = "./Path干支/Uma.png";
        pass4 = "6";
    }
})

document.getElementById("hithuji").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "./Path干支/Hithuji.png";
        pass1 = "7";
    } else if (Path2.src == Path) {
        Path2.src = "./Path干支/Hithuji.png";
        pass2 = "7";
    } else if (Path3.src == Path) {
        Path3.src = "./Path干支/Hithuji.png";
        pass3 = "7";
    } else if (Path4.src == Path) {
        Path4.src = "./Path干支/Hithuji.png";
        pass4 = "7";
    }
})

document.getElementById("saru").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "./Path干支/Saru.png";
        pass1 = "8";
    } else if (Path2.src == Path) {
        Path2.src = "./Path干支/Saru.png";
        pass2 = "8";
    } else if (Path3.src == Path) {
        Path3.src = "./Path干支/Saru.png";
        pass3 = "8";
    } else if (Path4.src == Path) {
        Path4.src = "./Path干支/Saru.png";
        pass4 = "8";
    }
})

document.getElementById("tori").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "./Path干支/Tori.png";
        pass1 = "9";
    } else if (Path2.src == Path) {
        Path2.src = "./Path干支/Tori.png";
        pass2 = "9";
    } else if (Path3.src == Path) {
        Path3.src = "./Path干支/Tori.png";
        pass3 = "9";
    } else if (Path4.src == Path) {
        Path4.src = "./Path干支/Tori.png";
        pass4 = "9";
    }
})

document.getElementById("inu").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "./Path干支/Inu.png";
        pass1 = "A";
    } else if (Path2.src == Path) {
        Path2.src = "./Path干支/Inu.png";
        pass2 = "A";
    } else if (Path3.src == Path) {
        Path3.src = "./Path干支/Inu.png";
        pass3 = "A";
    } else if (Path4.src == Path) {
        Path4.src = "./Path干支/Inu.png";
        pass4 = "A";
    }
})

document.getElementById("inoshishi").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "./Path干支/Inoshishi.png";
        pass1 = "B";
    } else if (Path2.src == Path) {
        Path2.src = "./Path干支/Inoshishi.png";
        pass2 = "B";
    } else if (Path3.src == Path) {
        Path3.src = "./Path干支/Inoshishi.png";
        pass3 = "B";
    } else if (Path4.src == Path) {
        Path4.src = "./Path干支/Inoshishi.png";
        pass4 = "B";
    }
})

document.getElementById("DELETE").addEventListener("click", function () {
    if (Path4.src != Path) {
        Path4.src = "./Path干支/Path.png";
    } else if (Path3.src != Path) {
        Path3.src = "./Path干支/Path.png";
    } else if (Path2.src != Path) {
        Path2.src = "./Path干支/Path.png";
    } else if (Path1.src != Path) {
        Path1.src = "./Path干支/Path.png";
    }
});

// 設定したパスをcloud firebaseのドキュメントとして設定しルームを作成する
document.getElementById("GameStart").addEventListener("click", function () {
    // 透明なパスのところに動物が四つ入っていないときにルームに入れなくする処理
    if (Path1.src == Path || Path2.src == Path || Path3.src == Path || Path4.src == Path) {
        alert("pass足りない");
    } else {

        // 画像でパスワードを設定したものを12進数で表記した値を合わせてsetpasswordとする
        var setpassword = pass1 + pass2 + pass3 + pass4;
        console.log(setpassword);

        // GameStartで設定した難易度をlevelとする
        const level = localStorage.getItem("level");
        console.log(level);

        // 設定した名前をsetnameとする
        const setname = document.getElementById("name").value;
        // 上で設定した名前をlocalStorageに保存
        localStorage.setItem('name', setname);

        // player1(ホスト)であるということでlocalStorageにplayer1を保存
        localStorage.setItem('playernumber', "player1");
        
        // addセットを使いfirebaseで絶対にかぶらないルームを作成
        firestore.collection("Craft" + level).add({
            player1: null,
            player2: null,
            player3: null,
            player4: null
        })
        // addセットでルームをつくれた時にする処理
            .then((docRef) => {
                // addセットで作成したルームのdocument名を取得しcraftpasswordに入れる
                craftpassword = docRef.id;
                console.log("ID: ", craftpassword);
                // 作ったcraftpasswordをlocalStorageに保存
                localStorage.setItem('craftpassword', craftpassword);
                // 一番上で取得してきた難易度と12進数表記したパスワードで一次的なルームを作る
                firestore.collection(level).doc(setpassword).set({
                    // 一次的なルームを作る際addセットで作った新しいルームdocumentを
                    // passwordとしてfirebaseに格納
                    password: craftpassword,
                    // 上記で取得してきた名前をplayer1(ホスト)としてfirebaseに格納
                    player1: setname,
                    player2: null,
                    player3: null,
                    player4: null,
                })
                // 一次的なルームの作成完了時の処理
                    .then(() => {
                        // 12進数表記で作ったsetpasswordをlocalStorageに保存
                        localStorage.setItem('setpassword', setpassword);
                        console.log(localStorage);
                        // StandPage.htmlに画面遷移
                        window.location.href = 'StandPage.html';
                    })
                    // 一次的なルーム作成をする際のエラー処理
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });

            })
            // addセットでルームを作成したときのエラー処理
            .catch((error) => {
                console.error("Error adding document: ", error);
            });


    }
})