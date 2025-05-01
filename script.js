const SPRITE_WIDTH = 18;
const SPRITE_HEIGHT = 20;
const BORDER_WIDTH = 0;
const SPACING_WIDTH = 1;

var placingx = 11;
var placingy = 11;
var placing = 0;
var currentobj = 0;
var uniquey = []
var rotation = 0;
var itemlist = [[],[],[],[],[]]
function spritePositionToImagePosition(col, row) {
    return {
        x: (
            BORDER_WIDTH +
            col * (SPACING_WIDTH + SPRITE_WIDTH)
        ),
        y: (
            BORDER_WIDTH +
            row * (SPACING_WIDTH + SPRITE_HEIGHT)
        )
    }
}

var canvas = document
            .getElementById("maincanvas");
var context = canvas
              .getContext('2d');
var pointercanvas = document
            .getElementById("pointercanvas");
var pointercontext = pointercanvas
              .getContext('2d');

var showingcanvas = document
            .getElementById("showing");
var showingcontext = showingcanvas
              .getContext('2d');


var spriteSheetURL = "https://i.ibb.co/vCH7KxfP/2025-05-01-0ow-Kleki.png";
var pointerspriteSheetURL = "https://i.ibb.co/Ts2yZjv/2025-05-01-0oz-Kleki.png";
var image = new Image();
image.src = spriteSheetURL;
image.crossOrigin = true;

var pointerimage = new Image();
pointerimage.src = pointerspriteSheetURL;
pointerimage.crossOrigin = true;

var position = spritePositionToImagePosition(1, 0);

image.onload = function() {
    drawtile(11,11,0,0,0);
    drawtile(2,1,0,0,3)
};
function showtile(){ 
    showingcontext.clearRect(0, 0, pointercanvas.width,         pointercanvas.height); 
  
  var tileitem2 = spritePositionToImagePosition(currentobj, rotation)
  showingcontext.drawImage(
        image,
        tileitem2.x,
        tileitem2.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        3*94,
        1*25,
        SPRITE_WIDTH*5,
        SPRITE_HEIGHT*5
    ); 
  
}

function drawtile(x,y,typec,typer,overide){
  var newx = x
  if (0 == y % 2){
    newx = x + 0.5
  }
  tileitem = spritePositionToImagePosition(typec, typer)
  pointercontext.clearRect(0, 0, pointercanvas.width,         pointercanvas.height);  
  if (placing == 1 || overide == 1 || overide == 2){
      context.drawImage(
        image,
        tileitem.x,
        tileitem.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        newx*94,
        y*25,
        SPRITE_WIDTH*5,
        SPRITE_HEIGHT*5
    ); 
    if (uniquey.indexOf(y) == -1){
      uniquey.push(y); 
      
    }
    if (overide !== 2){
    itemlist[0].push(x);
    itemlist[1].push(y); 
    itemlist[2].push(typec); 
    itemlist[3].push((y*1000) + x); 
    itemlist[4].push(typer);
    render();
    }
  } else if (overide !== 3 ){
    
    pointercontext.clearRect(0, 0, pointercanvas.width,         pointercanvas.height);

        pointercontext.drawImage(
        pointerimage,
        tileitem.x,
        tileitem.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        newx*94,
        y*25,
        SPRITE_WIDTH*5,
        SPRITE_HEIGHT*5
    );
    
  } 
  
}
function sort(){ 
  for (let i = 0; i < itemlist[1].length; i++) {
    for (let v = 0; v < itemlist[1].length; v++) {
      
        if ((itemlist[1][v]) > itemlist[1][v + 1] || itemlist[2][v + 1] == 0){
          
          for (let c = 0; c <5; c++){
            var tempvalue = itemlist[c][v];
            itemlist[c][v] = itemlist[c][v + 1];
            itemlist[c][v + 1] = tempvalue;
            
            
          }
          
        } else if ((itemlist[2][v] == itemlist[2][v+1]) && 
            itemlist[1][v] > itemlist[1][v+1] && itemlist[2][v] == 0) {
            for (let c = 0; c <5; c++){
            var tempvalue = itemlist[c][v];
            itemlist[c][v] = itemlist[c][v + 1];
            itemlist[c][v + 1] = tempvalue;
            
            }
          }
      }
}
  
}

function render(){
  sort();
  uniquey = [];
  context.clearRect(0, 0, pointercanvas.width,pointercanvas.height); 
   itemlist[0].forEach(function(element, index) {
      
         
    drawtile(element, itemlist[1][index],itemlist[2][index],itemlist[4][index],2)
     
     showtile();
    
  });
  
  
  
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
     if (1 == placingy % 2){
       placingx = placingx - 1;
     }
    placingy = placingy - 1;
    drawtile(placingx,placingy,currentobj,rotation,0);
  } else if (event.key === 'ArrowDown') {
    if (0 == placingy % 2){
       placingx = placingx + 1;
     }
    placingy = placingy + 1;
    drawtile(placingx,placingy,currentobj,rotation,0);
    
  } else if (event.key === 'ArrowLeft') {
    if (1 == placingy % 2){
       placingx = placingx - 1;
     }
    placingy = placingy + 1;
    drawtile(placingx,placingy,currentobj,rotation,0);
    
  } else if (event.key === 'ArrowRight') {
    if (0 == placingy % 2){
       placingx = placingx + 1;
     }
    placingy = placingy - 1;
    drawtile(placingx,placingy,currentobj,rotation,0);
    
  } else if (event.key === 'x') {
    if(placing == 1){
      placing = 0;
      drawtile(placingx,placingy,currentobj,rotation,0);
    } else {
      placing = 1;
      drawtile(placingx,placingy,currentobj,rotation,1);
    }
    } else if (event.key === 'z'){
      if (currentobj == 12){
        currentobj = 0;
      } else{
        currentobj = currentobj + 1;
      }
      drawtile(placingx,placingy,currentobj,rotation,0)
      showtile();

      
    } else if (event.key === 'c'){
      
      var locatedindex = itemlist[3].indexOf((placingy * 1000) + placingx);
      if(locatedindex > -1){
        var i = 0;
        while (i < 5) {
          itemlist[i] = itemlist[i].slice(0, locatedindex).concat(itemlist[i].slice((locatedindex + 1), itemlist[i].length))
           i = i+1;
          
         }
        
        
        
        
      }
      render()
    } else if (event.key === 'r'){
      if (rotation == 3){
        rotation = 0;
      } else{
        rotation = rotation + 1;
      }
      
      drawtile(placingx,placingy,currentobj,rotation,0);
      showtile();
      
    } else if (event.key === 't'){
      
      itemlist = [[],[],[],[],[]]
      render();
      
    }
    
});