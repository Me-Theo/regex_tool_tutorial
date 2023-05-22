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
import LevelAnswer from '../../gameClass/LevelString';

export default function TestPage() {

  const a = useRef(new LevelAnswer("dsadasdasdas",true));

  useEffect(()=>{
  },[])


  return (
    <div className="GamePage TestPage">
        <h1>Testpage</h1>
        <div className="testZone">
          <CustomButton title={"Retour"} fontSize={40} addStyle={{marginTop:"auto",marginBottom:50}} onClick={()=>GamePageManager.changePage("MainMenu")}/>
        </div>
        <div className='testregexShower'>
          <RegexSlideWord levelAnswer={a.current} />
        </div>
        <CustomButton title={"Retour"} fontSize={40} addStyle={{marginTop:"auto",marginBottom:50}} onClick={()=>GamePageManager.changePage("MainMenu")}/>
        <div></div>
    </div>
  );
}

