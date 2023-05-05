/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 16:34 19.04.2023
 * @ Description: permette de gerer les page du jeux pour faire des transi styler 
 */

// import game page
import GameTitle from "../gamePage/GameTitle/GameTitle";
import TestPage from "../gamePage/TestPage/TestPage";
import LevelPage from "../gamePage/LevelPage/LevelPage";

export default class GamePageManager{
    static instance;

    constructor(container){
        GamePageManager.instance=this;
        this.container=container;
        this.pages={
            "GameTitle":<GameTitle/>,
            "TestPage":<TestPage/>,
            "LevelPage":<LevelPage/>
        }
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

        // save last page
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
            page=this.pages["GameTitle"];
        }
        return page;
    }
}
