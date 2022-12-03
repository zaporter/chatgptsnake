
import React from 'react';
import './Snake.css';

const CELL_SIZE = 20;
const WIDTH = 20;
const HEIGHT = 20;

class Snake extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set initial state here
      direction: 'RIGHT',
      snake: [
        { x: WIDTH / 2, y: HEIGHT / 2 }
      ],
      food: {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT)
      },
      gameOver: false
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      // Update snake position here
      const snake = [...this.state.snake];
      let head = snake[0];

      switch (this.state.direction) {
        case 'RIGHT':
          head = { x: head.x + 1, y: head.y };
          break;
        case 'LEFT':
          head = { x: head.x - 1, y: head.y };
          break;
        case 'UP':
          head = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          head = { x: head.x, y: head.y + 1 };
          break;
      }

      // Check if snake has gone off the grid or hit itself
      if (head.x < 0 || head.x >= WIDTH || head.y < 0 || head.y >= HEIGHT || snake.find(part => part.x === head.x && part.y === head.y)) {
        this.setState({
          gameOver: true
        });
        clearInterval(this.timer);
        return;
      }

      snake.unshift(head);

      // Check if snake has eaten food
      if (head.x === this.state.food.x && head.y === this.state.food.y) {
        // Generate new food
        this.setState({
          food: {
            x: Math.floor(Math.random() * WIDTH),
            y: Math.floor(Math.random() * HEIGHT)
          }
        });
      } else {
        snake.pop();
      }

      // Update snake in state
      this.setState({
        snake: snake
      });
    }, 100);

    // Bind keyboard events
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    // Clean up timer and keyboard events
    clearInterval(this.timer);
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (e) => {
    // Update direction based on key press
    switch (e.key) {
      case 'ArrowUp':
        this.setState({ direction: 'UP' });
        break;
      case 'ArrowDown':
        this.setState({ direction : 'DOWN' });
        break;
      case 'ArrowLeft':
        this.setState({ direction: 'LEFT' });
        break;
      case 'ArrowRight':
        this.setState({ direction: 'RIGHT' });
        break;
    }
  }

  render() {
    // Create cells for the grid
    const cells = [];
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        let className = 'cell';

        // Check if cell is part of snake
        this.state.snake.forEach(part => {
          if (part.x === x && part.y === y) {
            className += ' snake';
          }
        });

        // Check if cell is food
        if (this.state.food.x === x && this.state.food.y === y) {
          className += ' food';
        }

        cells.push(
          <div
            key={x + ',' + y}
            className={className}
            style={{
              left: x * CELL_SIZE,
              top: y * CELL_SIZE
            }}
          />
        );
      }
    }

    return (
      <div className="snake-container">
        {this.state.gameOver ? (
          <div className="game-over">
            Game over!
            <button onClick={this.props.onGameOver}>Restart</button>
          </div>
        ) : (
          cells
        )}
      </div>
    );
  }
}

export default Snake;
