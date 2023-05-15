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

function ThoerieSelectBnt(props) {

    return (
        <button className="ThoerieSelectBnt" onClick={()=>GamePageManager.StartTheoriePage(props.theorie,false)}>
            {props.name}
        </button>
    );
}



export default function ThoerieList() {
    const [thoerieSelectBnt,setThoerieSelectBnt]=useState([]);

    useEffect(()=>{
        let data=DataLoader.getAllTheorieData();
        let selBnt=[];
        for (let index = 0; index < data.length; index++) {
            const el = data[index];
            selBnt.push(<ThoerieSelectBnt theorie={index} name={el.name} />);
        }
        setThoerieSelectBnt(selBnt);
    },[]);
    return (
        <div className="GamePage ThoerieList">
            <h1 className='PageTitle'>Theorie List</h1>
            <div className="ThoerieBntContainer">
                {thoerieSelectBnt}
            </div>
            <CustomButton title={"Back"} fontSize={40} addStyle={{marginTop:"auto",marginBottom:50}} onClick={()=>GamePageManager.changePage("MainMenu")}/>
        </div>
    );
}
