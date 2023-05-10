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

export default function TheoriePage() {

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
            <h1>{title}</h1>
        </div>
    );
}

