module.exports.getMatrixElement = (matrix, row, column) => {
    if(matrix[row] != undefined)
        return matrix[row][column]
    return undefined;
}