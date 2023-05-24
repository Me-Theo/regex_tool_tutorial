/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 16:34 19.04.2023
 * @ Description: permette de gerer les page du jeux pour faire des transi styler 
 */
import SaveManger from "./SaveManager";
import DataLoader from "./DataLoader";
// import game page
import GameTitle from "../gamePage/GameTitle/GameTitle";
import TestPage from "../gamePage/TestPage/TestPage";
import LevelPage from "../gamePage/LevelPage/LevelPage";
import TheoriePage from "../gamePage/TheoriePage/TheoriePage";
import MainMenu from "../gamePage/MainMenu/MainMenu";
import Credit from "../gamePage/Credit/Credit";
import Settings from "../gamePage/Settings/Settings";
import LevelSelectPage from "../gamePage/LevelSelectPage/LevelSelectPage";
import Transiton from "../gamePage/Transition/Transiton";
import ThoerieList from "../gamePage/TheorieList/ThoerieList";

const errorPage="MainMenu";             // page sur le quel renvoyer si il y a une erreur

export default class GamePageManager{
    static instance;

    constructor(container){
        GamePageManager.instance=this;
        this.container=container;
        this.pages={
            "GameTitle":<GameTitle/>,
            "TestPage":<TestPage/>,
            "LevelPage":<LevelPage/>,
            "Level":<Transiton nextPage={"LevelPage"}/>,
            "Theorie":<Transiton nextPage={"LevelTheoriePage"} title={"Théorie"}/>,
            "LevelTheoriePage":<TheoriePage beforLevel={true}/>,
            "TheoriePage":<TheoriePage beforLevel={false}/>,
            "MainMenu":<MainMenu/>,
            "Credit":<Credit/>,
            "Settings":<Settings/>,
            "LevelSelectPage":<LevelSelectPage/>,
            "ThoerieList":<ThoerieList/>,
            "EndScreen":<Transiton nextPage={"MainMenu"} title={"Thx for playing :)"} time={1500}/>
        }
        
        // liste des page qui ne peux être sauvgarder et donc, ne peux pas être atteinte autrement qu'en jeu
        this.exeptPage=["GameTitle","LevelPage","TheoriePage","LevelTheoriePage"];
    }

    /**
     * Change actual game page
     * @param {string or int} gameIndex index de la page a afficher 
     */
    static changePage(gameIndex){
        let i = GamePageManager.instance;
        if(i===undefined)return;
        
        let page=i.getPage(gameIndex);

        i.container.changeGamePage(page);

        // save la dernière page visiter sauf si il s'agit d'une exeption
        if(i.exeptPage.includes(gameIndex))return;

        // save la denière page vister dans la sessions pour la charger vite
        sessionStorage.setItem("lastPage",gameIndex);
    }


    /**
     * Recupère la page demander ou renvoie sur une page par défaut si elle n'existe pas
     * @param {string} name nom de la page
     * @returns page compenent
     */
    getPage(name){
        let page=this.pages[name];
        // si la page n'existe pas
        if(page==undefined){
            page=this.pages[errorPage];
        }
        return page;
    }

    //#region Level and theorie

    /**
     * laucneh a level + save the progresion
     * @param {*} level 
     * @returns 
     */
    static StartLevel(level,transion=true){

        // check si le level est accécible par le joueur, si non -> maine menu 
        if(SaveManger.data.levelProgression<level || level>DataLoader.getNumberOfLevel()){
            this.changePage(errorPage);
            return;
        }

        sessionStorage.setItem("level",level);
        this.changePage((transion)?"Level":"LevelPage");
    }

    /**
     * laucneh a level + save the progresion
     * @param {*} level
     * @param {*} transion si il y a une transiion avant l'affichage de la page
     * @param {*} justThoerie si il la page de thoeire est afficher sans le level
     * @returns 
     */
    static StartLevelTheorie(level){
        // check si le level est accécible par le joueur, si non -> maine menu 
        if(SaveManger.data.levelProgression<level || level>DataLoader.getNumberOfLevel()){
            this.changePage(errorPage);
            return;
        }
        let levelData=DataLoader.getLevelData(level);

        // edn screen
        if(level>=DataLoader.getNumberOfLevel()){
            this.changePage("EndScreen");
            console.log("Ahahah");
            return;
        }


        // fin des levels disponible
        if(levelData==null){
            this.changePage("GameTitle");
            return;
        }

        let hasTheorie=(levelData.hasStartTheorie);
        sessionStorage.setItem("level",level);

        sessionStorage.setItem("theorie",levelData.theorie);
        this.changePage((hasTheorie)?"Theorie":"Level");
    }

    /**
     * laucneh a level + save the progresion
     * @param {*} theori
     * @param {*} fromLevel si la theroei vine d'un level
     * @returns 
     */
        static StartTheoriePage(theori,fromLevel=true){
            sessionStorage.setItem("theorie",theori);
            if(!fromLevel)sessionStorage.removeItem("level");
            this.changePage("TheoriePage");
        }
    

    //#endregion
}
