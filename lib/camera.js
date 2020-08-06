class Camera {
    position;
    angle;

    constructor(position = createVector(0,0), angle = 0){
        this.position = position;
        this.angle = angle;
    }

    setPosition(position){
        this.position = position;
    }

    setAngle(angle){
        this.angle = angle;
    }

    applyCamera(){
        translate(this.position);
        for(let x=Math.ceil((-this.position.x-window.innerWidth/2)/100);x<(-this.position.x+window.innerWidth)/100;x++){
            textSize(32);
            fill(0, 102, 153);
            text(x+'m', x*100, 200);
            push();
            stroke(255);
            strokeWeight(3);
            line(x*100, window.innerHeight+20, x*100, window.innerHeight-20);
            pop();
        }
        rotate(this.angle);
    }
}