/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 12:17 17.04.2023
 * @ Description: sert de container pour le jeux et permette également les animation entre les screen du jeux 
 */


import "./index.css";
import React from 'react';
import GamePageManager from "../utils/GamePageManager";
import SaveManger from "../utils/SaveManager";

class GameContainer extends React.Component {
  constructor(props) {
    super(props);

    // setup game page manager 
    this.gamePageManager=new GamePageManager(this);
    this.container=React.createRef();

    // charge la denière page visiter (sessions), si pas -> Game title
    let lastLevel=sessionStorage.getItem("lastPage");
    let startPage=this.gamePageManager.getPage((lastLevel!=null)?lastLevel:"GameTitle");

    // load la savgarde
    SaveManger.load();

    
    this.state={
      onTransi:false,
      actualGamePage:startPage
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
