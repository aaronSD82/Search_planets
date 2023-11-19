import { inputMinMass, inputMaxMass, inputName, inputMaxRadius, inputMinRadius, inputMaxPeriod, inputMinPeriod, inputMaxTemp, intputMinTemp, inputMaxDistance, inputMinDistance, buttonSearch, buttonMoreSearch, buttonBeforePlanet, buttonNextPlanet, otherPlanet, counter} from "./costants.js";
import { showDataInUI, showMorePlanets } from "./addDataUI.js";

let query = 'https://planets-by-api-ninjas.p.rapidapi.com/v1/planets?';
let offset = 0;
let maxPage;
let actualPage;
let dataJson;
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ed8749a09emshac1fc8abd0efcdbp1610c5jsnb57fbb62456c',
        'X-RapidAPI-Host': 'planets-by-api-ninjas.p.rapidapi.com'
    }
};

async function launchQuery(offsetSet) {


    let completeQuery = query + `offset=${offsetSet}`;

    try {
        if (inputName.value || inputMaxMass.value || inputMinMass.value || inputMaxRadius.value || inputMinRadius.value || inputMaxPeriod.value || inputMinPeriod.value || inputMaxDistance.value
            || inputMinDistance.value || inputMaxTemp.value || intputMinTemp.value) {

            completeQuery = madeCompleteRequest(completeQuery);

            const request = await fetch(completeQuery, options);
            const data = await request.json();

            dataJson = data;
            maxPage = data.length;
            actualPage = 0;

            if (maxPage > 0) {

                otherPlanet.innerHTML = '';
                showDataInUI(dataJson, actualPage, maxPage);

            } else {

                otherPlanet.innerHTML = '<h1>No hay resultados</h1>';
                offset = 0;
                actualPage = 0;
                maxPage = 0;
            }

        }
        else {
            
            offset = 0;
            otherPlanet.innerHTML = "<h1>Debe introducir algun campo de búsqueda</h1>";
            otherPlanet.style.display = "flex";

        }
    } catch (error) {

        console.log(error);
    }
}

buttonSearch.addEventListener('click', () => {

    launchQuery(offset);
});

buttonMoreSearch.addEventListener('click', () => {

    offset += 30;
    launchQuery(offset);
});

buttonNextPlanet.addEventListener('click', () => {
    if (maxPage > 0) {

        actualPage = actualPage < (maxPage - 1) ? ++actualPage : actualPage;
        counter.innerText = `Planeta ${actualPage + 1} de ${maxPage}`;
        showMorePlanets( dataJson, actualPage, maxPage);
        
    } 
});

buttonBeforePlanet.addEventListener('click', () => {
    if (maxPage > 0) {

        actualPage = actualPage > 0 ? --actualPage : actualPage;
        counter.innerText = `Planeta ${actualPage + 1} de ${maxPage}`;
        showMorePlanets(dataJson, actualPage, maxPage);
        
    }
});

function madeCompleteRequest(completeQuery) {
    let nombre = inputName.value ? `&name=${inputName.value}` : "";
    let massMin = inputMinMass.value ? `&min_mass=${inputMinMass.value}` : "";
    let massMax = inputMaxMass.value ? `&max_mass=${inputMaxMass.value}` : "";
    let radiusMin = inputMinRadius.value ? `&min_radius=${inputMinRadius.value}` : "";
    let radiusMax = inputMaxRadius.value ? `&max_radius=${inputMaxRadius.value}` : "";
    let periodMin = inputMinPeriod.value ? `&min_period=${inputMinPeriod.value}` : "";
    let periodMax = inputMaxPeriod.value ? `&max_period=${inputMaxPeriod.value}` : "";
    let tempMin = intputMinTemp.value ? `&min_temperature=${intputMinTemp.value}` : "";
    let tempMax = inputMaxTemp.value ? `&max_temperature=${inputMaxTemp.value}` : "";
    let distanceMin = inputMinDistance.value ? `&min_distance_light_year=${inputMinDistance.value}` : "";
    let distanceMax = inputMaxDistance.value ? `&max_distance_light_year=${inputMaxDistance.value}` : ""; 

    completeQuery += nombre;
    completeQuery += massMin;
    completeQuery += massMax;
    completeQuery += radiusMin;
    completeQuery += radiusMax;
    completeQuery += periodMin;
    completeQuery += periodMax;
    completeQuery += tempMin;
    completeQuery += tempMax;
    completeQuery += distanceMin;
    completeQuery += distanceMax;
    return completeQuery;
}

