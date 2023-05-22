/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 08:52 22.05.2023
 * @ Description: Palette selector
 */



import React, { useState, useEffect, useRef } from 'react';
import "./index.css"
import DataLoader from '../../utils/DataLoader';
import SaveManger from '../../utils/SaveManager';
import ColorManager from '../../utils/ColorManager';

function PaletteShower(props) { 
    const [palColorShower,setPaletShower]=useState(null);
    const [data,setData]=useState(null);
    const ref=useRef(null);

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
            let reg=RegExp("^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$");
            if(!reg.test(element))continue;
            colorShower.push(<div className='ColorShower' style={{backgroundColor:element}}></div>) 
        }

        // set pal color 
        ref.current.style.setProperty("--palBackgroundColor",nData["background"]);
        ref.current.style.setProperty("--palMainColor",nData["main"]);

        setPaletShower(colorShower);
    },[]);

    return (
        <button className="PaletteShower" ref={ref} onClick={onClick} style={(data==null)?{}:{color:data.main,backgroundColor:data.background}} disabled={props.lock}>
            {props.number}
            <div className='LockLevel' style={{display:(props.lock)?"solid":"none"}}>
                {(data==null)?"":data.progressionUnlock}
            </div>
            <div class="PaletteColorsContainer">
                <div className='PaletteColors'>
                    {palColorShower}
                </div>
                {(data==null)?"":data.name}
            </div>
        </button>
    );
}




export default function PaletteSelector() { 

    const [palShowers,setPalShowers]=useState(null);

    useEffect(()=>{
        // recupère les palettes et les affiche
        let pals=DataLoader.getAllPaletteData();
        let palShowerList=[];
        let progres=SaveManger.data.levelProgression;

        for (let index = 0; index < pals.length; index++) {
            const element = pals[index];
            palShowerList.push(<PaletteShower data={element} number={index+1} lock={progres<element.progressionUnlock}/>);
        }
        setPalShowers(palShowerList);

    },[]);

    return (
        <div className='PaletteShowerContainer'>
            {palShowers}
        </div>
    );
}

