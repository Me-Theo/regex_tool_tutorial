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


export default class DataLoader{
    static getLevelData(levelNumber){
        let data=levelData[levelNumber];
        let strings=[];
        for (let index = 0; index < data.words.length; index++) {
            const element = data.words[index];
            strings.push(new LevelString(element.text,element.targetState));
        }
        return {
            strings:strings,
            placeHolder:data.placeHolder,
            limit:data.limit,
            theorie:data.thorieIndex
        }
    }

    static getTheorieData(theorieIndex){
        return theorieData[theorieIndex];
    }
}