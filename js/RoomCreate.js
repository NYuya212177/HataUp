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

localStorage.removeItem("setpassword");
localStorage.removeItem("craftpassword");
localStorage.removeItem("playernumber");
localStorage.removeItem("name");

// 透明なパス画像のを指定している
var Path1 = document.getElementById("path1");
var Path2 = document.getElementById("path2");
var Path3 = document.getElementById("path3");
var Path4 = document.getElementById("path4");

// 透明なパス画像をあとでif文で使いたくて設定している変数
var Path = Path4.src;
// 最終のパスワードを入れるための変数の初期化
var pass1 = null;
var pass2 = null;
var pass3 = null;
var pass4 = null;

var craftpassword = null;
var setpassword = null;
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

    if (Path1.src == Path || Path2.src == Path || Path3.src == Path || Path4.src == Path) {

        console.log("pass足りない");

    } else {

        const level = localStorage.getItem("level");
        console.log(level);

        const setname = document.getElementById("name").value;

        localStorage.setItem('name', setname);

        localStorage.setItem('playernumber', "player1");

        var setpassword = pass1 + pass2 + pass3 + pass4;
        console.log(setpassword);

        firestore.collection("Craft" + level).add({
            player1: null,
            player2: null,
            player3: null,
            player4: null
        })
            .then((docRef) => {
                craftpassword = docRef.id;
                console.log("Document written with ID: ", craftpassword);
                localStorage.setItem('craftpassword', craftpassword);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

        firestore.collection(level).doc(setpassword).set({
            player1: setname,
            player2: null,
            player3: null,
            player4: null,
        })
            .then(() => {
                localStorage.setItem('setpassword', setpassword);
                console.log(localStorage);
                window.location.href = 'StandPage.html';
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

    }
})