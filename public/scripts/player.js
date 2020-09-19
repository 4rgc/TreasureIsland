(function exportToWindow(){

class Player {
    constructor(position) {
        this.position = position;
        this.player = document.querySelector('#player')
        this.renderNewPosition(this.player);
    }

    renderNewPosition(player) {
        const newPosition = document.querySelector(`tr[data-row-index="${this.position.row}"] > td[data-index="${this.position.column}"]`)

        player.style.top = `${newPosition.offsetTop}px`;
        player.style.left = `${newPosition.offsetLeft}px`;
    }

    right() {
        const nextPos = document.querySelector(`tr[data-row-index="${this.position.row}"] > td[data-index="${this.position.column + 1}"]`);
        if(nextPos.getAttribute('data-type') === 'obstacle'){
            throw new Error('Cactus!')
        }
        this.position.column++
        this.renderNewPosition(this.player);
    }

    left() {
        const nextPos = document.querySelector(`tr[data-row-index="${this.position.row}"] > td[data-index="${this.position.column - 1}"]`);
        if(nextPos.getAttribute('data-type') === 'obstacle'){
            throw new Error('Cactus!')
        }
        this.position.column--
        this.renderNewPosition(this.player);
    }

    up() {
        const nextPos = document.querySelector(`tr[data-row-index="${this.position.row - 1}"] > td[data-index="${this.position.column}"]`);
        if(nextPos.getAttribute('data-type') === 'obstacle'){
            throw new Error('Cactus!')
        }
        this.position.row--
        this.renderNewPosition(this.player);
    }

    down() {
        const nextPos = document.querySelector(`tr[data-row-index="${this.position.row + 1}"] > td[data-index="${this.position.column}"]`);
        if(nextPos.getAttribute('data-type') === 'obstacle'){
            throw new Error('Cactus!')
        }
        this.position.row++
        this.renderNewPosition(this.player);
    }
}

if(typeof module !== 'undefined' && module.exports) {
    module.exports = Player;
} else {
    window.Player = Player;
}

}());