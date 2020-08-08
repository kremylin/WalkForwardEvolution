//importScripts('creature.js', 'truc.js');

function runDna(creatureDna)
{
    const gravity = new box2d.b2Vec2(0, -10);
    let world = new box2d.b2World(gravity);
    let timeStep = 1 / 60;
    let velocityIterations = 8;
    let positionIterations = 3;

//Ground
    {
        const worldWidth = 2080;
        const bdGround = new box2d.b2BodyDef();
        let ground = world.CreateBody(bdGround);

        const shapeGround = new box2d.b2EdgeShape();
        shapeGround.Set(new box2d.b2Vec2(-worldWidth, -0.2), new box2d.b2Vec2(worldWidth, -0.2));


        const groundFixture = new box2d.b2FixtureDef();
        groundFixture.shape = shapeGround;
        groundFixture.friction = 100;
        groundFixture.density = 10;
        ground.CreateFixture(groundFixture);
    }


    let creature = new Creature(world, creatureDna);

    for (let i = 0; i<60*30; i++) {
        world.Step(timeStep, velocityIterations, positionIterations);
        creature.update(i);
    }

    return creature.getPosition();
}