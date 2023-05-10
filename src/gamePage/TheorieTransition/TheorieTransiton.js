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

export default function TheoriTransiton() {

    useEffect(()=>{
        // si la variable de sessions n'est pas set -> default value
        if(sessionStorage.getItem("theorie")==null){
            sessionStorage.setItem("theorie",0);
        }
        setTimeout(()=>GamePageManager.changePage("TheoriePage"),750);
    },[]);

    return (
        <div className="GamePage GameLevelTrasition">
            <h1 className="NoSelect">Theori</h1>
        </div>
    );
}
