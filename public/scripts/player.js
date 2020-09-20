(function exportToWindow(){

class Player {
    constructor(position) {
        this.position = position;
        this.spade = 25;
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

    winLose(status) {
        
    const player = document.querySelector('#player')
    const viewport = document.querySelector('table');
    const overlay = document.createElement('div');
    const title = document.createElement('h2');
    const playAgainButton = document.createElement('button')
    playAgainButton.setAttribute('type', 'reset')
    playAgainButton.setAttribute('id', 'playAgain')
    playAgainButton.innerText = 'Play Again!'
    overlay.appendChild(title)
    overlay.appendChild(playAgainButton)
    overlay.setAttribute('class', 'overlay')
    viewport.appendChild(overlay);
    player.setAttribute('style', 'display: none')

    if(status === 'win') {
        overlay.setAttribute('id', 'winning-screen')
        title.innerText = 'Ye found the treasure!'
    } else if (status === 'lose') {
        overlay.setAttribute('id', 'losing-screen')
        title.innerText = 'Ye broke yer spade, numbskull!'
    }
     return overlay;

    }

    playAgain() {
        document.querySelector('#playAgain').addEventListener('click', function() {
            const table = document.querySelector('table')
            const player = document.querySelector('#player');
            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }
            
            player.removeAttribute('style');
            mapCall();
        });
    }

    dig() {
        if(this.position.row == window.finishingPosition.row && this.position.column == window.finishingPosition.column) {
            const overlay = this.winLose('win')
            this.playAgain()
        } else {
            this.spade--;
            const currentPos = document.querySelector(`tr[data-row-index="${this.position.row}"] > td[data-index="${this.position.column}"]`);
            currentPos.style.backgroundImage = 'url("../media/PNG/road_5.png")'
            if(!this.spade) {
                const overlay = this.winLose('lose')
                this.playAgain()
            }
        }
    }
}

if(typeof module !== 'undefined' && module.exports) {
    module.exports = Player;
} else {
    window.Player = Player;
}

}());