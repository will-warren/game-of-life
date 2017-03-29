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
    $src.addClass("alive");
}


function countHabitableWorlds(world) {
    let y = world.parentNode.rowIndex;
    let x = world.cellIndex
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

function liveOrDie(world) {
    hwcount = 0
    let livingWorlds = countHabitableWorlds(world);
    for(var i = 0; i < livingWorlds.length; i++) {
      if(world.hasClass("alive") && livingWorlds[i].hasClass("alive")) {
      hwcount++
      }
    }

    if((hwcount <= 1) || (hwcount > 3)) {
        world.addClass("dead");
      }
    }

// function to draw the grid of size X Y
function drawGrid(x,y, start) {
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
          if(!start){
            $world.on('click', livingWorld);
          }
        }
      }
    //add to dom
    $('.gameBoard').append($grid);
}

function runGame(x, y) {
    drawGrid(x, y, start);
    while(start);
       liveOrDie()
       drawGrid(x, y, stop)

}
//what will become the game loop
runGame(10, 10, start);
