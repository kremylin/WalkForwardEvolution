function generateCreature() {
    let creatureDna ={
        nodesDna: [{
            friction: Math.random(),
            radius: 0.1,
            position: {
                x: Math.random() * 2,
                y: Math.random() * 2
            }
        }],
        musclesDna: []
    };
    let nbNodes = Math.floor(Math.random() * 9 + 1);
    for (;nbNodes--;) {
        addRandomNode(creatureDna);
    }
    return creatureDna;
}

function mutateCreature(creatureDna1){
    let creatureDna = JSON.parse(JSON.stringify(creatureDna1));
    let nbNodeToRemove = Math.floor(Math.random()*3);
    for(;nbNodeToRemove--;){
        let nodeToRemove = Math.floor(Math.random()*creatureDna.nodesDna.length);
        removeNode(creatureDna, nodeToRemove);
    }

    let nbNodeToAdd = Math.floor(Math.random()*(11-creatureDna.nodesDna.length));
    for(;nbNodeToAdd--;){
        addRandomNode(creatureDna);
    }

    let nbMuscleToEdit = Math.floor(Math.random()*creatureDna.musclesDna.length);
    for(;nbMuscleToEdit--;){
        let muscleToEdit = Math.floor(Math.random()*creatureDna.musclesDna.length);
        muteMuscle(creatureDna.musclesDna[muscleToEdit]);
    }

    return creatureDna;
}

function addRandomNode(creatureDna){
    let nodeDna = {
        friction: Math.random(),
        radius: 0.1,
        position: {
            x: Math.random()*2,
            y: Math.random()*2
        }
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