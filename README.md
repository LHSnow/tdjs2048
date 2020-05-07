# tdjs2048

## Speldiskussion

- En Spelplan
  - 4x4
  - Kan få nya brickor placerade
- Det finns en poängräknare
  - Initialt 0
  - Poängen är summan av alla sammanslagna brickor
  - En utslumpad bricka ger först poäng när den slås ihop med en annan
- Det finns ett bästa resultat-räknare
  - som sparar det bästa poäng spelaren har uppnått
  - som uppdateras för varje drag när poängsumman för nuvarande spel paserar bästa resultat
- Två initiala sifferrutor
  - Slumpmässig placering
  - I fallande sannolikhetsordning, 2,2, 2,4 eller 4,4
  - Brickorna har färkodning (1-1 mellan färg - tal)
  - Är nya om nytt spel startas med "new game"-knapp
- Vi kan använda pilarna:
  - Ny bricka med 2 (sannolikt) eller 4 (osannolikt) slumpas ut på spelplanen till tom ruta
  - Högst två brickor på samma rad eller kolumn slås ihop per drag
    - 2222-> => --44
    - 2228-> => -248
    - 2-28-> => --48
  - Om två brickor med samma valör kolliderar blir de en ny bricka med summan av de två
    - ex: 2+2 = 4
    - ex: 4+4 = 8
    - ex: 1024+1024 = 2048
    - ex 2002 -> 0004
    - ex: 0222 -> 0024
  - Pil <riktning>(upp ner vänster höger): brickor flyttas längst ut till <riktning>
    - 0000 0000
      0200 (H) -> 0002
      0020 0002
      0000 0000
- Spelet slutar
  - Med vinst om en ruta har valören 2048
  - Med slutpoäng om det inte går att göra en ihopslagning
- Spelet har samma state
  - om det öppnas i ny flik
  - om det laddas om (page reload)
