const canvas = document.querySelector('canvas');

canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

// c means context
const c = canvas.getContext('2d');



let mouse = {
	x: undefined,
	y: undefined
}

let maxRadius = 25 ;
let minRadius = 2;

let colorArray = [
'#c5e4da',
'#8CC9B6',
'#A5A5A5',
'#585858',
'#e8f4f0'

];

window.addEventListener('resize', function(){
	canvas.width= window.innerWidth;
	canvas.height= window.innerHeight;
	init();
});

window.addEventListener('mousemove',
 function(event) {
 	mouse.x = event.x;
 	mouse.y = event.y;
});


window.addEventListener('resize', function(){
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;
});

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius= radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];


	this.draw = function (){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = this.color;
		c.stroke();
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function(){
		if (this.x + this.radius  > innerWidth || this.x - this.radius <0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius <0){
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;


		if (mouse.x - this.x<50 && mouse.x - this.x > -50 && mouse.y -this.y <50 && mouse.y - this.y > -50) {

			if (this.radius < maxRadius) {
			this.radius +=1;}
		}
		else if (this.radius >this.minRadius){
			this.radius -=1;
		}

		this.draw();
	}
	}

let circleArray = [];


function init(){
	circleArray = [];
	for(let i = 0; i<700; i++){
		let radius = Math.random()*3 +1;
		let x = Math.random() * (innerWidth - radius *2) + radius;
		let y = Math.random() * (innerHeight -radius *2) + radius;
		let dx = (Math.random() - 0.5) *2;
		let dy = (Math.random() - 0.5) *2;
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}




function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (let i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}


}




	init();
	animate();
