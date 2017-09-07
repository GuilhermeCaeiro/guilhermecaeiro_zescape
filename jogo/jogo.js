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

CANVAS_WIDTH = 1000;
CANVAS_HEIGHT = 600;
lastBullet = 0;

window.onload = function(){
	//Criacao do contexto
	canvas = document.getElementById("testecanvas");
	context = canvas.getContext("2d");
	//CANVAS_WIDTH = 1000;
	//CANVAS_HEIGHT = 600;
	
	playerBullets = [];
	enemies = [];
	staticObjects = [];
	
	loadScenario1();
	//Inicio da animacao
    animate();
};


//Carregamento do cenario
function loadScenario1(){
	//objects.background.instance.src = "fundo1000x600_28092012.png";
	objects.background.instance.src = "fundo1000x600_31102012_fase1.png";
	
	objects.character.x = 50;
	objects.character.y = 0;
	
	/*teste = new StaticObjects();
	teste.destructible = true;
	teste.drawable = true;
	teste.image.src = "personagemcostas.png";
	teste.x = 100;
	teste.y = 100;
	teste.width = 20;
	teste.height = 70;
	teste.explode = function(){
		this.active = false;
	}
	teste.draw = function(){
		context.drawImage(this.image,this.x,this.y);
	}
	
	staticObjects.push(teste);*/
	
	muro = new StaticObjects();
	muro.destructible = false;
	muro.drawable = false;
	muro.tangible = true;
	muro.x = 160;
	muro.y = 0;
	muro.width = 20;
	muro.height = 300;
	staticObjects.push(muro);
	
	muro2 = new StaticObjects();
	muro2.destructible = false;
	muro2.drawable = false;
	muro2.tangible = true;
	muro2.x = 160;
	muro2.y = 400;
	muro2.width = 20;
	muro2.height = 200;
	staticObjects.push(muro2);
	
	casa1 = new StaticObjects();
	casa1.destructible = false;
	casa1.drawable = false;
	casa1.tangible = true;
	casa1.x = 180;
	casa1.y = 0;
	casa1.width = 338;
	casa1.height = 55;
	staticObjects.push(casa1);
	
	casa2 = new StaticObjects();
	casa2.destructible = false;
	casa2.drawable = false;
	casa2.tangible = true;
	casa2.x = 800;
	casa2.y = 0;
	casa2.width = 199;
	casa2.height = 175;
	staticObjects.push(casa2);
	
	casa3 = new StaticObjects();
	casa3.destructible = false;
	casa3.drawable = false;
	casa3.tangible = true;
	casa3.x = 320;
	casa3.y = 440;
	casa3.width = 319; //639 - 320
	casa3.height = 159;
	staticObjects.push(casa3);
	
	casa4 = new StaticObjects();
	casa4.destructible = false;
	casa4.drawable = false;
	casa4.tangible = true;
	casa4.x = 680;
	casa4.y = 560;
	casa4.width = 319;
	casa4.height = 39;
	staticObjects.push(casa4);
	
}


//Criacao dos objetos
objects = new function(){

    this.teste = "ola";
    //Background
    this.background = new function(){
        this.type = "img";
        this.name = "normal_background";
        this.image = "fundo1000x600_31102012_fase1.png";
        this.width = CANVAS_WIDTH;
        this.height = CANVAS_HEIGHT;
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
        this.image = "personagemfrente.png";       //Remover depois, caso nao venha a ter mais alguma utilidade.
		this.orientacao = 3;                //Orientacao Norte(1), Leste(2), Sul(3) e Oeste(4).
        this.width = 20;
        this.height = 70;
        this.x = 0;
        this.y = 0;
        this.visible = true;
        this.solid = false;
        this.dynamic = true;
        //Criacao do objeto
        this.instance = new Image();
        this.instance.src = this.image;
		this.shoot = function(){
			document.getElementById("shoot").play();
			var bulletPosition = this.shootpoint();

			playerBullets.push(Bullet({
				speed: 20,
				x: bulletPosition.x,
				y: bulletPosition.y
			}));
		};
		this.shootpoint = function(){
			if(this.orientacao == 1){
				return {
					x: this.x + 25,
					y: this.y + 25
				};
			}
			if(this.orientacao == 2){
				return {
					x: this.x + 15,
					y: this.y + 25
				};
			}
			if(this.orientacao == 3){					
				return {
					x: this.x -3,
					y: this.y + 25
				};
			}
			if(this.orientacao == 4){
				return {
					x: this.x + 5,
					y: this.y + 25
				};
			}
		};
		this.draw = function(){
			context.drawImage(this.instance, this.x, this.y);
		};
		
		this.imageRight = new Image();
		this.imageRight.src = "personagemdireita.png";
		this.imageLeft = new Image();
		this.imageLeft.src = "personagemesquerda.png";
		this.imageFront = new Image();
		this.imageFront.src = "personagemcostas.png";
		this.imageBack = new Image();
		this.imageBack.src = "personagemfrente.png";
		
		this.turnRight = function(){
			this.orientacao = 2;
			this.instance = this.imageRight;
		}
		this.turnLeft = function(){
			this.orientacao = 4;
			this.instance = this.imageLeft;
		}
		this.front = function(){
			this.orientacao = 3;
			this.instance = this.imageBack;
		}
		this.back = function(){
			this.orientacao = 1;
			this.instance = this.imageFront;
		}
		this.explode = function(){
			playerBullets = [];
			enemies = [];
			staticObjects = [];
			
			loadScenario1();
		}
    };
};

function Bullet(I) {
	I.active = true;
	
	if(objects.character.orientacao == 1){
		I.xVelocity = 0;
		I.yVelocity = -I.speed;
	}else if(objects.character.orientacao == 2){
		I.xVelocity = I.speed;
		I.yVelocity = 0;
	}else if(objects.character.orientacao == 3){
		I.xVelocity = 0;
		I.yVelocity = I.speed;
	}else{
		I.xVelocity = -I.speed;
		I.yVelocity = 0;
	}
		
	I.width = 3;
	I.height = 3;
	I.color = "#000";

	I.inBounds = function() {
		return I.x >= 0 && I.x <= CANVAS_WIDTH && I.y >= 0 && I.y <= CANVAS_HEIGHT;
	};

	I.draw = function() {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	};

	I.update = function() {
		I.x += I.xVelocity;
		I.y += I.yVelocity;

		I.active = I.active && I.inBounds();
	};

	return I;
}

function Enemy(I) {
	I = I || {};

	I.active = true;
	//I.age = Math.floor(Math.random() * 128);
	I.lastUpdate = new Date().getTime();
	I.orientacao = 1;
	I.color = "#A2B";
	I.width = 20;
	I.height = 70;
	
	I.sinalizado = false;
	
	if((Math.floor((Math.random()*10)+1))%2==0){
		I.x = 620;
		I.y = 1;
	}else{
		I.x = 200;
		I.y = CANVAS_HEIGHT - I.height - 1;
	}
	
	I.xVelocity = 0;
	I.yVelocity = 2;
	
	I.imageInstance = new Image();
	I.imageInstance.src = "zumbifrente.png";
	
	I.imageRight = new Image();
	I.imageRight.src = "zumbidireita.png";
	I.imageLeft = new Image();
	I.imageLeft.src = "zumbiesquerda.png";
	I.imageFront = new Image();
	I.imageFront.src = "zumbicostas.png";
	I.imageBack = new Image();
	I.imageBack.src = "zumbifrente.png";

	I.defineImage = function (){
		if(I.orientacao == 1){
			I.imageInstance = I.imageFront;
		}else if(I.orientacao == 2){
			I.imageInstance = I.imageRight;
		}else if(I.orientacao == 3){
			I.imageInstance = I.imageBack;
		}else{
			I.imageInstance = I.imageLeft;
		}
	}
	
	this.explode = function(){
		playerBullets = [];
		enemies = [];
		staticObjects = [];
		
		loadScenario1();
	}

	I.inBounds = function() {
		return I.x >= 0 && (I.x + I.width) <= CANVAS_WIDTH && I.y >= 0 && (I.y + I.height) <= CANVAS_HEIGHT;
	};

	I.draw = function() {
		//context.fillStyle = this.color;
		//context.fillRect(this.x, this.y, this.width, this.height);
		
		context.drawImage(I.imageInstance, I.x, I.y);
	};

	I.update = function() {
		I.x += I.xVelocity;
		I.y += I.yVelocity;
		I.age++;
		I.active = I.active && I.inBounds();
	};
	
	I.explode = function() {
		this.active = false;
		// Extra Credit: Add an explosion graphic
	};

	return I;
};

function StaticObjects(){
	this.active = true;
	this.destructible = false;
	this.drawable = false;
	this.tangible = true;
	this.trap = false;
	this.creation = 0;
	
	this.width = 1;
	this.height = 1;
	
	this.x = 0;
	this.y = 0;
	
	this.image = new Image();
	
	this.draw = function(){
	
	}
	
	this.update = function(){
	
	}
	
	this.explode = function(){
		this.active = false;
	}
	
}


//Colisoes

function collides(a, b) {
	return a.x < b.x + b.width &&
		 a.x + a.width > b.x &&
		 a.y < b.y + b.height &&
		 a.y + a.height > b.y;
}

function handleCollisions() {
	playerBullets.forEach(function(bullet) {
		enemies.forEach(function(enemy) {
			if (collides(bullet, enemy)) {
				enemy.explode();
				bullet.active = false;
			}
		});
		staticObjects.forEach(function(staticObject) {
			if (collides(bullet, staticObject)) {
				if(staticObject.destructible){
					staticObject.explode();
					bullet.active = false;
				}else if(staticObject.tangible){
					bullet.active = false;
					//Fazer alguma outra coisa... 
					//Possivelmente, exibe uma animação da bala se chocando com a parede...
				}else{
					//Faz nada... :P
				}
			}
		});
	});

	enemies.forEach(function(enemy) {
		enemy.sinalizado = true;
	
		if (collides(enemy, objects.character)) {
			//enemy.explode();
			objects.character.explode();
		}
		
		staticObjects.forEach(function(staticObject) {
			if (collides(enemy, staticObject)) {
				if(staticObject.trap){
					staticObject.explode();
					enemy.explode();
				}else if(staticObject.tangible){
					//aaaa
					if(enemy.orientacao == 2 && (enemy.x + enemy.width > staticObject.x)){
						enemy.x = staticObject.x - 1 - enemy.width;
					}else if(enemy.orientacao == 4 && (enemy.x < staticObject.x + staticObject.width)){
						enemy.x = staticObject.x + 1 + staticObject.width;
					}else if(enemy.orientacao == 3 && (enemy.y + enemy.height > staticObject.y)){
						enemy.y = staticObject.y - 1 - enemy.height;
					}else if(enemy.orientacao == 1 && (enemy.y <= staticObject.y + staticObject.height)){
						enemy.y = staticObject.y + 1 + staticObject.height;
					}
					
					
				}else{
					//Faz nada... :P
				}
			}
		});
		
		enemies.forEach(function(outroInimigo){
			if(collides(enemy, outroInimigo)){
				if (!outroInimigo.sinalizado){
					if(enemy.orientacao == 2 && (enemy.x + enemy.width > outroInimigo.x)){
						enemy.x = outroInimigo.x - 1 - enemy.width;
					}else if(enemy.orientacao == 4 && (enemy.x < outroInimigo.x + outroInimigo.width)){
						enemy.x = outroInimigo.x + 1 + outroInimigo.width;
					}else if(enemy.orientacao == 3 && (enemy.y + enemy.height > outroInimigo.y)){
						enemy.y = outroInimigo.y - 1 - enemy.height;
					}else if(enemy.orientacao == 1 && (enemy.y < outroInimigo.y + outroInimigo.height)){
						enemy.y = outroInimigo.y + 1 + outroInimigo.height;
					}
				}
			}
		});
		
		enemy.sinalizado = false;	
	});
	
	staticObjects.forEach(function(staticObject) {
		if (collides(objects.character, staticObject)) {
			if(staticObject.trap){
				staticObject.explode();
				staticObject.active = false;
			}else if(staticObject.tangible){
				if(objects.character.orientacao == 2 && (objects.character.x + objects.character.width > staticObject.x)){
					objects.character.x = staticObject.x - 1 - objects.character.width;
				}else if(objects.character.orientacao == 4 && (objects.character.x < staticObject.x + staticObject.width)){
					objects.character.x = staticObject.x + 1 + staticObject.width;
				}else if(objects.character.orientacao == 3 && (objects.character.y + objects.character.height > staticObject.y)){
					objects.character.y = staticObject.y - 1 - objects.character.height;
				}else if(objects.character.orientacao == 1 && (objects.character.y < staticObject.y + staticObject.height)){
					objects.character.y = staticObject.y + 1 + staticObject.height;
				}
				
			}else{
				//Faz nada... :P
			}
		}
	});
	
	
}


//Funcao responsavel por executar os procedimentos de animacao.
function animate(){
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
    update();
    draw();
	
    requestAnimFrame(function(){
        animate();
    });
}

//Atualiza os estados
function update(){
	//Atualizacao do estado do jogador
	if (keydown.left) {
		objects.character.x -= 5;
		objects.character.turnLeft();
	}else if (keydown.right) {
		objects.character.x += 5;
		objects.character.turnRight();
	}else if (keydown.up) {
		objects.character.y -= 5;
		objects.character.back();
	}else if (keydown.down) {
		objects.character.y += 5;
		objects.character.front();
	}
	
	if (keydown.space) {
		timeNow = new Date();
		if ((timeNow.getTime() - lastBullet) > 600){
			objects.character.shoot();
			lastBullet = timeNow.getTime();
		}
	}

	objects.character.x = objects.character.x.clamp(0, CANVAS_WIDTH - objects.character.width);
	objects.character.y = objects.character.y.clamp(0, CANVAS_HEIGHT - objects.character.height);
	
	//Atualizacao das "balas"
	playerBullets.forEach(function(bullet) {
		bullet.update();
	});

	playerBullets = playerBullets.filter(function(bullet) {
		return bullet.active;
	});
	
	//Atualizacao dos inimigos
	enemies.forEach(function(enemy) {
		timeNow = new Date();
		if((timeNow.getTime() - enemy.lastUpdate) > 200){
			if((Math.floor((Math.random()*10)+1))%2==0){
				if((Math.floor((Math.random()*10)+1))%2==0){
					enemy.xVelocity = 0;
					enemy.yVelocity = -8;
					enemy.orientacao = 1;
					
					if(!enemy.inBounds){
						enemy.yVelocity = -(enemy.y - 1); 
					}
					
					enemy.defineImage();
					
				}else{
					enemy.xVelocity = 7;
					enemy.yVelocity = 0;
					enemy.orientacao = 2;
					
					if(!enemy.inBounds){
						enemy.xVelocity = CANVAS_WIDTH - (enemy.x + enemy.width) - 1; 
					}
					
					enemy.defineImage();
					
				}
			}else{
				if((Math.floor((Math.random()*10)+1))%2==0){
					enemy.xVelocity = 0;
					enemy.yVelocity = 5;
					enemy.orientacao = 3;
					
					if(!enemy.inBounds){
						enemy.yVelocity = CANVAS_HEIGHT - (enemy.y + enemy.height) - 1; 
					}
					
					enemy.defineImage();
					
				}else{
					enemy.xVelocity = -6;
					enemy.yVelocity = 0;
					enemy.orientacao = 4;
					
					if(!enemy.inBounds){
						enemy.xVelocity = -(enemy.x - 1); 
					}
					
					enemy.defineImage();
					
				}
			}
			//enemy.x = enemy.x.clamp(0, CANVAS_WIDTH - enemy.width);
			//enemy.y = enemy.y.clamp(0, CANVAS_HEIGHT - enemy.height);
			enemy.update();
			//enemy.yVelocity.clamp(0, CANVAS_HEIGHT - enemy.height);
			enemy.lastUpdate = timeNow.getTime();
		}
	});

	
	enemies = enemies.filter(function(enemy) {
		return enemy.active;
	});

	//if((Math.random() < 0.1) && (Math.random() < 0.1) && (Math.random() < 0.3)) {
	if((Math.random() < 0.1)) {
		enemies.push(Enemy());
	}
	
	staticObjects.forEach(function(staticObject) {
		staticObject.update();
	});

	staticObjects = staticObjects.filter(function(staticObject) {
		return staticObject.active;
	});
	
	//Detectar e tratar colisoes
	handleCollisions();
	
	
}





//Desenha os elementos no contexto
function draw(){
    context.drawImage(objects.background.instance, 0, 0);
	objects.character.draw();
	
	playerBullets.forEach(function(bullet) {
		bullet.draw();
	});
	
	enemies.forEach(function(enemy) {
		enemy.draw();
	});
	
	staticObjects.forEach(function(staticObject) {
		if(staticObject.drawable)
			staticObject.draw();
	});
	
}



//Funcao meramente para testes...
function testar(){
    //alert(objects.teste);
    //alert(objects.background.name);
	alert(Math.floor((Math.random()*10)+1));
}





