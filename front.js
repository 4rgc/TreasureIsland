(function exportFunctions() {
    
    function renderMap(matrixPlane) {
        let counter = 1;

        for(let i = 0; i < matrixPlane.length; i++) {

            let groundRow = document.createElement('tr');
            groundRow.dataset.rowIndex = i;
            document.querySelector('table').appendChild(groundRow);

            for(let j = 0; j < matrixPlane[i].length; j++) {
                let groundTile = document.createElement('td');
                groundTile.dataset.index = counter;
                if(!matrixPlane[i][j]) {
                    groundTile.dataset.type = 'obstacle'
                }
                document.querySelector(`tr[data-row-index='${i}']`).appendChild(groundTile);

                counter++;
            }
        }
    }

    if(typeof module !== 'undefined' && module.exports) {
        module.exports = {
            renderMap
        }
    } else {
        window.renderMap = renderMap;
    }
})()