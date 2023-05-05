/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 15:25 20.04.2023
 * @ Description: TestPage
 */
import React, { useState, useEffect, useRef } from 'react';
import "./index.css"
import CustomButton from '../../compenent/CustomButton/CustomButton';
import GamePageManager from "../../utils/GamePageManager";
import RegexSlideWord from '../../compenent/RegexSlideWord/RegexSlideWord';
import LevelAnswer from '../../gameClass/levelAnswer';

export default class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.test=new LevelAnswer("Regex",false);
    this.test2=new LevelAnswer("Tool",true);
    this.test3=new LevelAnswer("Tutorial",false);
    this.regexShowers=[];
    this.state={
      
    };
  }

  updateRegexShower(){
    for (let iterator of this.regexShowers) {
      iterator.UpdateRegex();
    }
  }

  render() {
    return (
      <div className="GamePage LevelPage">
          <div className='RegexContainer'>
            <RegexSlideWord levelAnswer={this.test} levelPage={this} />
            <RegexSlideWord levelAnswer={this.test2} levelPage={this} />
            <RegexSlideWord levelAnswer={this.test3} levelPage={this} />
          </div>
          <CustomButton title={"test"} fontSize={40} onClick={()=>{
            this.test.state=!this.test.state;
            this.test2.state=!this.test.state;
            this.test3.state=this.test.state;
            this.updateRegexShower();
            }}/>
      </div>
    );
  }
}

