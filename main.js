var arrowWidth = 19;
var arrowHeight = 90;
var status = "route";
var frameNumber = 0;
var powerValue = 0;
var angle = 0;
var animal;
var random;
var animalBlood;
var animalLieved;
var recordNow = 0;
var meters = 0;
var zombies = 0;

var speedX;
var speedY;
var badMessages = ["Ты убил животное. Не стыдно?",
					"Ты решил устроить здесь кладбище?",
					"Да ладно, он все равно был не очень.",
					"Иногда приходится чем-то жертвовать.",
					"Убьешь еще парочку, и они станут мстить.",
					"А он думал, что умеет летать. Упс.",
					"На его месте мог бы быть ты!",
					"Гринпису бы ты не понравился.",
					"Статья 245 УК РФ \n Жестокое обращение с животными — до двух лет лишения свободы",
					"Тебе аукнется. Точно говорю.",
					"Ты его убил. Даже не знаю, что скaзать.",
					"Однажды ты поймешь, что убивать — не здорово.",
					"Его жизнь только начиналась!",
					"У него была жена и два маленьких ребенка!",
					"По крайней мере, это не худший способ умереть."
					];

function init() {
	console.info("initialized"); //console.log,info,error,warn,debug
	var stage = new createjs.Stage("game");

	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
	createjs.Ticker.framerate = 30;

	var rect = new createjs.Shape();	
	rect.graphics
		.beginFill("#a6e6ff")
		.drawRect(0, 0, 7000, 640);
	stage.addChild(rect);
	
	var background = new createjs.Shape();	
	background.graphics
		.beginFill("#fff")
		.drawRect(0, 0, 7000, 640);
	background.alpha = 0.5;
	
	
	var ground = new createjs.Bitmap("ground.png");
	stage.addChild(ground);	
	ground.y = 450;	
	
	var flowers = new createjs.Bitmap("flowers.png");
	stage.addChild(flowers);
	flowers.x = 4000;
	flowers.y = 420;
	
	var cloud1 = new createjs.Bitmap("cloud1.png");
	stage.addChild(cloud1);
	cloud1.regX = 65;
	cloud1.regY = 50;
	cloud1.x = 2500;
	cloud1.y = 300;
	
	var cloud2 = new createjs.Bitmap("cloud2.png");
	stage.addChild(cloud2);	
	cloud2.regX = 57;
	cloud2.regY = 30;
	cloud2.x = 410;
	cloud2.y = 160;
	
	var cloud3 = new createjs.Bitmap("cloud3.png");
	stage.addChild(cloud3);	
	cloud3.regX = 82;
	cloud3.regY = 42;
	cloud3.x = 980;
	cloud3.y = 140;
	
	var cloud4 = new createjs.Bitmap("cloud4.png");
	stage.addChild(cloud4);	
	cloud4.regX = 60;
	cloud4.regY = 29;
	cloud4.x = 610;
	cloud4.y = 330;
	
	var cloud5 = new createjs.Bitmap("cloud5.png");
	stage.addChild(cloud5);	
	cloud5.regX = 35;
	cloud5.regY = 28;
	cloud5.x = 85;
	cloud5.y = 250;
	
	var cloud6 = new createjs.Bitmap("cloud1.png");
	stage.addChild(cloud6);
	cloud6.regX = 65;
	cloud6.regY = 50;	
	cloud6.x = 1265;
	cloud6.y = 80;
	
	var cloud7 = new createjs.Bitmap("cloud5.png");
	stage.addChild(cloud7);	
	cloud7.regX = 35;
	cloud7.regY = 28;
	cloud7.x = 1335;
	cloud7.y = 280;
	
	var cloud8 = new createjs.Bitmap("cloud4.png");
	stage.addChild(cloud8);	
	cloud8.regX = 60;
	cloud8.regY = 29;
	cloud8.x = 1610;
	cloud8.y = 230;
	
	var cloud9 = new createjs.Bitmap("cloud5.png");
	stage.addChild(cloud9);	
	cloud9.regX = 35;
	cloud9.regY = 28;
	cloud9.x = 1065;
	cloud9.y = 350;
	
	var cloud10 = new createjs.Bitmap("cloud1.png");
	stage.addChild(cloud10);
	cloud10.regX = 65;
	cloud10.regY = 50;	
	cloud10.x = 2065;
	cloud10.y = 150;
	
	var cloud11 = new createjs.Bitmap("cloud5.png");
	stage.addChild(cloud11);	
	cloud11.regX = 35;
	cloud11.regY = 28;
	cloud11.x = 1800;
	cloud11.y = 380;
	
	var clouds = [cloud1, cloud2, cloud3, cloud4, cloud5, cloud6, cloud7, cloud8, cloud9, cloud10, cloud11];
	
	var result = new createjs.Text("0 метров", "30px Arial", "#444");	
	result.textAlign = "center";
	result.x = 490;
	result.y = 20;
	stage.addChild(result);
	
	var message = new createjs.Text(" ", "30px Arial", "#444");	
	message.textAlign = "center";
	message.x = 490;
	message.y = 250;
	
	var newRecorg = new createjs.Text("Новый рекорд!", "30px Arial", "#960000");	
	newRecorg.textAlign = "center";
	newRecorg.x = 490;
	newRecorg.y = 50;
	
	var button = new createjs.Shape();	
	button.graphics
		.beginFill("#a6e64f")
		.beginStroke("#333")
		.drawRect(0, 0, 250, 40);
	button.x = 360;
	button.y = 365;
	
	
	var buttonText = new createjs.Text("Попробовать еще раз", "20px Arial", "#333");	
	buttonText.textAlign = "center";
	buttonText.x = 490;
	buttonText.y = 373;
	
	
	var record = new createjs.Text("Рекорд : 0 метров", "20px Arial", "#333");	
	record.textAlign = "center";
	record.x = 840;
	record.y = 30;
	stage.addChild(record);
	
	var cat = new createjs.Bitmap("cat.png");		
	cat.x = 115;
	cat.y = 460;
	var catStartX = 115;
	var catStartY = 460;
	cat.regX = 32;
	cat.regY = 20;
	
	var fox = new createjs.Bitmap("fox.png");		
	fox.x = 115;
	fox.y = 460;
	var foxStartX = 115;
	var foxStartY = 460;
	fox.regX = 48;
	fox.regY = 29;
	
	var animals = [fox, cat, fox, cat, fox, cat];
	
	var catBlood = new createjs.Bitmap(document.getElementById("catBlood"));				
		catBlood.regX = 32;
		catBlood.regY = 22;
				
	var foxBlood = new createjs.Bitmap(document.getElementById("foxBlood"));				
		foxBlood.regX = 70;
		foxBlood.regY = 25;
					
	var blood = [foxBlood, catBlood, foxBlood, catBlood, foxBlood, catBlood];
	
	var catLieved = new createjs.Bitmap(document.getElementById("catLieved"));				
		catLieved.regX = 23;
		catLieved.regY = 50;
				
	var foxLieved = new createjs.Bitmap(document.getElementById("foxLieved"));				
		foxLieved.regX = 33;
		foxLieved.regY = 55;
					
	var lieved = [foxLieved, catLieved, foxLieved, catLieved, foxLieved, catLieved];
		
	stage.addEventListener("tick", function (){
		
		if (status == "fly"){
			if(animal.y < 550) {
				speedY -= 0.6;
				animal.y -= speedY;
				animal.x += speedX;
				meters = Math.floor((animal.x - catStartX) / 13) / 10;
				result.text = meters + " метров";
				
				for(var i = 0; i < clouds.length; i++)				
					if(animal.x <= clouds[i].x + 60 && animal.x >= clouds[i].x - 60 && animal.y <= clouds[i].y + 10 && animal.y >= clouds[i].y - 10) {
						speedY *= -1;						
					}
					
				if (animal.x > 300) {
					stage.x -= speedX;
					result.x =  -stage.x + 490;
					button.x = -stage.x + 360;
					buttonText.x = -stage.x + 490;
					message.x =  -stage.x + 490;
					record.x = -stage.x + 840;
					newRecorg.x = -stage.x + 490;
				}
			}else {
				
				stage.addChild(background);
				stage.removeChild(result);
				stage.addChild(result);
				stage.removeChild(record);
				stage.addChild(record);
				if (meters > recordNow){
						record.text = "Рекорд : " + meters + " метров";
						recordNow = meters;
						stage.addChild(newRecorg);
					}
					//-----------------------------------------------------------------------------------------------------------
					
					
				
				stage.addChild(button);
				stage.addChild(buttonText);
				
				status = "fall";
				if ( animal. x < 4000 && (speedY > 10 || speedX > 20 || speedY < -20 )) {
					stage.removeChild(animal);
					animalBlood = blood[random];				
					animalBlood.x = animal.x;
					animalBlood.y = animal.y;
					stage.addChild(animalBlood);
					
					random = Math.floor(1 + Math.random() * (badMessages.length + 1 - 1)) - 1;
					message.text = badMessages[random];
					stage.addChild(message);
					zombies += 1;					
					
				} else if (animal. x > 4000){					
					stage.removeChild(animal);
					animalLieved = lieved[random];				
					animalLieved.x = animal.x;
					animalLieved.y = 440;
					stage.addChild(animalLieved);						
					message.text = "Ты смог!\nТебе пришлось убить " + zombies + " малышей, но ты сделал это!\n Мои поздравления.";
					stage.addChild(message);
				}
			}
		}
		if (status == "bearJump"){
			frameNumber = frameNumber + 1;
			if (frameNumber == 20) {
				status = "fly";
				
				random = Math.floor(1 + Math.random() * (animals.length + 1 - 1)) - 1;				
				animal = animals[random];
				stage.addChild(animal);				
				frameNumber = 0;
			}		
		}
		if (status == "pause"){
			frameNumber = frameNumber + 1;
			if (frameNumber == 15) {
				status = "bearJump";
				spriteOfBear.gotoAndPlay("run");
				stage.removeChild(arrow);
				stage.removeChild(power);
				frameNumber = 0;
			}
		}
	});	
	
//****************************************
	
  var sunData = {
	images : ["pritesheet_sun.png"],// картинки для загрузки спрайтов, их может быть несколько, поэтому в массиве
	frames : {width: 1044 / 6, height: 459 / 3, count: 17, regX: 0, regY: 0, spacing:0, margin:0},
	animations : {		
		run: [0, 16, "run", 0.4]
	}
  };
  var spriteSheetSun = new createjs.SpriteSheet(sunData);
  var spriteOfSun = new createjs.Sprite(spriteSheetSun);
  stage.addChild(spriteOfSun);

  spriteOfSun.gotoAndPlay("run");
 
   spriteOfSun.x = 600;
   spriteOfSun.y = 20;
  
//****************************************
	
	var bearData = {
	images : ["pritesheet_bear1.png"],// картинки для загрузки спрайтов, их может быть несколько, поэтому в массиве
	frames : {width: 2114 / 7, height: 639 / 3, count: 21, regX: 0, regY: 0, spacing:0, margin:0},
	animations : {
		run: [0, 20, "stop"],
		stop: 20,
		start: 0
	}
  }
  var spriteSheetBear = new createjs.SpriteSheet(bearData);
  var spriteOfBear = new createjs.Sprite(spriteSheetBear);
  stage.addChild(spriteOfBear);

  spriteOfBear.gotoAndPlay("start");
 
   spriteOfBear.x = 50;
   spriteOfBear.y = 350;
  
//****************************************
	var power = new createjs.Shape();
	power.size = 0;
	power.graphics
		.beginFill("#00FF00")
		.drawRect(10, 550, 30, 1);
	stage.addChild(power);
	
	power.addEventListener("tick", function (){
		if (status == "speed"){
			var r = power.size / 130 * 255;
			var g = 255 - power.size / 130 * 255;
			var k = 255 / Math.max(r, g);
			r = Math.round(r * k);
			g = Math.round(g * k);
		
			power.graphics
				.clear()
				.beginFill("rgb(" + r + "," +  g + ", 0)")
				.drawRect(10, 550 - power.size, 30, power.size);
		}			
	});	
	
	var movePower =
		createjs.Tween
			.get(power, {loop : true})			
			.to({size : 130}, 400)
			.to({size : 0}, 400)
			;

//****************************************	
	
	var arrow = new createjs.Bitmap("arrow.png");
	stage.addChild(arrow);
	
	arrow.regX = arrowWidth/2;
	arrow.regY = 9 * arrowHeight/10;
	arrow.x = 90;
	arrow.y = 510;
	
	var rotateArrow =
		createjs.Tween
			.get(arrow, {loop : true})
			.to({rotation : 90}, 500, createjs.Ease.cubicInOut)
			.to({rotation : 0}, 500, createjs.Ease.cubicInOut)
			;
		
	var clickListener = function(e) {	
		if (status == "speed") {
			status = "pause";
			movePower.setPaused(true);
			powerValue = power.size / 3;
			speedX = powerValue * Math.cos(angle);
			speedY = powerValue * Math.sin(angle);			
		}
		
		if (status == "route") {
			status = "speed";
			rotateArrow.setPaused(true);
			angle =  (90 - arrow.rotation) * Math.PI / 180;
			movePower.setPaused(false);
		}		
	};
	
	var buttonClickListener = function(e) {
		stage.removeChild(background);
		stage.removeChild(newRecorg);
		stage.removeChild(animal);
		if(animalBlood != null){
			var headstone = new createjs.Bitmap("headstone.png");
			headstone.regX = 32;
			headstone.regY = 22;
			headstone.x = animalBlood.x;
			headstone.y = animalBlood.y;
			stage.addChild(headstone);
			stage.removeChild(animalBlood);
		}
		stage.removeChild(button);
		stage.removeChild(buttonText);		
		message.x = 490;
		stage.removeChild(message);
		
		animal.x = catStartX;
		animal.y = catStartY;
		status = "route";
		stage.x = 0;
		result.x = 490;
		record.x = 840;
		result.text = "0 meters";
		button.x = 360;
		buttonText.x = 490;
		frameNumber = 0;
		powerValue = 0;
		angle = 0;
		speedX = 0;
		speedY = 0;
		stage.addChild(arrow);
		rotateArrow.setPaused(false);
		stage.addChild(power);
		power.size = 0;
		power.graphics
			.clear()
			.beginFill("#00FF00")
			.drawRect(10, 550, 30, 1);
		spriteOfBear.gotoAndPlay("start");
		
	};
	
	
	
	rect.addEventListener("click", clickListener);
	button.addEventListener("click", buttonClickListener); 		
}