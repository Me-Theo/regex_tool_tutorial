/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 10:50 05.05.2023
 * @ Description: class qui permette de géré les mots a valider ou non dans les niveaux
 */

export default class LevelAnswer{
    constructor(word,targetState){
        this.state=undefined;
        this.word=word;
        this.targetState=targetState;
    }

    checkRegex(regex){
        let reg=RegExp(regex);
        this.state=reg.test(this.word);
        return this.state;
    }
}

