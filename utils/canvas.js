var Utils = Utils || {};

class Canvas {
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

Utils.Canvas = Canvas;
