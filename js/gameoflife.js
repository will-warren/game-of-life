//gameoflife js file
let start = false;
let stop = false;

//get world
function getWorld(x,y) {
    return("cell_" + x + '_' + y);
}
//give life to world
function livingWorld(e) {
    //get target
    $src = $(e.target);
    //give life
    $src.removeClass('dead');
    $src.addClass("alive");
}


function countHabitableWorlds(j,i) {
    let y = j;
    let x = i
    let xe = x-1;
    let xw = x+1;
    let yn = y-1;
    let ys = y+1;
    let ne = getWorld(xe, yn);
    let n  = getWorld(x,  yn);
    let nw = getWorld(xw, yn);
    let e  = getWorld(xe, y);
    let w  = getWorld(xw,  y);
    let se = getWorld(xe, ys);
    let s  = getWorld(x,  ys);
    let sw = getWorld(xw, ys);

    return [ne,n,nw,e,w,se,s,sw];
}

function liveOrDie(j, i) {    //this is where you solve the problem. need to apply alive or dead class based on rules of the game of life.
    hwcount = 0
    let livingWorlds = countHabitableWorlds(j,i);
    //console.log(livingWorlds);
    for(var start = 0; start < livingWorlds.length; start++) {
      if($(livingWorlds[start]).hasClass("alive")) {
        hwcount++
        console.log("HWCount: "+ hwcont);
      }
    }
    for(var _ = 0; _ < livingWorlds.length; _++) {
        if((hwcount <= 1) || (hwcount > 3)) {
            $(livingWorlds[i]).addClass("dead");
      }
    }
}

// function to draw the grid of size X Y
function drawGrid(x,y) {
    //table for grid
    let $grid = $('<table>');
    //rows
    for(var i = 0; i < y; i++) {
      let $row = $('<tr>');
      $grid.append($row);
      //cols
      for(var j = 0; j < x; j++) {
          let $world = $('<td>');
          $row.append($world);
          $world.on('click', livingWorld);
          $world.attr('id', 'cell_' + j + '_' + i);
          $world.attr('class', 'dead')
          }
        }
    //add to dom
    $('#gameBoard').append($grid);
}

function updateGrid(x,y, stop=false) {
    $('#stopBtn').click(function() {
        stop = true;
    });
    $('#startBtn').click(function() {
        stop = false;
    });
    //table for grid
    while(!stop) {  // this looop is causing a major problem. need to find another way. 
        let $grid = $('<table>');
        //rows
        for(var i = 0; i < y; i++) {
          let $row = $('<tr>');
          $grid.append($row);
          //cols
          for(var j = 0; j < x; j++) {
              let $world = $('<td>');
              $row.append($world);
              $world.attr('id', 'cell_' + j + '_' + i);
              liveOrDie(j,i);
              }
            }
       //add to dom
       $('#gameBoard').empty()
       $('#gameBoard').append($grid);
   }
}

$('#startBtn').on('click', function() {
  setInterval(updateGrid(10,10), 2000);
})

$('#stopBtn').on('click', function() {
   updateGrid(10,10, true);
 })
//what will become the game loop
drawGrid(10,10);
