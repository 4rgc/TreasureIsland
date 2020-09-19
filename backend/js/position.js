module.exports = class Position {
    row;
    column;
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }

    copy() {
        return new Position(this.positionObj.row, this.positionObj.column)
    }

    right() {
        return new Position(this.row, this.column+1)
    }

    left() {
        return new Position(this.row, this.column-1)
    }

    up() {
        return new Position(this.row + 1, this.column)
    }

    down() {
        return new Position(this.row - 1, this.column)
    }

    equals(pos) {
        return this.row == pos.row && this.column == pos.column
    }

    toString() {
        return `row: ${this.row} column: ${this.column}`
    }
}