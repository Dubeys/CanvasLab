var Utils = Utils || {};

class Vertex {
    constructor(x,y){
        this.x = x || 0;
        this.y = y || 0;
    }


    addVertex(vertex){
        this.x += vertex.x;
        this.y += vertex.y;
    }

    addScalar(s){
        this.x += s;
        this.y += s;
    }

    scale(s){
        this.x *= s;
        this.y *= s;
    }

    distanceTo(vertex){
        return Math.sqrt((this.x-vertex.x)*(this.x-vertex.x) + (this.y-vertex.y)*(this.y-vertex.y));
    }
}

Utils.Vertex = Vertex;
