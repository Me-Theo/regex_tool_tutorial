/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 10:50 05.05.2023
 * @ Description: class qui permette de géré les mots a valider ou non dans les niveaux
 */

export default class LevelString{
    constructor(word,targetState,baseState=undefined){
        this.state=baseState;
        this.word=word;
        this.targetState=targetState;
    }

    checkRegex(regex){
        if(regex=="")return;
        try{
            let reg=RegExp(regex);
            this.state=reg.test(this.word);
        }
        catch(e){
            this.state=false;
        }
        return this.state;
    }
}

