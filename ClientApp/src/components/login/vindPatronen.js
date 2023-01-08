export function vindDubbelePatronen(woord, matches) {

    if (typeof woord !== 'string') {
        console.log('je moet een string aangeven');
    }
    if (typeof matches !== 'number') {
        console.log('je moet een getal aangeven');
    }

    //const langstMogelijkeMatch = woord.length / matches;

    let beginSubstring = 0;
    let eindeSubstring = 2;
    for (let index = 2; index < 999; index++) {

        const sub = woord.substring(beginSubstring, index);
        console.log(sub);
        const iterator = woord.matchAll(sub);
        const result = Array.from(iterator);
        //console.log(result.length); 

        if (result.length == matches) {
            console.log('er is een dubbele patroon gevonden');
        }

        beginSubstring++;

        if (index > woord.length) {
            index = eindeSubstring++;
            beginSubstring = 0;

        }

        if (eindeSubstring > woord.length) {
            break;
        }
    }
}


export function findRepeatedPattern(string){

    let beginSubstring = 0;
    let count = 2;
    let match = false;
    
    for (let index = 2; index < 999; index++) {
       
            //console.log('substring 1: ' + string.substring(beginSubstring, index));
            let substring1 = string.substring(beginSubstring, index);
    
            let beginSubstring2 = count + beginSubstring;
            let index2 = count + index;
                    
            //console.log('substring 2: '+  string.substring(beginSubstring2, index2));
            let substring2 = string.substring(beginSubstring2, index2); 
            beginSubstring++
            
            if(substring1 == substring2){
                match = true;
              break;
            }
            
            if(index > string.length){
                index = count++;
              beginSubstring = 0;
            }
            
            if(count == string.length){
                break;
            }
    }
    
    return match;
    
    }
    






