class Scene {
    constructor(options){
        let opts = options || {}
        this.canvas = document.createElement('canvas');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.setAttribute('width',this.width);
        this.canvas.setAttribute('height',this.height);
        this.canvas.style.opacity = opts.opacity || 1;
        this.clearColor = opts.color || 'white';
        this.transparent = opts.transparent || false;

        if(!this.transparent)this.canvas.style.background = this.clearColor;
        document.body.appendChild(this.canvas);
    }

    createContext(){
        let ctx = this.canvas.getContext("2d");
        return ctx;
    }

    update(fn){
        window.requestAnimationFrame(this.update.bind(this,fn));
        if(this.transparent){
            ctx.clearRect(0,0,this.width,this.height);
        }else{
            ctx.fillStyle = this.clearColor;
            ctx.fillRect(0,0,this.width,this.height);
        }
        fn();
    }
}

class Particle {
    constructor(x,y,radius,dx,dy){
        this.size = radius || 5;
        this.x = x || 0;
        this.y = y || 0;
        this.dx = dx || -1 + Math.random()*2;
        this.dy = dy || -1 + Math.random()*2;
        this.speed = Math.random();
        this.clusterSize = 0;
        this.color = 'hsl('+Math.random()*360+',100%,0%)'
    }

    move(timer){

        if(this.y+this.size < 0 || this.y-this.size > canvas.height) this.dy *= -1;
        if(this.x+this.size < 0 || this.x-this.size > canvas.width) this.dx *= -1;

        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;

        this.draw();
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    drawLineTo(part,dist){
        let x = part.x,
            y = part.y,
            size = part.size;

        ctx.beginPath();
        ctx.moveTo(this.x,this.y)
        ctx.lineTo(x,y)
        ctx.lineWidth = 2 - dist / 37.5;
        ctx.stroke()
    }

    distanceTo(part){
        return Math.sqrt((this.x-part.x)*(this.x-part.x) + (this.y-part.y)*(this.y-part.y));
    }

    nearTo(dist,maxDist){
        if(dist < maxDist){
            return true
        }
        return false
    }
}

let canvas = new Scene({color: "rgba(255,255,255,.1)"});
let ctx = canvas.createContext();

let timer = 0;
let particles = [];

for(let i = 0; i < 500; i++){
    let part = new Particle(Math.random()*canvas.width,Math.random()*canvas.height, 1);
    particles.push(part);
    particles[i].draw();
}

canvas.update(() => {

    timer++;

    for(let i = 0; i < particles.length; i++){
        for(let j = i; j < particles.length; j++ ){
            let dist = particles[i].distanceTo(particles[j]);
            if( particles[i].nearTo(dist,75) ){
                particles[i].drawLineTo(particles[j],dist)
                particles[i].clusterSize++
            };
        }
        particles[i].size = 2 + particles[i].clusterSize/10;
        particles[i].move();
        particles[i].clusterSize = 0;
    }

});
