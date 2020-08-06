importScripts("../creature/Creature.js","../creature/Node.js","../creature/Muscle.js","runner.js","mutationner.js","../lib/box2d.umd.js");
let creaturesDna = [];
async function train(){
    for(let i=0;i<(12+10);i++){
        creaturesDna.push(generateCreature());
    }

    //For 100 generations
    for(let i=0;i<5000;i++) {
        creaturesDna = evaluate(creaturesDna);
        creaturesDna.sort((a,b)=>b.finalPosition.x-a.finalPosition.x);

        if(!(i%10)) {
            //console.log("Best : ", creaturesDna[0].finalPosition);
        }
        //for(creatureDna of creaturesDna){
        //    console.log(creatureDna.finalPosition.x);
        //}
        postMessage(creaturesDna);
        let bestX = creaturesDna[0].finalPosition.x+'';
        //console.log("bestX: "+bestX);
        //console.log("--------------------------");
        //console.log(creaturesDna);
        postMessage(i);
        postMessage(bestX);
        // keep a 3rd of the best, a 3rd mutated, a 3rd random
        creaturesDna.length = 4;
        for(let j=0;j<4;j++){
            delete creaturesDna[j].finalPosition;
            creaturesDna.push(mutateCreature(creaturesDna[j]));
        }
        for(let j=0;j<(4+10);j++){
            creaturesDna.push(generateCreature());
        }
    }

    return creaturesDna[0];
}

function evaluate(creaturesDna){
    for(let i=0; i<creaturesDna.length; i++){
        creaturesDna[i].finalPosition=runDna(creaturesDna[i]);
    }
    return creaturesDna;
}

train();