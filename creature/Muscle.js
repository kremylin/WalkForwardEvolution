class Muscle {
    cycleLength;

    strength;
    extendedLength; // ->Starting Length
    contractedLength; // nb* : Contracted length can be greater than extendedLength
    contractFrame;
    contracted = false;

    joint;

    nodeA;
    nodeB;

    dna={};

    world;

    constructor(world, {
                    cycleLength=Math.floor(Math.random()*120+1),
                    strength,
                    extendedLength,
                    contractedLength=Math.random(),
                    contractFrame,
                    nodeA,
                    nodeB
                }){

        this.world = world;
        this.cycleLength = cycleLength;
        this.strength = strength || Math.random();
        this.extendedLength = extendedLength || box2d.b2Vec2.DistanceVV(nodeA.body.GetPosition(), nodeB.body.GetPosition());
        this.contractedLength = contractedLength;
        this.contractFrame = contractFrame || Math.floor(Math.random()*this.cycleLength);
        this.nodeA = nodeA;
        this.nodeB = nodeB;

        const distanceJointDef = new box2d.b2DistanceJointDef();
        distanceJointDef.Initialize(nodeA.body, nodeB.body, nodeA.body.GetPosition(), nodeB.body.GetPosition());
        distanceJointDef.dampingRatio = 1;
        distanceJointDef.frequencyHz = 4;
        this.joint = this.world.CreateJoint(distanceJointDef);


        this.dna.cycleLength = cycleLength;
        this.dna.strength = strength;
        this.dna.extendedLength = extendedLength;
        this.dna.contractedLength = contractedLength;
        this.dna.contractFrame = contractFrame;

    }

    update(frameCount){
        if((frameCount % this.cycleLength) > this.contractFrame){
            this.contract();
        } else {
            this.extend();
        }
    }

    contract(){
        this.joint.SetLength(this.contractedLength);
        this.contracted = true;
    }

    extend(){
        this.joint.SetLength(this.extendedLength);
        this.contracted = false;
    }

    destroy(){
        this.world.DestroyJoint(this.joint);
        this.nodeA.muscles.splice(this.nodeA.muscles.indexOf(this),1);
        this.nodeB.muscles.splice(this.nodeB.muscles.indexOf(this),1);
    }

    getDna(){
        return this.dna;
    }
}