/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 08:10 12.05.2023
 * @ Description: LOGO
 */

import React, { useState, useEffect, useRef } from 'react';
import "./index.css"
import RegexSlideWord from '../RegexSlideWord/RegexSlideWord';
import LevelString from '../../gameClass/LevelString';

export default function Logo() { 

    return (
        <div className="Logo SvgContainer">
            <div className='LogoPart MainContainer'>
                <div className='Shadow SvgContainer LogoPart'></div>
                <div className='Word1 SvgContainer LogoPart'></div>
                <div className='Word2 SvgContainer LogoPart'></div>
            </div>
        </div>
    );
}