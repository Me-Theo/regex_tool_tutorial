/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 14:05 12.05.2023
 * @ Description: Theorie Icon
 */

import React, { useState, useEffect, useRef } from 'react';
import "./index.css"
import RegexSlideWord from '../RegexSlideWord/RegexSlideWord';
import LevelString from '../../gameClass/LevelString';

export default function TheoireIcon() { 

    return (
        <div className="TheoireIcon SvgContainer">
            <div className='Outline SvgContainer Part'></div>
            <div className='MainBook Part'>
                <div className='Book2 SvgContainer Part'></div>
                <div className='Book1 SvgContainer Part'></div>
                <div className='Content SvgContainer Part'></div>
            </div>
        </div>
    );
}