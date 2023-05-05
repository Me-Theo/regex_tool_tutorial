/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 12:17 17.04.2023
 * @ Description: sert de container pour le jeux et permette également les animation entre les screen du jeux 
 */


import "./index.css";
import React from 'react';

export default class RegexSlideWord extends React.Component {
  constructor(props) {
    super(props);
    this.wordRef = React.createRef();
    this.levelAnswer=props.levelAnswer;

    this.lastState=undefined;

    // set la class de base du word
    this.baseWordClass="word "+((this.levelAnswer.targetState)?"valide":"invalide");

    // s'ajoute a la liste des regex shower du niveaux
    props.levelPage.regexShowers.push(this);
  }


  /**
   * Cette fonction est trigger a chque fois que la regex est changer et que l'on veux update le visuel
   * @returns 
   */
  UpdateRegex(){
    
    // pour des réson qui m'échape, dé fois, cette fonction est trigger alors que le "this.wordRef" est null, du coup bah 
    if(this.wordRef.current==null)return;       // problème régler 👍
    
    if(this.levelAnswer.state==undefined || this.levelAnswer.state==this.lastState)return;

    this.lastState=this.levelAnswer.state;

    // reste class
    this.wordRef.current.className=this.baseWordClass;
    void this.wordRef.current.offsetWidth;

    // change pos
    this.wordRef.current.style.setProperty('--actualPos', (this.levelAnswer.state)?"95%":"5%");

    // trigger movment animation
    this.wordRef.current.className+=" wordMove";


    // fonction a appler a la fin de l'animation, (l'animation dur 0.25s)
    setTimeout(()=>{
      this.triggerLightText();
    },250);
  }


  /**
   * Cette fonction trigger l'effet "light" des text, elle est appler a la fin de l'animation
   */
  triggerLightText(){
    if(this.levelAnswer.state==this.levelAnswer.targetState){
      this.wordRef.current.className+=(this.levelAnswer.state)?" lighted-valide":" lighted-invalide";

      // a la fin de l'animation, lance l'animation idle
      setTimeout(()=>{
        this.wordRef.current.className+=" lighted-idle";
      },250);
    }
  }

  render() {
    return (
        <div className="RegexSlideWord">
          <div className="inSlider">
            <div className="cercle false"></div>
            <div className="cercle right"></div>
          </div>
          <div className={this.baseWordClass} ref={this.wordRef}>
            { this.levelAnswer.word}
          </div>
        </div>
    );
  }
}
