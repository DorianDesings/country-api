const details = document.getElementById('details');

const getCountryInfo = async country => {
  try {
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    const countryInfo = await res.json();
    details.innerHTML = `
      <div class="details__header">
        <a href="/src">Back</a>
      </div>
      <img src=${countryInfo[0].flag} ="" />
      <div class="details__info">
        <h2 id="details-title" class="details__title">
          ${countryInfo[0].name}
        </h2>
      <p id="details-native-name" class="details__data">
        <span class="details__bold">Native Name</span>
        ${countryInfo[0].nativeName}
      </p>
      <p class="details__data">
        <span class="details__bold">Population</span>
        ${countryInfo[0].population}
      </p>
      <p class="details__data">
        <span class="details__bold">Region</span>
        ${countryInfo[0].region}
      </p>
      <p class="details__data">
        <span class="details__bold">Sub Region</span>
        ${countryInfo[0].subregion}
      </p>
      <p class="details__data">
        <span class="details__bold">Capital</span>
        ${countryInfo[0].capital}
      </p>
      <p class="details__data">
        <span class="details__bold">Top Level Domain</span>
        ${countryInfo[0].topLevelDomain}
      </p>
      <p class="details__data">
        <span class="details__bold">Currencies</span>
        ${countryInfo[0].currencies[0].name}
      </p>
      <p class="details__data">
        <span class="details__bold">Languages</span>
        ${countryInfo[0].languages[0].name}
      </p>
      <h3 class="details__border-countries">Border Countries</h3>
        <div class="details__countries-buttons">
          ${countryInfo[0].borders
            .map(border => {
              return `<button>${border}</button>`;
            })
            .join('')}
        </div>
      </div>
    `;
  } catch (err) {
    console.log('Error', err);
  }
};

getCountryInfo(location.hash.substring(1));
