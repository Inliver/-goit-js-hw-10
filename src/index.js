import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountryes from './fetchCountries';
import './css/styles.css';

const refs = {
    serchingFild: document.getElementById('search-box'),
    countryesList: document.querySelector('.country-list'),
    coununtryInfo: document.querySelector('.country-info')
}
const DEBOUNCE_DELAY = 300;

refs.serchingFild.addEventListener('input', debounce(onChange, DEBOUNCE_DELAY))

function onChange(e) { 
    e.preventDefault();

    const searchQuery = e.target.value.trim();

    if (searchQuery === "") {
        refs.countryesList.innerHTML = "";
        refs.coununtryInfo.innerHTML = "";
        return;
    }

    fetchCountryes.fetchCountryes(searchQuery).then(country => {
               

        if (country.length > 10) {
            Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
            refs.countryesList.innerHTML = "";
            refs.coununtryInfo.innerHTML = "";
            return;
        }

        if (country.length > 1) {
            createContryList(country)
            refs.coununtryInfo.innerHTML = "";
            return;
        }

        if (country.length === 1) {
            createContryInfo(country[0])
            refs.countryesList.innerHTML = "";
            return;
        }

        if (country.status === 404) { 
            Notiflix.Notify.failure("Oops, there is no country with that name");
            refs.countryesList.innerHTML = "";
            refs.coununtryInfo.innerHTML = "";
            return;
        }
    })
}


function createContryInfo(country) {
    
    const allLanguage = Object.values(country.languages);
    const markup = `<h2><img src='${country.flags.svg}' alt='flag' width='30' class='country-flag'/>${country.name.common}</h2>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <p>Languages: ${allLanguage}</p>
    `;
    
    refs.coununtryInfo.innerHTML = markup;
}

function createContryList(country){
    const list = country.map(name =>
    `<li class='list-elem'>
    <p><img src='${name.flags.svg}' alt='flag' width='30' class='country-flag'/>${name.name.common}<p>
    </li>`).join('');
    refs.countryesList.innerHTML = list;
}



