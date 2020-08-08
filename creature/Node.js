class Node {
    body;
    friction;
    radius;
    muscles = [];

    dna={};

    world;

    constructor(world, {
                    friction,
                    radius,
                    position,
                    maxSize
                }) {
        this.world = world;
        this.friction = friction;
        this.radius = radius;

        let initialPosition = position;

        this.dna.friction = friction;
        this.dna.radius = radius;
        this.dna.position = initialPosition;
        this.dna.maxSize = maxSize;


        const bd = new box2d.b2BodyDef();
        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position.Set(initialPosition.x, initialPosition.y);
        bd.fixedRotation = true;
        this.body = this.world.CreateBody(bd);

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

    destroy(){
        this.world.DestroyBody(this.body);
    }

    update(frameCount){

    }

    getDna(){
        return this.dna;
    }
}