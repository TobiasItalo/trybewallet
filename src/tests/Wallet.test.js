import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';
import Wallet from '../pages/Wallet';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import initialStateMock from './mocks/initialStateMock';
import mockData from './mocks/mockData';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => (mockData),
  });
});

describe('Testando ....', () => {
  test('Adicionar despesa', async () => {
    renderWithRouterAndRedux(
      (
        <div>
          <Wallet />
          <ToastContainer />
        </div>
      ), { initialState: initialStateMock },
    );
    const addDispesa = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addDispesa);
    expect(await screen.findByText(/despesa adicionada com sucesso!/i)).toBeInTheDocument();
  });

  test.only('Editar despesa', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: initialStateMock });
    expect(await screen.findByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
    const editBtn = screen.getAllByRole('button', { name: /editar/i });
    userEvent.click(editBtn[0]);
    expect(screen.queryByRole('button', { name: /adicionar despesa/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar despesa/i })).toBeInTheDocument();
    // alterar os inputs de valor e descrição
    // para isso usar o clear para por a info nova:
    // userEvent.clear(variavel do input);
  });

  test('Excluir despesa', () => {

  });
});
