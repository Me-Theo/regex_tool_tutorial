/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 16:34 19.04.2023
 * @ Description: permette de gerer les page du jeux pour faire des transi styler 
 */

// import game page
import GameTitle from "../gamePage/GameTitle/GameTitle";

export default class GamePageManager{
    static instance;

    constructor(container){
        GamePageManager.instance=this;
        this.container=container;
        this.pages={
            "GameTitle":<GameTitle/>
        }
    }

    /**
     * Change actual game page
     * @param {string or int} gameIndex index de la page a afficher 
     */
    static changePage(gameIndex){
        let i = GamePageManager.instance;
        if(i===undefined)return;
        i.container.changeGamePage(i.pages[gameIndex]);
    }
}
