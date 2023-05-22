/**
 * @ De: Theo Bensaci
 * @ Date: 16:20 08.05.2023
 * @ Description: Permette de gérée les palettes du joueur
 */
import DataLoader from "./DataLoader";

export default class ColorManager{

    /**
     * cherche une palette et l'applique
     * @param {*} index 
     */
    static setPallette(index){
        let pla=DataLoader.getPalette(index);
        let plaFull=this.creatFullPalette(pla.main,pla.background,pla.valide,pla.invalide);
        this.applyPalette(plaFull);
    }

    /**
     * Applique la palette sur le site
     * @param {json} pal palette (donner par la fonction juste en dessous) 
     */
    static applyPalette(pal){
        Object.keys(pal).forEach(function(key) {
            document.documentElement.style.setProperty(key,pal[key]);
        })
    }

    /**
     * Crée un pallet de couleur
     * @param {string} main Hexa de la couleur principale
     * @param {string} back Hexa de la couleur background
     * @param {string} valid Hexa de la couleur valide
     * @param {string} invalid Hexa de la couleur invalide
     * @returns {json} toute les couleur avec leur tag
     */
    static creatFullPalette(main,back,valid,invalid){

        let black=new Color(0,0,0);
        let white=new Color(255,255,255);

        let mainRBG=Color.hexToRgb(main);
        let back2RBG=Color.blenColor(Color.hexToRgb(back),white,0.2);
        let validRBG=Color.hexToRgb(valid);
        let invalidRBG=Color.hexToRgb(invalid);
        let valid2RGB=Color.blenColor(validRBG,black,0.85);
        let invalid2RBG=Color.blenColor(invalidRBG,black,0.85);
        let main2RGB=Color.blenColor(mainRBG,black,0.85);
        let valid3RBG=Color.blenColor(Color.blenColor(validRBG,white,0.2),black,0.6);
        let invalide3RGB=Color.blenColor(Color.blenColor(invalidRBG,white,0.2),black,0.6)

        return {
            "--color-background":back,
            "--color-background2":back2RBG.toString(),
            "--color-prime1":main,
            "--color-prime2":main2RGB.toString(),
            "--color-false-lighted":invalid,
            "--color-right-lighted":valid,
            "--color-false-unlighted":invalide3RGB.toString(),
            "--color-right-unlighted":valid3RBG.toString(),
            "--color-false-background":invalid2RBG.toString(),
            "--color-right-background":valid2RGB.toString()
        }
    }
}



class Color{
    constructor(r,g,b,a){
        this.r=r;
        this.g=g;
        this.b=b;
    }


    /**
     * fusion 2 channel d'une couleur enseble
     * @param {int} a chanel 1 
     * @param {int} b chanel 2
     * @param {float} t t du blend
     * @returns {float} chanel fusioner
     */
    static blendChannel(a,b,t){
        return Math.sqrt((1-t)*Math.pow(a,2) + t*Math.pow(b,2));
    }


    /**
     * Fusion 2 couleur ensemble
     * @param {Color} col1 Couleur 1
     * @param {Color} col2 Couleur 2 
     * @param {float} t t du blend
     * @returns {Color} Couleur fusioner
     */
    static blenColor(col1,col2,t){
        let r = Color.blendChannel(col1.r,col2.b,t);
        let g = Color.blendChannel(col1.g,col2.g,t);
        let b = Color.blendChannel(col1.b,col2.b,t);

        return new Color(r,g,b);
    }

    /**
     * Crée un RGB depuis un hexa
     * @param {string} hex hexa 
     * @returns {Color} color
     */
    static hexToRgb(hex){
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? new Color(parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16)) : null
    }

    toString(){
        return `rgb(${this.r},${this.g},${this.b})`;
    }
}

