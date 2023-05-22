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
import PaletteSelector from '../../compenent/paletteSelector/PaletteSelector';


export default function Settings() { 

    return (
        <div className="GamePage Settings">
            <h1 className='PageTitle'>Options</h1>
            <div className='ProgressionTab'>
                <h1>Progression</h1>
                <div className='DangerZone'>
                    <CustomButton title={"Réinitialiser progression :("} addClass={"DangerBnt"} onClick={()=>{
                        SaveManger.reste();
                        sessionStorage.clear();
                        document.location.reload();
                    }} fontSize={30}/>
                </div>
            </div>
            <CustomButton title={"Retour"} fontSize={40} addStyle={{marginTop:"auto",marginBottom:50}} onClick={()=>GamePageManager.changePage("MainMenu")}/>
        </div>
    );
}

