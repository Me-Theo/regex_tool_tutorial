import "./index.css";
import GamePageManager from "../../utils/GamePageManager";
import CustomButton from "../../compenent/CustomButton/CustomButton";

function GameTitle() {
  return (
    <div className="GamePage GameTitle" onClick={()=>{GamePageManager.changePage("MainMenu")}}>
      <div className="GameLogo"></div>
      <label className="PressStart">Click to start</label>
    </div>
  );
}

export default GameTitle;
