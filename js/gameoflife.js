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
    //$src.removeClass('dead');
    $src.addClass("alive");
}


function countHabitableWorlds(j,i) {   //ASK SAM: how do I make this not run off the
    let y = j;                      // edge of th grid?
    let x = i                       // how does it stay inbounds?
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

function liveOrDie(j, i) {
    hwcount = 0
    let livingWorlds = countHabitableWorlds(j,i);
    console.log(livingWorlds);
    for(var _ = 0; _ < livingWorlds.length; start++) {
      if($('#'+livingWorlds[_]).hasClass("alive")) {
        hwcount++
        console.log("HWCount: "+ hwcount + " at " + livingWorlds[start]);
      }
    }
    if((hwcount <= 1) || (hwcount > 3)) {
      $('#'+livingWorlds[_]).addClass("dead");
    } else if (hwcount == 2 || hwcount == 3) {
      $('#'+livingWorlds[_].toggleClass('alive'));
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
        //  $world.attr('class', 'dead')
          }
        }
    //add to dom
    $('#gameBoard').append($grid);
}

function updateGrid(x,y) {

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
          $world.attr('id', 'cell_' + j + '_' + i);
          liveOrDie(j,i);
          }
        }
   //add to dom
   $('#gameBoard').empty()
   $('#gameBoard').append($grid);
   }

$('#startBtn').click(function(event) {
    event.preventDefault();
    console.log('start')
    //$rowcol = $("#size :input");
    //console.log($rowcol)
    updateGrid(7,7);
})


//what will become the game loop
drawGrid(7,7);
