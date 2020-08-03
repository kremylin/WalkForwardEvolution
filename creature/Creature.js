class Creature {
    nodes = [];
    muscles = [];

    constructor(){
        // Random Node number from 2 to 5
        let nbNodes = Math.floor(Math.random()*4+2);
        for(let i=0; i < nbNodes; i++){
            this.nodes.push(new Node({}));
        }

        // Random muscles creation
        for(let i=0;i<this.nodes.length;i++){
            let node = this.nodes[i];
            // A least one muscle by node
            if(!node.getMuscles().length){
                while(!this.createMuscle(node, this.nodes[Math.floor(Math.random()*this.nodes.length)])){}
            }


            for(let j=i+1;j<this.nodes.length;j++){
                if(Math.random()<0.5){
                    this.createMuscle(node, this.nodes[j]);
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

        let muscleAB = new Muscle({nodeA: nodeA, nodeB: nodeB});
        this.muscles.push(muscleAB);
        nodeA.getMuscles().push(muscleAB);
        nodeB.getMuscles().push(muscleAB);
        return true;
    }

    getPosition(){
        let sumVect = this.nodes.reduce((sumV,v)=>new box2d.b2Vec2(
            sumV.x+v.x,
            sumV.y+v.y
        ));

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

}