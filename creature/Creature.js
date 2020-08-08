class Creature {
    nodes = [];
    muscles = [];

    world;

    nodesDna;
    musclesDna;

    constructor(world, {
        nodesDna,
        musclesDna
    }){
        this.world = world;

        this.nodesDna = nodesDna;
        for(const nodeDna of nodesDna){
            const node = new Node(this.world, nodeDna);
            this.nodes.push(node);
        }


        this.musclesDna = musclesDna;
        for(let muscleDna of this.musclesDna){
            muscleDna.nodeA = this.nodes[muscleDna.nodeAIndex];
            muscleDna.nodeB = this.nodes[muscleDna.nodeBIndex];
            let muscleAB = new Muscle(this.world, muscleDna);
            delete muscleDna.nodeA;
            delete muscleDna.nodeB;
            this.muscles.push(muscleAB);
        }
    }

    getPosition(){
        let sumVect = this.nodes.reduce((sumV,node)=>{
            return {
                x: sumV.x + node.body.GetPosition().x,
                y: sumV.y + node.body.GetPosition().y
            }
        },   {x: 0, y: 0});

        return new box2d.b2Vec2(
            sumVect.x/this.nodes.length,
            sumVect.y/this.nodes.length
        );
    }

    update(frameCount){
        for(let muscle of this.muscles){
            muscle.update(frameCount);
        }
    }

    getDna(){
        return {
            nodesDna: this.nodesDna,
            musclesDna: this.musclesDna
        };
    }
}