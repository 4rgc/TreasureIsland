const Position = require('./position')
const solveGraph = require('./solvegraph')
const Graph = require('./graph')
const { createArray } = require('./util')

const AIR = 0;
const WALL = 1;
const TRAP = 2;

module.exports.AIR = AIR;
module.exports.WALL = WALL;
module.exports.TRAP = TRAP;

module.exports.Map = class Map {
    dimensions;
    startingPos;
    mapArray;
    finishPos;
    maxTraps;

    constructor(config) {
        this.maxTraps = config.trapNumber;
        this.dimensions = config.dimensions;
        this.mapArray = this.createMap(config.maxTunnels, config.maxLength);
        this.startingPos = this.findStartingPosition();
        this.graph = Graph.fromMapMatrix(this.mapArray, this.startingPos)

        this.finishPos = this.findFarthestLocationFromStart().pos;
        this.setTraps();
    }

    createMap(maxTunnels, maxLength) {
        let map = createArray(WALL, this.dimensions);
        let currentRow = Math.floor(Math.random() * this.dimensions),
            currentColumn = Math.floor(Math.random() * this.dimensions);

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

    findStartingPosition() {
        let firstColumnWithAir = this.getFirstColumnWithAir();
        let rowsWithAir = this.getAirRowsInColumn(firstColumnWithAir);
        let randomRow = rowsWithAir[Math.floor(Math.random() * rowsWithAir.length)];
        return new Position(randomRow, firstColumnWithAir);
    }

    getAirRowsInColumn(column) {
        let rowsWithAir = [];

        for (let i = 0; i < this.dimensions; i++) {
            if (this.mapArray[i][column] == AIR) {
                rowsWithAir.push(i);
            }
        }
        return rowsWithAir;
    }

    getFirstColumnWithAir() {
        for (let j = 0; j < this.dimensions; j++) {
            for (let i = 0; i < this.dimensions; i++) {
                if (this.mapArray[i][j] == AIR) {
                    return j;
                }
            }
        }
    }

    findFarthestLocationFromStart() {
        // Solve graph using Dijkstra's algorithm
        // starting from '0', which is startingPos
        let graphSolutions = solveGraph(this.graph.toAdjacents(), '0')

        let maxDist = 0, maxDistSolution;
        for(let index in graphSolutions) {
            if(graphSolutions[index].dist >= maxDist){
                maxDist = graphSolutions[index].dist;
                maxDistSolution = index;
            }
        }
        return this.graph.nodes[maxDistSolution];
    }

    setTraps() {
        let path = this.graph.getShortestPath(
            this.graph.getNodeFromPos(this.startingPos).id,
            this.graph.getNodeFromPos(this.finishPos).id
        );

        let trapPositions = [];
        path.forEach(id => {
            let pos = this.graph.nodes[id]?.pos;
            if(!pos)
                return;
            this.mapArray[pos.row][pos.column] = TRAP;
            let graph = Graph.fromMapMatrix(this.mapArray, this.startingPos);
            if(graph.getNodeFromPos(this.finishPos) == undefined) {
                this.mapArray[pos.row][pos.column] = AIR;
            }
            else {
                trapPositions.push(pos);
                this.graph = graph;
            }
        });

        while(trapPositions.length > this.maxTraps) {
            let randPos = trapPositions[Math.floor(Math.random() * (trapPositions.length-1))]
            this.mapArray[randPos.row][randPos.column] = AIR;
            trapPositions.splice(trapPositions.indexOf(randPos), 1);
        }
    }

    getTile(pos) {
        return this.mapArray[pos.row][pos.column];
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

module.exports.MapConfig = class MapConfig {
    dimensions;
    maxTunnels;
    maxLength;
    trapNumber;

    constructor({dimensions, maxTunnels, maxLength, trapNumber}) {
        this.dimensions = dimensions;
        this.maxTunnels = maxTunnels;
        this.maxLength = maxLength;
        this.trapNumber = trapNumber;
    }
}