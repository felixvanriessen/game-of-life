const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let cw = 360
let ch = 600
let gridxy = 15
if (screen.width < 450){
   cw = 360
   ch = 600
   gridxy = 15
} else {
   cw = 1200
   ch = 800
   gridxy = 20
}




canvas.width = cw
canvas.height = ch


let gridx = cw / gridxy
let gridy = ch / gridxy


function makeGrid(){
   let grid = []
   for (let x = 0; x < gridx; x++){
      let row = []
      for (let y = 0; y < gridy; y++){
         row.push(false)
      }
      grid.push(row)
   }
   return grid
}

function drawGrid(grid){
   grid.forEach((row, x)=>{
      row.forEach((cell, y)=>{
         if (cell){
            ctx.fillStyle = 'rgb(100,100,100)'
            ctx.fillRect(x * gridxy + 1, y * gridxy + 1, gridxy - 2, gridxy - 2)
         } else {
            ctx.fillStyle = 'rgb(230,230,230)'
            ctx.fillRect(x * gridxy + 1, y * gridxy + 1, gridxy - 2, gridxy - 2)
         }
      })
   })
}

function countAround(grid, x, y){
   let count = 0
   if (x > 0 && grid[x - 1][y]) count++
   if (x < gridx -1 && grid[x + 1][y]) count++
   if (y > 0 && grid[x][y - 1]) count++
   if (y < gridy - 1 && grid[x][y + 1]) count++

   if (x > 0 && grid[x - 1][y - 1]) count++
   if (x > 0 && grid[x - 1][y + 1])count++
   if (x < gridx - 1 && grid[x + 1][y - 1])count++
   if (x < gridx - 1 && grid[x + 1][y + 1])count++

   return count
}

function unknown(grid) {
   let nextGrid = grid.map((row,x)=>{
       row = grid[x].map((cell,y)=>{
           let count = countAround(grid, x, y)
           if (cell){
               //if a live cell has 2 or 3 neighbours
               if (count < rule1 || count > rule2) return false
               else return true
           } else {
               //if a dead cell has 3 neighbours
               if (count == rule3){
                   return true
               } else return false
           }
       })
       return row
   })
   return nextGrid
}

let rule1 = 2
let rule2 = 3
let rule3 = 3

let lifeGrid = makeGrid()
drawGrid(lifeGrid)


