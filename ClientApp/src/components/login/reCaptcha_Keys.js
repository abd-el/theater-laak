export const azureKeys = {
    REACT_APP_SECRET_KEY : "6LeIbhckAAAAADpI5GG6rY0sRphQ5n3y6LWnVggZ",
    REACT_APP_SITE_KEY : "6LeIbhckAAAAAOwc9VTRek6tmgddg1YjGdPXZ-jh"  
}

export const localKeys = {
    REACT_APP_SECRET_KEY : "6LfLIeAjAAAAAChyaAzq3bdsWGB04eS-x-n8595o",
    REACT_APP_SITE_KEY : "6LfLIeAjAAAAAByOb72K60gH8AuG9imTW4fEke2s",  
}

export const getKeys = function() {
    if (window.location.hostname === "localhost") {
        return localKeys;
    } else {
        return azureKeys;
    }
}