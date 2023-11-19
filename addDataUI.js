import {nameDiv, radiusDiv, distanceDiv, periodDiv, starTemp, majorAxisDiv, massDiv, tempDiv, solarPeriod, starMass, counter, otherPlanet} from "./costants.js";

const nameOfClass = ["planeta1", "planeta2", "planeta3", "planeta4", "planeta5", "planeta6", "planeta7", "planeta8", "planeta9"];
let backgroundsList;

export function showDataInUI(data, page, maxPage) {

    backgroundsList = [];
    createAlistOfBackgrounds(maxPage);
    nameDiv.innerText = " " + data[0].name;
    const mass = data[0].mass ?? "No hay datos";
    massDiv.innerText = mass;
    const radius = data[0].radius ?? "No hay datos";
    radiusDiv.innerText = radius;
    const axis = data[0].semi_major_axis ?? "No hay datos";
    majorAxisDiv.innerText = axis;
    const temper = data[0].temperature ?? "No hay datos";
    tempDiv.innerText = temper;
    const distance = data[0].distance_light_year ?? "No hay datos"
    distanceDiv.innerText = distance;
    const massStar = data[0].host_star_mass ?? "No hay datos"
    starMass.innerText = massStar;
    const tempStar = data[0].host_star_temperature ?? "No hay datos"
    starTemp.innerText = tempStar;
    const period = data[0].period ?? "No hay datos"
    periodDiv.innerText = period + " días dar una vuelta a su estrella";
    counter.innerText = `Planeta ${page + 1} de ${maxPage}`;
    otherPlanet.style.display = "flex";

    applyPeriod(period);
    applySizeOfPlanetAndApplyBackground(radius, page);

}

export function showMorePlanets(data, page, maxPage) { //TODO Meter el actual page

    nameDiv.innerText = " " + data[page].name;
    const mass = data[page].mass ?? "No hay datos";
    massDiv.innerText = mass;
    const radius = data[page].radius ?? "No hay datos";
    radiusDiv.innerText = radius;
    const axis = data[page].semi_major_axis ?? "No hay datos";
    majorAxisDiv.innerText = axis;
    const temper = data[page].temperature ?? "No hay datos";
    tempDiv.innerText = temper;
    const distance = data[page].distance_light_year ?? "No hay datos"
    distanceDiv.innerText = distance;
    const massStar = data[page].host_star_mass ?? "No hay datos"
    starMass.innerText = massStar;
    const tempStar = data[page].host_star_temperature ?? "No hay datos"
    starTemp.innerText = tempStar;
    const period = data[page].period ?? "No hay datos"
    periodDiv.innerText = period + " días dar una vuelta a su estrella";
    counter.innerText = `Planeta ${page + 1} de ${maxPage}`;

    applyPeriod(period);
    applySizeOfPlanetAndApplyBackground(radius, page);

}

function applyPeriod(period) {

    if (period != "No hay datos") {
        period = parseFloat(period);
        const fixPeriod = period / 10;
        solarPeriod.style.animationDuration = `${fixPeriod}s`;

    } else {
        solarPeriod.style.animationDuration = '0s';
    }
}

function applySizeOfPlanetAndApplyBackground(size, page) {


    if (size != "No hay datos") {

        size = parseFloat(size);
        const fixSize = size * 120;
        otherPlanet.style.width = `${fixSize}px`;
        otherPlanet.style.height = `${fixSize}px`;
        
    } else {

        otherPlanet.style.width = '120px';
        otherPlanet.style.height = '120px';

    }

    otherPlanet.className = backgroundsList[page];
}

function createAlistOfBackgrounds(length){

    for (let i = 0; i < length; i++){

        backgroundsList[i] = nameOfClass[Math.floor(Math.random() * 9)];
    }
}