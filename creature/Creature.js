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

        if(nodesDna){
            this.nodesDna = nodesDna;
            for(const nodeDna of nodesDna){
                const node = new Node(this.world, nodeDna);
                this.nodes.push(node);
            }
        } else {
            this.nodesDna = [];
            // Random Node number from 2 to 10
            let nbNodes = Math.floor(Math.random() * 9 + 2);
            for (let i = 0; i < nbNodes; i++) {
                const node = new Node(this.world, {});
                this.nodes.push(node);
                this.nodesDna.push(node.getDna());
            }
        }

        if(musclesDna){
            this.musclesDna = musclesDna;
            for(let muscleDna of this.musclesDna){
                muscleDna.nodeA = this.nodes[muscleDna.nodeAIndex];
                muscleDna.nodeB = this.nodes[muscleDna.nodeBIndex];
                let muscleAB = new Muscle(this.world, muscleDna);
                delete muscleDna.nodeA;
                delete muscleDna.nodeB;
                this.muscles.push(muscleAB);
            }
        } else {
            this.musclesDna = [];
            // Random muscles creation
            for(let i=0;i<this.nodes.length;i++){
                let nodeAIndex = i, nodeBIndex = false;
                let node = this.nodes[i];

                // A least one muscle by node
                if(!node.getMuscles().length){
                    let muscleDna;
                    while(!(muscleDna = this.createMuscle(node, this.nodes[nodeBIndex = Math.floor(Math.random()*this.nodes.length)]))){}
                    muscleDna.nodeAIndex = nodeAIndex;
                    muscleDna.nodeBIndex = nodeBIndex;
                    this.musclesDna.push(muscleDna);
                }


                for(let j=i+1;j<this.nodes.length;j++){
                    if(Math.random()<0.5){
                        let muscleDna = this.createMuscle(node, this.nodes[j]);
                        if(muscleDna) {
                            muscleDna.nodeAIndex = nodeAIndex;
                            muscleDna.nodeBIndex = j;
                            this.musclesDna.push(muscleDna);
                        }
                    }
                }
            }
        }

    }

    createMuscle(nodeA, nodeB){
        if(nodeA === nodeB){
            return false;
        }
        for(let muscle of nodeA.getMuscles()){
            // If muscle already exists, it is not created
            if((muscle.nodeA === nodeA && muscle.nodeB === nodeB)||(muscle.nodeA === nodeB && muscle.nodeB === nodeA)){
                return false;
            }
        }

        let muscleAB = new Muscle(this.world, {nodeA: nodeA, nodeB: nodeB});
        this.muscles.push(muscleAB);
        nodeA.getMuscles().push(muscleAB);
        nodeB.getMuscles().push(muscleAB);
        return muscleAB.getDna();
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