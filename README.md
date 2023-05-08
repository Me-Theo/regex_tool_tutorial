# regex_tool_tutorial
Projet de TPI

## Level cération 
pour ajouter un level, il sufie d'ajouter un antrée dans le fichier "level.json". Une entrer resemble a ça : 

```JSON
    {
        "thorieIndex":0,
        "words":[
            {
                "text":"sdad",
                "targetState":false
            },
            {
                "text":"Tool",
                "targetState":true
            },
            {
                "text":"asdas",
                "targetState":false
            }
        ],
        "placeHolder":"haha",
        "limit":4
    }
```
voicie de quoi il composer : 
- thorieIndex => index de la thorie qui est relier au niveau, si pas de théorie = -1
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

