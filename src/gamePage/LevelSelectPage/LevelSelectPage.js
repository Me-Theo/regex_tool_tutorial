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

function LevelSelectBnt(props) {

    return (
        <button className="LevelSelectBnt" onClick={()=>GamePageManager.StartLevelTheorie(props.level)} disabled={SaveManger.data.levelProgression<props.level}>
            {props.level+1}
        </button>
    );
}



export default function LevelSelectPage() {
    const nLevelParPage= 20;

    const totalPages=useRef(0);
    const totalLevel=useRef(0);


    const LevelSelectBntContainer=useRef(null);

    const [levelSelectBnt,setLevelSelectBnt]=useState([]);
    const [actualPage,setActualPage]=useState(0);
    const [hasNavBnt,setHasNavBnt]=useState(false);

    useEffect(()=>{

        let totLvl=DataLoader.getNumberOfLevel();
        totalLevel.current=totLvl;
        let n = (totLvl%nLevelParPage);
        totalPages.current=(totLvl+((n>0)?nLevelParPage:0))/nLevelParPage;
        setHasNavBnt(totLvl>nLevelParPage);

        let page=0;
        // si le joueur était rentré dans un level avant
        if(sessionStorage.getItem("level")!=null){
            let n=sessionStorage.getItem("level");
            page=((n-(n%nLevelParPage))/nLevelParPage);
            setActualPage(page);
        }
        

        GenSelectBnt(page);
    },[]);

    function GenSelectBnt(page){
        let selBnt=[];
        for (let index = 0; index < nLevelParPage; index++) {
            let i = (page*nLevelParPage)+index;

            if(i>totalLevel.current-1){
                break;
            };

            selBnt.push(<LevelSelectBnt level={i}/>);
        }
        setLevelSelectBnt(selBnt);
    }

    function ChangePage(page){
        if(page<0 || page>totalPages.current-1){
            return;
        }

        setActualPage(page);

        GenSelectBnt(page);

        // restart animation
        LevelSelectBntContainer.current.className="LevelSelectBntContainer";
        void LevelSelectBntContainer.current.offsetWidth;
        LevelSelectBntContainer.current.className+=" LevelPageChange";
    }

    function BntAnimation(e){
        let target=e.target.parentElement;
        let clList=target.classList;

        if(clList.lenght<3){
            return;
        }
        
        let baseClass = `${clList[0]} ${clList[1]} ${clList[2]}`;

        target.className=baseClass;
        void target.offsetWidth;
        target.className+=" NavBnt_Click";
    }

    return (
        <div className="GamePage LevelSelectPage">
            <h1 className='PageTitle'>Niveaux</h1>
            <div className="LevelSelectContainer" style={{justifyContent: (hasNavBnt)?"space-around":"center"}}>
                {hasNavBnt?
                    <button className="NavBnt GoBack SvgContainer" disabled={actualPage<=0} onClick={(e)=>{
                        ChangePage(actualPage-1);
                        BntAnimation(e);
                    }}><div className="SvgContainer Icon"></div>
                    </button>
                    :null
                }
                    <div className="LevelSelectBntContainer" ref={LevelSelectBntContainer}>
                        {levelSelectBnt}
                    </div>
                {hasNavBnt?
                    <button className="NavBnt GoNext SvgContainer" disabled={actualPage>=totalPages.current-1} onClick={(e)=>{
                        ChangePage(actualPage+1);
                        BntAnimation(e);
                    }}><div className="SvgContainer Icon"></div>
                    </button>
                    :null
                }
            </div>
            <CustomButton title={"Retour"} fontSize={40} addStyle={{marginTop:"auto",marginBottom:50}} onClick={()=>GamePageManager.changePage("MainMenu")}/>
        </div>
    );
}
