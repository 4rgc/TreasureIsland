const Position = require('./Position')
const solveGraph = require('./solvegraph')
const Graph = require('./graph')

module.exports = class Map {
    dimensions;
    startingPos;
    mapArray;
    finishPos;

    constructor(dimensions) {
        this.dimensions = dimensions
        this.startingPos = new Position(
            Math.floor(Math.random() * this.dimensions),
            0
        )
        this.mapArray = this.createMap(18, 3)
        this.finishPos = this.findFarthestLocationFromStart().pos
    }

    createMap(maxTunnels, maxLength) {
        const WALL = 1
        const AIR = 0;
        let map = createArray(WALL, this.dimensions);
        let currentRow = this.startingPos.row,
        currentColumn = this.startingPos.column;

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
                    map[currentRow][currentColumn] = AIR;
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

    findFarthestLocationFromStart() {
        let graph = Graph.fromMapMatrix(this.mapArray, this.startingPos);
        // Solve graph using Dijkstra's algorithm
        // starting from '0', which is startingPos
        let graphSolutions = solveGraph(graph.toAdjacents(), '0')

        let maxDist = 0, maxDistSolution;
        for(let index in graphSolutions) {
            if(graphSolutions[index].dist >= maxDist){
                maxDist = graphSolutions[index].dist;
                maxDistSolution = index;
            }
        }
        return graph.nodes[maxDistSolution];
    }

    print() {
        this.mapArray.forEach(row => {
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
};