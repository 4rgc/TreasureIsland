(function exportFunctions() {
    function renderMap(matrixPlane) {
        console.log(matrixPlane)

        for(let i = 0; i < matrixPlane.length; i++) {
            let counter = 0;
            let groundRow = document.createElement('tr');
            groundRow.dataset.rowIndex = i;
            document.querySelector('table').appendChild(groundRow);

            for(let j = 0; j < matrixPlane[i].length; j++) {
                let groundTile = document.createElement('td');
                groundTile.dataset.index = counter;
                if(!matrixPlane[i][j]) {
                    groundTile.dataset.type = 'path'
                } else {
                    const cactus = document.createElement('div');
                    const obstacleImages = ['../media/cactus1.png', '../media/cactus2.png','../media/cactus3.png','../media/bush1.png','../media/stones1.png','../media/tree1.png',]
                    cactus.setAttribute("class", "cactus");
                    cactus.setAttribute("style", `background-image: url(${obstacleImages[Math.floor(Math.random() * 6)]})`);
                    groundTile.dataset.type = 'obstacle';
                    groundTile.appendChild(cactus);
                }

                document.querySelector(`tr[data-row-index='${i}']`).appendChild(groundTile);

                counter++;
            }
        }
    }

    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    }

    function httpPostAsync(url, message, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("POST", url, true);
        xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlHttp.send(message);
    }

    function mapCall() {

        if(document.querySelector('.overlay')) {
            
        }

        httpGetAsync('/api/map?d=20&tun=50&len=8&trp=4', (mapString) => {
            let map = JSON.parse(mapString);
            // Check for API error
            if(map.error) {
                map.error.forEach(error => {
                    console.error(map.error)
                });
                return;
            }
            // Check for token error
            if(map.success !== undefined) {
                console.error(map.message);
                return;
            }

            renderMap(map.mapArray);
            window.startingPosition = map.startingPos
            window.finishingPosition = map.finishPos
            player = new Player(window.startingPosition)
        })
    }

    if(typeof module !== 'undefined' && module.exports) {
        module.exports = {
            httpGetAsync,
            httpPostAsync,
            renderMap,
            mapCall
        }
    } else {
        window.httpGetAsync = httpGetAsync;
        window.httpPostAsync = httpPostAsync;
        window.renderMap = renderMap;
        window.mapCall = mapCall;
    }

    
})()