const API_ECONOMIA = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrencies = async () => {
  const response = await fetch(API_ECONOMIA);
  const data = await response.json();
  return data;
};

// fetchCurrencies();
export default fetchCurrencies;
