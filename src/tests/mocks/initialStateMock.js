import mockData from './mockData';

const initialStateMock = {
  user: {
    email: 'exemplo@email.com',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 1,
        value: '10',
        currency: 'EUR',
        method: 'Cartão de crédito',
        tag: 'Alimentação',
        description: 'Refeição na Europa',
        exchangeRates: mockData,
      },
      {
        id: 2,
        value: '5000',
        currency: 'CAD',
        method: 'Cartão de débito',
        tag: 'Transporte',
        description: 'Passeio no Canadá',
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
    isBtnEdit: false,
    isBtnDelete: false,
  },
};

export default initialStateMock;
