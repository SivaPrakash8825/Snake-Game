const ladder = document.querySelector(".ladder");

let html = "";
const siva = (callback) => {
  for (let i = 0; i < 900; i++) {
    html += `<div class='box${i} box'></div>`;
  }
  ladder.innerHTML = html;
  callback();
};
let k = [0, 1],
  n = 1;

const startgame = () => {
  console.log(k);
  k.map((val) => {
    let box = document.getElementsByClassName(`box${val}`);
    if (box.length > 0) {
      box[0].setAttribute("id", "coin");
    }
    //
  });
  movement(() => {
    startgame();
    // console.log("asdf");
  });
};

const hii = () => {
  console.log("asfd");
};

function movement(callback) {
  setTimeout(() => {
    k.map((val) => {
      let box = document.getElementsByClassName(`box${val}`);
      box[0].removeAttribute("id");
    });
    (k[0] = k[0] + 1), (k[1] = k[1] + 1);
    if (k[0] == 899) {
      k = [0, 1];
    }
    callback();
  }, 50);
  // return 0;
}

siva(() => {
  startgame();
});
