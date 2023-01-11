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
var DownDown = ['あかあげて', 'あかあげて', 'あかあげて', 'しろあげて', 'しろあげて', 'しろあげて'];
var whiteRise = ['あかあげて', 'あかあげて', 'あかあげて', 'しろさげて', 'しろさげて', 'しろさげて'];
var RedRise = ['しろあげて', 'しろあげて', 'しろあげて', 'しろあげて', 'あかさげて', 'あかさげて', 'あかさげて', 'あかさげて'];
var RiseRise = ['あかさげて', 'あかさげて', 'あかさげて', 'あかさげて', 'しろさげて', 'しろさげて', 'しろさげて', 'しろさげて'];

//回答と正解を格納
var answers, CorrectAnswer;

//残り残機
var life = 3;

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
}

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
            // location.href = "gameend.html";
        }
        //残り残機を表示
        document.getElementById("life").innerHTML = life;
    };
};

//正解数と残り残機を表示する
function adjustScore(isCorrect) {
    if (isCorrect) {
        currentScore++;
    } else {
        if (life > 0) {
            life--;
            console.log(life);
            if (life === 0) {
                alert("残念！お前の負け");
                console.log(life);
            }
        }
    }
    clearTimeout(over, timeOverSeconds);
    //スコアと残りのライフを表示
    document.getElementById("score").innerHTML = currentScore;
    document.getElementById("life").innerHTML = life;
}

//正誤判定する
function checkAnswer(answer) {
    console.log("Youranswers", answers);
    console.log("CorrectAnswer", CorrectAnswer);
    if (answers === CorrectAnswer) {
        console.log("正解");
        gamenav.innerText = ('せいかい！');
        adjustScore(true);
        //timeOverSecondsをクリア
        clearTimeout(over, timeOverSeconds);
    } else {
        console.log("残念");
        gamenav.innerText = ('ふせいかい！');
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

    if ('あかあげて' == questionFirst) { //赤をあげる問題だった場合・右手が上がっている
        CorrectAnswer = "右手あげてる";
    } else if ('しろあげて' == questionFirst) {//白をあげる問題だった場合・左手が上がっている
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

    if ('あかあげて' == questionwhiteON) {//赤をあげる問題だった場合・両手が上がっている
        CorrectAnswer = "両手上げてる";
    } else if ('しろあげて' == questionwhiteON) {//白を下げる問題だった場合・両手が下がっている
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

    if ('あかさげて' == questionRedON) {//赤を下げる問題だった場合・両手が下がっている
        flagNo = true;
        CorrectAnswer = "両手下げてる";
    } else if ('しろさげて' == questionRedON) {//白をあげる問題だった場合・両手が上がっている
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

    if ('あかあげて' == questionONON) {//赤を下げる問題だった場合・左手が上がっている
        CorrectAnswer = "左手あげてる";
    } else if ('しろあげて' == questionONON) {//白を下げる問題だった場合・右手が上がっている
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
        // labelContainer.childNodes[i].innerHTML = `${name}: ${value}`;

        //判定した結果をコンソールログに表示
        //右手が上げられた場合
        if (name == "右") {
            if (value >= 1) {
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
            if (value >= 1) {
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
                    answers = "両手下げてる";
                    var answerC = "両手下げてる";
                    checkAnswer(answerC);
                }
                //判定の処理を止める
                window.cancelAnimationFrame(loop);
            }
        }

        //両手が上がっている場合
        if (name == "両手") {
            if (value >= 1) {
                console.log("両手上げてる");
                //白い旗の表示
                whiteflagImage.style.opacity = 1;
                op.whiteOP = false;
                //赤い旗の表示
                redflagImage.style.opacity = 1;
                op.redOP = true;
                isRisehand = true;
                flagRise = false;
                if ('しろあげて' == questionRedON || 'あかあげて' == questionwhiteON) {
                    answers = "両手上げてる";
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
    // drawPose(pose);
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