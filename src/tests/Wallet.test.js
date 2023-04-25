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
    const addDespesa = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addDespesa);
    expect(await screen.findByText(/despesa adicionada com sucesso!/i)).toBeInTheDocument();
    const valueInput = screen.getByRole('spinbutton', { name: /valor:/i });
    const currencyInput = screen.getByRole('combobox', { name: /moeda:/i });
    const methodInput = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const tagInput = screen.getByRole('combobox', { name: /categoria:/i });
    const descriptionInput = screen.getByRole('textbox', { name: /descrição:/i });

    userEvent.type(valueInput, '10');
    userEvent.type(currencyInput, 'GBP');
    userEvent.type(methodInput, 'Cartão de débito');
    userEvent.type(tagInput, 'Trabalho');
    userEvent.type(descriptionInput, 'Material de escritório');
    userEvent.click(addDespesa);

    const descriptionEl = await screen.findByRole('cell', { name: /material de escritório/i });
    expect(descriptionEl.innerHTML).toBe('Material de escritório');
    expect((await screen.findByTestId('total-field')).innerHTML).toBe('18878.30');
  });

  test('Editar despesa', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: initialStateMock });
    expect(await screen.findByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
    const editBtn = screen.getAllByRole('button', { name: /editar/i });
    userEvent.click(editBtn[0]);
    expect(screen.queryByRole('button', { name: /adicionar despesa/i })).not.toBeInTheDocument();
    const saveEditBtn = screen.getByRole('button', { name: /editar despesa/i });
    expect(saveEditBtn).toBeInTheDocument();

    const valueInput = screen.getByRole('spinbutton', { name: /valor:/i });
    const currencyInput = screen.getByRole('combobox', { name: /moeda:/i });
    const methodInput = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const tagInput = screen.getByRole('combobox', { name: /categoria:/i });
    const descriptionInput = screen.getByRole('textbox', { name: /descrição:/i });

    userEvent.clear(valueInput);
    userEvent.type(valueInput, '2');
    userEvent.type(currencyInput, 'GBP');
    userEvent.type(methodInput, 'Dinheiro');
    userEvent.type(tagInput, 'Trabalho');
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, 'Papel de impressora');
    userEvent.click(saveEditBtn);

    expect(screen.getByRole('cell', { name: /2\.00/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /10\.00/i })).not.toBeInTheDocument();
  });

  test('Excluir despesa', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: initialStateMock });
    const delBtn = screen.getAllByRole('button', { name: /excluir/i });
    userEvent.click(delBtn[0]);
    expect(screen.queryByRole('cell', { name: /refeição na europa/i })).not.toBeInTheDocument();
  });

  test('Excluir despesa que está sendo editada', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: initialStateMock });
    const saveEditBtn = screen.getAllByRole('button', { name: /editar/i });
    userEvent.click(saveEditBtn[0]);
    const delBtn = screen.getAllByRole('button', { name: /excluir/i });
    userEvent.click(delBtn[0]);
    expect(screen.queryByRole('cell', { name: /refeição na europa/i })).not.toBeInTheDocument();
  });
});
