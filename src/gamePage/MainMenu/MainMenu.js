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

export default function MainMenu() { 
    return (
        <div className="GamePage MainMenu">
            <div className='LogoContainer'>
                <Logo/>
            </div>
            <div className='Menu'>
                <div className='PlayBnt'>
                    <CustomButton title={"Play"} fontSize={100} onClick={()=>{GamePageManager.changePage("LevelSelectPage")}}/>
                </div>
                <div className='SubMenu'>
                    <div className='MenuBnt'>
                        <CustomButton title={"Settings"} fontSize={40} onClick={()=>{GamePageManager.changePage("Settings")}}/>
                    </div>
                    <div className='MenuBnt'>
                        <CustomButton title={"Theories"} fontSize={40} onClick={()=>{GamePageManager.StartLevelTheorie(0)}}/>
                    </div>
                    <div className='MenuBnt'>
                        <CustomButton title={"Credit"} fontSize={40} onClick={()=>{GamePageManager.changePage("Credit")}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

