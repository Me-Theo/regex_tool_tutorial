/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 17:54 23.04.2023
 * @ Description: Page de trasition entre le niveaux 
 */


import "./index.css";
import React, {useEffect} from "react";
import GamePageManager from "../../utils/GamePageManager";
import SaveManger from "../../utils/SaveManager";

export default function LevelTransiton() {

    useEffect(()=>{
        // si la variable de sessions n'est pas set -> default value
        if(sessionStorage.getItem("level")==null){
            sessionStorage.setItem("level",0);
        }
        setTimeout(()=>GamePageManager.changePage("LevelPage"),750);
    },[]);

    return (
        <div className="GamePage GameLevelTrasition">
            <h1 className="NoSelect">Level {(Number(sessionStorage.getItem("level"))+1)}</h1>
        </div>
    );
}
