const fetch = require('node-fetch');

const url = 'https://api.mercadolibre.com/sites/MLB/search?q=camisas';

const fetchAllTshirts = async () => {

  try {
    const response = fetch(url);
    const jsonResponse = response.json();
    return jsonResponse;
  } catch (error) {
    console.log(error);
  }
}


