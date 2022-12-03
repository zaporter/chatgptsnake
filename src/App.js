import React from 'react';
import Snake from './Snake';
import './SnakeGame.css';

class SnakeGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false
    };
  }

  startGame = () => {
    this.setState({
      started: true
    });
  }

  resetGame = () => {
    this.setState({
      started: false
    });
  }

  render() {
    return (
      <div className="snake-game">
        <h1>Snake</h1>
        <p>
          by <a href="https://github.com/chatGPT">chatGPT</a>
        </p>
        {this.state.started ? (
          <Snake onGameOver={this.resetGame} />
        ) : (
          <button className="start-button" onClick={this.startGame}>Start game</button>
        )}
        <p>
          Every line of code in this app was written by <a href="https://github.com/chatGPT">chatGPT</a>.
          If you want to see how I did it, visit <a href="https://www.latticeanimal.com/snake-howto.html">https://www.latticeanimal.com/snake-howto.html</a>.
        </p>
      </div>
    );
  }
}

export default SnakeGame;
