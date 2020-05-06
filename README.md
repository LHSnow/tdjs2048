# tdjs2048

## Speldiskussion

- En Spelplan
  - 4x4
- Det finns en poängräknare
  - Initialt 0
  - Poängen är summan av alla sammanslagna brickor
  - En utslumpad bricka ger först poäng när den slås ihop med en annan
- Det finns ett bästa resultat-räknare
  - som sparar det bästa poäng spelaren har uppnått
  - som uppdateras för varje drag när poängsumman för nuvarande spel paserar bästa resultat
- Två initiala sifferrutor
  - Slumpmässig placering
  - Antingen två tvåor, eller
  - En fyra, en tvåa, men endast sällan
  - Brickorna har färkodning (1-1 mellan färg - tal)
  - Är nya om nytt spel startas med "new game"-knapp
- Vi kan använda pilarna:
  - Ny bricka med 2 (sannolikt) eller 4 (osannolikt) slumpas ut på spelplanen till tom ruta
  - Högst två brickor på samma rad eller kolumn slås ihop per drag
    - 2222-> => --44
    - 2228-> => -248
    - 2-28-> => --48
  - Om två brickor med samma valör överlappar blir de en ny bricka med summan av de två
    - ex: 2+2 = 4
    - ex: 4+4 = 8
    - ex: 1024+1024 = 2048
  - Pil <riktning>(upp ner vänster höger): brickor flyttas längst ut till <riktning>
- Spelet slutar
  - Med vinst om en ruta har valören 2048
  - Med slutpoäng om det inte går att göra en ihopslagning
- Spelet har samma state
  - om det öppnas i ny flik
  - om det laddas om (page reload)
