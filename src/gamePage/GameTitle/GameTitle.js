import "./index.css";
import GamePageManager from "../../utils/GamePageManager";
import CustomButton from "../../compenent/CustomButton/CustomButton";
import SaveManger from "../../utils/SaveManager";
import Logo from "../../compenent/Logo/Logo";

function GameTitle() {
  return (
    <div className="GamePage GameTitle" onClick={()=>{
      // check si le joueur a une savgarde, si non -> tuto start, si oui -> la page ou il ce trouvais
        if(SaveManger.data.levelProgression==0){
          GamePageManager.StartLevelTheorie(0);
        }else{
          GamePageManager.changePage("MainMenu");
        }
      }}>
      <div className="GameLogo">
        <Logo/>
      </div>
      <label className="PressStart">Click to start</label>
    </div>
  );
}

export default GameTitle;
