// const fetch = require('node-fetch');

const url = 'https://api.mercadolibre.com/sites/MLB/search?q=camisas';
const productList = document.querySelector('#listagem');


const fetchResultArray = async () => {

  try {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    return jsonResponse.results;
  } catch (error) {
    console.log(error);
  }
}

fetchResultArray().then((resultArray) => console.log(resultArray));

const createProductItem = ({ price, thumbnail, title }) => {
  const item = document.createElement('div');
  item.innerHTML = `
  <img src=${thumbnail} class='img_produto' />
  <p>${title}</p>
  <p>R$ ${price}`;
  productList.appendChild(item);
}

fetchResultArray().then((resultArray) => {
  resultArray.forEach((result) => createProductItem(result));
})
