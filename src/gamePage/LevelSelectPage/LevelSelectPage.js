/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 15:40 12.05.2023
 * @ Description: Level Select Page
 */


import "./index.css";
import React, {useEffect, useRef, useState} from "react";
import GamePageManager from "../../utils/GamePageManager";
import SaveManger from "../../utils/SaveManager";
import CustomButton from "../../compenent/CustomButton/CustomButton";
import DataLoader from "../../utils/DataLoader";

function LevelSelectBnt(props) {

    const [isUnlock,setIsUnlock]=useState(false);

    useEffect(()=>{
        setIsUnlock(SaveManger.data.levelProgression<props.level);
    },[])


    return (
        <button className="LevelSelectBnt" onClick={()=>GamePageManager.StartLevelTheorie(props.level)} disabled={isUnlock}>
            {props.level+1}
        </button>
    );
}



export default function LevelSelectPage() {
    const totalPages=useRef(0);
    const [page,setPage]=useState(0);
    const [levelSelectBnt,setLevelSelectBnt]=useState([]);

    useEffect(()=>{
        totalPages.current=DataLoader.getNumberOfLevel();
        console.log(totalPages.current);
        GenSelectBnt();
    },[]);

    function GenSelectBnt(){
        let selBnt=[];
        for (let index = 0; index < 20; index++) {
            selBnt.push(<LevelSelectBnt level={index}/>);
        }
        setLevelSelectBnt(selBnt);
    }

    return (
        <div className="GamePage LevelSelectPage">
            <h1 className='PageTitle'>Level Select</h1>
            <div className="LevelSelectBntContainer">
                {levelSelectBnt}
            </div>
            <CustomButton title={"Back"} fontSize={40} addStyle={{marginTop:"auto",marginBottom:50}} onClick={()=>GamePageManager.changePage("MainMenu")}/>
        </div>
    );
}
