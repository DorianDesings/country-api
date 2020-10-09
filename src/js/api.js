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
  const fragment = document.createDocumentFragment();
  const template=document.getElementById('country-template').content
  data.forEach((item) => {
    template.querySelector('.country__flag').src=item.flag
    template.querySelector('.country__title').textContent=item.name
    template.querySelector('.country__population').textContent=item.population
    template.querySelector('.country__region').textContent=item.region
    template.querySelector('.country__capital').textContent=item.capital
    const clone = document.importNode(template, true);
    fragment.appendChild(clone);
  });
  countries.appendChild(fragment)
};

document.addEventListener('DOMContentLoaded', () => {
  paintCountries();
});
