export function findRepeatedPattern(string){

    let beginSubstring = 0;
    let count = 2;
    let match = false;
    
    for (let index = 2; index < 999; index++) {
    
        let substring1 = string.substring(beginSubstring, index);

        let beginSubstring2 = count + beginSubstring;
        let index2 = count + index;
                
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