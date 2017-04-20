//get world
function getWorld(x,y) {
    return $("#cell_" + x + '_' + y);
}

//give life to world
function livingWorld(e) {
    //get target
    $src = $(e.target);
    //give life
    $src.toggleClass("alive");
}


function countHabitableWorlds(j,i) {
    let y = i;
    let x = j
    let xe = x-1;
    let xw = x+1;
    let yn = y-1;
    let ys = y+1;
    let ne = getWorld(xe, yn).hasClass('alive');
    let n  = getWorld(x,  yn).hasClass('alive');
    let nw = getWorld(xw, yn).hasClass('alive');
    let e  = getWorld(xe,  y).hasClass('alive');
    let w  = getWorld(xw,  y).hasClass('alive');
    let se = getWorld(xe, ys).hasClass('alive');
    let s  = getWorld(x,  ys).hasClass('alive');
    let sw = getWorld(xw, ys).hasClass('alive');

    // return [ne,n,nw,e,w,se,s,sw];
    return ne + n + nw + e + w + se + s + sw;
}


function updateGrid(x,y) {
    x = 7;
    y = 7;
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
          let friends = countHabitableWorlds(j,i);
          if ( (friends == 2 && getWorld(j,i).hasClass('alive')) || friends == 3){
              $world.addClass('alive')
          }
      }
    }
   //add to dom
   $('#gameBoard').empty()
   $('#gameBoard').append($grid);
}
//set all the buttons
$('#startBtn').click(function(event) {
    event.preventDefault();
    let gameOfLife = setInterval(updateGrid, 200);
    $('#stopBtn').click(function(event){
        event.preventDefault();
        clearInterval(gameOfLife);
    })
})



$('#clear').click(function(event) {
    event.preventDefault();
    $('#gameBoard').empty();
    drawGrid();
})


// function to draw the grid of size X Y
function drawGrid() {
    x = 7;
    y = 7;
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

//draw inital grid
drawGrid();
