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

    constructor({
                    cycleLength=Math.floor(Math.random()*120+1),
                    strength,
                    extendedLength,
                    contractedLength=Math.random(),
                    contractFrame,
                    nodeA = new Node(),
                    nodeB = new Node()
                }){

        this.cycleLength = cycleLength;
        this.strength = strength || Math.random();
        this.contractedLength = contractedLength;
        this.contractFrame = contractFrame || Math.floor(Math.random()*this.cycleLength);
        this.nodeA = nodeA;
        this.nodeB = nodeB;

        const distanceJointDef = new box2d.b2DistanceJointDef();
        distanceJointDef.Initialize(nodeA.body, nodeB.body, nodeA.body.GetPosition(), nodeB.body.GetPosition());
        distanceJointDef.dampingRatio = 1;
        distanceJointDef.frequencyHz = 4;
        this.joint = window.world.CreateJoint(distanceJointDef);
        this.extendedLength = extendedLength || this.joint.m_length;
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
}