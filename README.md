# TDJS 2048

- A Board
  - Is 4x4
  - Can have new tiles randomly placed
- There is a scoring system
  - Initial value 0
  - The value is the sum of all combined tiles
  - A random tile gives points only when combined with another
- There is a high score system
  - That shows the best score of the current player
  - That is updated when the points reach above the previous high score
- A move is
  1. Move all tiles as far as possible a chosen direction (up down left right)
  2. Collision handling
  3. Points calculation
  4. Spawn a new random tile 
  5. Game end check
- Two initial tiles
  - With random placement
  - In descending probability a combination of: 2,2; 2,4 or 4,4
  - Tiles are colour coded (1-1 points-colour)
  - Recreated on a new game
- Moves are made with the arrow keys
  - A new tile is spawned (either 2 or 4, where 2 is more common) randomly on an empty spot
  - At most two tiles on the same row or column is combined into one, examples:
    - 2222 R => --44
    - 2228 R => -248
    - 2-28 R => --48
  - If two tiles of the same value collide, they create a tile with the sum of the two, examples
    - 2+2 = 4
    - 4+4 = 8
    - 1024+1024 = 2048
    - 2002 R => 0004
    - 0222 R => 0024
  - Arrow <direction>: all tiles are moved in <direction>, example (moving Right):  
    - 0000 0000
      0200 0002
      0020 0002
      0000 0000
- Game ends
  - With victory if a tile has a value of 2048
  - With a score if it is no longer possible to combine tiles doing a move
- Game keeps its state
  - when it is opened in a new tab
  - when it is reloaded (page reload)
