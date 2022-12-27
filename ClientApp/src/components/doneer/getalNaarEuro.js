export function getalNaarEuro(getal){
    // 1 -> € 1,-
    // 1.5 -> € 1,50
    // 1.99 -> € 1,99
    // 1.999 -> € 2,-

    getal = Math.round(getal * 100) / 100;

    getal = `€ ${getal}`;
    getal = getal.replace(".", ",");

    if (getal.substring(getal.indexOf(",") + 1).length == 1) {
        getal += "0";
    }

    if (getal.indexOf(",") == -1) {
        getal += ",-";
    }

    getal = getal.substring(0, getal.indexOf(",") + 3);

    return getal;
}