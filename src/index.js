import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');
import API from './fetchCountries';

const input = document.getElementById("search-box");
const list = document.querySelector(".country-list")
const block = document.querySelector(".country-info")
const DEBOUNCE_DELAY = 300;

input.addEventListener("input", debounce(search, DEBOUNCE_DELAY));


function search() {
    let names = input.value.trim();
    list.innerHTML = "";
    block.innerHTML  = "";
    if(names.length < 1){
        Notiflix.Notify.info("Please enter");
    }
    else {API.fetchCountries(names).then(renderCountries).catch( Notiflix.Notify.failure("Oops, there is no country with that name"));}
    
}

 

function renderCountries(countries) {
   

    if(countries.length > 1 && countries.length < 11) { 
        let listCountries = countries.map(country => 
            `<li><img height="20px" width="35px" src="${country.flags.svg}" alt="${country.name.official} flag">${country.name.official}<li/>`
         ).join(""); 
        
        list.insertAdjacentHTML("afterbegin", listCountries);
   
    }
    if(countries.length == 1) {
        
        let blockCountry = countries.map(country => 
            `<h1><img height="20px" width="35px" src="${country.flags.svg}" alt="${country.name.official} flag">${country.name.official}</h1>
            <ul class="list-info">
            <li><h2>Capital:</h2>${country.capital}</li>
            <li><h2>Population:</h2>${country.population}</li>
            <li><h2>Languages:</h2>${Object.values(country.languages)}</li>
            </ul>
         `
         ).join(" ");
         block.insertAdjacentHTML("beforeend", blockCountry);
    }
    else {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        
    }

}
