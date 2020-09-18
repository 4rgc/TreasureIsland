const Map = require('./js/map')
const Graph = require('./js/graph')
const solveGraph = require('./js/solvegraph')

let map = new Map(10)

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