/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 11:18 08.05.2023
 * @ Description: Page de theorie
 */
import React, { useState, useEffect, useRef } from 'react';
import "./index.css"
import CustomButton from '../../compenent/CustomButton/CustomButton';
import GamePageManager from "../../utils/GamePageManager";
import RegexSlideWord from '../../compenent/RegexSlideWord/RegexSlideWord';
import LevelAnswer from '../../gameClass/LevelString';
import DataLoader from '../../utils/DataLoader';


export default function TheoriePage(props) {

    const [title, setTitle]=useState(""); 
    const [text, setText]=useState(""); 
    const [imgsrc, setImgsrc]=useState(""); 
    const imgShowerRef=useRef(null);

    useEffect(()=>{

        // check si la session est correct, si non -> maine menu
        if(sessionStorage.getItem("theorie")==null){
            GamePageManager.changePage("MainMenu");
            return;
        }

        let data = DataLoader.getTheorieData(sessionStorage.getItem("theorie"));

        // si la théorie n'existe pas
        if(data==null){
            GamePageManager.changePage("MainMenu");
            return;
        }

        /** load l'image */
        const fetchImage = async () => {
            try {
                const response = await import(`../../ressources/image/TutoImag/${data.imagLink}`) // change relative path to suit your needs
                setImgsrc(response.default);;
            } catch (err) {
                console.log(err);
            }
        }
        fetchImage();

        // set le reste de la theorie
        setTitle(data.name);
        setText(data.text);
    },[])


    return (
        <div className="GamePage TheoriePage">
            <h1 className='PageTitle'>{title}</h1>
            <div className='TheoriePart'>
                <p>{text}</p>
                <div className='Exemple'>
                    <h1>Exemple</h1>
                    <div ref={imgShowerRef}><img src={imgsrc}></img></div>
                </div>
            </div>
            <CustomButton title={(props.beforLevel)?"Suivant":"Retour"} fontSize={40} addStyle={{marginTop:"auto",marginBottom:50}} onClick={()=>{
                if(sessionStorage.getItem("level")==null){
                    GamePageManager.changePage("ThoerieList");
                }else{
                    if(props.beforLevel){
                        GamePageManager.StartLevel(sessionStorage.getItem("level"));
                    }
                    else{
                        GamePageManager.StartLevel(sessionStorage.getItem("level"),false);
                    }
                }
            }}/>
        </div>
    );
}

