//Math.random = Math.seedrandom;
//Math.seedrandom('c');

var creature;

var p5Game = new window.p5(null, document.getElementById('game-container'));

function vB2dToP5(vect){
    return {
        x: b2dToP5(vect.x),
        y: window.innerHeight-b2dToP5(vect.y)
    };
}

function vP5ToB2d(vect){
    return new box2d.b2Vec2(
        p5ToB2d(vect.x),
        -p5ToB2d(vect.y)+window.innerHeight
    );
}

function b2dToP5(d){
    return Math.floor(d*100);
}

function p5ToB2d(d){
    return d/100;
}

function setup() {
    createCanvas(window.innerWidth-20, window.innerHeight-20);
    frameRate(60);
    background(153);

    const gravity = new box2d.b2Vec2(0,-10);
    window.world = new box2d.b2World(gravity);
    //window.world.SetContactListener(new CollisionListener());
    window.timeStep = 1 / 60;
    window.velocityIterations = 8;
    window.positionIterations = 3;

    //Ground
    {
        const worldWidth = p5ToB2d(window.innerWidth);
        const bdGround = new box2d.b2BodyDef();
        window.ground = window.world.CreateBody(bdGround);

        const shapeGround = new box2d.b2EdgeShape();
        shapeGround.Set(new box2d.b2Vec2(-worldWidth, -0.2), new box2d.b2Vec2(worldWidth, -0.2));


        const groundFixture = new box2d.b2FixtureDef();
        groundFixture.shape = shapeGround;
        groundFixture.friction = 100;
        groundFixture.density = 10;
        window.ground.CreateFixture(groundFixture);
    }


    creature = new Creature();
    window.camera = new Camera(createVector(window.innerWidth/2, -100));

}

function draw() {
    window.world.Step(window.timeStep, window.velocityIterations, window.positionIterations);

    clear();
    background(0);

    window.camera && window.camera.applyCamera();

    creature.update(frameCount);

    for(let node of creature.nodes){
        drawNode(node);
    }

    for(let muscle of creature.muscles){
        drawMuscle(muscle);
    }
}

function drawNode(node){
    const position = vB2dToP5(node.body.GetPosition());

    const radius = b2dToP5(node.body.m_fixtureList.m_shape.m_radius);
    const angle = node.body.GetAngle();
    push();
        translate(position.x, position.y);
        rotate(-angle);
        let color = {r:0,g:255,b:0,a:1};
        fill(`rgba(${color.r},${color.g},${color.b},${color.a})`);
        circle(0, 0, 2*radius);
    pop();
}

function drawMuscle(muscle){
    push();
        let color;
        if(muscle.contracted){
            color = {r:255,g:0,b:0,a:1};
        } else {
            color = {r:0,g:0,b:255,a:1};
        }
        stroke(`rgba(${color.r},${color.g},${color.b},${color.a})`);
        strokeWeight(3);
        line(
            vB2dToP5(muscle.nodeA.body.GetPosition()).x,
            vB2dToP5(muscle.nodeA.body.GetPosition()).y,
            vB2dToP5(muscle.nodeB.body.GetPosition()).x,
            vB2dToP5(muscle.nodeB.body.GetPosition()).y
        );
    pop();
}