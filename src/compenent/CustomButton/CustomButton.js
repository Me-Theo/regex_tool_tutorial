/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 18:56 19.04.2023
 * @ Description: button custom
 */

import "./index.css"

import React, { useState } from 'react';

export default function CustomButton(props) {
  return (
    <button className={"CustomButton "+((props.addClass!=undefined)?props.addClass:"")} disabled={(props.disabel)?true:false} style={{fontSize:props.fontSize,...props.addStyle}} onClick={props.onClick}>
        {props.title}
    </button>
  );
}