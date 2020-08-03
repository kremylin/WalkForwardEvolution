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
        rotate(this.angle);
    }
}