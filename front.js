(function exportFunctions() {
    
    function renderMap(matrixPlane) {
        

        for(let i = 0; i < matrixPlane.length; i++) {
            let counter = 0;
            let groundRow = document.createElement('tr');
            groundRow.dataset.rowIndex = i;
            document.querySelector('table').appendChild(groundRow);

            for(let j = 0; j < matrixPlane[i].length; j++) {
                let groundTile = document.createElement('td');
                groundTile.dataset.index = counter;
                if(!matrixPlane[i][j]) {
                    groundTile.dataset.type = 'path';
                } else {
                    const cactus = document.createElement('div');
                    cactus.setAttribute("class", "cactus");
                    groundTile.dataset.type = 'obstacle';
                    groundTile.appendChild(cactus);
                }
                
                document.querySelector(`tr[data-row-index='${i}']`).appendChild(groundTile);

                counter++;
            }
        }
    }

    if(typeof module !== 'undefined' && module.exports) {
        module.exports = {
            renderMap,
        }
    } else {
        window.renderMap = renderMap;
    }
})()