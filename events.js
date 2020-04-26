$btn = document.querySelector('#play-btn')
$clearbtn = document.querySelector('#clear-btn')
$gamespeed = document.querySelector('#game-speed')
$rule1 = document.querySelector('#rule1')
$rule2 = document.querySelector('#rule2')
$rule3 = document.querySelector('#rule3')

canvas.addEventListener('click',(e)=>{
   let posX = Math.floor(e.offsetX / gridxy)
   let posY = Math.floor(e.offsetY / gridxy)

   if (lifeGrid[posX][posY]) lifeGrid[posX][posY] = false
   else lifeGrid[posX][posY] = true

   drawGrid(lifeGrid)
})


$btn.addEventListener('click', ()=>{
   if (!play){
       $btn.textContent = 'PAUSE'
       play = true
       canvas.style.borderColor = 'green'
      } else {
         $btn.textContent = 'PLAY'
         play = false
         canvas.style.borderColor = 'orange'
   }
})

$clearbtn.addEventListener('click', ()=>{
   lifeGrid.forEach((row, x)=>{
      row.forEach((cell, y)=>{
         lifeGrid[x][y] = false
      })
   })
   drawGrid(lifeGrid)
})

function utilities(){
   gamespeed = $gamespeed.value
   rule1 = $rule1.value
   rule2 = $rule2.value
   rule3 = $rule3.value
   
   

}


function animation(){
   utilities()
   
   delaycounter++
   if (delaycounter > (30 / gamespeed)){
      if (play) {
         lifeGrid = unknown(lifeGrid)
         drawGrid(lifeGrid)
         console.log(gamespeed)
      }
      delaycounter = 0
   }

   window.requestAnimationFrame(animation)
}

let delaycounter = 0
let gamespeed =  3

let play = false

animation()