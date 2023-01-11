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
var playernumber = localStorage.getItem("playernumber");
console.log(playernumber);

// RoomCreate Or RoomInで設定したcraftpasswordをcraftpasswordとする
var craftpassword = localStorage.getItem("craftpassword");
console.log(craftpassword);

// GameStartで設定したlevelをlevelとする
var level = localStorage.getItem("level");
console.log(level);

var docRef = firestore.collection("Craft" + level).doc(craftpassword);
// More API functions here:
// その他のAPI関数は次のとおりです:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
// Teachable Machineエクスポートパネルによって提供されるモデルへのリンク(Teachable Machineのアップロードされたリンク)
const URL = "https://teachablemachine.withgoogle.com/models/uUb6SDzMc/";

let model, webcam, ctx, labelContainer, maxPredictions;

//最初のカウントダウンの時間
var counttime = 3;

//getElementById...HTML要素の取得を行う
const Countstart = document.getElementById("countdown");
const question = document.getElementById("question");
const whiteflagImage = document.getElementById("white");
const redflagImage = document.getElementById("red");
const gamenav = document.getElementById("gamenav");

//指示の一覧
var DownDown = ['赤上げて', '赤上げて', '赤上げて', '白上げて', '白上げて', '白上げて'];
var whiteRise = ['赤上げて', '赤上げて', '赤上げて', '白下げて', '白下げて', '白下げて'];
var RedRise = ['白上げて', '白上げて', '白上げて', '白上げて', '赤下げて', '赤下げて', '赤下げて', '赤下げて'];
var RiseRise = ['赤下げて', '赤下げて', '赤下げて', '赤下げて', '白下げて', '白下げて', '白下げて', '白下げて'];

//回答と正解を格納
var answers, CorrectAnswer;

var player1 = null;
var player2 = null;
var player3 = null;
var player4 = null;

// 指定したfirebaseから値を取得
docRef.get().then((doc) => {

    // firebaseに上がっているそれぞれのプレイヤー名をプレイヤーナンバーの変数に格納
    player1 = doc.data().player1;
    player2 = doc.data().player2;
    player3 = doc.data().player3;
    player4 = doc.data().player4;
    var life = null;
    // 指定したfirebaseから値を取得してこれた際の処理
    if (doc.exists) {

        if (player2 == null) {
            life = "2";
        } else if (player3 == null) {
            life = "4";
        } else if (player4 == null) {
            life = "6";
        } else {
            life = "8";
        }

        //残り残機を表示
        document.getElementById("life").innerHTML = life;
    }
}).catch((error) => {
    console.error("Error removing document: ", error);
});
//残り残機

//正解数
var currentScore = 0;

//指示が出た後タイムオーバーまでの時間  
var timeOverSeconds = 10000;

//旗が上がっている場合をtrue,下がっている場合はfalse
var op = {
    whiteOP: false,
    redOP: false,
};

//boolean型のif判定
let lotFlgg = true;

//今の問題と1つ前の問題
let oldquestion;
var questionFirst;
var questionwhiteON;
var questionRedON;
var questionONON;

//今手が上がっているかどうか
var isRisehand = false;
var flagRight = true;
var flagLeft = true;
var flagAll = true;
var flagNo = true;
var flagRise = true;

//開始前のカウントダウン
function countdown() {
    if (counttime > 0) {
        Countstart.innerText = counttime;
        counttime--;
    } else if (counttime === 0) {
        Countstart.style.opacity = 0;
    };
};

//DOM要素を読み込む
document.addEventListener("DOMContentLoaded", function (event) {
    Webcamera();
});

//webカメラのアクセス許可　コード探し中
async function accesscam() {

}

// 画像モデルを読み込み、ウェブカメラをセットアップする
async function Webcamera() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // モデルとメタデータを読み込み
    // file pickerからのファイルをサポートするには、APIのtmImage.loadFromFiles()を参照する。
    // またはローカルハードドライブのファイルから
    // 注: ポーズライブラリは、「tmImage」オブジェクトをウィンドウに追加する (window.tmPose)
    // 学習モデルの読み込みと入力クラスの取得
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    //Webカメラの起動準備
    // ウェブカメラを反転するかどうか
    const flip = true;
    // ウェブカメラをセットアップするための機能
    const size = window.parent.screen.width / 2;
    // 幅、高さ、反転
    webcam = new tmPose.Webcam(size, size, flip);
    // ウェブカメラへのアクセスをリクエストする
    await webcam.setup();
    //iphoneで動かすコード
    webcam.webcam.playsInline = true;
    //カメラの起動
    await webcam.play();
    //判定の処理を止める
    window.cancelAnimationFrame(loop);

    // DOMに要素を追加する
    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");

    //モデルにあるすべてのクラス要素にdivタグをつける
    // およびクラス ラベル
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }

    //SetSomebodyQuestion()に移動する
    SetSomebodyQuestion();
};

//現在のプレイヤーの状態から問題の振り分け
function judgeQuestion() {
    isRisehand = false;
    if ((op.whiteOP === true) && (op.redOP === true)) {//赤い旗と白い旗の両方が上がっている
        console.log("両手が上がっているときの問題");
        whiteRiseredRiseFlag();
    } else if ((op.whiteOP === true) && (op.redOP === false)) { //白い旗だけ上がっている
        console.log("白だけが上がっているときの問題");
        whiteRiseredDownFlag();
    } else if ((op.whiteOP === false) && (op.redOP === true)) { //赤い旗だけ上がっている
        console.log("赤だけが上がっているときの問題");
        redRisewhiteDownFlag();
    } else {//旗が上がっていない
        console.log("なにも上がっていない時の問題");
        noFlag();
    };
};

//問題が出ている間何もしていない場合タイムオーバー
function over() {
    if (isRisehand === false) {
        console.log("時間切れ");
        gamenav.innerText = ('残念！タイムオーバー');
        if (life > 0) {
            life--;
            console.log("残りライフは", life);
        }
        if (life === 0) {
            //間違えたりタイムオーバー時にライフが無い場合リザルト画面に移動
            gamenav.innerText = ('残念！ゲームオーバー');
            location.href = "./Result.html";
        }

    };
};

//正解数と残り残機を表示する
function adjustScore(isCorrect) {
    if (isCorrect) {
        currentScore++;

        // Add a new document in collection "cities"
        if (playernumber == "player1") {
            docRef.update({
                Score1: currentScore
            })
                .catch((error) => {
                    console.error(error);
                });
        } else if (playernumber == "player2") {
            docRef.update({
                Score2: currentScore
            })
                .catch((error) => {
                    console.error(error);
                });
        } else if (playernumber == "player3") {
            docRef.update({
                Score3: currentScore
            })
                .catch((error) => {
                    console.error(error);
                });
        } else if (playernumber == "player4") {
            docRef.update({
                Score4: currentScore
            })
                .catch((error) => {
                    console.error(error);
                });
        }
            docRef.get().then((doc) => {
                if (doc.exists) {
                    var point1 = doc.data().Score1;
                    var point2 = doc.data().Score2;
                    var point3 = doc.data().Score3;
                    var point4 = doc.data().Score4;
            
            
                    if (player1 == null) {
                        console.log("error");
                    } else if (player2 == null) {
                        document.getElementById("score").innerHTML = point1 + point2;
                    } else if (player3 == null) {
                        document.getElementById("score").innerHTML = point1 + point2 + point3;
                    } else if (player4 == null) {
                        document.getElementById("score").innerHTML = point1 + point2 + point3 + point4;
                    }
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

    } else {

        if (life > 0) {

            life--;
            console.log(life);

            if (life === 0) {
                alert("残念！お前の負け");
                console.log(life);
                location.href = "./Result.html";
            }
        }
    }
    clearTimeout(over, timeOverSeconds);
    //スコアと残りのライフを表示
    // document.getElementById("life").innerHTML = life;
}

//正誤判定する
function checkAnswer(answer) {
    console.log("Youranswers", answers);
    console.log("CorrectAnswer", CorrectAnswer);
    if (answers === CorrectAnswer) {
        console.log("正解");
        gamenav.innerText = ('正解！');
        adjustScore(true);
        //timeOverSecondsをクリア
        clearTimeout(over, timeOverSeconds);
    } else {
        console.log("残念");
        gamenav.innerText = ('不正解！');
        if (life === 0) {
            console.log("残りライフ", life);
            //間違えたりタイムオーバー時にゲームオーバー画面に移動
            gamenav.innerText = ('残念！ゲームオーバー');
            // location.href = "gameend.html";
        }
        adjustScore(false);
        //timeOverSecondsをクリア
        clearTimeout(over, timeOverSeconds);
    }
    //setTimeout…一定時間後に一度だけ特定の処理をおこなう
    //judgeQuestionの処理に行く
    setTimeout(judgeQuestion, 10000);
}

//モデル予測の繰り返しを実行
function loopflag() {
    console.log("判定開始！")
    flagRise = true;
    window.requestAnimationFrame(loop);
}

//旗がついていない状態からスタートした場合 出題問題(赤上げて, 白上げて)
function noFlag() {
    //1つ前の問題と今の問題が被らないようにする
    do {
        lotFlgg = true;
        //DownDownの中からランダムで問題を表示
        questionFirst = DownDown[Math.floor(Math.random() * DownDown.length)];
        //oldquestionが前の値
        //questionFirstrが今の値
        if (oldquestion !== questionFirst) {
            lotFlgg = false;
            oldquestion = questionFirst;
        }
        //trueでdo{ 再抽選
    } while (lotFlgg);
    //問題を表示
    question.innerText = questionFirst;
    console.log("問題は", questionFirst);

    if ('赤上げて' == questionFirst) { //赤をあげる問題だった場合・右手が上がっている
        CorrectAnswer = "右手あげてる";
    } else if ('白上げて' == questionFirst) {//白をあげる問題だった場合・左手が上がっている
        CorrectAnswer = "左手あげてる";
    };

    //setTimeout…一定時間後に一度だけ特定の処理をおこなう
    //5秒後にモデル予測の繰り返しを実行
    setTimeout(loopflag, 5000);
    //overの処理に行く
    setTimeout(over, timeOverSeconds);
};

//白い旗だけ上がっている状態からスタートした場合 出題問題(赤上げて, 白下げて)
function whiteRiseredDownFlag() {
    //左手が上がっていると判定しないようにする
    flagLeft = false;

    //1つ前の問題と今の問題が被らないようにする
    do {
        lotFlgg = true;
        //whiteRiseの中からランダムで問題を表示
        questionwhiteON = whiteRise[Math.floor(Math.random() * whiteRise.length)];
        //oldquestionが前の値
        //questionwhiteONが今の値
        if (oldquestion !== questionwhiteON) {
            lotFlgg = false;
            oldquestion = questionwhiteON;
        }
        //trueでdo{ 再抽選
    } while (lotFlgg);
    //問題を表示
    question.innerText = questionwhiteON;
    console.log("問題は", questionwhiteON);

    if ('赤上げて' == questionwhiteON) {//赤をあげる問題だった場合・両手が上がっている
        CorrectAnswer = "両手上げてる";
    } else if ('白下げて' == questionwhiteON) {//白を下げる問題だった場合・両手が下がっている
        flagNo = true;
        CorrectAnswer = "両手下げてる";
    };
    //setTimeout…一定時間後に一度だけ特定の処理をおこなう
    //5秒後にモデル予測の繰り返しを実行
    setTimeout(loopflag, 5000);
    //overの処理に行く
    setTimeout(over, timeOverSeconds);
};

//赤い旗だけ上がっている状態からスタートした場合 出題問題(赤下げて, 白上げて)
function redRisewhiteDownFlag() {
    //右手が上がっていると判定しないようにする
    flagRight = false;

    //1つ前の問題と今の問題が被らないようにする
    do {
        lotFlgg = true;
        //RedRiseの中からランダムで問題を表示
        questionRedON = RedRise[Math.floor(Math.random() * RedRise.length)];
        //oldquestionが前の値
        //questionRedONが今の値
        if (oldquestion !== questionRedON) {
            lotFlgg = false;
            oldquestion = questionRedON;
        }
        //trueでdo{ 再抽選
    } while (lotFlgg);
    //問題を表示
    question.innerText = questionRedON;
    console.log("問題は", questionRedON);
    flagRise = true;

    if ('赤下げて' == questionRedON) {//赤を下げる問題だった場合・両手が下がっている
        flagNo = true;
        CorrectAnswer = "両手下げてる";
    } else if ('白上げて' == questionRedON) {//白をあげる問題だった場合・両手が上がっている
        CorrectAnswer = "両手上げてる";
    };
    //setTimeout…一定時間後に一度だけ特定の処理をおこなう
    //5秒後にモデル予測の繰り返しを実行
    setTimeout(loopflag, 5000);
    //overの処理に行く
    setTimeout(over, timeOverSeconds);
};

//両方上がっている状態からスタートした場合 出題問題(赤下げて, 白下げて)
function whiteRiseredRiseFlag() {
    //1つ前の問題と今の問題が被らないようにする
    do {
        lotFlgg = true;
        //RiseRiseの中からランダムで問題を表示
        questionONON = RiseRise[Math.floor(Math.random() * RiseRise.length)];
        //oldquestionが前の値
        //questionONONが今の値
        if (oldquestion !== questionONON) {
            lotFlgg = false;
            oldquestion = questionONON;
        }
        //trueでdo{ 再抽選
    } while (lotFlgg);
    //問題を表示
    question.innerText = questionONON;
    console.log("問題は", questionONON);
    flagRise = true;

    if ('赤下げて' == questionONON) {//赤を下げる問題だった場合・左手が上がっている
        CorrectAnswer = "左手あげてる";
    } else if ('白下げて' == questionONON) {//白を下げる問題だった場合・右手が上がっている
        CorrectAnswer = "右手あげてる";
    };
    //setTimeout…一定時間後に一度だけ特定の処理をおこなう
    //5秒後にモデル予測の繰り返しを実行
    setTimeout(loopflag, 5000);
    //overの処理に行く
    setTimeout(over, timeOverSeconds);
};

//ゲームの開始
function SetSomebodyQuestion() {
    flagNo = false;
    //カウントダウンの開始
    //setInterval…一定時間ごとに特定の処理を繰り返す
    setInterval(countdown, 1000);
    //旗が上がっていない状態からのスタート
    setTimeout(noFlag, 5000);

    for (var i = 0; i < 15; i++) {
        // gamenav.innerText = ('');
        //出す問題の判定
        //judgeQuestion();
        // var aaaaa = setTimeout(judgeQuestion, (5000 * i) + 7000);
    };
};

//モデル予測を繰り返し実行する
async function loop(timestamp) {
    if (flagRise == true) {
        webcam.update(); // update the webcam frame // ウェブカメラフレームを更新する
        await predict();
        window.requestAnimationFrame(loop);
    };
}

//モデル予測処理
async function predict() {
    // 予測 1: ポーズネットを介して入力を実行する
    // estimatePoseは、画像、ビデオ、またはキャンバスのhtml要素を受け取ることが出来る
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // 予測 2: 教示可能な機械分類モデルを通じて入力を実行する
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
        //クラス名の取得
        const name = prediction[i].className;
        //認識率の取得
        const value = prediction[i].probability.toFixed(2);

        //判定結果を随時表示する
        labelContainer.childNodes[i].innerHTML = `${name}: ${value}`;

        //判定した結果をコンソールログに表示
        //右手が上げられた場合
        if (name == "右") {
            if (value >= 0.9) {
                console.log("右手あげてる");
                //赤い旗の表示
                redflagImage.style.opacity = 1;
                op.redOP = true;
                isRisehand = true;
                flagRise = false;
                if (flagRight = true) {
                    answers = "右手あげてる";
                    var answerA = "右手あげてる";
                    checkAnswer(answerA);
                }
                //判定の処理を止める
                window.cancelAnimationFrame(loop);
            }
        }

        //左手が上げられた場合
        if (name == "左") {
            if (value >= 0.9) {
                console.log("左手あげてる");
                //白い旗の表示
                whiteflagImage.style.opacity = 1;
                op.whiteOP = true;
                isRisehand = true;
                flagRise = false;
                if (flagLeft = true) {
                    answers = "左手あげてる";
                    var answerB = "左手あげてる";
                    checkAnswer(answerB);
                }
                //判定の処理を止める
                window.cancelAnimationFrame(loop);
            }
        }

        //何も上げていない場合
        if (name == "無") {
            if (value >= 0.9) {
                console.log("両手下げてる");
                //白い旗の非表示
                whiteflagImage.style.opacity = 0;
                op.whiteOP = false;
                //赤い旗の非表示
                redflagImage.style.opacity = 0;
                op.redOP = false;
                isRisehand = true;
                if (flagNo = true) {
                    flagRise = false;
                    answer = "両手下げてる";
                    var answerC = "両手下げてる";
                    checkAnswer(answerC);
                }
                //判定の処理を止める
                window.cancelAnimationFrame(loop);
            }
        }

        //両手が上がっている場合
        if (name == "両手") {
            if (value >= 0.9) {
                console.log("両手上げてる");
                //白い旗の表示
                whiteflagImage.style.opacity = 1;
                op.whiteOP = false;
                //赤い旗の表示
                redflagImage.style.opacity = 1;
                op.redOP = true;
                isRisehand = true;
                flagRise = false;
                if ('白上げて' == questionRedON || '赤上げて' == questionwhiteON) {
                    answer = "両手上げてる";
                    var answerD = "両手上げてる";
                    checkAnswer(answerD);
                }
                //判定の処理を止める
                window.cancelAnimationFrame(loop);
            }
        }
    }
    // 最後にポーズを書く
    // ここ消すとカメラが表示されなくなる
    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // キーポイントとスケルトンをかく
        //ここを消すと顔と体に表示する点が消える
        // if (pose) {
        //     const minPartConfidence = 0.5;
        //     tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        //     tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        // }
    }
}