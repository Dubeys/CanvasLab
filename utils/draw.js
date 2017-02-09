var Utils = Utils || {};

class Draw {
    static circle(ix,iy,isize,color) {

        let x = ix || 0,
            y = iy || 0,
            size = isize || 5;

        ctx.beginPath();
        ctx.arc(x,y,size, 0, 2 * Math.PI, false);
        ctx.fillStyle = color || 'black';
        ctx.fill();

    }

    static rect(x,y,width,height,color){

        ctx.fillStyle = color || 'black';
        ctx.fillRect(x,y,width,height);

    }
}
Utils.Draw = Draw;
