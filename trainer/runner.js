window = {};
export function run(creatureDna)
{
    createCanvas(window.innerWidth - 20, window.innerHeight - 20);
    frameRate(60);
    background(153);

    const gravity = new box2d.b2Vec2(0, -10);
    let world = new box2d.b2World(gravity);
//window.world.SetContactListener(new CollisionListener());
    window.timeStep = 1 / 60;
    window.velocityIterations = 8;
    window.positionIterations = 3;

//Ground
    {
        const worldWidth = 500;
        const bdGround = new box2d.b2BodyDef();
        window.ground = world.CreateBody(bdGround);

        const shapeGround = new box2d.b2EdgeShape();
        shapeGround.Set(new box2d.b2Vec2(-worldWidth, -0.2), new box2d.b2Vec2(worldWidth, -0.2));


        const groundFixture = new box2d.b2FixtureDef();
        groundFixture.shape = shapeGround;
        groundFixture.friction = 100;
        groundFixture.density = 10;
        window.ground.CreateFixture(groundFixture);
    }

    let creature = new Creature(world, creatureDna);

    for (let i = 0; i<60*60; i++) {
        world.Step(window.timeStep, window.velocityIterations, window.positionIterations);
    }

    return creature.getPosition();
}