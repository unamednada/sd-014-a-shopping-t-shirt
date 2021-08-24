// const fetch = require('node-fetch');

const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const productList = document.querySelector('#listagem');
const selectParam = document.querySelector('#genero');
const order = document.querySelector('#ordem');

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

const displayResults = async (param, ordem) => {
  const itemsArray = await fetchResultArray(param);
  if (ordem === 'menor-preco') itemsArray.sort((a, b) => a.price - b.price);
  if (ordem === 'maior-preco') itemsArray.sort((a, b) => b.price - a.price);
  itemsArray.forEach((item) => {
    createProductItem(item);
  })
}

window.onload = () => {
  displayResults();

  selectParam.addEventListener('change', (e) => {
    let genero = e.target.value;
    productList.innerHTML = '';
    displayResults(genero);

    order.addEventListener('change', (e) => {
      let ordem = e.target.value;
      productList.innerHTML = '';
      displayResults(genero, ordem);
    })
  })


}

