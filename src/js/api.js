const countries = document.getElementById('countries');
const form = document.getElementById('form');
const search = document.getElementById('search');
const modal = document.getElementById('modal');

const getCountries = async (userUrl = '') => {
  const url = userUrl || 'https://restcountries.eu/rest/v2/all';
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('Error', err);
    // getCountries('https://restcountries.eu/rest/v2/all');
  }
};

const paintCountries = async (userUrl = '') => {
  const data = await getCountries(userUrl);
  if (data.length > 0) {
    let fragment = document.createDocumentFragment();
    data.forEach(item => {
      const section = document.createElement('section');
      section.classList.add('country');
      const formatName = item.name.replace(/^$|\s+/g, '%20');
      section.dataset.country = formatName;
      const flag = document.createElement('img');
      flag.src = item.flag;
      section.appendChild(flag);
      const countryData = document.createElement('div');
      countryData.classList.add('country__info');
      const title = document.createElement('h2');
      title.classList.add('country__title');
      title.textContent = item.name;
      countryData.appendChild(title);
      const population = document.createElement('p');
      population.classList.add('country__data');
      population.innerHTML = `<span class="country__bold">Population:</span>${item.population}`;
      countryData.appendChild(population);
      const region = document.createElement('p');
      region.classList.add('country__data');
      region.innerHTML = `<span class="country__bold">Region:</span> ${item.region}`;
      countryData.appendChild(region);
      const capital = document.createElement('p');
      capital.classList.add('country__data');
      capital.innerHTML = `<span class="country__bold">Capital:</span> ${item.capital}`;
      countryData.appendChild(capital);
      section.appendChild(countryData);
      fragment.appendChild(section);
    });
    countries.innerHTML = '';
    countries.appendChild(fragment);
  } else {
    countries.innerHTML = `<h2>No results for ${search.value}</h2>`;
  }
};

const readUserChanges = (data, event) => {
  if (event === 'input' && data.length >= 3) {
    paintCountries(`https://restcountries.eu/rest/v2/name/${data}`);
  } else if (event === 'select') {
    paintCountries(`https://restcountries.eu/rest/v2/region/${data}`);
  }
};

const getCountryInfo = async country => {
  try {
    const countryInfo = await getCountries(
      `https://restcountries.eu/rest/v2/name/${country}`
    );
    console.log(countryInfo);
    modal.innerHTML = `
    <div class="modal__header">X</div>
        <img src=${countryInfo[0].flag} alt="" />
        <div class="modal__info">
          <h2 class="modal__title">${countryInfo[0].name}</h2>
          <p class="modal__data">
            <span class="modal__bold">Native Name</span>
            ${countryInfo[0].nativeName}
          </p>
          <p class="modal__data">
            <span class="modal__bold">Population</span>
            ${countryInfo[0].population}
          </p>
          <p class="modal__data">
            <span class="modal__bold">Region</span>
            ${countryInfo[0].region}
          </p>
          <p class="modal__data">
            <span class="modal__bold">Sub Region</span>
            ${countryInfo[0].subregion}
          </p>
          <p class="modal__data">
            <span class="modal__bold">Capital</span>
            ${countryInfo[0].capital}
          </p>
          <p class="modal__data">
            <span class="modal__bold">Top Level Domain</span>
            ${countryInfo[0].topLevelDomain}
          </p>
          <p class="modal__data">
            <span class="modal__bold">Currencies</span>
            ${countryInfo[0].currencies[0].name}
          </p>
          <p class="modal__data">
            <span class="modal__bold">Languages</span>
            ${countryInfo[0].languages[0].name}
          </p>
          <h3 class="modal__border-countries">Border Countries</h3>
          <div class="modal__countries-buttons">
            <button class="modal__button"></button>
            <button class="modal__button"></button>
            <button class="modal__button"></button>
          </div>
        </div>
    `;
    modal.classList.add('modal--show');
  } catch (err) {
    console.log('Error', err);
    // getCountries('https://restcountries.eu/rest/v2/all');
  }

  console.log(country);
};

countries.addEventListener('click', e => {
  let element = '';
  if (e.target.parentElement.classList.contains('country')) {
    element = e.target.parentElement;
  } else if (e.target.parentElement.classList.contains('country__info')) {
    element = e.target.parentElement.parentElement;
  } else if (e.target.classList.contains('country__bold')) {
    element = e.target.parentElement.parentElement.parentElement;
  }
  // console.log(element);
  getCountryInfo(element.dataset.country);
  // modal.classList.toggle('modal--show');
});

form.addEventListener('change', e => {
  if (e.target.value !== 'default') {
    readUserChanges(e.target.value, 'select');
  } else {
    paintCountries();
  }
});

form.addEventListener('keyup', e => {
  if (search.value !== '') {
    readUserChanges(search.value, 'input');
  } else {
    paintCountries();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  paintCountries();
});
