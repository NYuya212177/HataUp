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

var playernumber = localStorage.getItem("playernumber");
console.log(playernumber);

var setname = localStorage.getItem("name");
console.log(setname);

var setpassword = localStorage.getItem("setpassword");
console.log(setpassword);

var craftpassword = localStorage.getItem("craftpassword");
console.log(craftpassword);

var level = localStorage.getItem("level");
console.log(level);
document.getElementById(playernumber).textContent = setname;

var password1 = setpassword.charAt(0);
var password2 = setpassword.charAt(1);
var password3 = setpassword.charAt(2);
var password4 = setpassword.charAt(3);

var player1 = null;
var player2 = null;
var player3 = null;
var player4 = null;

var realtimestop = 1;

for (var i = 0; i <= 3; i++) {
    var pathnumber = i + 1;
    var password = setpassword.charAt(i);
    if (password == 0) {
        let img = document.getElementById("path" + pathnumber);
        img.src = "./Path干支/Nezumi.png";
    } else if (password == 1) {
        let img = document.getElementById("path" + pathnumber);
        img.src = "./Path干支/Ushi.png";
    } else if (password == 2) {
        let img = document.getElementById("path" + pathnumber);
        img.src = "./Path干支/Tora.png";
    } else if (password == 3) {
        let img = document.getElementById("path" + pathnumber);
        img.src = "./Path干支/Usagi.png";
    } else if (password == 4) {
        let img = document.getElementById("path" + pathnumber);
        img.src = "./Path干支/Tatu.png";
    } else if (password == 5) {
        let img = document.getElementById("path" + pathnumber);
        img.src = "./Path干支/Hebi.png";
    } else if (password == 6) {
        let img = document.getElementById("path" + pathnumber);
        img.src = "./Path干支/Uma.png";
    } else if (password == 7) {
        let img = document.getElementById("path" + pathnumber);
        img.src = "./Path干支/Hithuji.png";
    } else if (password == 8) {
        let img = document.getElementById("path" + pathnumber);
        img.src = "./Path干支/Saru.png";
    } else if (password == 9) {
        let img = document.getElementById("path" + pathnumber);
        img.src = "./Path干支/Tori.png";
    } else if (password == "A") {
        let img = document.getElementById("path" + pathnumber);
        img.src = "./Path干支/Inu.png";
    } else if (password == "B") {
        let img = document.getElementById("path" + pathnumber);
        img.src = "./Path干支/Inoshishi.png";
    }
}


if (player2 == null) {
    document.getElementById("GameStart").style.display = 'none'
    console.log("非表示");
}

// if (realtimestop == 1) {
    var docRef = firestore.collection(level).doc(setpassword);
    docRef.onSnapshot((doc) => {
        player1 = doc.data().player1;
        player2 = doc.data().player2;
        player3 = doc.data().player3;
        player4 = doc.data().player4;

        var setplayer = document.getElementById(playernumber).value;

        if (setplayer == null && player1 != null) {

            document.getElementById("player1").textContent = player1;

        }
        if (setplayer == null && player2 != null) {

            document.getElementById("player2").textContent = player2;

        }
        if (setplayer == null && player3 != null) {

            document.getElementById("player3").textContent = player3;

        }
        if (setplayer == null && player4 != null) {

            document.getElementById("player4").textContent = player4;

        }

        if (player2 != null) {
            document.getElementById("GameStart").style.display = 'inline'
            console.log("表示");
        }
    });
// }else if(realtimestop == 0){
//     console.log("成功");
// }

document.getElementById("GameStart").addEventListener("click", function () {
    realtimestop = 0;
    var docRef = firestore.collection(level).doc(setpassword);
    docRef.get().then((doc) => {
        player1 = doc.data().player1;
        player2 = doc.data().player2;
        player3 = doc.data().player3;
        player4 = doc.data().player4;

        if (doc.exists) {
            //setpasswordのドキュメント削除
            var gamestart = firestore.collection(level).doc(setpassword);
            gamestart.delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
            //craftpasswordに値入力
            firestore.collection("Craft" + level).doc(craftpassword).set({
                player1: player1,
                player2: player2,
                player3: player3,
                player4: player4
            })
                .then(() => {
                    localStorage.setItem('setpassword', setpassword);
                    console.log(localStorage);
                    // window.location.href = 'StandPage.html';
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

})