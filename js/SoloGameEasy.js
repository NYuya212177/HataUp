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
//NOFLAG(旗が上がっていない)問題,WhiteRiseredDownFlag(白い旗が上がっている)の問題,redRisewhiteDownFlag(赤い旗が上がっている)の問題,WhiteRiseredRiseFlag(両方上がっている)の問題を格納
var QuestionFirst, QuestionWhiteON, QuestionRedON, QuestionONON;
//回答と正解を格納
var Answers, CorrectAnswer;
//判定した回答を配列に格納(空だと何もしていないときに最頻値を計算するとNullになるので無を入れておく)
var AnswerArray = ['無'];
var TimetoJudg = null;//判定までの時間
var Life = 5;//初期ライフ
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
// 回答結果の画像を貼るdocument
let GameNav = document.getElementById("GameNav");
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
    GAMESTART();//GAMESTART(ゲームの開始)に移動する
}

//ゲームの開始
function GAMESTART() {
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
        setTimeout(ProgressBar, 38);//バーが最大までいく
    }
}

//旗が上がっていない状態からスタートした場合 出題問題(赤上げて, 白上げて)
function NOFLAG() {
    clearInterval(First);//setIntervalの繰り返しを止める
    QuestionFirst = DownDown[Math.floor(Math.random() * DownDown.length)];//DownDownの中から問題をシャッフル
    //問題を表示
    Question.innerText = QuestionFirst;
    console.log("問題は", QuestionFirst);
    //問題の読み上げ
    if ('speechSynthesis' in window) {//ブラウザにWeb Speech API Speech Synthesis機能があるか判定
        console.log("音声の読み上げをしている")
        const SpeechSet = new SpeechSynthesisUtterance()//発言を設定
        SpeechSet.text = QuestionFirst//テキストを設定
        SpeechSet.lang = "ja-JP"//言語を設定
        SpeechSet.rate = 0.5//速度を設定
        SpeechSet.pitch = 1//高さを設定
        SpeechSet.volume = 1//音量を設定
        window.speechSynthesis.speak(SpeechSet)//発言を再生 
    }
    //問題の正解を格納
    if ('赤上げて' == QuestionFirst) { //赤をあげる問題だった場合 A.右手が上がっている
        CorrectAnswer = "右手あげてる";
        TimetoJudg = 1000;//判定が開始されるまでの時間
    } else if ('白上げて' == QuestionFirst) {//白をあげる問題だった場合 A.左手が上がっている
        CorrectAnswer = "左手あげてる";
        TimetoJudg = 1000;//判定が開始されるまでの時間
    } else if ('赤上げないで白上げて' == QuestionFirst) {//白をあげる問題だった場合 A.左手が上がっている
        CorrectAnswer = "左手あげてる";
        TimetoJudg = 3000;//判定が開始されるまでの時間
    } else if ('白上げないで赤上げて' == QuestionFirst) {//赤をあげる問題だった場合 A.右手が上がっている
        CorrectAnswer = "右手あげてる";
        TimetoJudg = 3000;//判定が開始されるまでの時間
    };
    Loop1 = setInterval(LOOPFLAG, TimetoJudg);//設定した秒数後にLOOPFLAG(判定の開始)の処理に移動する
};

//白い旗だけ上がっている状態からスタートした場合 出題問題(赤上げて, 白下げて)
function WhiteRiseredDownFlag() {
    QuestionWhiteON = WhiteRise[Math.floor(Math.random() * WhiteRise.length)];//WhiteRiseの中から問題をシャッフル
    //問題を表示
    Question.innerText = QuestionWhiteON;
    console.log("問題は", QuestionWhiteON);
    //問題の読み上げ
    if ('speechSynthesis' in window) {//ブラウザにWeb Speech API Speech Synthesis機能があるか判定
        console.log("音声の読み上げをしている")
        const SpeechSet = new SpeechSynthesisUtterance()//発言を設定
        SpeechSet.text = QuestionWhiteON//テキストを設定 
        SpeechSet.lang = "ja-JP"//言語を設定
        SpeechSet.rate = 0.5//速度を設定
        SpeechSet.pitch = 1//高さを設定
        SpeechSet.volume = 1//音量を設定
        window.speechSynthesis.speak(SpeechSet)//発言を再生 
    }
    //問題の正解を格納
    if ('赤上げて' == QuestionWhiteON) {//赤をあげる問題だった場合 A.両手が上がっている
        CorrectAnswer = "両手上げてる";
        TimetoJudg = 1000;//判定が開始されるまでの時間
    } else if ('白下げて' == QuestionWhiteON) {//白を下げる問題だった場合 A.両手が下がっている
        CorrectAnswer = "両手下げてる";
        TimetoJudg = 1000;//判定が開始されるまでの時間
    } else if ('赤上げないで白下げて' == QuestionWhiteON) {//白を下げる問題だった場合 A.両手が下がっている
        CorrectAnswer = "両手下げてる";
        TimetoJudg = 3000;//判定が開始されるまでの時間
    } else if ('白下げないで赤上げて' == QuestionWhiteON) {//赤をあげる問題だった場合 A.両手が上がっている
        CorrectAnswer = "両手上げてる";
        TimetoJudg = 3000;//判定が開始されるまでの時間
    };
    Loop2 = setInterval(LOOPFLAG, TimetoJudg);//設定した秒数後にLOOPFLAG(判定の開始)の処理に移動する
};

//赤い旗だけ上がっている状態からスタートした場合 出題問題(赤下げて, 白上げて)
function RedRisewhiteDownFlag() {
    QuestionRedON = RedRise[Math.floor(Math.random() * RedRise.length)];//RedRiseの中からランダムで問題を表示
    //問題を表示
    Question.innerText = QuestionRedON;
    console.log("問題は", QuestionRedON);
    //問題の読み上げ
    if ('speechSynthesis' in window) {//ブラウザにWeb Speech API Speech Synthesis機能があるか判定
        console.log("音声の読み上げをしている")
        const SpeechSet = new SpeechSynthesisUtterance()//発言を設定
        SpeechSet.text = QuestionRedON//テキストを設定 
        SpeechSet.lang = "ja-JP"//言語を設定
        SpeechSet.rate = 0.5//速度を設定
        SpeechSet.pitch = 1//高さを設定
        SpeechSet.volume = 1//音量を設定
        window.speechSynthesis.speak(SpeechSet)//発言を再生 
    }
    //問題の正解を格納
    if ('赤下げて' == QuestionRedON) {//赤を下げる問題だった場合 A.両手が下がっている
        CorrectAnswer = "両手下げてる";
        TimetoJudg = 1000;//判定が開始されるまでの時間
    } else if ('白上げて' == QuestionRedON) {//白をあげる問題だった場合 A.両手が上がっている
        CorrectAnswer = "両手上げてる";
        TimetoJudg = 1000;//判定が開始されるまでの時間
    } else if ('白上げないで赤下げて' == QuestionRedON) {//赤を下げる問題だった場合 A.両手が下がっている
        CorrectAnswer = "両手下げてる";
        TimetoJudg = 3000;//判定が開始されるまでの時間
    } else if ('赤下げないで白上げて' == QuestionRedON) {//白をあげる問題だった場合 A.両手が上がっている
        CorrectAnswer = "右手あげてる";
        TimetoJudg = 3000;//判定が開始されるまでの時間
    };
    Loop3 = setInterval(LOOPFLAG, TimetoJudg);//設定した秒数後にLOOPFLAG(判定の開始)の処理に移動する
};

//両方上がっている状態からスタートした場合 出題問題(赤下げて, 白下げて)
function WhiteRiseredRiseFlag() {
    QuestionONON = RiseRise[Math.floor(Math.random() * RiseRise.length)];//RiseRiseの中からランダムで問題を表示
    //問題を表示
    Question.innerText = QuestionONON;
    console.log("問題は", QuestionONON);
    //問題の読み上げ
    if ('speechSynthesis' in window) {//ブラウザにWeb Speech API Speech Synthesis機能があるか判定
        console.log("音声の読み上げをしている")
        const SpeechSet = new SpeechSynthesisUtterance()//発言を設定
        SpeechSet.text = QuestionONON//テキストを設定 
        SpeechSet.lang = "ja-JP"//言語を設定
        SpeechSet.rate = 0.5//速度を設定
        SpeechSet.pitch = 1//高さを設定
        SpeechSet.volume = 1//音量を設定
        window.speechSynthesis.speak(SpeechSet)//発言を再生 
    }
    //問題の正解を格納
    if ('赤下げて' == QuestionONON) {//赤を下げる問題だった場合 A.左手が上がっている
        CorrectAnswer = "左手あげてる";
        TimetoJudg = 1000;//判定が開始されるまでの時間
    } else if ('白下げて' == QuestionONON) {//白を下げる問題だった場合 A.右手が上がっている
        CorrectAnswer = "右手あげてる";
        TimetoJudg = 1000;//判定が開始されるまでの時間
    } else if ('白下げないで赤下げて' == QuestionONON) {//赤を下げる問題だった場合 A.左手が下がっている
        CorrectAnswer = "両手下げてる";
        TimetoJudg = 3000;//判定が開始されるまでの時間
    } else if ('赤下げないで白下げて' == QuestionONON) {//白を下げる問題だった場合 A.右手が上がっている
        CorrectAnswer = "右手あげてる";
        TimetoJudg = 3000;//判定が開始されるまでの時間
    };
    Loop4 = setInterval(LOOPFLAG, TimetoJudg);//設定した秒数後にLOOPFLAG(判定の開始)の処理に移動する
};

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
        GameNav.src = "img/batu.png";
        //上げている旗のリセット
        op.RedOP = false;//falseにして赤の旗を下がっている状態にする
        op.WhiteOP = false;//falseにして白の旗を下がっている状態にする
        CountStart.style.opacity = 1;//CountStartを表示させる
        CountStart.innerText = "はたをさげてね";//ユーザーに初期状態になってもらう
        ADJUSTSCORE();///ADJUSTSCORE(ミスした時の処理)移動する
        Judge = setInterval(JudgeQuestion, 3000);//JudgeQuestion(問題の振り分けの処理)に行く
    }
    Answers = "";//Answersの初期化
    document.getElementById('Qcountdown').value = 0;//プログレスバーの初期化
    document.getElementById("score").innerHTML = CurrentScore;//スコアを表示
}

//残り残機を表示する
function ADJUSTSCORE() {
    if (Life > 0) {
        Life--;//ライフから1を引く
        console.log(Life);
        var hert = Life + 1;
        let HartId = document.getElementById("pat" + hert);
        HartId.src = "img/nohart.png";
        if (Life === 0) {//ライフが0ならゲームオーバー
            localStorage.setItem('Score', CurrentScore);//ローカルストレージにスコアを格納
            location.href = "SoloResult.html";//間違えたりタイムオーバー時にゲームオーバー画面に移動
            console.log(Life);
        }
    }
}

//現在のプレイヤーの状態から問題の振り分け
function JudgeQuestion() {
    clearInterval(Judge);//setIntervalの繰り返しを止める
    CountStart.style.opacity = 0;//CountStartを非表示にさせる
    GameNav.src = "./img/Path.png";//透明の画像を入れる
    if ((op.WhiteOP === true) && (op.RedOP === true)) {//赤い旗と白い旗の両方が上がっている
        console.log("両手が上がっているときの問題");
        WhiteRiseredRiseFlag();//WhiteRiseredRiseFlag(両手が上がっているときの問題)に行く
    } else if ((op.WhiteOP === true) && (op.RedOP === false)) {//白い旗だけ上がっている
        console.log("白だけが上がっているときの問題");
        WhiteRiseredDownFlag();//WhiteRiseredDownFlag(白だけが上がっているときの問題)に行く
    } else if ((op.WhiteOP === false) && (op.RedOP === true)) {//赤い旗だけ上がっている
        console.log("赤だけが上がっているときの問題");
        RedRisewhiteDownFlag();//RedRisewhiteDownFlag(赤だけが上がっているときの問題)に行く
    } else {//旗が上がっていない
        console.log("なにも上がっていない時の問題");
        NOFLAG();//NOFLAG(なにも上がっていない時の問題)に行く
    };
};