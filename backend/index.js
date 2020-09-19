const { Map, MapConfig } = require('./js/map')

let mapConfig = new MapConfig({
    dimensions: 20,
    maxTunnels: 50,
    maxLength: 8,
    trapNumber: 6
})
let map = new Map(mapConfig)

map.print()
console.log("Starting pos: " + map.startingPos)
console.log("Finish pos: " + map.finishPos.toString())