/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 08:56 08.05.2023
 * @ Description: permette de gérer le chargement des donnée, exemple les donner de niveaux ou de théorie
 */

import { type } from '@testing-library/user-event/dist/type';
import levelData from '../ressources/data/levels.json';
import theorieData from '../ressources/data/theorie.json';
import LevelString from '../gameClass/LevelString';
import paletteData from '../ressources/data/palette.json';


export default class DataLoader{

    /**
     * Get les donner d'un level
     * @param {int} levelNumber 
     * @returns {JSON} level Data
     */
    static getLevelData(levelNumber){
        let n = Number.parseInt(levelNumber);
        if(Number.isNaN(n))return null;

        let data=levelData[n];

        if(data==undefined || data==null)return null;
        
        let strings=[];
        for (let index = 0; index < data.words.length; index++) {
            const element = data.words[index];
            strings.push(new LevelString(element.text,element.targetState));
        }
        return {
            strings:strings,
            placeHolder:data.placeHolder,
            limit:data.limit,
            theorie:data.theorieIndex,
            hasStartTheorie:data.startTheorie,
            name:data.name
        }
    }

    static getNumberOfLevel(){
        return levelData.length;
    }

    /**
     * Get les donner d'une theorie
     * @param {int} theorieIndex 
     * @returns {JSON} Theorie Data
     */
    static getTheorieData(theorieIndex){
        return theorieData[theorieIndex];
    }

    static getAllTheorieData(){
        return theorieData;
    }

    /**
     * Get les donner d'une pallette
     * @param {int} index 
     * @returns {JSON} pallette Data
     */
    static getPalette(index){
        return paletteData[index];
    }

    static getNumberOfPalette(){
        return paletteData.length;
    }

    static getAllPaletteData(){
        return paletteData;
    }
}