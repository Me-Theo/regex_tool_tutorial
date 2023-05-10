/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 13:20 05.05.2023
 * @ Description: Page de level
 */

import React, { useState, useEffect, useRef } from 'react';
import "./index.css"
import CustomButton from '../../compenent/CustomButton/CustomButton';
import GamePageManager from "../../utils/GamePageManager";
import RegexSlideWord from '../../compenent/RegexSlideWord/RegexSlideWord';
import LevelString from '../../gameClass/LevelString';
import DataLoader from '../../utils/DataLoader';
import SaveManger from '../../utils/SaveManager';
import userEvent from '@testing-library/user-event';


export default function LevelPage(props) {

  const data=useRef(null);
  const levelNumber=useRef(null);

  // slider container
  const regexSliderContainer=useRef(null);

  // slider word part
  const sliderListObject = useRef([]);
  const [sliderCompenents,setSliderCompenents] = useState(null);
  const levelString = useRef([]);

  // player input
  const [playerRegex, setPlayerRegex] = useState("");

  // player text input
  const playerInput=useRef(null);
  const playerInputText=useRef(null);
  const playerInputWidthCal=useRef(null);
  const [regexStartAndEnd,setRegexStartAndEnd]=useState(["/","/g"]);    // caractère au début et la fin de la regex


  // level complet
  const [isLevelFinish,setIsLevelFinish]=useState(false);
  const [showLevelCompetMessage,setShowLevelCompetMessage]=useState(false);
  const [showNextLevelMessage,setShowNextLevelMessage]=useState(false);
  

  // satrt set up
  useEffect(()=>{
    // check si la session est correct, si non -> maine menu
    if(sessionStorage.getItem("level")==null){
      GamePageManager.changePage("MainMenu");
      return;
    }


    // importe les données du niveaux
    levelNumber.current=sessionStorage.getItem("level");
    let d = data.current =DataLoader.getLevelData(levelNumber.current);
    levelString.current=d.strings;

    // create level slider
    let sliderObjs=[];
    for (let index = 0; index < levelString.current.length; index++) {
      sliderObjs.push(<RegexSlideWord levelString={levelString.current[index]} slideList={sliderListObject.current}/>)
    }
    setSliderCompenents(sliderObjs);

    // set up base input (si il y en a)
    if(d.placeHolder!=""){
      onInputChange(d.placeHolder);
    }

    // focus le text input
    playerInputText.current.focus();

  },[])


  useEffect(()=>{
    updateRegexSliderWord(playerRegex.current);
  },[sliderCompenents])





  /**
   * Update all regex slider word 
   */
  function updateRegexSliderWord(regex=""){

    let isLevelFinish=true;
    let change = false;

    // check si la regex passe ou pas
    for (let levelAnswer of levelString.current) {
      let laStatue = levelAnswer.checkRegex(regex)==levelAnswer.targetState;


      isLevelFinish=(isLevelFinish)?laStatue:isLevelFinish;

    }

    // udpate les sliders
    for (let iterator of sliderListObject.current) {
      let chan= iterator.UpdateRegex();
      change=(!change)?chan:change;   // check si il y a eu un chanegemnt dans les word slide

    }


    // permette de lancer l'animation d'updte du niveau
    if(change){
      levelUpdateAnim();
    }

    // lorsque le niveau ce fini
    if(isLevelFinish){
      setIsLevelFinish(isLevelFinish);

      // affiche le level complet message
      setShowLevelCompetMessage(true);

      // update la porgresion du joueur
      UpdateProgression();

      setTimeout(()=>{
        setShowNextLevelMessage(true);
        
        /*
        // losque le niveau est fini, permette de pass au nievau suivant en apuiant sur la bar espace
        let onPressSpaceBar=(e)=>{
          if(e.code=="Space"){
            GamePageManager.changePage("Title");
            document.body.removeEventListener("keypress",onPressSpaceBar);
          }
        }
        document.body.addEventListener('keypress', onPressSpaceBar);
        */
      },500);
    }
  }

  //#region Visual

  // permette de récupérée le padding pour que les dépasse pas
  useEffect(()=>{
    // recupère la padding par rapport a la marge que chaque slider demande, prent la plus grande marge
    let padding=0;
    for (let index = 0; index < sliderListObject.current.length; index++) {
      // recupère la taille du padding
      const iterator = sliderListObject.current[index];
      let newPadding=iterator.getMargin();
      padding=(padding<newPadding)?newPadding:padding;
    }
    
    // apply padding
    regexSliderContainer.current.style.paddingLeft=padding+"px";
    regexSliderContainer.current.style.paddingRight=padding+"px";

  },[sliderCompenents]);



  /**
   * Déclanche l'animation lorsqu'il y a un changement dans les slider et que la box fait un petit "boing"
   */
  function levelUpdateAnim(){
    regexSliderContainer.current.className="RegexContainer";
    void regexSliderContainer.current.offsetWidth;
    regexSliderContainer.current.className="RegexContainer updateRegex";

    // reste animation
    setTimeout(()=>{
      regexSliderContainer.current.className="RegexContainer";
    },150);
  }

  function inputUpdateAnimation()
  {
    playerInput.current.className="";
    void playerInput.current.offsetWidth;
    playerInput.current.className="inputUpdate";
  }

  //#endregion


  //#region Utils

  /*
    update la progressions du joueur
  */
  function UpdateProgression(){
    if(SaveManger.data.levelProgression==levelNumber.current){
      SaveManger.data.levelProgression+=1;
      SaveManger.save();
    }
  }

  //#endregion

  //#region Text Input

  /**
   * permette d'update l'input text
   * @param {string} value 
   * @returns 
   */
  function onInputChange(value){
    if(isLevelFinish){
      return;
    }

    // si limite de craractère
    if(data.current.limit!=-1 && value.length>data.current.limit)return;

    //inputUpdateAnimation();

    // set la value l'input text
    setPlayerRegex(value);

    // update les slider
    updateRegexSliderWord(value);

    // update la taille de l'input text
    changeInputWidth(value);
  }

  /**
   * Recupère une value text => calcule ça taille sur l'écran et ajuste la taille de l'input pour lui corespondre
   * @param {string} value 
   */
  function changeInputWidth(value){
    /* 
    l'espace est pas considérér comme un caractère visible, du coup, il faut les remplacer par 
    autre chose pour que la taille sois correct. du coup, il faut juste remplacer les espace par des espaces incécable
    */
    playerInputWidthCal.current.innerHTML=value.replaceAll(" ","&nbsp");;
    let width=playerInputWidthCal.current.offsetWidth;
    playerInputText.current.style.width=width+"px";
  }

  //#endregion


  return (
    <div className="GamePage LevelPage">
        <div className='RegexContainer' ref={regexSliderContainer}>
          {sliderCompenents}
        </div>
        <div className={"inputHolder "+(+(isLevelFinish)?" LevelCompletInput":"")} ref={playerInput} onClick={()=>{
          playerInputText.current.focus();
        }}>
          <span className='embedValue NoSelect'>{regexStartAndEnd[0]}</span>
          <input
            className={isLevelFinish?"LevelCompletInput":""}
            type="text" 
            value={playerRegex}
            ref={playerInputText}
            onChange={(e) => onInputChange(e.target.value)}
            disabled={isLevelFinish}
          />
          <span className='widthCal' ref={playerInputWidthCal}></span>
          <span className='embedValue NoSelect'>{regexStartAndEnd[1]}</span>
        </div>
        {
          showLevelCompetMessage?<div className='LevelFinishMessage NoSelect'>
            <h1>Level Clear :)</h1>
          </div>:null
        }
        {
          showNextLevelMessage?<div className='NextLevelNotif'>
             <CustomButton title={"Next"} fontSize={40} onClick={()=>{
              // go next level
              GamePageManager.StartLevel(Number.parseInt(levelNumber.current)+1);
             }}/>
          </div>:null
        }
    </div>
  );
}

