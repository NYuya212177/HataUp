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

//回答
var redRiseQuestion = ['赤上げて', '赤下げて'];
var whiteRiseQuestion = ['白上げて', '白下げて'];
var notRise = ['赤上げないで', '白上げないで'];

//指示の一覧
var DownDown = ['赤上げて', '赤上げて', '赤上げて', '白上げて', '白上げて', '白上げて'];
var whiteRise = ['赤上げて', '赤上げて', '赤上げて', '白下げて', '白下げて', '白下げて'];
var RedRise = ['白上げて', '白上げて', '白上げて', '白上げて', '赤下げて', '赤下げて', '赤下げて', '赤下げて'];
var RiseRise = ['赤下げて', '赤下げて', '赤下げて', '赤下げて', '白下げて', '白下げて', '白下げて', '白下げて'];

//回答を格納
var answers;
//正解を格納
var CorrectAnswer;

//ゲームの速度
var seconds = 5000;
//指示の切れ目、非表示になるまでの秒数
var crackSeconds = seconds - 500;
//指示が出た後タイムオーバーまでの時間  
var timeOverSeconds = seconds - 400;

//残り残機
var life = 3;

//正解数
var currentScore = 0;

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

var isRisehand = false;

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

// 画像モデルを読み込み、ウェブカメラをセットアップする
async function Webcamera() {
    console.log("-----Webcamera-----");
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    // モデルとメタデータをロードする
    // file pickerからのファイルをサポートするには、APIのtmImage.loadFromFiles()を参照する。
    // またはローカルハードドライブのファイルから
    // 注: ポーズライブラリは、「tmImage」オブジェクトをウィンドウに追加する (window.tmPose)
    // 学習モデルの読み込みと入力クラスの取得
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    // ウェブカメラをセットアップするための機能
    const size = window.parent.screen.width / 2;
    const flip = true; // whether to flip the webcam // ウェブカメラを反転するかどうか

    //Webカメラの起動準備
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip // 幅、高さ、反転
    await webcam.setup(); // request access to the webcam // ウェブカメラへのアクセスをリクエストする
    webcam.webcam.playsInline = true;//iphoneで動かすコード
    await webcam.play();

    //判定の処理を止める
    window.cancelAnimationFrame(loop);
    
    // append/get elements to the DOM
    // DOMに要素を追加する
    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");

    //モデルにあるすべてのクラス要素にdivタグをつける
    for (let i = 0; i < maxPredictions; i++) { // and class labels // およびクラス ラベル
        labelContainer.appendChild(document.createElement("div"));
    }

    //btnProvideQuestion()に移動する
    btnProvideQuestion();
}

//指示の切れ目を作る関数
function cut() {
    console.log("-----cut-----");
    question.style.opacity = 0;
};

//間違えたりタイムオーバー時にゲームオーバー画面に移動
function gameOver() {
    gamenav.innerText = ('残念！ゲームオーバー');
    // location.href = "gameend.html";
};

//タイムオーバーのとき
function Timeover() {
    console.log("-----Timeover-----");
    console.log("時間切れ");
    gamenav.innerText = ('残念！タイムオーバー');
    if (life > 0) {
        life--;
        console.log("残りライフは", life);
    }
    if (life == 0) {
        gameOver();
    }
    document.getElementById("life").innerHTML = life;
};

//ゲームクリアのとき
function clearGame() {
    // location.href = "clear1.html"
};

//問題が出ている間何もしていない場合タイムオーバー
function over() {
    if (isRisehand === false) {
        Timeover();
    };
};

//旗がついていない状態からスタートした場合
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

    question.style.opacity = 1;
    question.innerText = questionFirst;
    console.log("問題は", questionFirst);
    window.setTimeout(predict, 5000);
    //モデル予測の繰り返し実行
    window.requestAnimationFrame(loop);
    //setTimeout…一定時間後に一度だけ特定の処理をおこなう
    //cutの処理に行く
    setTimeout(cut, crackSeconds);

    if (redRiseQuestion.indexOf(questionFirst) >= 0) { //赤をあげる問題だった場合・右手が上がっている
        CorrectAnswer = "右手あげてる";
        //setTimeout…一定時間後に一度だけ特定の処理をおこなう
        //overの処理に行く
        setTimeout(over, timeOverSeconds);
    } else if (whiteRiseQuestion.indexOf(questionFirst) >= 0) {//白をあげる問題だった場合・左手が上がっている
        CorrectAnswer = "左手あげてる";
        //setTimeout…一定時間後に一度だけ特定の処理をおこなう
        //overの処理に行く
        setTimeout(over, timeOverSeconds);
    };
};

//白い旗だけ上がっている状態からスタートした場合
function whiteRiseredDownFlag() {
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

    question.style.opacity = 1;
    question.innerText = questionwhiteON;
    console.log("問題は", questionwhiteON);
    //setTimeout…一定時間後に一度だけ特定の処理をおこなう
    //cutの処理に行く
    setTimeout(cut, crackSeconds);

    if (redRiseQuestion.indexOf(questionwhiteON) >= 0) {//赤をあげる問題だった場合・両手が上がっている
        CorrectAnswer = "両手上げてる";
        //setTimeout…一定時間後に一度だけ特定の処理をおこなう
        //overの処理に行く
        setTimeout(over, timeOverSeconds);
    } else if (whiteRiseQuestion.indexOf(questionwhiteON) >= 0) {//白を下げる問題だった場合・両手が下がっている
        CorrectAnswer = "両手下げてる";
        //setTimeout…一定時間後に一度だけ特定の処理をおこなう
        //overの処理に行く
        setTimeout(over, timeOverSeconds);
    };
};

//赤い旗だけ上がっている状態からスタートした場合
function redRisewhiteDownFlag() {
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

    question.style.opacity = 1;
    question.innerText = questionRedON;
    console.log("問題は", questionRedON);
    //setTimeout…一定時間後に一度だけ特定の処理をおこなう
    //cutの処理に行く
    setTimeout(cut, crackSeconds);

    if (redRiseQuestion.indexOf(questionRedON) >= 0) {//赤を下げる問題だった場合・両手が下がっている
        CorrectAnswer = "両手下げてる";
        //setTimeout…一定時間後に一度だけ特定の処理をおこなう
        //overの処理に行く
        setTimeout(over, timeOverSeconds);
    } else if (whiteRiseQuestion.indexOf(questionRedON) >= 0) {//白をあげる問題だった場合・両手が上がっている
        CorrectAnswer = "両手上げてる";
        //setTimeout…一定時間後に一度だけ特定の処理をおこなう
        //overの処理に行く
        setTimeout(over, timeOverSeconds);
    };
};

//両方上がっている状態からスタートした場合
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

    question.style.opacity = 1;
    question.innerText = questionONON;
    console.log("問題は", questionONON);
    //setTimeout…一定時間後に一度だけ特定の処理をおこなう
    //cutの処理に行く
    setTimeout(cut, crackSeconds);

    if (redRiseQuestion.indexOf(questionONON) >= 0) {//赤を下げる問題だった場合・左手が上がっている
        CorrectAnswer = "左手あげてる";
        //setTimeout…一定時間後に一度だけ特定の処理をおこなう
        //overの処理に行く
        setTimeout(over, timeOverSeconds);
    } else if (whiteRiseQuestion.indexOf(questionONON) >= 0) {//白を下げる問題だった場合・右手が上がっている
        CorrectAnswer = "右手あげてる";
        //setTimeout…一定時間後に一度だけ特定の処理をおこなう
        //overの処理に行く
        setTimeout(over, timeOverSeconds);
    };
};

//ゲームの開始
function btnProvideQuestion() {

    //カウントダウンの開始
    //setInterval…一定時間ごとに特定の処理を繰り返す
    setInterval(countdown, 1000);

    //旗が上がっていない状態からのスタート
    //setTimeout…一定時間後に一度だけ特定の処理をおこなう
    setTimeout(noFlag, 8000);

    for (var i = 0; i < 15; i++) {
        loopFlg = true;
        gamenav.innerText = ('');
        //出す問題の判定
        function judgeQuestion() {
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
        var ID1 = setTimeout(judgeQuestion, (seconds * i) + 7000);
    };
    clearGame();
    //setTimeout(clearGame, (seconds * i) + 9000);
};

//モデル予測を繰り返し実行する
async function loop(timestamp) {
    webcam.update(); // update the webcam frame // ウェブカメラフレームを更新する
    await predict();
    window.requestAnimationFrame(loop);
}

//モデル予測処理
async function predict() {
    // Prediction #1: run input through posenet
    // 予測 1: ポーズネットを介して入力を実行する
    // estimatePose can take in an image, video or canvas html element
    // estimatePoseは、画像、ビデオ、またはキャンバスのhtml要素を受け取ることが出来る
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    // 予測 2: 教示可能な機械分類モデルを通じて入力を実行する
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
        const name = prediction[i].className;  //クラス名の取得
        const value = prediction[i].probability.toFixed(2);//認識率の取得

        //判定結果を随時表示する
        labelContainer.childNodes[i].innerHTML = `${name}: ${value}`;

        //判定した結果をコンソールログに表示
        //右手が上げられた場合
        if (name == "右") {
            if (value >= 1) {
                answers = "右手あげてる";
                console.log("右手あげてる");
                var answerA = "右手あげてる";
                loopFlg = false;
                checkAnswer(answerA);
            }
        }

        //左手が上げられた場合
        if (name == "左") {
            if (value >= 1) {
                answers = "左手あげてる";
                console.log("左手あげてる");
                var answerB = "左手あげてる";
                loopFlg = false;
                checkAnswer(answerB);
            }
        }

        //何もしていない場合
        if (name == "無") {
            if (value >= 0.9) {
                console.log("両手下げてる");
                var answerC = "両手下げてる";
                //checkAnswer(answerC);
            }
        }

        //両手が上がっている場合
        if (name == "両手") {
            if (value >= 1) {
                console.log("両手上げてる");
                var answerD = "両手上げてる";
                loopFlg = false;
                checkAnswer(answerD);
            }
        }
    }

    // finally draw the poses
    // 最後にポーズを書く
    // ここ消すとカメラが表示されなくなる
    drawPose(pose);
}

//正解数と残り残機を表示する
function adjustScore(isCorrect) {
    if (isCorrect) {
        currentScore++;
    } else {
        if (life > 0) {
            life--;
            console.log(life);
            if (life == 0) {
                alert("残念！お前の負け");
                console.log(life);
            }
        }
    }
    //スコアと残りのライフを表示
    document.getElementById("score").innerHTML = currentScore;
    document.getElementById("life").innerHTML = life;
}

//正誤判定する
function checkAnswer(answer) {
    console.log("-----answers-----");
    //手が上げられたらtrueになる
    var isRisehand = false;

    console.log("answers", answers);
    console.log("CorrectAnswer", CorrectAnswer);
    if (answers === CorrectAnswer) {
        console.log("正解");
        gamenav.innerText = ('正解！');
        adjustScore(true);
        clearTimeout(timeOverSeconds);
    } else {
        console.log("残念");
        gamenav.innerText = ('不正解！');
        if (life == 0) {
            console.log("残りライフ", life);
            gameOver();
        }
        adjustScore(false);
        clearTimeout(timeOverSeconds);
        btnProvideQuestion();
    }
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        // キーポイントとスケルトンをかく
        //ここを消すと顔と体に表示する点が消える
        // if (pose) {
        //     const minPartConfidence = 0.5;
        //     tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        //     tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        // }
    }
}