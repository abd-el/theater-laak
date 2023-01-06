function myFunction(woord, matches) {

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
            console.log('er is een herhalende patroon gevonden');
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

const wachtwoord = 'auto123autoafkafk'
myFunction(wachtwoord, 2);