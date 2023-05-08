/**
 * ETML
 * @ De: Theo Bensaci
 * @ Date: 08:32 08.05.2023
 * @ Description: Permette de géré la sauvgarde de la progression
 * la raison pour la quel les donner de sauvarde son sauvgarder en json est parceque, si je veux change la ou est elles
 * sont sauvgader, ça m'evite de changer le code, juste la methode
 */



export default class SaveManger{

    static data;

    constructor(levelProgression,palet){
        SaveManger.data=this;
        this.levelProgression=levelProgression;     // progression actuelle du joueur, montre le nombre de nivaux que le joueur peu lancer 
        this.palet=palet;
    }


    /**
     * Load la save file, si il n'y en a pas, crée en une
     */
    static load(){
        let actualData=null;
        if(document.cookie==""){
            actualData = new SaveManger(0,0);
            this.save();
        }
        else{
            let d = null;
            // recupère le cookie de save
            let co=document.cookie.split('; ');
            for (let index = 0; index < co.length; index++) {
                const element = co[index].split("=");
                if(element[0]=="save"){
                    d=JSON.parse(element[1]);
                    break;
                }
            }
            actualData=new SaveManger(d.levelProgression,d.palet);
            this.save();
        }
        return actualData;
    }


    /**
     * Sauvgarde les données du joueur
     */
    static save(){
        let now=new Date();
        now.setFullYear(now.getFullYear()+2);
        let d = JSON.stringify(SaveManger.data);
        document.cookie="save="+d+"; expires="+now.toUTCString()+"; path=/";
    }
}