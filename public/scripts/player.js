(function exportToWindow(){

class Player {
    constructor(position) {
        this.position = position;
        this.setStart();
    }

    setStart() {
        const player = document.querySelector('#player')
        const startDomElement = document.querySelector(`tr[data-row-index="${this.position.row}"] > td[data-index="${this.position.column}"]`)
        //const startDomElement = document.querySelector(``)
        console.log(startDomElement)

        player.style.top = `${startDomElement.offsetTop}px`;
        player.style.left = `${startDomElement.offsetLeft}px`;
    }
}

if(typeof module !== 'undefined' && module.exports) {
    module.exports = Player;
} else {
    window.Player = Player;
}

}())

// 