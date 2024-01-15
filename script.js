const ladder = document.querySelector(".ladder");
let scoreid = document.getElementById("score");
let score1 = document.getElementById("score1");
let ScoreBoard = document.getElementsByClassName("ScoreBoard");
let fruit, startX, startY;

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});
document.addEventListener("touchmove", (e) => {
  if (startX !== undefined && startY !== undefined) {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    let dir;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal dragging

      if (deltaX > 0) {
        dir = "ArrowRight";

        // You can perform actions for dragging right here
      } else {
        dir = "ArrowLeft";

        // You can perform actions for dragging left here
      }
    } else {
      // Vertical dragging
      if (deltaY > 0) {
        dir = "ArrowDown";
        e.preventDefault();
        // alert("Dragging Down");
        // You can perform actions for dragging down here
      } else {
        dir = "ArrowUp";
        // alert("Dragging Up");
        // You can perform actions for dragging up here
      }
    }
    if (dir) {
      changeKeyValue(dir);
    }
    dir = undefined;
    // Reset startX and startY to undefined to handle the next touchstart
    startX = undefined;
    startY = undefined;
  }
});
document.addEventListener("touchend", () => {
  startX = undefined;
  startY = undefined;
});
//right =1 , down = 32
let score = 0,
  started = 0;
let direction = 1,
  reach = 0,
  previousMove = "ArrowRight",
  reachValue = 1;
let html = "";
const siva = () => {
  for (let i = 0; i < 900; i++) {
    html += `<div class='box${i} box' ${i == 1 ? 'id="head"' : ""} ${
      i == 0 ? 'id="coin"' : ""
    }"></div>`;
  }
  ladder.innerHTML = html;
  generateFruit();
};
let k = [0, 1],
  n = 1;

const generateFruit = () => {
  fruit = Math.floor(Math.random() * 900);
  fruittype = Math.floor(Math.random() * 4 + 1);

  if (k.includes(fruit)) {
    generateFruit();
  }
  let box = document.getElementsByClassName(`box${fruit}`);
  if (box.length > 0) {
    box[0].setAttribute("id", `fruit${fruittype}`);
  }
  return fruit;
};

const startgame = () => {
  // console.log("asdf");
  k.map((val, index) => {
    let box = document.getElementsByClassName(`box${val}`);

    if (k.length - 1 == index) {
      box[0].setAttribute("id", "head");
    } else if (box.length > 0) {
      box[0].setAttribute("id", "coin");
    }
    //
  });

  movement(() => {
    if (ScoreBoard[0].classList.contains("hide")) {
      startgame();
    }
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
    let temp = k[0];
    k.map((val, index) => {
      if (index != k.length - 1) k[index] = k[index + 1];
      else k[k.length - 1] = k[k.length - 1] + direction;
    });

    if (
      ((k[k.length - 1] + 1) % 30 == 1 && previousMove == "ArrowRight") ||
      ((k[k.length - 1] + 1) % 30 == 0 && previousMove == "ArrowLeft") ||
      k[k.length - 1] < 0 ||
      k[k.length - 1] > 899
    ) {
      score1.innerText = score;
      previousMove = "ArrowRight";
      ScoreBoard[0].classList.toggle("hide");
    }
    if (k.indexOf(k[k.length - 1]) < k.length - 1) {
      score1.innerText = score;
      previousMove == "ArrowRight";
      ScoreBoard[0].classList.toggle("hide");
    }
    if (k[k.length - 1] == fruit) {
      score = score + 50;
      scoreid.innerText = score;
      k.unshift(temp);
      generateFruit();
    }

    // if (k[0] == 899) {
    //   k = [0, 1];
    // }
    callback();
  }, 200);
}

const changeKeyValue = (key) => {
  if (
    key == "ArrowDown" &&
    previousMove != "ArrowUp" &&
    previousMove != "ArrowDown"
  ) {
    if (k[k.length - 1] + 30 != k[k.length - 2]) {
      direction = 30;
      reach = 1;
      previousMove = key;
    }
  } else if (
    key == "ArrowRight" &&
    previousMove != "ArrowLeft" &&
    previousMove != "ArrowRight"
  ) {
    if (k[k.length - 1] + 1 != k[k.length - 2]) {
      direction = 1;
      reach = 1;
      previousMove = key;
    }
  } else if (
    key == "ArrowLeft" &&
    previousMove != "ArrowRight" &&
    previousMove != "ArrowLeft"
  ) {
    if (k[k.length - 1] - 1 != k[k.length - 2]) {
      direction = -1;
      reach = 1;
      previousMove = key;
    }
  } else if (
    key == "ArrowUp" &&
    previousMove != "ArrowDown" &&
    previousMove != "ArrowUp"
  ) {
    if (k[k.length - 1] - 30 != k[k.length - 2]) {
      direction = -30;
      reach = 1;
      previousMove = key;
    }
    // k.push(k[k.length - 1] - 32);
  }
};

const startTheGame = (val) => {
  if (!started && val) {
    started = 1;
    startgame();
  } else if (!val) {
    k = [0, 1];
    direction = 1;

    startgame();
    score = 0;
    scoreid.innerText = score;
    ScoreBoard[0].classList.toggle("hide");
  }
};

// setInterval(() => {
//   console.log("tima");
// }, 100);

siva();
