const { Map, MapConfig} = require('./js/map')
const Graph = require('./js/graph')
const solveGraph = require('./js/solvegraph')
const colors = require('colors')

let mapConfig = new MapConfig({
    dimensions: 20,
    maxTunnels: 50,
    maxLength: 8,
    trapNumber: 4
})
let map = new Map(mapConfig)

let graph = Graph.fromMapMatrix(map.mapArray, map.startingPos)

map.print()
console.log("Starting pos: " + map.startingPos)
console.log("Finish pos: " + map.finishPos.toString())
/*console.log(graph.nodes)
let adjacentsObj = graph.toAdjacents()
console.log(adjacentsObj)

//console.log(solutions)
console.log("From 0 to");
let solutions = solveGraph(adjacentsObj, '0')
console.log(solutions)
  //display solutions
for(var s in solutions) {
    if(!solutions[s]) continue;
    console.log(" -> " + s + ": [" + solutions[s].join(", ") + "]   (dist:" + solutions[s].dist + ")");
}*/