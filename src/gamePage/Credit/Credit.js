/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 17:20 19.04.2023
 * @ Description: Credit
 */


import "./index.css"
import CustomButton from "../../compenent/CustomButton/CustomButton";
import GamePageManager from "../../utils/GamePageManager";

export default function Credit() {
  return (
    <div className="GamePage Credit">
        <h1 className="PageTitle">Crédits</h1>
        <div className="CreditMember">
            <label className="Role">Programmation - Art - Design</label>
            <div className="Perso SvgContainer"></div>
            <a href={"https://twitter.com/_MeTheo"} target="_blank" className="Social"><div className="twitterLogo SvgContainer"></div>@_MeTheo</a>
        </div>
        <CustomButton title={"Retour"} fontSize={40} addStyle={{marginTop:"auto",marginBottom:50}} onClick={()=>GamePageManager.changePage("MainMenu")}/>
    </div>
  );
}

