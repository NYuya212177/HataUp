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
const firestore = firebase.firestore();
document.getElementById("pat1").style.visibility = "hidden";
document.getElementById("pat2").style.visibility = "hidden";
document.getElementById("pat3").style.visibility = "hidden";
document.getElementById("pat4").style.visibility = "hidden";
document.getElementById("pat5").style.visibility = "hidden";
document.getElementById("pat6").style.visibility = "hidden";
document.getElementById("pat7").style.visibility = "hidden";
document.getElementById("pat8").style.visibility = "hidden";
//RoomCreateかRoomInで設定したplayernumberをplayernumberとする
const playernumber = localStorage.getItem("playernumber");
console.log(playernumber);
//RoomCreateかRoomInで設定したnameをsetnameとする
const setname = localStorage.getItem("name");
console.log(setname);
//RoomCreateかRoomInで設定したcraftpasswordをcraftpasswordとする
const craftpassword = localStorage.getItem("craftpassword");
console.log(craftpassword);
//GameStartで設定したlevelをlevelとする
const level = localStorage.getItem("level");
console.log(level);
//GameStartで設定した難易度とRoomCreateかRoomInで設定したsetpasswordでfirebaseのリファレンス指定
const docRef = firestore.collection("Craft" + level).doc(craftpassword);
//Teachable Machineエクスポートパネルによって提供されるモデルへのリンク(Teachable Machineのアップロードされたリンク)
const URL = "https://teachablemachine.withgoogle.com/models/XmYZLicmq/";
let Model, Webcam, Ctx, LabelContainer, MaxPredictions;
//getElementById...HTML要素の取得を行う
const CountStart = document.getElementById("countdown");
const Question = document.getElementById("question");

var CountTime = 3;//始まる前のカウントダウンの時間
//問題の一覧
var DownDown = ['赤上げて', '赤上げて', '赤上げて', '白上げて', '白上げて', '白上げて'];
var WhiteRise = ['赤上げて', '赤上げて', '赤上げて', '白下げて', '白下げて', '白下げて'];
var RedRise = ['白上げて', '白上げて', '白上げて', '白上げて', '赤下げて', '赤下げて', '赤下げて', '赤下げて'];
var RiseRise = ['赤下げて', '赤下げて', '赤下げて', '赤下げて', '白下げて', '白下げて', '白下げて', '白下げて'];
var RandomColor = ['0', '1'];//問題の色が変わるのをランダムで決める
var QuestionColor;//ランダムで決まった色の番号を格納
var QuestionFirst, QuestionWhiteON, QuestionRedON, QuestionONON, QuestionOne;//NOFLAG(旗が上がっていない)問題,WhiteRiseredDownFlag(白い旗が上がっている)の問題,redRisewhiteDownFlag(赤い旗が上がっている)の問題,WhiteRiseredRiseFlag(両方上がっている)の問題を格納
var Ratetime = null;//読み上げの速度
var Answers, CorrectAnswer;//回答と正解を格納
var AnswerArray = ['無'];//判定した回答を配列に格納(空だと何もしていないときに最頻値を計算するとNullになるので無を入れておく)
var TimeSetNum = null;//旗上げ全体の時間を区別するための数字
var TimetoJudg = null;//判定までの時間
var ProgressTime = null;//プログレスバーがが最大まで行く時間
var HanteiTime = null;//判定をしている間の時間
var CurrentScore = 0;//正解数を格納
const TrueSound = new Audio('mp3/true_sound.mp3');//正解した時の音声を設定
const FalseSound = new Audio('mp3/false_sound.mp3');//不正解した時の音声を設定
var FlagRise = false;//判定のONOFF
var MovementjudgmentStop = true;//最頻値の判定の繰り返しを止める
var ModeStr;//最頻値で出された配列の文字を格納
var op = {//旗が上がっている状態をtrue,下がっている状態をfalse
    WhiteOP: false,
    RedOP: false,
};
//setIntervalをいれる
var First, Progress, Loop1, Loop2, Loop3, Loop4, Move, Judge, Count;
var FeintON = true; //問題の難易度上げを1度だけするコード
//参加者登録
var player1 = null;
var player2 = null;
var player3 = null;
var player4 = null;
//GameStartのオンオフ
var GameStart = true;
//初期ライフ,正解数
var Life = null;
var hp = null;
var HP = hp;
var miss = 0;
var Heartpoint = null;
var point = 0;
//firebaseの問題
var Quiz, NextQuiz;
// 回答結果の画像を貼るdocument
let GameNav = document.getElementById("GameNav");

//開始時の人数からライフの設定
docRef.get().then((doc) => {
    //firebaseに上がっているそれぞれのプレイヤー名をプレイヤーナンバーの変数に格納
    player1 = doc.data().player1;
    player2 = doc.data().player2;
    player3 = doc.data().player3;
    player4 = doc.data().player4;
    //指定したfirebaseから値を取得してこれた際の処理
    if (doc.exists) {
        if (player2 == null) {
            alert("エラーが発生しました");
            //エラーが発生した時にホームに移動
            location.href = "./GameStart.html";
        } else if (player3 == null) {
            Life = "4";
            for (var i = 1; i <= 4; i++) {
                document.getElementById("pat" + i).style.visibility = "visible";
            }
        } else if (player4 == null) {
            Life = "6";
            for (var i = 1; i <= 6; i++) {
                document.getElementById("pat" + i).style.visibility = "visible";
            }
        } else {
            Life = "8";
            for (var i = 1; i <= 8; i++) {
                document.getElementById("pat" + i).style.visibility = "visible";
            }
        }
        hp = Life;
    }
}).catch((error) => {
    console.error("Error removing document: ", error);
});

//参加者全体の正解数を求める
docRef.onSnapshot((doc) => {
    var point1 = doc.data().Score1;
    var point2 = doc.data().Score2;
    var point3 = doc.data().Score3;
    var point4 = doc.data().Score4;
    if (player1 == null) {
        console.log("error");
    } else if (player2 == null) {
        point = point1 + point2;
    } else if (player3 == null) {
        point = point1 + point2 + point3;
    } else if (player4 == null) {
        point = point1 + point2 + point3 + point4;
    }
    document.getElementById("score").innerHTML = point;
});

//全体のライフを計算
docRef.onSnapshot((doc) => {
    var life1 = doc.data().life1;
    var life2 = doc.data().life2;
    var life3 = doc.data().life3;
    var life4 = doc.data().life4;
    if (player1 == null) {
        console.log("error");
    } else if (player2 == null) {
        Heartpoint = life1 + life2;
    } else if (player3 == null) {
        Heartpoint = life1 + life2 + life3;
    } else if (player4 == null) {
        Heartpoint = life1 + life2 + life3 + life4;
    }
    HP = hp - Heartpoint;
    var hart = HP + 1;
    console.log("HP", HP);
    if (hart <= 5) {
        let HartId = document.getElementById("pat" + hart);
        HartId.src = "img/nohart.png";
        CountStart.style.opacity = 1;//CountStartを表示させる
        CountStart.innerText = "はたをさげてね";//ユーザーに初期状態になってもらう
    }
    if (HP === 0) { //ライフが0になったときにリザルト画面に行く
        docRef.update({
            GameStart: "false",
        })
        //間違えたりタイムオーバー時にライフが無い場合リザルト画面に移動
        location.href = "./Result.html";
    }
});

//DOM要素を読み込む
document.addEventListener("DOMContentLoaded", function (event) {
    WEBCAMERA();
});

//画像モデルを読み込み、ウェブカメラをセットアップする
async function WEBCAMERA() {
    const ModelURL = URL + "model.json";
    const MetadataURL = URL + "metadata.json";
    //学習モデルの読み込みと入力クラスの取得
    Model = await tmPose.load(ModelURL, MetadataURL);
    MaxPredictions = Model.getTotalClasses();
    //Webカメラの起動準備
    const Flip = true;//ウェブカメラを反転するかどうか
    const Size = window.parent.screen.width / 2;//windowウェブカメラをセットアップするための機能
    Webcam = new tmPose.Webcam(Size, Size, Flip);//幅、高さ、反転
    await Webcam.setup();//ウェブカメラへのアクセスをリクエストする
    Webcam.webcam.playsInline = true;//iphoneで動かすコード
    await Webcam.play();//カメラの起動
    //アクセス許可されたら準備okにする
    var StandbyName = setname + "準備OK";
    if (playernumber == "player1") {
        SetQuestion();
        docRef.update({
            player1: StandbyName
        })
    } else if (playernumber == "player2") {
        docRef.update({
            player2: StandbyName
        })
    } else if (playernumber == "player3") {
        docRef.update({
            player3: StandbyName
        })
    } else if (playernumber == "player4") {
        docRef.update({
            player4: StandbyName
        })
    }
    window.requestAnimationFrame(LOOP);//判定の処理を動かす
    //DOMに要素を追加する
    const Canvas = document.getElementById("Canvas");
    Canvas.width = Size; Canvas.height = Size;
    Ctx = Canvas.getContext("2d");
    //モデルにあるすべてのクラス要素にdivタグをつける
    LabelContainer = document.getElementById("label-container");
    for (let i = 0; i < MaxPredictions; i++) {
        LabelContainer.appendChild(document.createElement("div"));
    }
}

//最初の問題を設定する
function SetQuestion() {
    QuestionOne = DownDown[Math.floor(Math.random() * DownDown.length)];//DownDownの中から問題をシャッフル
    docRef.update({
        Quiz: QuestionOne
    })
}

//次に出る問題を取得する
docRef.onSnapshot((doc) => {
    Quiz = doc.data().Quiz;
});

//GameStart(ゲームの開始)がtrueになったとき
docRef.onSnapshot((doc) => {
    if (GameStart == true) {
        //firebaseに上がっているそれぞれのプレイヤー名をプレイヤーナンバーの変数に格納
        player1 = doc.data().player1;
        player2 = doc.data().player2;
        player3 = doc.data().player3;
        player4 = doc.data().player4
        if (doc.exists) {
            if (player3 == null) {
                //指定したfirebaseから値を取得してこれた際の処理
                var Standby1 = player1.substr(-4);
                console.log("player1 : " + Standby1);
                var Standby2 = player2.substr(-4);
                console.log("player2 : " + Standby2);
                if (Standby1 === "準備OK" && Standby2 === "準備OK") {
                    //GAMESTART(ゲームの開始)に移動する
                    GAMESTART();
                }
            } else if (player4 == null) {
                //指定したfirebaseから値を取得してこれた際の処理
                var Standby1 = player1.substr(-4);
                console.log("player1 : " + Standby1);
                var Standby2 = player2.substr(-4);
                console.log("player2 : " + Standby2);
                var Standby3 = player3.substr(-4);
                console.log("player3 : " + Standby3);
                if (Standby1 === "準備OK" && Standby2 === "準備OK" && Standby3 === "準備OK") {
                    //GAMESTART(ゲームの開始)に移動する
                    GAMESTART();
                }
            } else {
                //指定したfirebaseから値を取得してこれた際の処理
                var Standby1 = player1.substr(-4);
                console.log("player1 : " + Standby1);
                var Standby2 = player2.substr(-4);
                console.log("player2 : " + Standby2);
                var Standby3 = player3.substr(-4);
                console.log("player3 : " + Standby3);
                var Standby4 = player4.substr(-3);
                console.log("player4 : " + Standby4);
                if (Standby1 === "準備OK" && Standby2 === "準備OK" && Standby3 === "準備OK" && Standby4 === "準備OK") {
                    //GAMESTART(ゲームの開始)に移動する
                    GAMESTART();
                }
            }
        }
    }
});

//ゲームの開始
function GAMESTART() {
    console.log("スタート")
    GameStart = false;
    Ratetime = 0.5;//読み上げの速度を0.5に設定
    ProgressTime = 38;//プログレスバーが19で最大に行く
    //カウントダウンの開始 1秒ごとにCOUNTDOWNに移動する
    Count = setInterval(COUNTDOWN, 1000);//setInterval…一定時間ごとに特定の処理を繰り返す
    //旗が上がっていない状態からのスタート 5秒後にNOFLAGに移動する
    First = setInterval(NOFLAG, 5000);
};

//ゲーム開始までのカウントダウン
function COUNTDOWN() {
    //CountTime(3)から1秒ごとに1引いて、0になったら表示を消す
    if (CountTime > 0) {
        CountStart.innerText = CountTime;
        CountTime--;
    } else if (CountTime === 0) {
        clearInterval(Count);//setIntervalの繰り返しを止める
        CountStart.style.opacity = 0;
    };
};

//プログレスバーで判定までのカウントダウン
function ProgressBar() {
    if (document.getElementById('Qcountdown').value < 100) {
        document.getElementById('Qcountdown').value += 2;
        setTimeout(ProgressBar, ProgressTime);//時間を設定したらバーが最大までいく
    }
}

//旗が上がっていない状態からスタートした場合 出題問題(赤上げて, 白上げて)
function NOFLAG() {
    clearInterval(First);//setIntervalの繰り返しを止める//setIntervalをクリア
    QuestionFirst = Quiz;//firebaseに上がった問題を格納
    if (CurrentScore >= 5) {//正解数が5問以上になると問題の色が変わる
        QuestionColor = RandomColor[Math.floor(Math.random() * RandomColor.length)];//RandomColorの中から数字をシャッフル(0なら色が変わる,1なら色が変わらない)
        if (QuestionColor == 0) {
            if ('白上げて' == QuestionFirst) {
                var QuestionFirstCharacter = QuestionFirst.slice(0, 1);//問題の1番目の文字を取得
                //取得した1番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = '<span style="color:red;">' + QuestionFirstCharacter + '</span>' + QuestionFirst.slice(-3);
            } else if ('赤上げないで白上げて' == QuestionFirst) {
                var QuestionFirstCharacter = QuestionFirst.slice(6, 7);//問題の1番目の文字を取得
                //取得した7番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = QuestionFirst.slice(6) + '<span style="color:red;">' + QuestionFirstCharacter + '</span>' + QuestionFirst.slice(-3);
            } else if ('赤上げて' == QuestionFirst) {
                var QuestionFirstCharacter = QuestionFirst.slice(0, 1);//問題の1番目の文字を取得
                //取得した1番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = '<span style="color:white;">' + QuestionFirstCharacter + '</span>' + QuestionFirst.slice(-3);
            } else if ('白上げないで赤上げて' == QuestionFirst) {
                var QuestionFirstCharacter = QuestionFirst.slice(6, 7);//問題の1番目の文字を取得
                //取得した7番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = QuestionFirst.slice(6) + '<span style="color:white;">' + QuestionFirstCharacter + '</span>' + QuestionFirst.slice(-3);
            }
        } else if (QuestionColor == 1) {
            Question.innerText = QuestionFirst;//問題を表示
        }
    } else {
        Question.innerText = QuestionFirst;//問題を表示
    }
    console.log("問題は", QuestionFirst);
    //問題の読み上げ
    if ('speechSynthesis' in window) {//ブラウザにWeb Speech API Speech Synthesis機能があるか判定
        console.log("音声の読み上げをしている")
        const SpeechSet = new SpeechSynthesisUtterance()//発言を設定
        SpeechSet.text = QuestionFirst//テキストを設定
        SpeechSet.lang = "ja-JP"//言語を設定
        SpeechSet.rate = Ratetime//速度を設定
        SpeechSet.pitch = 1//高さを設定
        SpeechSet.volume = 1//音量を設定
        window.speechSynthesis.speak(SpeechSet)//発言を再生 
    }
    //問題の正解を格納
    if ('赤上げて' == QuestionFirst) { //赤をあげる問題だった場合 A.右手が上がっている
        CorrectAnswer = "右手あげてる";
        TimeSetNum = 0;//時間設定の区分0を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    } else if ('白上げて' == QuestionFirst) {//白をあげる問題だった場合 A.左手が上がっている
        CorrectAnswer = "左手あげてる";
        TimeSetNum = 0;//時間設定の区分0を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    } else if ('赤上げないで白上げて' == QuestionFirst) {//白をあげる問題だった場合 A.左手が上がっている
        CorrectAnswer = "左手あげてる";
        TimeSetNum = 1;//時間設定の区分1を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    } else if ('白上げないで赤上げて' == QuestionFirst) {//赤をあげる問題だった場合 A.右手が上がっている
        CorrectAnswer = "右手あげてる";
        TimeSetNum = 1;//時間設定の区分1を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    };
    QuestionFirst = "";//取得をしたら初期化する
    Loop1 = setInterval(LOOPFLAG, TimetoJudg);//設定した秒数後にLOOPFLAG(判定の開始)の処理に移動する
};

//白い旗だけ上がっている状態からスタートした場合 出題問題(赤上げて, 白下げて)
function WhiteRiseredDownFlag() {
    QuestionWhiteON = Quiz;//firebaseに上がった問題を格納
    if (CurrentScore >= 5) {//正解数が5問以上になると問題の色が変わる
        QuestionColor = RandomColor[Math.floor(Math.random() * RandomColor.length)];//RandomColorの中から数字をシャッフル(0なら色が変わる,1なら色が変わらない)
        if (QuestionColor == 0) {
            if ('白下げて' == QuestionWhiteON) {
                var QuestionFirstCharacter = QuestionWhiteON.slice(0, 1);//問題の1番目の文字を取得
                //取得した1番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = '<span style="color:red;">' + QuestionFirstCharacter + '</span>' + QuestionWhiteON.slice(-3);
            } else if ('赤上げないで白下げて' == QuestionWhiteON) {
                var QuestionFirstCharacter = QuestionWhiteON.slice(6, 7);//問題の1番目の文字を取得
                //取得した7番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = QuestionWhiteON.slice(6) + '<span style="color:red;">' + QuestionFirstCharacter + '</span>' + QuestionWhiteON.slice(-3);
            } else if ('赤上げて' == QuestionWhiteON) {
                var QuestionFirstCharacter = QuestionWhiteON.slice(0, 1);//問題の1番目の文字を取得
                //取得した1番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = '<span style="color:white;">' + QuestionFirstCharacter + '</span>' + QuestionWhiteON.slice(-3);
            } else if ('白下げないで赤上げて' == QuestionWhiteON) {
                var QuestionFirstCharacter = QuestionWhiteON.slice(6, 7);//問題の1番目の文字を取得
                //取得した7番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = QuestionWhiteON.slice(6) + '<span style="color:white;">' + QuestionFirstCharacter + '</span>' + QuestionWhiteON.slice(-3);
            }
        } else if (QuestionColor == 1) {
            Question.innerText = QuestionWhiteON; //問題を表示
        }
    } else {
        Question.innerText = QuestionWhiteON;//問題を表示
    }
    console.log("問題は", QuestionWhiteON);
    //問題の読み上げ
    if ('speechSynthesis' in window) {//ブラウザにWeb Speech API Speech Synthesis機能があるか判定
        console.log("音声の読み上げをしている")
        const SpeechSet = new SpeechSynthesisUtterance()//発言を設定
        SpeechSet.text = QuestionWhiteON//テキストを設定 
        SpeechSet.lang = "ja-JP"//言語を設定
        SpeechSet.rate = Ratetime//速度を設定
        SpeechSet.pitch = 1//高さを設定
        SpeechSet.volume = 1//音量を設定
        window.speechSynthesis.speak(SpeechSet)//発言を再生 
    }
    //問題の正解を格納
    if ('赤上げて' == QuestionWhiteON) {//赤をあげる問題だった場合 A.両手が上がっている
        CorrectAnswer = "両手上げてる";
        TimeSetNum = 0;//時間設定の区分0を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    } else if ('白下げて' == QuestionWhiteON) {//白を下げる問題だった場合 A.両手が下がっている
        CorrectAnswer = "両手下げてる";
        TimeSetNum = 0;//時間設定の区分0を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    } else if ('赤上げないで白下げて' == QuestionWhiteON) {//白を下げる問題だった場合 A.両手が下がっている
        CorrectAnswer = "両手下げてる";
        TimeSetNum = 1;//時間設定の区分1を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    } else if ('白下げないで赤上げて' == QuestionWhiteON) {//赤をあげる問題だった場合 A.両手が上がっている
        CorrectAnswer = "両手上げてる";
        TimeSetNum = 1;//時間設定の区分1を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    };
    QuestionWhiteON = "";//取得をしたら初期化する
    Loop2 = setInterval(LOOPFLAG, TimetoJudg); //設定した秒数後にLOOPFLAG(判定の開始)の処理に移動する
};

//赤い旗だけ上がっている状態からスタートした場合 出題問題(赤下げて, 白上げて)
function RedRisewhiteDownFlag() {
    QuestionRedON = Quiz;//firebaseに上がった問題を格納
    if (CurrentScore >= 5) {//正解数が5問以上になると問題の色が変わる
        QuestionColor = RandomColor[Math.floor(Math.random() * RandomColor.length)];//RandomColorの中から数字をシャッフル(0なら色が変わる,1なら色が変わらない)
        if (QuestionColor == 0) {
            if ('白上げて' == QuestionRedON) {
                var QuestionFirstCharacter = QuestionRedON.slice(0, 1);//問題の1番目の文字を取得
                //取得した1番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = '<span style="color:red;">' + QuestionFirstCharacter + '</span>' + QuestionRedON.slice(-3);
            } else if ('赤下げないで白上げて' == QuestionRedON) {
                var QuestionFirstCharacter = QuestionRedON.slice(6, 7);//問題の1番目の文字を取得
                //取得した7番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = QuestionRedON.slice(6) + '<span style="color:red;">' + QuestionFirstCharacter + '</span>' + QuestionRedON.slice(-3);
            } else if ('赤下げて' == QuestionRedON) {
                var QuestionFirstCharacter = QuestionRedON.slice(0, 1);//問題の1番目の文字を取得
                //取得した1番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = '<span style="color:white;">' + QuestionFirstCharacter + '</span>' + QuestionRedON.slice(-3);
            } else if ('白上げないで赤下げて' == QuestionRedON) {
                var QuestionFirstCharacter = QuestionRedON.slice(6, 7);//問題の1番目の文字を取得
                //取得した7番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = QuestionRedON.slice(6) + '<span style="color:white;">' + QuestionFirstCharacter + '</span>' + QuestionRedON.slice(-3);
            }
        } else if (QuestionColor == 1) {
            Question.innerText = QuestionRedON;//問題を表示
        }
    } else {
        Question.innerText = QuestionRedON;//問題を表示
    }
    console.log("問題は", QuestionRedON);
    //問題の読み上げ
    if ('speechSynthesis' in window) {//ブラウザにWeb Speech API Speech Synthesis機能があるか判定
        console.log("音声の読み上げをしている")
        const SpeechSet = new SpeechSynthesisUtterance()//発言を設定
        SpeechSet.text = QuestionRedON//テキストを設定 
        SpeechSet.lang = "ja-JP"//言語を設定
        SpeechSet.rate = Ratetime//速度を設定
        SpeechSet.pitch = 1//高さを設定
        SpeechSet.volume = 1//音量を設定
        window.speechSynthesis.speak(SpeechSet)//発言を再生 
    }
    //問題の正解を格納
    if ('赤下げて' == QuestionRedON) {//赤を下げる問題だった場合 A.両手が下がっている
        CorrectAnswer = "両手下げてる";
        TimeSetNum = 0;//時間設定の区分0を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    } else if ('白上げて' == QuestionRedON) {//白をあげる問題だった場合 A.両手が上がっている
        CorrectAnswer = "両手上げてる";
        TimeSetNum = 0;//時間設定の区分0を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    } else if ('白上げないで赤下げて' == QuestionRedON) {//赤を下げる問題だった場合 A.両手が下がっている
        CorrectAnswer = "両手下げてる";
        TimeSetNum = 1;//時間設定の区分1を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    } else if ('赤下げないで白上げて' == QuestionRedON) {//白をあげる問題だった場合 A.両手が上がっている
        CorrectAnswer = "両手上げてる";
        TimeSetNum = 1;//時間設定の区分1を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    };
    QuestionRedON = "";//取得をしたら初期化する
    Loop3 = setInterval(LOOPFLAG, TimetoJudg);//設定した秒数後にLOOPFLAG(判定の開始)の処理に移動する
};

//両方上がっている状態からスタートした場合 出題問題(赤下げて, 白下げて)
function WhiteRiseredRiseFlag() {
    QuestionONON = Quiz;//firebaseに上がった問題を格納
    if (CurrentScore >= 5) {//正解数が5問以上になると問題の色が変わる
        QuestionColor = RandomColor[Math.floor(Math.random() * RandomColor.length)];//RandomColorの中から数字をシャッフル(0なら色が変わる,1なら色が変わらない)
        if (QuestionColor == 0) {
            if ('白下げて' == QuestionONON) {
                var QuestionFirstCharacter = QuestionONON.slice(0, 1);//問題の1番目の文字を取得
                //取得した1番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = '<span style="color:red;">' + QuestionFirstCharacter + '</span>' + QuestionONON.slice(-3);
            } else if ('赤下げないで白下げて' == QuestionONON) {
                var QuestionFirstCharacter = QuestionONON.slice(6, 7);//問題の1番目の文字を取得
                //取得した7番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.inneHTML = QuestionONON.slice(6) + '<span style="color:red;">' + QuestionFirstCharacter + '</span>' + QuestionONON.slice(-3);
            } else if ('赤下げて' == QuestionONON) {
                var QuestionFirstCharacter = QuestionONON.slice(0, 1);//問題の1番目の文字を取得
                //取得した1番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = '<span style="color:white;">' + QuestionFirstCharacter + '</span>' + QuestionONON.slice(-3);
            } else if ('白下げないで赤下げて' == QuestionONON) {
                var QuestionFirstCharacter = QuestionONON.slice(6, 7);//問題の1番目の文字を取得
                //取得した7番目の文字の色を変えて後ろに通常色の問題の続きを入れる
                Question.innerHTML = QuestionONON.slice(6) + '<span style="color:white;">' + QuestionFirstCharacter + '</span>' + QuestionONON.slice(-3);
            }
        } else if (QuestionColor == 1) {
            Question.innerText = QuestionONON;//問題を表示
        }
    } else {
        Question.innerText = QuestionONON;//問題を表示
    }
    console.log("問題は", QuestionONON);
    //問題の読み上げ
    if ('speechSynthesis' in window) {//ブラウザにWeb Speech API Speech Synthesis機能があるか判定
        console.log("音声の読み上げをしている")
        const SpeechSet = new SpeechSynthesisUtterance()//発言を設定
        SpeechSet.text = QuestionONON//テキストを設定 
        SpeechSet.lang = "ja-JP"//言語を設定
        SpeechSet.rate = Ratetime//速度を設定
        SpeechSet.pitch = 1//高さを設定
        SpeechSet.volume = 1//音量を設定
        window.speechSynthesis.speak(SpeechSet)//発言を再生 
    }
    //問題の正解を格納
    if ('赤下げて' == QuestionONON) {//赤を下げる問題だった場合 A.左手が上がっている
        CorrectAnswer = "左手あげてる";
        TimeSetNum = 0;//時間設定の区分0を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    } else if ('白下げて' == QuestionONON) {//白を下げる問題だった場合 A.右手が上がっている
        CorrectAnswer = "右手あげてる";
        TimeSetNum = 0;//時間設定の区分0を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    } else if ('白下げないで赤下げて' == QuestionONON) {//赤を下げる問題だった場合 A.左手が下がっている
        CorrectAnswer = "両手下げてる";
        TimeSetNum = 1;//時間設定の区分1を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    } else if ('赤下げないで白下げて' == QuestionONON) {//白を下げる問題だった場合 A.右手が上がっている
        CorrectAnswer = "右手あげてる";
        TimeSetNum = 1;//時間設定の区分1を入れる
        AllTimeSet();//AllTimeSet(時間設定)の処理に移動する
    };
    QuestionONON = "";//取得をしたら初期化する
    Loop4 = setInterval(LOOPFLAG, TimetoJudg);//設定した秒数後にLOOPFLAG(判定の開始)の処理に移動する
};

//判定が開始されるまで時間,プログレスバーの進む速度,判定がされている時間を設定
function AllTimeSet() {
    if (TimeSetNum == 0) {//TimeSetNumが0の場合の処理
        if (Ratetime == 0.5) {
            TimetoJudg = 500;//判定が開始されるまでの時間
            ProgressTime = 38;//プログレスバーの進む速度
            HanteiTime = 3000;//判定がされている時間を設定
        } else if (Ratetime == 0.6) {
            TimetoJudg = 450;
            ProgressTime = 31;
            HanteiTime = 2500;
        } else if (Ratetime == 0.7) {
            TimetoJudg = 400;
            ProgressTime = 20;
            HanteiTime = 2000;
        } else if (Ratetime == 0.8) {
            TimetoJudg = 350;
            ProgressTime = 17;
            HanteiTime = 1500;
        } else if (Ratetime == 0.9) {
            TimetoJudg = 300;
            ProgressTime = 18
            HanteiTime = 1000;
        } else if (Ratetime == 1.0) {
            TimetoJudg = 250;
            ProgressTime = 3;
            HanteiTime = 1000;
        };
    } else if (TimeSetNum == 1) {//TimeSetNumが1の場合の処理
        if (Ratetime == 0.5) {
            TimetoJudg = 3000;//判定が開始されるまでの時間
            ProgressTime = 40;//プログレスバーの進む速度
            HanteiTime = 3000;//判定がされている時間を設定
        } else if (Ratetime == 0.6) {
            TimetoJudg = 2500;
            ProgressTime = 30;
            HanteiTime = 2500;
        } else if (Ratetime == 0.7) {
            TimetoJudg = 2000;
            ProgressTime = 26;
            HanteiTime = 2000;
        } else if (Ratetime == 0.8) {
            TimetoJudg = 2000;
            ProgressTime = 16;
            HanteiTime = 1500;
        } else if (Ratetime == 0.9) {
            TimetoJudg = 2000;
            ProgressTime = 18
            HanteiTime = 1000;
        } else if (Ratetime == 1.0) {
            TimetoJudg = 2000;
            ProgressTime = 5;
            HanteiTime = 1000;
        };
    }
}

//モデルの判定を繰り返し実行
function LOOPFLAG() {
    console.log("判定開始！")
    ProgressBar();//ProgressBar(カウントダウンの開始)の処理に移動する
    FlagRise = true;//判定が出来るようにFlagRiseをtrueにする
    MovementjudgmentStop = true;//最頻値の判定の繰り返しを動かす
    //setIntervalの繰り返しを止める
    clearInterval(Loop1);
    clearInterval(Loop2);
    clearInterval(Loop3);
    clearInterval(Loop4);
}

//モデルの判定をし続ける
async function LOOP() {
    Webcam.update();//ウェブカメラフレームを更新する
    await PREDICT();//PREDICT(モデルの判定)の処理に移動する
    window.requestAnimationFrame(LOOP);//判定の処理を動かす
}

//モデルの判定処理
async function PREDICT() {
    //判定1:ポーズを介して入力を実行する
    const { pose, posenetOutput } = await Model.estimatePose(Webcam.canvas);//estimatePose...画像,ビデオ,キャンバスのhtml要素を受け取ることが出来る
    //判定2:教示可能な機械分類モデルを通じて入力を実行する
    const Prediction = await Model.predict(posenetOutput);
    for (let i = 0; i < MaxPredictions; i++) {
        const Name = Prediction[i].className;//クラス名の取得
        const Value = Prediction[i].probability.toFixed(2); //認識率の取得
        //FlagRiseがtrueの間判定をする
        if (FlagRise == true) {
            if (MovementjudgmentStop == true) {
                Move = setInterval(Movementjudgment, 3000);//3秒後にMovementjudgment(最頻値を求めての処理)に移動する
                MovementjudgmentStop = false;//最頻値の判定の繰り返しを止める
            }
            //右手が上げられた場合
            if (Name == "右" && Value >= 1) {
                //赤い旗の表示
                let RedFlagImg = document.getElementById("Hatahuman");
                RedFlagImg.src = "img/righthand.png";
                AnswerArray.push("右");//配列AnswerArrayに"右"を格納する
            }
            //左手が上げられた場合
            if (Name == "左" && Value >= 1) {
                //白い旗の表示
                let WhiteFlagImg = document.getElementById("Hatahuman");
                WhiteFlagImg.src = "img/lefthand.png";
                AnswerArray.push("左");//配列AnswerArrayに"左"を格納する
            }
            //何も上げていない場合
            if (Name == "無" && Value >= 1) {
                //何もないときの表示
                let NoFlagImg = document.getElementById("Hatahuman");
                NoFlagImg.src = "img/nohand.png";
                AnswerArray.push("無");//配列AnswerArrayに"無"を格納する
            }
            //両手が上がっている場合
            if (Name == "両手" && Value >= 1) {
                //両手の表示
                let ALLFlagImg = document.getElementById("Hatahuman");
                ALLFlagImg.src = "img/Allhand.png";
                AnswerArray.push("両");//配列AnswerArrayに"両"を格納する
            }
        };
    }
}

//格納された判定した内容から最頻値を求めて回答をする
function Movementjudgment() {
    clearInterval(Move);//setIntervalの繰り返しを止める
    console.log(AnswerArray);
    const c = (x, i, v) => (x[i] ? x[i].add(v) : x[i] = new Set(v), i);
    //回答が格納された配列の後ろ2つからデータを取得する
    const ModeJuge = AnswerArray.slice(-2);
    console.log(ModeJuge);
    //最頻値を計算
    const Mode = ModeJuge.reduce(function (x, v) { return (this.set(v, c(x, (this.get(v) + 1 || 1), v)), x); }.bind(new Map), []).pop();
    Mode.forEach(function (ModeData) {//最頻値として出された配列の文字をModStrに入れる
        console.log("最頻値:", ModeData);
        ModeStr = ModeData;
    });
    AnswerArray = ['無'];//配列の初期化とエラーを起こさないために値を入れておく

    //判定した結果をコンソールログに表示
    if (ModeStr == "右") {
        console.log("右手あげてる");
        //赤い旗の表示
        let RedFlagImg = document.getElementById("Hatahuman");
        RedFlagImg.src = "img/righthand.png";
        op.RedOP = true;//trueにして赤の旗を上がっている状態にする
        op.WhiteOP = false;//falseにして白の旗を下がっている状態にする
        FlagRise = false;//判定を止める
        Answers = "右手あげてる";//自分の回答を格納
        CHECKANSWER();//CHECKANSWER(正誤判定)の処理に移動する
    }
    if (ModeStr == "左") {
        console.log("左手あげてる");
        //白い旗の表示
        let WhiteFlagImg = document.getElementById("Hatahuman");
        WhiteFlagImg.src = "img/lefthand.png";
        op.WhiteOP = true;//trueにして白の旗を上がっている状態にする
        op.RedOP = false;//falseにして赤の旗を下がっている状態にする
        FlagRise = false;//判定を止める
        Answers = "左手あげてる";//自分の回答を格納
        CHECKANSWER();//CHECKANSWER(正誤判定)の処理に移動する
    }
    if (ModeStr == "無") {
        console.log("両手下げてる");
        //何もないときの表示
        let NoFlagImg = document.getElementById("Hatahuman");
        NoFlagImg.src = "img/nohand.png";
        op.WhiteOP = false;//falseにして白の旗を下がっている状態にする
        op.RedOP = false;//falseにして赤の旗を下がっている状態にする
        FlagRise = false;//判定を止める
        Answers = "両手下げてる";//自分の回答を格納
        CHECKANSWER();//CHECKANSWER(正誤判定)の処理に移動する
    }
    if (ModeStr == "両") {
        console.log("両手上げてる");
        //両手の表示
        let ALLFlagImg = document.getElementById("Hatahuman");
        ALLFlagImg.src = "img/Allhand.png";
        op.WhiteOP = true;//trueにして白の旗を上がっている状態にする
        op.RedOP = true;//trueにして赤の旗を上がっている状態にする
        Answers = "両手上げてる";//自分の回答を格納
        CHECKANSWER();//CHECKANSWER(正誤判定の処理)に移動する
    }
}

//正誤判定する
function CHECKANSWER() {
    console.log("YourAnswers", Answers);
    console.log("CorrectAnswer", CorrectAnswer);
    if (Answers === CorrectAnswer) {//回答が正解だった場合の処理
        TrueSound.play();//正解の音声を再生
        console.log("正解");
        //正解と表示する
        GameNav.src = "./img/maru.png";
        CurrentScore++;//正解数に1を足す
        //firebaseの正解数を更新
        if (playernumber == "player1") {
            docRef.update({
                Score1: CurrentScore
            })
        } else if (playernumber == "player2") {
            docRef.update({
                Score2: CurrentScore
            })
        } else if (playernumber == "player3") {
            docRef.update({
                Score3: CurrentScore
            })
        } else if (playernumber == "player4") {
            docRef.update({
                Score4: CurrentScore
            })
        }
        if (CurrentScore > 5) {//正解数が5問を超えたらフェイント問題が追加される
            if (FeintON == true) {
                FeintON = false;//1度だけ追加するようにする
                DownDown.push("赤上げないで白上げて", "赤上げないで白上げて", "赤上げないで白上げて", "白上げないで赤上げて", "白上げないで赤上げて", "白上げないで赤上げて");
                WhiteRise.push("赤上げないで白下げて", "赤上げないで白下げて", "赤上げないで白下げて", "白下げないで赤上げて", "白下げないで赤上げて", "白下げないで赤上げて");
                RedRise.push("白上げないで赤下げて", "白上げないで赤下げて", "白上げないで赤下げて", "赤下げないで白上げて", "赤下げないで白上げて", "赤下げないで白上げて");
                RiseRise.push("白下げないで赤下げて", "白下げないで赤下げて", "白下げないで赤下げて", "赤下げないで白下げて", "赤下げないで白下げて", "赤下げないで白下げて");
            }
        }
        Judge = setInterval(JudgeQuestion, 2000);//JudgeQuestion(問題の振り分けの処理)に行く
    } else {
        FalseSound.play();//不正解の音声を再生
        console.log("残念");
        //不正解と表示する
        GameNav.src = "./img/batu.png";
        //上げている旗のリセット
        op.RedOP = false;//falseにして赤の旗を下がっている状態にする
        op.WhiteOP = false;//falseにして白の旗を下がっている状態にする
        ADJUSTSCORE();///ADJUSTSCORE(ミスした時の処理)移動する
        Judge = setInterval(JudgeQuestion, 4000);//JudgeQuestion(問題の振り分けの処理)に行く
    }
    Answers = "";//Answersの初期化
    document.getElementById('Qcountdown').value = 0;//プログレスバーの初期化
    document.getElementById("score").innerHTML = CurrentScore;//スコアを表示
}

//残り残機を表示する
function ADJUSTSCORE() {
    if (Life > 0) {
        Life--;//ライフから1を引く
        miss++;
        console.log("life" + Life);
        console.log("miss" + miss);
        if (playernumber == "player1") {
            docRef.update({
                life1: miss
            })
        } else if (playernumber == "player2") {
            docRef.update({
                life2: miss
            })
        } else if (playernumber == "player3") {
            docRef.update({
                life3: miss
            })
        } else if (playernumber == "player4") {
            docRef.update({
                life4: miss
            })
        }
    }
}

///現在のプレイヤーの状態から問題の振り分け
function JudgeQuestion() {
    clearInterval(Judge);//setIntervalの繰り返しを止める
    CountStart.style.opacity = 0;//CountStartを非表示にさせる
    GameNav.src = "./img/Path.png";//透明の画像を入れる
    if ((op.WhiteOP === true) && (op.RedOP === true)) {//赤い旗と白い旗の両方が上がっている
        console.log("両手が上がっているときの問題");
        if (playernumber === "player1") {//問題をfirebaseに送る
            QuestionONON = RiseRise[Math.floor(Math.random() * RiseRise.length)];//RiseRiseの中からランダムで問題を表示
            FirebaseSetQuiz = QuestionONON;
            docRef.update({
                Quiz: FirebaseSetQuiz
            })
        }
        setTimeout(WhiteRiseredRiseFlag, 1000);//WhiteRiseredRiseFlag(両手が上がっているときの問題)に行く
    } else if ((op.WhiteOP === true) && (op.RedOP === false)) {//白い旗だけ上がっている
        console.log("白だけが上がっているときの問題");
        if (playernumber === "player1") {//問題をfirebaseに送る
            QuestionWhiteON = WhiteRise[Math.floor(Math.random() * WhiteRise.length)];//WhiteRiseの中から問題をシャッフル
            FirebaseSetQuiz = QuestionWhiteON;
            docRef.update({
                Quiz: FirebaseSetQuiz
            })
        }
        setTimeout(WhiteRiseredDownFlag, 1000);//WhiteRiseredDownFlag(白だけが上がっているときの問題)に行く
    } else if ((op.WhiteOP === false) && (op.RedOP === true)) {//赤い旗だけ上がっている
        console.log("赤だけが上がっているときの問題")
        //問題をfirebaseに送る
        if (playernumber === "player1") {
            QuestionRedON = RedRise[Math.floor(Math.random() * RedRise.length)];//RedRiseの中からランダムで問題を表示
            FirebaseSetQuiz = QuestionRedON;
            docRef.update({
                Quiz: FirebaseSetQuiz
            })
        }
        setTimeout(RedRisewhiteDownFlag, 1000);//RedRisewhiteDownFlag(赤だけが上がっているときの問題)に行く
    } else {//旗が上がっていない
        console.log("なにも上がっていない時の問題");
        //問題をfirebaseに送る
        if (playernumber === "player1") {
            QuestionFirst = DownDown[Math.floor(Math.random() * DownDown.length)];//DownDownの中から問題をシャッフル
            FirebaseSetQuiz = QuestionFirst;
            docRef.update({
                Quiz: FirebaseSetQuiz
            })
        }
        setTimeout(NOFLAG, 1000);//NOFLAG(なにも上がっていない時の問題)に行く
    };
};