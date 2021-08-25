// const fetch = require('node-fetch');

const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const productList = document.querySelector('#listagem');
const selectParam = document.querySelector('#genero');
const order = document.querySelector('#ordem');
const search = document.querySelector('#search');
const searchBtn = document.querySelector('#btn-search');
let productsArray = [];

const fetchResultArray = async (param = 'camisas') => {
  const endpoint = url + param;
  try {
    const response = await fetch(endpoint);
    const jsonResponse = await response.json();
    return jsonResponse.results;
  } catch (error) {
    console.log(error);
  }
}

// fetchResultArray('camisas-infantil').then((resultArray) => console.log(resultArray));

const createProductItem = ({ price, thumbnail, title }) => {
  const item = document.createElement('div');
  const formatedPrice = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price);
  item.innerHTML = `
  <img src=${thumbnail} class="rounded img_produto img_fluid" />
  <h2 class="desc_produto">${title.slice(0, 42) + '...'}</h2>
  <div class="preco_produto">${formatedPrice}</div>`;
  item.className = 'col-md-3 info-produto';
  productList.appendChild(item);
}

const displayResults = async (array, ordem = 'relevancia') => {
  if (ordem === 'menor-preco') array.sort((a, b) => a.price - b.price);
  if (ordem === 'maior-preco') array.sort((a, b) => b.price - a.price);
  array.forEach((item) => {
    createProductItem(item);
  })
}

window.onload = async () => {
  productsArray = await fetchResultArray();
  displayResults(productsArray);
  let genero, ordem, filter;
  let filteredArray = [];

  selectParam.addEventListener('change', async (e) => {
    filteredArray = [];
    genero = e.target.value;
    productsArray = await fetchResultArray(genero);
    productList.innerHTML = '';
    displayResults(productsArray);
  })

  order.addEventListener('change', (e) => {
    ordem = e.target.value;
    productList.innerHTML = '';
    if (filteredArray.length !== 0) displayResults(filteredArray, ordem)
    else displayResults(productsArray, ordem);
  })

  searchBtn.addEventListener('click', () => {
    filter = search.value.toString();
    productList.innerHTML = '';
    filteredArray = productsArray.filter((item) => item.title.toUpperCase().includes(filter.toUpperCase()));
    displayResults(filteredArray);
  });
}

