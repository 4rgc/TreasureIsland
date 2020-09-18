class MapPlane {
    constructor(dimensions) {
        this.dimensions = dimensions
        this.matrixPlane = this.createMap(17, 3)
    }

    createMap(maxTunnels, maxLength) {
        let map = createArray(1, this.dimensions);
        let currentRow = Math.floor(Math.random() * this.dimensions),
        currentColumn = 0;

        let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        let lastDirection = [],
        randomDirection;

        while(maxTunnels) {
            do {
                randomDirection = directions[Math.floor(Math.random() * directions.length)];
                } while ((randomDirection[0] === -lastDirection[0] &&
                            randomDirection[1] === -lastDirection[1]) ||
                            (randomDirection[0] === lastDirection[0] &&
                            randomDirection[1] === lastDirection[1]));

            let randomLength = Math.ceil(Math.random() * maxLength),
            tunnelLength = 0;

            while (tunnelLength < randomLength) {
                if(((currentRow === 0) && (randomDirection[0] === -1))||
                    ((currentColumn === 0) && (randomDirection[1] === -1))||
                    ((currentRow === this.dimensions - 1) && (randomDirection[0] === 1)) ||
                    ((currentColumn === this.dimensions - 1) && (randomDirection[1] === 1)))
                { break; }
                else{
                    map[currentRow][currentColumn] = 0;
                    currentRow += randomDirection[0];
                    currentColumn += randomDirection[1];
                    tunnelLength++;
                }
            }

            if (tunnelLength) {
                lastDirection = randomDirection;
                maxTunnels--;
            }
        }
        return map;
    }

    print() {
        this.matrixPlane.forEach(row => {
            let rowStr = ""
            row.forEach(element => {
                rowStr += element + " "
            });
            console.log(rowStr)
        });
    }
}

function createArray(num, dimensions) {
    var array = [];
    for (var i = 0; i < dimensions; i++) {
        array.push([]);
        for (var j = 0; j < dimensions; j++) {
            array[i].push(num);
        }
    }
    return array;
}
