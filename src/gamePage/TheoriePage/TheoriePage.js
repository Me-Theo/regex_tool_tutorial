/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 11:18 08.05.2023
 * @ Description: Page de theorie
 */
import React, { useState, useEffect, useRef } from 'react';
import "./index.css"
import CustomButton from '../../compenent/CustomButton/CustomButton';
import GamePageManager from "../../utils/GamePageManager";
import RegexSlideWord from '../../compenent/RegexSlideWord/RegexSlideWord';
import LevelAnswer from '../../gameClass/LevelString';
import DataLoader from '../../utils/DataLoader';

export default function TheoriePage(props) {

    const [title, setTitle]=useState(""); 
    const [text, setText]=useState(""); 
    const [imgsrc, setImgsrc]=useState(""); 

    useEffect(()=>{

        // check si la session est correct, si non -> maine menu
        if(sessionStorage.getItem("theorie")==null){
            GamePageManager.changePage("MainMenu");
            return;
        }

        let data = DataLoader.getTheorieData(sessionStorage.getItem("theorie"));
        setTitle(data.name);
        setText(data.text);
        setImgsrc(data.imagLink);
    },[])


    return (
        <div className="GamePage TheoriePage">
            <h1 className='PageTitle'>{title}</h1>
            <div className='TheoriePart'>
                <p>{text}</p>
                <div className='Exemple'>
                    <h1>Exemple</h1>
                    <div style={{backgroundImage:"url("+imgsrc+")"}}></div>
                </div>
            </div>
            <CustomButton title={(props.beforLevel)?"Next":"Back"} fontSize={40} addStyle={{marginTop:"auto",marginBottom:50}} onClick={()=>{
                if(sessionStorage.getItem("level")==null){
                    GamePageManager.changePage("MainMenu");
                }else{
                    if(props.beforLevel){
                        GamePageManager.StartLevel(sessionStorage.getItem("level"));
                    }
                    else{
                        GamePageManager.StartLevel(sessionStorage.getItem("level"),false);
                    }
                }
            }}/>
        </div>
    );
}

