const numArray = [];
const panel = document.getElementById("panel");

// 対のカードの配列を作る処理
for (let i = 1; i < 5; i++) {
  numArray.push(i);
  numArray.push(i);
}
console.log(numArray);

// 配列をシャッフルする処理
const numArraylength = numArray.length;
for (let i = numArraylength - 1; i >= 0; i--) {
  const randomIndex = Math.floor(Math.random() * (i + 1));
  [numArray[i], numArray[randomIndex]] = [numArray[randomIndex], numArray[i]];
}
console.log(numArray);

// div class=cardという箱を作る処理
for (i = 0; i < 8; i++) {
  let div = document.createElement("div");
  div.className = "card back";
  div.id = i;
  div.textContent = "";
  panel.appendChild(div);
  numArray.push(div);
}

// クリックした回数をカウントする
let clickCount = 0;

//　判定するための配列を作る
let checkArray = [];

// クリックしたカードのidを保存しておく配列を作る
let idArray = [];

let totalCard = 0;

// class = cardの要素を探す
let card = document.getElementsByClassName("card");
console.dir(card);
// class = cardを持つ各要素にクリックイベントを付与
for (let i = card.length - 1; i >= 0; i--) {
  card[i].addEventListener("click", function () {
    clickCount++;

    if (clickCount === 1) {
      this.classList.remove("back");
      this.classList.add("open");
      console.log(this.id);
      this.textContent = numArray[this.id];
      // 判定用の配列に数字を入れる
      checkArray.push(this.textContent);
      idArray.push(this.id);
    }

    // ２回目のクリック
    if (clickCount === 2) {
      // クリックカウントを０にする
      if (this.id === idArray[0]) {
      }
      clickCount = 0;

      this.classList.remove("back");
      console.log(this.id);
      this.textContent = numArray[this.id];
      // 判定用の配列に数字を入れる
      checkArray.push(this.textContent);
      //   500秒後の処理
      setTimeout(() => {
        // カードを全て裏返す
        reset();
        if (checkArray[0] === checkArray[1] && idArray[0] !== this.id) {
          this.classList.add("finish");
          console.log(idArray[0]);
          console.log(numArray);
          let num = idArray[0];
          let click1 = document.getElementById(num);
          click1.classList.add("finish");
          totalCard = totalCard + 2;
          if (totalCard === 8) {
            alert("finish");
            window.location.reload();
          }
        }
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
    divAll[i].classList.remove("open");
    divAll[i].textContent = "";
    // abc.classList.remove("back");
    console.log(divAll[i]);
  }
};
// setTimeout(reset, 5000);
