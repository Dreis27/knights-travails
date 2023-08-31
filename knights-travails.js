const cellRegistry = new Map();

class ChessCell{
    constructor(x,y){
        this.xPos = x;
        this.yPos = y;
        this.name = `${x}, ${y}`;
        this.predecessor = null;
        this.moves = [
            [1,2], [1,-2],
            [2,1], [2,-1],
            [-1,2], [-1,-2],
            [-2,1], [-2,-1]
        ]
    }
    getName(){
        return this.name;
    }
    getX(){
        return this.xPos;
    }
    getY(){
        return this.yPos;
    }
    getMoves(){
        return this.moves;
    }
    getPredecessor(){
        return predecessor ;
    }
    setPredecessor(newPred) {
        this.predecessor ||= newPred;
    }

}

function createPossibleMoves(cell){

    function createPossibleMove([offsetX, offsetY]){
        const newX = cell.getX() + offsetX;
        const newY = cell.getY() + offsetY;
        const newName = `${newX}, ${newY}`;
        if(newX >= 0 && newX < 8 && newY >= 0 && newY < 8){
            if(cellRegistry.has(newName)) return cellRegistry.get(newName);
            else {
            const newCell = new ChessCell(newX,newY);
            cellRegistry.set(newName, newCell);
            return newCell;
            }
        }
    }
    return cell.getMoves().map(createPossibleMove).filter(Boolean);
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function travails(start, finish){
    if(arraysEqual(start, finish)){
        console.log('0 moves, it is the same square!');
        return;
    }
    const origin = new ChessCell(...start);
    cellRegistry.set(origin.getName(), origin);

    const target = new ChessCell(...finish);
    cellRegistry.set(target.getName(), target);

    const queue = [target];
    while(!queue.includes(origin)){

        const currentCell = queue.shift();

        const enqueueList = createPossibleMoves(currentCell);

        enqueueList.forEach((cell) => {
          cell.setPredecessor(currentCell);
        });
        queue.push(...enqueueList);
    }

    const path = [origin];
    while(!path.includes(target)){
        const nextCell = path.at(-1).predecessor;
        path.push(nextCell);
        
    }

    console.log(`The shortest path was ${path.length - 1} moves!`);
    console.log("The moves were:");
    path.forEach(square => console.log(square.getName()));
}