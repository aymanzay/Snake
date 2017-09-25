/* Mobile Snake Game that responds to both keyboard arrow keys,
as well as directional swipe events on the screen.  */

$(document).ready(function() {

    canv= $('#gc')[0];
    context=canv.getContext("2d");
            
    /* Keyboard event listener */
    document.addEventListener("keydown", function keyPush(evt){
        switch(evt.keyCode) {
            //switch statement for snake direction
            case 37:
                if(xv!==1)
                    xv=-1; yv=0; //left
                break;
            case 38:
                if(yv!==1)
                    xv=0; yv=-1; //down
                break;
            case 39:
                if(xv!==-1)
                    xv=1; yv=0; //right
                    break;
            case 40:
                if(yv!==-1)
                    xv=0; yv=1; //up
                    break;
            }
            //prev = evt.keyCode;
        });
    
    /* User touch swipe listener */
    $('.grid').swipe({
        swipe:function(event, direction, distance, duration) {
            switch(direction) {
                case "left":
                    if(xv!==1)
                        xv=-1; yv=0; //left
                    break;
                case "right":
                    if(xv!==-1)
                        xv=1; yv=0; //right
                    break;
                case "up":
                    if(yv!==1)
                        xv=0; yv=-1; //up
                    break;
                case "down":
                    if(yv!==-1)
                        xv=0; yv=1; //down
                    break;
            }
        }
    });
    setInterval(game,1000/15); //game frame rate
});

px=py=20; //player head xy-coordinates
gs=tc=20; //grid coordinates

ax=ay=15; //apple coordinates
xv=yv=0; //snake speed

trail=[]; //recorded path
tail = 5; //initial snake lenght
prev = 0;
score = 0;
level = "";

function game() {
    px += xv; //increment player by the speed value
    py += yv;

    //snake goes off bounds reappear different side
    if(px<0) {
        px= tc-1;
    }
    if(px>tc-1) {
       px= 0;
    }

    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }

    //style
    context.fillStyle="black";
    context.fillRect(0,0,canv.width,canv.height); //square blocks rep. grid
    context.strokeStyle = "red"; //level
    context.strokeRect(0,0,canv.width,canv.height);

    context.fillStyle="lime"; //snake
    for(var i=0;i<trail.length;i++) { //populating the trail array with recorded snake path
        context.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2); //sqaure blocks rep. snake trail
                
        //if snake crosses its own path
        if(trail[i].x==px && trail[i].y==py) {            
            tail = 5;
            score = 0;
        }
    }

    trail.push({x:px,y:py});
    while(trail.length>tail) { //shifting snake one block for movement
        trail.shift();
    }
            
    //if snake head collides with apple increment tail length
    if(ax==px && ay==py) {
        tail++;
        score++;
        //Randomize apple's next coordinates
        spawnApple();
    }

    context.fillStyle="red"; //apple color
    context.fillRect(ax*gs,ay*gs,gs-2,gs-2); //fill block with apple
    var scoreText = "Score: " + score;
    context.fillStyle="white";
    context.fillText(scoreText, 5, 395);
}

//Randomly generates target location
function spawnApple(){
     for(var i=0;i<trail.length;i++) {
        if(trail[i].x == ax && trail[i].y == ay){
            ax=Math.floor(Math.random()*tc);
            ay=Math.floor(Math.random()*tc);
        }
    }
}