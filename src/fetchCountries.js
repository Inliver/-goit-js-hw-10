
//BASE_URL  = "https://restcountries.com/v3.1"

export default { fetchCountryes }

function fetchCountryes(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(resp => { return resp.json() })
}