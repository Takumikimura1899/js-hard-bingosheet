// 枚数を変えたいときは36行目と51行目と138行目の数字を変える

// 対になるカードを入れておく為の空の配列
const numArray = [];
const panel = document.getElementById("panel");
// クリックした回数をカウントする
let clickCount = 0;

//　判定するための配列を作る
let checkArray = [];

// クリックしたカードのidを保存しておく配列を作る
let idArray = [];

// 合ったカードの総枚数
let totalCard = 0;

// player1とplayer2を切り替える為のターン
let turn = 1;
const nextPlayer = document.getElementById("nextPlayer");
nextPlayer.textContent = "次はPlayer1の番です";

// 各プレイヤーが獲得したカードを入れる配列
const player1Get = [];
const player2Get = [];

// 各playerの獲得枚数を表示する
const player1Point = document.getElementById("player1Point");
player1Point.textContent =
  "pleyer1が獲得したカードは:" + "【" + "】" + ":計" + player1Get.length + "枚";
const player2Point = document.getElementById("player2Point");
player2Point.textContent =
  "pleyer2が獲得したカードは:" + "【" + "】" + ":計" + player2Get.length + "枚";

// 対のカードの配列を作る処理
for (let i = 1; i < 6; i++) {
  numArray.push(i);
  numArray.push(i);
}

// numArray[]をシャッフルする処理
const numArraylength = numArray.length;
for (let i = numArraylength - 1; i >= 0; i--) {
  const randomIndex = Math.floor(Math.random() * (i + 1));
  [numArray[i], numArray[randomIndex]] = [numArray[randomIndex], numArray[i]];
}
console.log(numArray);

// div class=cardという箱を作る処理
for (i = 0; i < 10; i++) {
  let div = document.createElement("div");
  div.className = "card back";
  div.id = i;
  div.textContent = "";
  panel.appendChild(div);
  numArray.push(div);
}

// class = cardの要素を探す
let card = document.getElementsByClassName("card");
console.dir(card);
// class = cardを持つ各要素にクリックイベントを付与
for (let i = card.length - 1; i >= 0; i--) {
  card[i].addEventListener("click", function () {
    clickCount++;

    // 一回目のクリックでカードをめくる。クリック出来なくする。textContentを表示する。判定用の配列に数字を入れる。
    if (clickCount === 1) {
      this.classList.remove("back");
      this.classList.add("rock");
      this.textContent = numArray[this.id];
      // 判定用の配列に数字を入れる
      checkArray.push(this.textContent);
      idArray.push(this.id);
    }

    // ２回目のクリック
    if (clickCount === 2) {
      // クリックカウントを０にする
      clickCount = 0;
      rock();

      this.classList.remove("back");
      this.textContent = numArray[this.id];
      // 判定用の配列に数字を入れる
      checkArray.push(this.textContent);
      //   500秒後の処理
      setTimeout(() => {
        if (turn === 1) {
          if (checkArray[0] === checkArray[1] && idArray[0] !== this.id) {
            player1Get.push(this.textContent);
            player1Get.push(this.textContent);
            player1Point.textContent =
              "pleyer1が獲得したカードは:" +
              "【" +
              player1Get +
              "】" +
              ":計" +
              player1Get.length +
              "枚";
            this.classList.add("finish");
            let num = idArray[0];
            let click1 = document.getElementById(num);
            click1.classList.add("finish");
            totalCard = totalCard + 2;
          } else {
            turn++;
            nextPlayer.textContent = "次はplayer" + turn + "の番です";
          }
        } else {
          if (checkArray[0] === checkArray[1] && idArray[0] !== this.id) {
            player2Get.push(this.textContent);
            player2Get.push(this.textContent);
            player2Point.textContent =
              "pleyer2が獲得したカードは:" +
              "【" +
              player2Get +
              "】" +
              ":計" +
              player2Get.length +
              "枚";
            this.classList.add("finish");
            let num = idArray[0];
            let click1 = document.getElementById(num);
            click1.classList.add("finish");
            totalCard = totalCard + 2;
          } else {
            turn = 1;
            nextPlayer.textContent = "次はplayer" + turn + "の番です";
          }
        }

        if (totalCard === 10) {
          if (player1Get.length > player2Get.length) {
            alert("player1の勝ち");
            window.location.reload();
          } else {
            alert("player2の勝ち");
            window.location.reload();
          }
        }

        // カードを全て裏返す
        reset();
        // 判定用の配列を空にする。
        checkArray = [];
        idArray = [];
      }, 500);
    }
  });
}

// カードを全て裏返しにする関数
const reset = function () {
  let divAll = document.querySelectorAll("div");
  console.log(divAll.length);
  for (let i = divAll.length - 1; i >= 1; i--) {
    divAll[i].classList.add("back");
    divAll[i].classList.remove("rock");
    divAll[i].textContent = "";
  }
};
// setTimeout(reset, 5000);

// カードをクリック出来なくするための関数
const rock = function () {
  let divAll = document.querySelectorAll("div");
  for (let i = divAll.length - 1; i >= 1; i--) {
    divAll[i].classList.add("rock");
  }
};
