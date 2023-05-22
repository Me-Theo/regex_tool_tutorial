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
import Logo from '../../compenent/Logo/Logo';
import CustomButton from '../../compenent/CustomButton/CustomButton';
import PaletteSelector from '../../compenent/paletteSelector/PaletteSelector';
import SaveManger from '../../utils/SaveManager';

export default function MainMenu() { 

    const palSelector=useRef(null);
    const [palSelectorState,setPalSelectorState]=useState(false);

    function togglePalSelector(state){
        palSelector.current.className="PalSelectorContainer"
        void palSelector.current.offsetWidth;
        palSelector.current.className+=` PalSelectorContainer_${(state)?"show":"hide"}`;
        setPalSelectorState(state);
    }

    return (
        <div className="GamePage MainMenu">
            <div ref={palSelector} className='PalSelectorContainer'>
                <div>
                    <PaletteSelector/>
                </div>
                <button className='CloseBnt SvgContainer' onClick={()=>{
                    togglePalSelector(!palSelectorState);
                }}></button>
            </div>
            <button class="PaletteShowerBnt SvgContainer" onClick={()=>{
                togglePalSelector(!palSelectorState);
            }}></button>
            <div className='LogoContainer'>
                <Logo/>
            </div>
            <div className='Menu'>
                <div className='PlayBnt'>
                    <CustomButton title={"Jouer"} fontSize={100} onClick={()=>{GamePageManager.changePage("LevelSelectPage")}}/>
                </div>
                <div className='SubMenu'>
                    <div className='MenuBnt'>
                        <CustomButton title={"Options"} fontSize={40} onClick={()=>{GamePageManager.changePage("Settings")}}/>
                    </div>
                    <div className='MenuBnt'>
                        <CustomButton title={"Théories"} fontSize={40} onClick={()=>{GamePageManager.changePage("ThoerieList")}}/>
                    </div>
                    <div className='MenuBnt'>
                        <CustomButton title={"Crédits"} fontSize={40} onClick={()=>{GamePageManager.changePage("Credit")}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

