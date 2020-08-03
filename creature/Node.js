class Node {
    body;
    friction;
    radius;
    muscles = [];

    constructor({
                    friction=Math.random(),
                    radius =0.1,
                    position=false,
                    maxSize=2
                }) {
        this.friction = friction;
        this.radius = radius;

        let initialPosition = position || new box2d.b2Vec2(
            Math.random()*maxSize,
            Math.random()*maxSize
        );
        console.log(this.friction);

        const bd = new box2d.b2BodyDef();
        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position.Set(initialPosition.x, initialPosition.y);
        bd.fixedRotation = true;
        this.body = window.world.CreateBody(bd);

        const nodeShape = new box2d.b2CircleShape();
        nodeShape.m_radius = this.radius;

        const nodeFixture = new box2d.b2FixtureDef();
        nodeFixture.shape = nodeShape;
        nodeFixture.friction = 100;
        nodeFixture.restitution = 0.4;
        nodeFixture.density = 10;
        this.body.CreateFixture(nodeFixture);
    }

    getMuscles(){
        return this.muscles;
    }

    update(frameCount){

    }
}