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

// localStorageに保存したcraftpasswordの値をページが開いたときに削除
localStorage.removeItem("craftpassword");

// localStorageに保存したplayernumberの値をページが開いたときに削除
localStorage.removeItem("playernumber");

// localStorageに保存したname"の値をページが開いたときに削除
localStorage.removeItem("name");

// setpassword変数の初期化
var setpassword = null;

// craftpassword変数の初期化
var craftpassword = null;

var level = null;

var setname = null;

// 透明なパス画像のを指定している
var Path1 = document.getElementById("path1");
var Path2 = document.getElementById("path2");
var Path3 = document.getElementById("path3");
var Path4 = document.getElementById("path4");

// 透明なパス画像をあとで出てくるif文で使いたくて設定している変数
var Path = Path1.src;

// setpasswordのパスワードを入れるための変数の初期化
var pass1 = null;
var pass2 = null;
var pass3 = null;
var pass4 = null;

// 干支の画像を押したら透明なパス画像のところに左から順番に入れていくためのif文
document.getElementById("nezumi").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "img/Nezumi.png";
        pass1 = "0";
    } else if (Path2.src == Path) {
        Path2.src = "img/Nezumi.png";
        pass2 = "0";
    } else if (Path3.src == Path) {
        Path3.src = "img/Nezumi.png";
        pass3 = "0";
    } else if (Path4.src == Path) {
        Path4.src = "img/Nezumi.png";
        pass4 = "0";
    }
})

document.getElementById("ushi").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "img/Ushi.png";
        pass1 = "1";
    } else if (Path2.src == Path) {
        Path2.src = "img/Ushi.png";
        pass2 = "1";
    } else if (Path3.src == Path) {
        Path3.src = "img/Ushi.png";
        pass3 = "1";
    } else if (Path4.src == Path) {
        Path4.src = "img/Ushi.png";
        pass4 = "1";
    }
})

document.getElementById("tora").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "img/Tora.png";
        pass1 = "2";
    } else if (Path2.src == Path) {
        Path2.src = "img/Tora.png";
        pass2 = "2";
    } else if (Path3.src == Path) {
        Path3.src = "img/Tora.png";
        pass3 = "2";
    } else if (Path4.src == Path) {
        Path4.src = "img/Tora.png";
        pass4 = "2";
    }
})

document.getElementById("usagi").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "img/Usagi.png";
        pass1 = "3";
    } else if (Path2.src == Path) {
        Path2.src = "img/Usagi.png";
        pass2 = "3";
    } else if (Path3.src == Path) {
        Path3.src = "img/Usagi.png";
        pass3 = "3";
    } else if (Path4.src == Path) {
        Path4.src = "img/Usagi.png";
        pass4 = "3";
    }
})

document.getElementById("tatu").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "img/Tatu.png";
        pass1 = "4";
    } else if (Path2.src == Path) {
        Path2.src = "img/Tatu.png";
        pass2 = "4";
    } else if (Path3.src == Path) {
        Path3.src = "img/Tatu.png";
        pass3 = "4";
    } else if (Path4.src == Path) {
        Path4.src = "img/Tatu.png";
        pass4 = "4";
    }
})

document.getElementById("hebi").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "img/Hebi.png";
        pass1 = "5";
    } else if (Path2.src == Path) {
        Path2.src = "img/Hebi.png";
        pass2 = "5";
    } else if (Path3.src == Path) {
        Path3.src = "img/Hebi.png";
        pass3 = "5";
    } else if (Path4.src == Path) {
        Path4.src = "img/Hebi.png";
        pass4 = "5";
    }
})

document.getElementById("uma").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "img/Uma.png";
        pass1 = "6";
    } else if (Path2.src == Path) {
        Path2.src = "img/Uma.png";
        pass2 = "6";
    } else if (Path3.src == Path) {
        Path3.src = "img/Uma.png";
        pass3 = "6";
    } else if (Path4.src == Path) {
        Path4.src = "img/Uma.png";
        pass4 = "6";
    }
})

document.getElementById("hithuji").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "img/Hithuji.png";
        pass1 = "7";
    } else if (Path2.src == Path) {
        Path2.src = "img/Hithuji.png";
        pass2 = "7";
    } else if (Path3.src == Path) {
        Path3.src = "img/Hithuji.png";
        pass3 = "7";
    } else if (Path4.src == Path) {
        Path4.src = "img/Hithuji.png";
        pass4 = "7";
    }
})

document.getElementById("saru").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "img/Saru.png";
        pass1 = "8";
    } else if (Path2.src == Path) {
        Path2.src = "img/Saru.png";
        pass2 = "8";
    } else if (Path3.src == Path) {
        Path3.src = "img/Saru.png";
        pass3 = "8";
    } else if (Path4.src == Path) {
        Path4.src = "img/Saru.png";
        pass4 = "8";
    }
})

document.getElementById("tori").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "img/Tori.png";
        pass1 = "9";
    } else if (Path2.src == Path) {
        Path2.src = "img/Tori.png";
        pass2 = "9";
    } else if (Path3.src == Path) {
        Path3.src = "img/Tori.png";
        pass3 = "9";
    } else if (Path4.src == Path) {
        Path4.src = "img/Tori.png";
        pass4 = "9";
    }
})

document.getElementById("inu").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "img/Inu.png";
        pass1 = "A";
    } else if (Path2.src == Path) {
        Path2.src = "img/Inu.png";
        pass2 = "A";
    } else if (Path3.src == Path) {
        Path3.src = "img/Inu.png";
        pass3 = "A";
    } else if (Path4.src == Path) {
        Path4.src = "img/Inu.png";
        pass4 = "A";
    }
})

document.getElementById("inoshishi").addEventListener("click", function () {
    if (Path1.src == Path) {
        Path1.src = "img/Inoshishi.png";
        pass1 = "B";
    } else if (Path2.src == Path) {
        Path2.src = "img/Inoshishi.png";
        pass2 = "B";
    } else if (Path3.src == Path) {
        Path3.src = "img/Inoshishi.png";
        pass3 = "B";
    } else if (Path4.src == Path) {
        Path4.src = "img/Inoshishi.png";
        pass4 = "B";
    }
})

document.getElementById("DELETE").addEventListener("click", function () {
    if (Path4.src != Path) {
        Path4.src = "img/Path.png";
    } else if (Path3.src != Path) {
        Path3.src = "img/Path.png";
    } else if (Path2.src != Path) {
        Path2.src = "img/Path.png";
    } else if (Path1.src != Path) {
        Path1.src = "img/Path.png";
    }
});

// ゲームスタートボタンを押した際の処理
document.getElementById("GameStart").addEventListener("click", function () {

    // 設定した名前をsetnameとする
    var setname = document.getElementById("name").value;

    // HTMLに文字数を出力
    var NameCount = setname.length;

    if(NameCount < 1){
        alert("なまえをいれてね");
        // 透明なパスのところに動物が四つ入っていないときにルームに入れなくする処理
    }else if(NameCount > 5){
        setname= setname.substr( 0, 5 );
        console.log(setname);
        document.getElementById("name").value = setname;
        alert("５もじまでにしてね");

    // 透明なパスのところに動物が四つ入っていないときにルームに入れなくする処理
    } else if (Path1.src == Path || Path2.src == Path || Path3.src == Path || Path4.src == Path) {
        console.log("pass足りない");
    } else {

        // 画像でパスワードを設定したものを12進数で表記した値を合わせてsetpasswordとする
        setpassword = pass1 + pass2 + pass3 + pass4;
        localStorage.setItem('setpassword', setpassword);
        console.log(setpassword);
        
        // GameStartで設定した難易度をlevelとする
        level = localStorage.getItem("level");
        console.log(level);

        // 設定した名前をsetnameとする
        setname = document.getElementById("name").value;

        // 上で設定した名前をlocalStorageに保存
        localStorage.setItem('name', setname);

        // 難易度の変数が格納されているlevelと12進数表記のsetpasswordでfirebaseを指定
        const db = firestore.collection(level).doc(setpassword);

        // 指定したfirebaseから値を取得
        db.get().then((doc) => {

            // 取得してきたfirebaseのデータからホストが作成したcraftpasswordのを取得
            craftpassword = doc.data().password;

            // 取得してきたfirebaseのデータからplayer2,3,4の名前を取得
            player2 = doc.data().player2;
            player3 = doc.data().player3;
            player4 = doc.data().player4;

            // firebaseから値を取得を完了した際の処理
            if (doc.exists) {

                const docRef = firestore.collection("Craft" + level).doc(craftpassword);
                // ホストがaddセットで作成したcraftpasswordをlocalStorageに保存
                localStorage.setItem('craftpassword', craftpassword);

                // player2がいなかった際の処理
                if (player2 == null) {
                    console.log(setname);

                    // 指定したfirebaseにuppdate
                    docRef.update({
                        // setnameに格納した名前の変数をplayer2とする
                        player2: setname
                    })
                    // player2のupdateが成功した際の処理
                        .then(() => {
                            // player2(ゲスト)であるということでlocalStorageにplayer2を保存
                            localStorage.setItem('playernumber', "player2");
                            // StandPage.htmlに画面遷移
                            window.location.href = 'StandPage.html';
                        })

                    // player3がいなかった際の処理
                } else if (player3 == null) {
                    console.log(setname);

                    // 指定したfirebaseにuppdate
                    docRef.update({

                        // setnameに格納した名前の変数をplayer3とする
                        player3: setname
                    })
                    // player3のupdateが成功した際の処理
                        .then(() => {

                            // player3(ゲスト)であるということでlocalStorageにplayer3を保存
                            localStorage.setItem('playernumber', "player3");

                            // StandPage.htmlに画面遷移
                            window.location.href = 'StandPage.html';
                        })

                    // player4がいなかった際の処理
                } else if (player4 == null) {
                    console.log(setname);

                    // 指定したfirebaseにuppdate
                    docRef.update({

                        // setnameに格納した名前の変数をplayer4とする
                        player4: setname
                    })
                    // player4のupdateが成功した際の処理
                        .then(() => {

                            // player4(ゲスト)であるということでlocalStorageにplayer4を保存
                            localStorage.setItem('playernumber', "player4");

                            // StandPage.htmlに画面遷移
                            window.location.href = 'StandPage.html';
                        })
                // player4がいた際の処理
                } else {
                    console.log("人がいっぱいでルームに入れません");
                }
                // documentがなかったなどエラーが起こった際の処理
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            // firebaseからデータをとってきた際のエラー処理
        }).catch((error) => {
            console.log("ルームがありません", error);

        });

    }
})