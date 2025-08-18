import "./styles.css";
import { useState, useEffect, useRef } from "react";
import { random } from "lodash";

const BouncingBalls = ({ numBalls, ballSize }) => {
  const canvasRef = useRef(null);
  const animationId = useRef(null);
  const timeRef = useRef(null);

  const [balls, setBalls] = useState([]);
  const [speed, setSpeed] = useState(1);
  const [collisionCount, setCollisionCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // https://www.kirupa.com/html5/animating_with_requestAnimationFrame.htm
  function Ball(x, y, dx, dy, size, number) {
    // set positions x, y -- set velocties dx, dy  -- set ball size.
    this.x = x;
    this.y = y;

    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.number = number;

    // draw circle
    this.draw = function () {
      const ctx = canvasRef.current.getContext("2d");
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();

      // add number to ball
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.number, this.x, this.y);
    };

    // update position and check for collisions
    this.update = function () {
      let collided = false;
      // check for collsions with left/right wall
      if (
        this.x + this.size >= canvasRef.current.width ||
        this.x - this.size <= 0
      ) {
        this.dx = -this.dx;
        collided = true;
      }
      if (
        this.y + this.size >= canvasRef.current.height ||
        this.y - this.size <= 0
      ) {
        this.dy = -this.dy;
        collided = true;
      }

      if (collided) {
        setCollisionCount((prevCount) => prevCount + 1);
      }
      // give balls speed and velocity
      this.x += this.dx * speed;
      this.y += this.dy * speed;
    };
  }

  // function to create balls in a random position on the canvas
  const createBalls = (canvasWidth, canvasHeight) => {
    const ballsArray = [];
    // for loop to initialize each ball
    for (let i = 0; i < numBalls; i++) {
      // intialize x, y, dx, dy values for the ball
      const size = ballSize;
      const x = random(canvasWidth - size);
      const y = random(canvasHeight - size);
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      // push new Ball into the array
      ballsArray.push(new Ball(x, y, dx, dy, size, i + 1));
    }
    setBalls(ballsArray);
  };

  // function to update position of balls as they move across the canvas
  const updateAnimation = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // use forEach to update and draw each ball in the array
    balls.forEach((ball) => {
      ball.update();
      ball.draw();
    });
    // request next animation frame
    animationId.current = requestAnimationFrame(updateAnimation);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    // set dimenisions of canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // initialize animation
    animationId.current = requestAnimationFrame(updateAnimation);

    // start initial time reference
    timeRef.current = Date.now();
    return () => {
      cancelAnimationFrame(animationId.current);
    };
  }, [numBalls, ballSize, speed]);

  // initialize timer on start
  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTimeInSeconds = (currentTime - timeRef.current) / 1000;
      setElapsedTime(elapsedTimeInSeconds / 60);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // On button click
  const handleToggleAnimation = () => {
    // Reset increments and balls
    setBalls([]);
    setElapsedTime(0);

    // clear canvas
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    setCollisionCount(0);

    // create new balls
    createBalls(canvasRef.current.width, canvasRef.current.height);

    // request next frame
    animationId.current = requestAnimationFrame(updateAnimation);

    // reset time reference
    timeRef.current = Date.now();
  };

  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: "2px solid black", backgroundColor: "lightgray" }}
      ></canvas>
      <div>Collision Count: {collisionCount} </div>
      <div>Elapsed Time: {elapsedTime.toFixed(2)} minutes</div>

      <label htmlFor="speed">Set Speed: </label>
      <input
        name="speed"
        type="range"
        min="1"
        max="30"
        step="2"
        value={speed}
        onChange={handleSpeedChange}
      />

      <button onClick={handleToggleAnimation}>Start/Reset</button>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bouncing Balls</h1>
      </header>
      <div>
        <BouncingBalls numBalls={3} ballSize={20} />
      </div>
    </div>
  );
}
