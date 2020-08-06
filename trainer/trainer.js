function train(){
    let creaturesDna=[];
    for(let i=0;i<(30+70);i++){
        creaturesDna.push(generateCreature());
    }

    //For 100 generations
    for(let i=0;i<1000;i++) {
        creaturesDna = evaluate(creaturesDna);
        creaturesDna.sort((a,b)=>b.finalPosition.x-a.finalPosition.x);

        if(!(i%100)) {
            console.log("Best : ", creaturesDna[0]);
            console.log("Best : ", creaturesDna[0].finalPosition);
        }

        // keep a 3rd of the best, a 3rd mutated, a 3rd random
        creaturesDna.length = 10;
        for(let j=0;j<10;j++){
            delete creaturesDna[j].finalPosition;
            creaturesDna.push(mutateCreature(creaturesDna[j]));
        }
        for(let j=0;j<(10+70);j++){
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

