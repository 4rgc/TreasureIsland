module.exports.getMatrixElement = function getMatrixElement(matrix, row, column) {
    if(matrix[row] != undefined)
        return matrix[row][column]
    return undefined;
}

module.exports.createArray = function createArray(num, dimensions) {
    var array = [];
    for (var i = 0; i < dimensions; i++) {
        array.push([]);
        for (var j = 0; j < dimensions; j++) {
            array[i].push(num);
        }
    }
    return array;
};

module.exports.validateQueryParams = function validateQueryParams(params, expectedKeys) {
    let missingParams = Array.from(expectedKeys);
    let unknownParams = [];
    let messages = [];

    for(key in params) {
        if(missingParams.includes(key)) {
            missingParams.splice(missingParams.indexOf(key), 1)
        }
        else {
            unknownParams.push(key);
        }
    }

    messages = messages.concat(buildMissingParamsError(missingParams));
    messages = messages.concat(buildUnknownParamsError(unknownParams));
    return messages;
}

function buildMissingParamsError(missingParams) {
    let messages = [];
    missingParams.forEach(paramName => {
        messages.push(`Required parameter: '${paramName}' is missing`)
    });
    return messages;
}

function buildUnknownParamsError(unknownParams) {
    let messages = [];
    unknownParams.forEach(paramName => {
        messages.push(`Unknown parameter: '${paramName}'`)
    });
    return messages;
}