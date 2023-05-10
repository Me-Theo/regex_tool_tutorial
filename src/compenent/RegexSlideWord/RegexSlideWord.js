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
    this.regexSlider=React.createRef();

    this.levelString=props.levelString;

    this.lastState=undefined;

    this.fontSize=(props.fontSize==undefined)?27:props.fontSize;

    // set la class de base du word
    this.baseWordClass="word "+((this.levelString.targetState)?"valide":"invalide");

    // s'ajoute a la liste des regex shower du niveaux
    props.slideList.push(this);
    this.UpdateRegex();
  }

  //#region utils

  /**
   * Recupère la marge que requir le slider, par rappor au mots
   * @returns {float} marge en px
   */
  getMargin(){
    // get margin
    if(this.wordRef.current!=null){
      // get word offeset 
      let off = this.wordRef.current.offsetWidth/2;
      return off;
    }
  }
  //#endregion


  //#region Visuel update + animation
  /**
   * Cette fonction est trigger a chque fois que la regex est changer et que l'on veux update le visuel
   * @returns {boolean} si il y a eu un changement (true) si non (false)
   */
  UpdateRegex(){
    
    // pour des réson qui m'échape, dé fois, cette fonction est trigger alors que le "this.wordRef" est null, du coup bah 
    if(this.wordRef.current==null)return false;       // problème régler 👍
    
    if(this.levelString.state==undefined || this.levelString.state==this.lastState)return false;

    this.lastState=this.levelString.state;

    // reste class
    this.wordRef.current.className=this.baseWordClass;
    void this.wordRef.current.offsetWidth;

    // change pos
    this.wordRef.current.style.setProperty('--actualPos', (this.levelString.state)?"95%":"5%");

    // trigger movment animation
    this.wordRef.current.className+=" wordMove";


    // fonction a appler a la fin de l'animation, (l'animation dur 0.25s)
    setTimeout(()=>{
      this.triggerLightText();
    },200);

    return true;
  }


  /**
   * Cette fonction trigger l'effet "light" des text, elle est appler a la fin de l'animation
   */
  triggerLightText(){
    if(this.levelString.state==this.levelString.targetState){
      this.wordRef.current.className+=(this.levelString.state)?" lighted-valide":" lighted-invalide";

      // a la fin de l'animation, lance l'animation idle
      setTimeout(()=>{

        // merci le cinema
        if(this.levelString.state!=this.levelString.targetState)return;
        
        this.wordRef.current.className+=" lighted-idle";
      },250);
    }
  }

  //#endregion


  /* render element */
  render() {
    return (
        <div className="RegexSlideWord NoSelect" ref={this.regexSlider}>
          <div className="inSlider">
            <div className="cercle false"></div>
            <div className="cercle right"></div>
          </div>
          <label className={this.baseWordClass} ref={this.wordRef} style={{fontSize:this.fontSize,...this.props.addStyle}}>
            { this.levelString.word}
          </label>
        </div>
    );
  }
}
