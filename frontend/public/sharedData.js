// Fonction pour modifier la variable data
function setData(newData) {
    data = newData;
}

// Fonction pour accéder à la variable data
function getData() {
    return data;
}


let data = null;

exports = { setData, getData };
