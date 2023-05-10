/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 14:20 10.05.2023
 * @ Description: Main Menu
 */
import React, { useState, useEffect, useRef } from 'react';
import "./index.css"
import GamePageManager from "../../utils/GamePageManager";
import DataLoader from '../../utils/DataLoader';
import CustomButton from '../../compenent/CustomButton/CustomButton';
import SaveManger from '../../utils/SaveManager';
import ColorManager from '../../utils/ColorManager';

function PaletteShower(props) { 
    const [palColorShower,setPaletShower]=useState(null);
    const [data,setData]=useState(null);

    function onClick(){
        let i= props.number-1;
        ColorManager.setPallette(props.number-1);
        SaveManger.data.palet=i;
        SaveManger.save();
    }

    useEffect(()=>{
        let nData = props.data;
        setData(nData);

        let colorShower=[];

        for (const property in nData) {
            const element =nData[property];
            if(property=="progressionUnlock")continue;
            colorShower.push(<div className='ColorShower' style={{backgroundColor:element}}></div>) 
          }
        setPaletShower(colorShower);
    },[]);

    return (
        <button className="PaletteShower" onClick={onClick} style={(data==null)?{}:{color:data.maine,backgroundColor:data.background}} disabled={props.lock}>
            {props.number}
            <div class="PaletteColorsContainer">
                {palColorShower}
            </div>
        </button>
    );
}




export default function Settings() { 

    const [palShowers,setPalShowers]=useState(null);

    useEffect(()=>{
        // recupère les palettes et les affiche
        let pals=DataLoader.getAllData();
        let palShowerList=[];
        let progres=SaveManger.data.levelProgression;

        for (let index = 0; index < pals.length; index++) {
            const element = pals[index];
            palShowerList.push(<PaletteShower data={element} number={index+1} lock={progres<element.progressionUnlock}/>);
        }
        setPalShowers(palShowerList);

    },[]);

    return (
        <div className="GamePage Settings">
            <h1 className='PageTitle'>Settings</h1>
            <div className='ProgressionTab'>
                <h1>Palette</h1>
                <div className='PaletteShowerContainer'>
                    {palShowers}
                </div>
            </div>
            <div className='ProgressionTab'>
                <h1>Progression</h1>
                <div className='DangerZone'>
                    <CustomButton title={"Reste Progression :("} addClass={"DangerBnt"} onClick={()=>{
                        SaveManger.reste();
                        sessionStorage.clear();
                        document.location.reload();
                    }} fontSize={30}/>
                </div>
            </div>
            <CustomButton title={"Back"} fontSize={40} addStyle={{marginTop:"auto",marginBottom:50}} onClick={()=>GamePageManager.changePage("MainMenu")}/>
        </div>
    );
}

