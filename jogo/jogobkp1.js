/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000/60);
    };
})();


function animate(canvas, context){

    context.drawImage(objects.background.instance, 0, 0);

    if(objects.character.x<769 && objects.character.y==0){
        objects.character.x = objects.character.x + 1;
        context.drawImage(objects.character.instance, objects.character.x, objects.character.y);
    } else if(objects.character.x>=769 && objects.character.y<558){
        objects.character.y = objects.character.y + 1;
        context.drawImage(objects.character.instance, objects.character.x, objects.character.y);
    } else if((objects.character.x>0 && objects.character.x<=769) && objects.character.y==558){
        objects.character.x = objects.character.x - 1;
        context.drawImage(objects.character.instance, objects.character.x, objects.character.y);
    } else if(objects.character.x==0 && (objects.character.y>0 && objects.character.y<=558)){
        objects.character.y = objects.character.y - 1;
        context.drawImage(objects.character.instance, objects.character.x, objects.character.y);
    }

    requestAnimFrame(function(){
        animate(canvas, context);
    });
}

window.onload = function(){

    var canvas = document.getElementById("testecanvas");
    var context = canvas.getContext("2d");


    //var time = new Date();
    animate(canvas, context);
    
};

function testar(){
    alert(objects.teste);
    alert(objects.background.name);

}

objects = new function(){

    this.teste = "ola";
    //Background
    this.background = new function(){
        this.type = "img";
        this.name = "normal_background";
        this.image = "fundo.jpg";
        this.dimensionX = 800;
        this.dimensionY = 600;
        this.x = 0;
        this.y = 0;
        this.visible = true;
        this.solid = false;
        this.dynamic = false;
        //Criacao do objeto
        this.instance = new Image();
        this.instance.src = this.image;
    };

    //Character
    this.character = new function(){
        this.type = "img";
        this.name = "mint";
        this.image = "mint.png";
        this.dimensionX = 800;
        this.dimensionY = 600;
        this.x = 0;
        this.y = 0;
        this.visible = true;
        this.solid = false;
        this.dynamic = true;
        //Criacao do objeto
        this.instance = new Image();
        this.instance.src = this.image;
    };
};



