![Logo](./media/LogoWithWitheLine.png "Logo")
# regex Tool Tutorial
Projet de TPI

## Level cération 
pour ajouter un level, il sufie d'ajouter un antrée dans le fichier "level.json". Une entrer resemble a ça : 

```JSON
    {
        "startTheorie":true,
        "theorieIndex":0,
        "name":"",
        "words":[
            {
                "text":"Hello",
                "targetState":true
            },
            {
                "text":"World",
                "targetState":false
            }
        ],
        "placeHolder":"",
        "limit":-1
    },
```
voicie de quoi il composer : 
- startTheorie => si le niveau commence par une théorie ou non
- thorieIndex => index de la thorie qui est relier au niveau, si pas de théorie = -1
- name => nom du niveau, purment optionel et n'est utiliser que pour les niveau bonus
- words => mots a valider ou non => 
```JSON
{
	"text":"sdad",
	"targetState":false
}
```
	 text => mots textuellement
	 targetState => quel etat le joeur dois atteindre, true = validé, false = invalidé

- placeHolder => regex mis par défaut
- limit => nombre de character maxim que peux avoir la regex

