function mutateCreature(creatureDna){
    console.log("Mutation : ", creature);
    let nbNodeToRemove = Math.floor(Math.random()*3);
    for(;nbNodeToRemove--;){
        let nodeToRemove = Math.floor(Math.random()*creature.nodesDna.length);
        removeNode(creatureDna, nodeToRemove);
    }

    let nbNodeToAdd = Math.floor(Math.random()*3);
    for(;nbNodeToAdd--;){
        addRandomNode(creatureDna);
    }

    let nbMuscleToEdit = Math.floor(Math.random()*creature.musclesDna.length);
    for(;nbMuscleToEdit--;){
        let muscleToEdit = Math.floor(Math.random()*creature.musclesDna.length);
        muteMuscle(creature.musclesDna[muscleToEdit]);
    }
}

function addRandomNode(creatureDna){
    let nodeDna = {
        friction: Math.random(),
        radius: 0.1,
        position: new box2d.b2Vec2(
            Math.random()*2,
            Math.random()*2
        )
    };
    addNodeWithRandomMuscles(creatureDna, nodeDna);
}

function addNodeWithRandomMuscles(creatureDna, nodeDna){
    const nodeDnaLength = creatureDna.nodesDna.length;
    const nodeAIndex = nodeDnaLength;

    creatureDna.nodesDna.push(nodeDna);

    let nbMuscleAdded = 0;

    for(let i=0;i<nodeDnaLength;i++){
        if(Math.random()<0.5){
            const nodeBIndex = i;
            addMuscle(creatureDna, nodeAIndex, nodeBIndex);
            nbMuscleAdded++;
        }
    }

    if(!nbMuscleAdded) {
        const nodeBIndex = Math.floor(Math.random() * nodeDnaLength);
        // A least one muscle by node
        addMuscle(creatureDna, nodeAIndex, nodeBIndex);
        nbMuscleAdded++;
    }

}

function addMuscle(creatureDna, nodeAIndex, nodeBIndex){
    const nodeDnaA = creatureDna.nodesDna[nodeAIndex];
    const nodeDnaB = creatureDna.nodesDna[nodeBIndex];
    let muscleDna = {
        cycleLength: Math.floor(Math.random()*120+1),
        strength: Math.random(),
        extendedLength: box2d.b2Vec2.DistanceVV(nodeDnaA.position, nodeDnaB.position),
        contractedLength: Math.random(),
        nodeAIndex: nodeAIndex,
        nodeBIndex: nodeBIndex
    };

    muscleDna.contractFrame= Math.floor(Math.random()*this.cycleLength);

    creatureDna.musclesDna.push(muscleDna);
}

function removeNode(creatureDna, nodeToRemove){
    for(let i=creatureDna.musclesDna.length;i--;){
        if(creatureDna.musclesDna[i].nodeAIndex > nodeToRemove){
            creatureDna.musclesDna[i].nodeAIndex--;
        }
        if(creatureDna.musclesDna[i].nodeBIndex > nodeToRemove) {
            creatureDna.musclesDna[i].nodeBIndex--;
        }
        if(creatureDna.musclesDna[i].nodeAIndex === nodeToRemove || creatureDna.musclesDna[i].nodeBIndex === nodeToRemove){
            removeMuscle(creatureDna, i);
        }
            let muscle = this.nodes[nodeToRemove].muscles[0];
        this.muscles.splice(this.muscles.indexOf(muscle),1);
        muscle.destroy();
    }

    creatureDna.nodesDna.splice(nodeToRemove, 1);
    //The graph of the creature can be disjoinct TODO: fix that
}

function removeMuscle(creatureDna, muscleToRemove){
    creatureDna.musclesDna.splice(muscleToRemove, 1);
    //The graph of the creature can be disjoinct TODO: fix that
}

function muteMuscle(muscleDna){
    // 50% chance to have a mutation on the extended length
    if(Math.random()<0.5){
        // 20% chance for this mutation to be random from 0 to 1.5*current extendedLength
        if (Math.random()<0.2){
            muscleDna.extendedLength = Math.random()*1.5*muscleDna.extendedLength;
        }
        // 40 % to be +5%
        else if (Math.random()<0.5) {
            muscleDna.extendedLength += 0.05*muscleDna.extendedLength;
        }
        // 40 % to be -5%
        else {
            muscleDna.extendedLength -= 0.05*muscleDna.extendedLength;
        }
    }

    // 50% chance to have a mutation on the contractedLength
    if(Math.random()<0.5){
        // 20% chance for this mutation to be random from 0 to 1.5*current contractedLength
        if (Math.random()<0.2){
            muscleDna.contractedLength = Math.random()*1.5*muscleDna.contractedLength;
        }
        // 40 % to be +5%
        else if (Math.random()<0.5) {
            muscleDna.contractedLength += 0.05*muscleDna.contractedLength;
        }
        // 40 % to be -5%
        else {
            muscleDna.contractedLength -= 0.05*muscleDna.contractedLength;
        }
    }

    // 30% chance to have a mutation on the cycleLength
    if(Math.random()<0.3){
        // 50% chance for this mutation to be random
        if (Math.random()<0.5){
            muscleDna.cycleLength = Math.floor(Math.random()*120+1);
        }
        // 25 % to be +5%
        else if (Math.random()<0.5) {
            muscleDna.cycleLength += Math.floor(0.05*muscleDna.cycleLength);
        }
        // 25 % to be -5%
        else {
            muscleDna.cycleLength -= Math.floor(0.05*muscleDna.cycleLength);
        }
    }

    // 30% chance to have a mutation on the contractFrame
    if(Math.random()<0.3){
        // 50% chance for this mutation to be random
        if (Math.random()<0.5){
            muscleDna.contractFrame = Math.floor(Math.random()*120+1);
        }
        // 25 % to be +5%
        else if (Math.random()<0.5) {
            muscleDna.contractFrame += Math.floor(0.05*muscleDna.contractFrame);
        }
        // 25 % to be -5%
        else {
            muscleDna.contractFrame -= Math.floor(0.05*muscleDna.contractFrame);
        }
    }
}

/*export function mutateCreature(creature){
    console.log("Mutation : ", creature);
    let nbNodeToDestroy = Math.floor(Math.random()*3);
    for(;nbNodeToDestroy--;){
        let nodeToDestroy = Math.floor(Math.random()*creature.nodes.length);
        creature.removeNodeByIndex(nodeToDestroy);
    }

    let nbNodeToAdd = Math.floor(Math.random()*3);
    for(;nbNodeToAdd--;){
        let nodeToAdd = new Node({});
        creature.addNodeWithRandomMuscles(nodeToAdd);
    }

    let nbMuscleToEdit = Math.floor(Math.random()*creature.muscles.length);
    for(;nbMuscleToEdit--;){
        let muscleToEdit = Math.floor(Math.random()*creature.muscles.length);
        muteMuscle(creature.muscles[muscleToEdit]);
    }
}

function muteMuscle(muscle){
    // 50% chance to have a mutation on the extended length
    if(Math.random()<0.5){
        // 20% chance for this mutation to be random from 0 to 1.5*current extendedLength
        if (Math.random()<0.2){
            muscle.extendedLength = Math.random()*1.5*muscle.extendedLength;
        }
        // 40 % to be +5%
        else if (Math.random()<0.5) {
            muscle.extendedLength += 0.05*muscle.extendedLength;
        }
        // 40 % to be -5%
        else {
            muscle.extendedLength -= 0.05*muscle.extendedLength;
        }
    }

    // 50% chance to have a mutation on the contractedLength
    if(Math.random()<0.5){
        // 20% chance for this mutation to be random from 0 to 1.5*current contractedLength
        if (Math.random()<0.2){
            muscle.contractedLength = Math.random()*1.5*muscle.contractedLength;
        }
        // 40 % to be +5%
        else if (Math.random()<0.5) {
            muscle.contractedLength += 0.05*muscle.contractedLength;
        }
        // 40 % to be -5%
        else {
            muscle.contractedLength -= 0.05*muscle.contractedLength;
        }
    }

    // 30% chance to have a mutation on the cycleLength
    if(Math.random()<0.3){
        // 50% chance for this mutation to be random
        if (Math.random()<0.5){
            muscle.cycleLength = Math.floor(Math.random()*120+1);
        }
        // 25 % to be +5%
        else if (Math.random()<0.5) {
            muscle.cycleLength += Math.floor(0.05*muscle.cycleLength);
        }
        // 25 % to be -5%
        else {
            muscle.cycleLength -= Math.floor(0.05*muscle.cycleLength);
        }
    }

    // 30% chance to have a mutation on the contractFrame
    if(Math.random()<0.3){
        // 50% chance for this mutation to be random
        if (Math.random()<0.5){
            muscle.contractFrame = Math.floor(Math.random()*120+1);
        }
        // 25 % to be +5%
        else if (Math.random()<0.5) {
            muscle.contractFrame += Math.floor(0.05*muscle.contractFrame);
        }
        // 25 % to be -5%
        else {
            muscle.contractFrame -= Math.floor(0.05*muscle.contractFrame);
        }
    }
}*/