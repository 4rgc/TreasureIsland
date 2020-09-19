(function exportToWindow(){

const getMatrixElement = (matrix, row, column) => {
    if(matrix[row] != undefined)
        return matrix[row][column]
    return undefined;
}

const createArray = (num, dimensions) => {
    var array = [];
    for (var i = 0; i < dimensions; i++) {
        array.push([]);
        for (var j = 0; j < dimensions; j++) {
            array[i].push(num);
        }
    }
    return array;
};

if(typeof module !== 'undefined' && module.exports) {

    module.exports = {
        createArray,
        getMatrixElement,
    }

    } else {

        window.createArray = createArray;
        window.getMatrixElement = getMatrixElement;
        
    }

}())