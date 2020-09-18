(function exportFunctions() {

    class MapPlane {
        constructor(dimensions) {
            this.dimensions = dimensions
            this.matrixPlane = this.createMap(17, 3)
            this.renderMap();
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
                    else if(map.length === 0) {
                            currentRow += randomDirection[0];
                            currentColumn += randomDirection[1];
                            tunnelLength++;
                        } else {
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

        renderMap() {
            let counter = 1;

            for(let i = 0; i < this.matrixPlane.length; i++) {

                let groundRow = document.createElement('tr');
                groundRow.dataset.rowIndex = i;
                document.querySelector('table').appendChild(groundRow);

                for(let j = 0; j < this.matrixPlane[i].length; j++) {
                    let groundTile = document.createElement('td');
                    groundTile.dataset.index = counter;
                    if(!this.matrixPlane[i][j]) {
                        groundTile.dataset.type = 'obstacle'
                    }
                    document.querySelector(`tr[data-row-index='${i}']`).appendChild(groundTile);

                    counter++;
                }
            }
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

    if(typeof module !== 'undefined' && module.exports) {
        module.exports = {
            MapPlane,
            createArray,
        }
    } else {
        window.MapPlane = MapPlane;
        window.createArray = createArray;
    }

    

}())


