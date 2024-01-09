const ladder = document.querySelector(".ladder");

//right =1 , down = 32

let direction = 1,
  reach = 0,
  previousMove = "ArrowRight",
  reachValue = 1;
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
  k.map((val) => {
    let box = document.getElementsByClassName(`box${val}`);
    if (box.length > 0) {
      box[0].setAttribute("id", "coin");
    }
    //
  });

  movement(() => {
    startgame();
  });
};

window.addEventListener("keydown", (event) => {
  let keys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
  if (keys.includes(event.key)) {
    changeKeyValue(event.key);
  }
});

function movement(callback) {
  setTimeout(() => {
    k.map((val) => {
      let box = document.getElementsByClassName(`box${val}`);
      box[0].removeAttribute("id");
    });
    if (reach) {
      (k[0] = k[1]), (k[1] = k[1] + direction);
      reach = 0;
    } else {
      (k[0] = k[0] + direction), (k[1] = k[1] + direction);
    }
    if (k[0] == 899) {
      k = [0, 1];
    }
    callback();
  }, 1000);
  // return 0;
}

const changeKeyValue = (key) => {
  if (
    key == "ArrowDown" &&
    previousMove != "ArrowUp" &&
    previousMove != "ArrowDown"
  ) {
    direction = 30;
    reach = 1;
  } else if (
    key == "ArrowRight" &&
    previousMove != "ArrowLeft" &&
    previousMove != "ArrowRight"
  ) {
    direction = 1;
    reach = 1;
  } else if (
    key == "ArrowLeft" &&
    previousMove != "ArrowRight" &&
    previousMove != "ArrowLeft"
  ) {
    direction = -1;
    reach = 1;
  } else if (
    key == "ArrowUp" &&
    previousMove != "ArrowDown" &&
    previousMove != "ArrowUp"
  ) {
    direction = -30;
    reach = 1;
  }
  previousMove = key;
};

siva(() => {
  startgame();
});
