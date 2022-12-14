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

localStorage.removeItem("password");
localStorage.removeItem("playernumber");
localStorage.removeItem("name");

var Path1 = document.getElementById("path1");
var Path2 = document.getElementById("path2");
var Path3 = document.getElementById("path3");
var Path4 = document.getElementById("path4");
var Path = Path4.src;

var Nezumi = document.getElementById("nezumi");
var Ushi = document.getElementById("ushi");
var Tora = document.getElementById("tora");
var Usagi = document.getElementById("usagi");
var Tatu = document.getElementById("tatu");
var Hebi = document.getElementById("hebi");
var Uma = document.getElementById("uma");
var Hithuji = document.getElementById("hithuji");
var Saru = document.getElementById("saru");
var Tori = document.getElementById("tori");
var Inu = document.getElementById("inu");
var Inoshishi = document.getElementById("inoshishi");

var pass1 = null;
var pass2 = null;
var pass3 = null;
var pass4 = null;
var setpassword = null;

Nezumi.addEventListener("click", function () {
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

Ushi.addEventListener("click", function () {
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

Tora.addEventListener("click", function () {
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

Usagi.addEventListener("click", function () {
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

Tatu.addEventListener("click", function () {
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

Hebi.addEventListener("click", function () {
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

Uma.addEventListener("click", function () {
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

Hithuji.addEventListener("click", function () {
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

Saru.addEventListener("click", function () {
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

Tori.addEventListener("click", function () {
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

Inu.addEventListener("click", function () {
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

Inoshishi.addEventListener("click", function () {
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
document.getElementById("GameStart").addEventListener("click", function () {

    if (Path1.src == Path || Path2.src == Path || Path3.src == Path || Path4.src == Path) {
        console.log("pass足りない");

    }else{

        setpassword = pass1 + pass2 + pass3 + pass4;
        console.log(setpassword);

        const level = localStorage.getItem("level");
        console.log(level);

        const name = document.getElementById("name").value;
        localStorage.setItem('name', name);

        var docRef = firestore.collection(level).doc(setpassword);
        docRef.get().then((doc) => {
            if (doc.exists) {
                localStorage.setItem('password', setpassword);

                // var db = firestore.collection(level).doc(setpassword);
                var player2 = doc.data().player2;
                var player3 = doc.data().player3;
                var player4 = doc.data().player4;
                console.log(player2)
                if(player2 == null){
                    console.log(name);
                    docRef.update({
                        player2: name
                    })
                    localStorage.setItem('playernumber', "player2");
                } else if(player3 == null){
                    console.log(name);
                    docRef.update({
                        player3: name
                    })
                    localStorage.setItem('playernumber', "player3");
                } else if(player4 == null){
                    console.log(name);
                    docRef.update({
                        player4: name
                    })
                    localStorage.setItem('playernumber', "player4");
            }
                
            } else {
                // doc.data() will be undefined in this case
                console.log("ルームなし");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
})