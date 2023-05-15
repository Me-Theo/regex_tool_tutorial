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

export default function Transiton(props) {

    useEffect(()=>{
        setTimeout(()=>GamePageManager.changePage(props.nextPage),750);
    },[]);

    return (
        <div className="GamePage GameTransition">
            <h1 className="NoSelect">{
                (props.title==undefined || props.title==null)?(
                    "Level "+(Number(sessionStorage.getItem("level"))+1)
                ):props.title
            }</h1>
        </div>
    );
}
