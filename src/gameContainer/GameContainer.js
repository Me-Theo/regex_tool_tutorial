/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 12:17 17.04.2023
 * @ Description: sert de container pour le jeux et permette également les animation entre les screen du jeux 
 */


import "./index.css";
import React from 'react';
import GamePageManager from "../utils/GamePageManager";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.gamePageManager=new GamePageManager(this);
    this.container=React.createRef();
    this.state={
      onTransi:false,
      actualGamePage:this.gamePageManager.pages["GameTitle"]
    };
  }
  
  /**
   * Change actual Game page
   * @param {object} newGamePage 
   */
  changeGamePage(newGamePage){
    if(this.state.onTransi)return;

    // reload animation
    this.container.current.className="GamePage"; 
    void this.container.current.offsetWidth;
    this.container.current.className="GamePage GamePageChange";

    this.setState({
      actualGamePage:newGamePage
    });
  }

  render() {
    return (
      <div id="gamePageContainer">
        <div className="GamePage GamePageChange" ref={this.container}>
          {this.state.actualGamePage}
        </div>
      </div>
    );
  }
}

export default GameContainer;
