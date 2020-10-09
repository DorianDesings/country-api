const countries = document.getElementById('countries');

const getCountries = async () => {
  try {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('Error', err);
  }
};

const paintCountries = async () => {
  const data = await getCountries();
  let fragment = document.createDocumentFragment();
  data.forEach(item => {
    const section = document.createElement('section');
    section.classList.add('country');
    fragment.appendChild(section);
    const flag = document.createElement('img');
    flag.src = item.flag;
    fragment.appendChild(flag);
    const title = document.createElement('h2');
    title.classList.add('country__title');
    title.textContent = item.name;
    fragment.appendChild(title);
    const population = document.createElement('p');
    population.classList.add('country__data');
    population.textContent = `Population:${item.population}`;
    fragment.appendChild(population);
    const region = document.createElement('p');
    region.classList.add('country__data');
    region.textContent = `Region: ${item.region}`;
    fragment.appendChild(region);
    const capital = document.createElement('p');
    capital.classList.add('country__data');
    capital.textContent = `Capital: ${item.capital}`;
    fragment.appendChild(capital);
  });
  countries.appendChild(fragment);
};

document.addEventListener('DOMContentLoaded', () => {
  paintCountries();
});
