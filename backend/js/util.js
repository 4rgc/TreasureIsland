module.exports.getMatrixElement = (matrix, row, column) => {
    if(matrix[row] != undefined)
        return matrix[row][column]
    return undefined;
}

module.exports.createArray = (num, dimensions) => {
    var array = [];
    for (var i = 0; i < dimensions; i++) {
        array.push([]);
        for (var j = 0; j < dimensions; j++) {
            array[i].push(num);
        }
    }
    return array;
};