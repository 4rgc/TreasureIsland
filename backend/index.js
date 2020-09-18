const Map = require('./js/map')
const Graph = require('./js/graph')

let map = new Map(10)

let graph = Graph.fromMapMatrix(map.mapArray, map.startingPos)

map.print()
console.log("Starting pos: " + map.startingPos)
console.log(graph.nodes)
//console.log(graph.toAdjacentsObject())