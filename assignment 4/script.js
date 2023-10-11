const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

class Box {
  constructor() {
    this.position = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    };
    this.size = { width: 40, height: 40 };
    this.velocity = { x: Math.random() * (1 - -1) + -1, y: 0 };
    this.color = "black";
    this.shape = "rectangle"; // Default shape is rectangle
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    if (this.shape === "rectangle") {
      c.rect(this.position.x, this.position.y, this.size.width, this.size.height);
    } else if (this.shape === "circle") {
      const radius = Math.min(this.size.width, this.size.height) / 2;
      c.arc(
        this.position.x + radius,
        this.position.y + radius,
        radius,
        0,
        Math.PI * 2
      );
    }
    c.fill();
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  update() {
    this.draw();
    this.move();
  }

  checkCollision(otherBoxes, ind) {
    otherBoxes.forEach((element, index) => {
      if (ind === index) return;

      if (
        this.position.x + this.size.width >= element.position.x &&
        this.position.y + this.size.height >= element.position.y &&
        this.position.x <= element.size.width + element.position.x &&
        this.position.y <= element.size.height + element.position.y
      ) {
        this.color = "orange";
        element.color = "orange";

        // Change the shape to circle
        this.shape = "circle";
        element.shape = "circle";
      } else {
        this.color = "olive";
        // Change the shape back to rectangle
        this.shape = "rectangle";
      }
    });
  }
}

let boxArr = [];
for (let i = 0; i < 30; i++) {
  boxArr.push(new Box());
}

function loop() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  boxArr.forEach((item, index) => {
    item.update();
    item.checkCollision(boxArr, index);
  });
  requestAnimationFrame(loop);
}

loop();
