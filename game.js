

//////load asset////////
let sprites = {}
let assetsStillLoading = 0;

function loadSprite(fileName){
    assetsStillLoading++

    let spriteImage = new Image();
    spriteImage.src = "./asset/images/" + fileName;

    spriteImage.addEventListener("load", ()=>{
        assetsStillLoading--
    })
    
    return spriteImage
}

function loadAssets(callback){
    sprites.background = loadSprite("background.png")
    sprites.whiteBall = loadSprite("ball.png")
    sprites.stick = loadSprite("stick.png")

    assetsLoadingLoop(callback)
}

function assetsLoadingLoop(callback){
    if (assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback))
    } else {
        callback()
    }
}

/////////////////

//////vector/////
function Vector(x = 0 , y = 0){
    this.x = x ;
    this.y = y ;
}

Vector.prototype.copy = function(){
   return new Vector(this.x, this.y)  
}

Vector.prototype.addTo = function(v){
   this.x += v.x;
   this.y += v.y; 
}

Vector.prototype.mult = function(value){
    return new Vector(this.x * value, this.y * value)  
}

Vector.prototype.length = function(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) 
}


////////mouse handler/////////
function ButtonState(){
    this.down = false;
    this.pressed = false;
}

function MouseHandler(){
    this.left = new ButtonState();
    this.middle = new ButtonState();
    this.right = new ButtonState();

    this.position = new Vector();

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
}

function handleMouseMove(e){
    mouse.position.x = e.pageX;
    mouse.position.y = e.pageY;
}
function handleMouseDown(e){
    handleMouseMove()
    if(e.which === 1){
        mouse.left.down = true;
        mouse.left.pressed = true;
    }else if(e.which === 2){
        mouse.middle.down = true;
        mouse.middle.pressed = true;
    }else if(e.which === 3){
        mouse.right.down = true;
        mouse.right.pressed = true;
    }
}
MouseHandler.prototype.reset = function(){
    mouse.right.pressed = false;
    mouse.middle.pressed = false;
    mouse.left.pressed = false;
}

function handleMouseUp(e){
    handleMouseMove()
    if(e.which === 1){
        mouse.left.down = false;
    }else if(e.which === 2){
        mouse.middle.down = false;
    }else if(e.which === 3){
        mouse.right.down = false;
    }
}

let mouse = new MouseHandler();
//////////////



//////canvas////////
function Canvas2D(){
    this._canvas = document.getElementById("screen");
    this.ctx = this._canvas.getContext("2d")
}

Canvas2D.prototype.clear = function(){
    this.ctx.clearRect(0,0,this._canvas.width , this._canvas.height )
}

Canvas2D.prototype.drawImage = function(
    image,
    position = new Vector(),
    origin = new Vector(),
    rotation = 0
    ){
    this.ctx.save();
    this.ctx.translate(position.x, position.y);
    this.ctx.rotate(rotation);
    this.ctx.drawImage(image, -origin.x, -origin.y)
    this.ctx.restore();
}

let canvas = new Canvas2D();

///////////////////



//////GameWorld////////
function GameWorld(){

}

GameWorld.prototype.draw = function(){
    canvas.drawImage(sprites.background)
}

GameWorld.prototype.update = function(){

}

let gameWorld = new GameWorld();
/////////////////

function animate(){
    canvas.clear();
    gameWorld.update();
    gameWorld.draw();
    requestAnimationFrame(animate)
}

loadAssets(animate)